import { ObjectiveAIClient } from "./proto/objective_ai_proto/objective_ai.client";
import {
  QueryRequest,
  QueryResponse,
  QueryStreamingResponse,
} from "./proto/objective_ai_proto/objective_ai";
import { GrpcWebFetchTransport } from "@protobuf-ts/grpcweb-transport";
import { GrpcTransport } from "@protobuf-ts/grpc-transport";
import { RpcMetadata, RpcOptions } from "@protobuf-ts/runtime-rpc";
import { ChannelCredentials } from "@grpc/grpc-js";
import {
  ChatCompletionCreateParamsNonStreaming,
  ChatCompletionCreateParamsStreaming,
} from "openai/resources/chat";
import { convertRequest } from "./openai";

export interface QueryCallOptions {
  /**
   * API key or bearer token for authorizing request
   */
  authorization?: string;

  /**
   * user agent to use for request
   */
  userAgent?: string;

  /**
   * timeout for request
   */
  timeout?: number | Date;

  /**
   * abort signal to cancel request
   * @see https://developer.mozilla.org/en-US/docs/Web/API/AbortSignal
   * @see https://developer.mozilla.org/en-US/docs/Web/API/AbortController
   */
  abort?: AbortSignal;
}

export interface QueryClientOptions extends QueryCallOptions {
  /**
   * choose grpc-web if running from an environment without HTTP/2 support (like web browser)
   * choose grpc if running from an environment with HTTP/2 support (like node)
   */
  transport: "grpc-web" | "grpc";

  /**
   * base URL for all requests.
   * must be prefixed with http:// or https://
   */
  baseUrl?: string;
}

export const QUERY_BASE_URL = "https://api.query.objective-ai.io";

export class QueryClient {
  private call_options: QueryCallOptions;
  private client: ObjectiveAIClient;

  constructor({
    transport = "grpc-web",
    baseUrl = QUERY_BASE_URL,
    authorization,
    userAgent,
    timeout,
    abort,
  }: QueryClientOptions) {
    const useSsl = baseUrl.startsWith("https://");
    if (!useSsl && !baseUrl.startsWith("http://")) {
      throw new Error("baseUrl must be prefixed with http:// or https://");
    }
    const rpcTransport = (() => {
      if (transport === "grpc-web") {
        return new GrpcWebFetchTransport({ baseUrl });
      } else if (transport === "grpc") {
        return new GrpcTransport({
          host: baseUrl.replace(/^https?:\/\//, ""),
          channelCredentials: useSsl
            ? ChannelCredentials.createSsl()
            : ChannelCredentials.createInsecure(),
        });
      } else {
        throw new Error("transport must be either 'grpc-web' or 'grpc'");
      }
    })();
    this.client = new ObjectiveAIClient(rpcTransport);
    this.call_options = {
      authorization,
      userAgent,
      timeout,
      abort,
    };
  }

  query(
    request: ChatCompletionCreateParamsNonStreaming | QueryRequest,
    callOptions: QueryCallOptions | undefined = {}
  ): Promise<QueryResponse> {
    if (!("metaModel" in request)) {
      request = convertRequest(request);
    }
    callOptions = { ...this.call_options, ...callOptions };
    return this.client.query(
      request,
      rpcOptions(this.call_options, callOptions)
    ).response;
  }

  queryStreamingChunked(
    request: ChatCompletionCreateParamsStreaming | QueryRequest,
    callOptions: QueryCallOptions | undefined = {}
  ): AsyncIterable<QueryStreamingResponse> {
    if (!("metaModel" in request)) {
      request = convertRequest(request);
    }
    callOptions = { ...this.call_options, ...callOptions };
    return this.client.queryStreaming(
      request,
      rpcOptions(this.call_options, callOptions)
    ).responses;
  }

  async *queryStreamingCollected(
    request: ChatCompletionCreateParamsStreaming | QueryRequest,
    callOptions: QueryCallOptions | undefined = {}
  ): AsyncIterable<[QueryResponse, QueryStreamingResponse]> {
    const response: QueryResponse = {
      id: "",
      metaModel: "",
      choices: [],
    };
    for await (const chunk of this.queryStreamingChunked(
      request,
      callOptions
    )) {
      response.id = chunk.id;
      response.metaModel = chunk.metaModel;
      if (chunk.kind.oneofKind === "choice") {
        const { choice } = chunk.kind;
        response.choices.push(choice);
        yield [response, chunk];
      } else if (chunk.kind.oneofKind === "vote") {
        const { vote } = chunk.kind;
        for (const choice of response.choices) {
          if (choice.id === vote.id) {
            choice.votes.push(vote);
            break;
          }
        }
        yield [response, chunk];
      } else if (chunk.kind.oneofKind === "choiceConfidence") {
        const {
          choiceConfidence: { confidence },
        } = chunk.kind;
        for (const choice of response.choices) {
          choice.confidence = confidence[choice.id] || 0;
        }
        yield [response, chunk];
      }
    }
  }
}

function rpcOptions(
  {
    authorization: baseAuthorization,
    userAgent: baseUserAgent,
    timeout: baseTimeout,
    abort: baseAbort,
  }: QueryCallOptions,
  {
    authorization: providedAuthorization,
    userAgent: providedUserAgent,
    timeout: providedTimeout,
    abort: providedAbort,
  }: QueryCallOptions | undefined = {}
): RpcOptions {
  const authorization = providedAuthorization ?? baseAuthorization;
  const userAgent = providedUserAgent ?? baseUserAgent;
  const timeout = providedTimeout ?? baseTimeout;
  const abort = providedAbort ?? baseAbort;
  return {
    meta: headers({ authorization, userAgent }),
    timeout,
    abort,
  };
}

function headers({
  authorization,
  userAgent,
}: QueryCallOptions): RpcMetadata | undefined {
  if (authorization === undefined && userAgent === undefined) {
    return undefined;
  }
  const meta: RpcMetadata = {};
  if (authorization) {
    meta["authorization"] = authorization;
  }
  if (userAgent) {
    meta["user-agent"] = userAgent;
  }
  return meta;
}
