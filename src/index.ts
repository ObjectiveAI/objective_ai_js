import OpenAI from "openai";
import { Stream } from "openai/streaming";

export namespace Chat {
  export namespace Completions {
    export namespace Request {
      export interface ChatCompletionCreateParamsBase {
        messages: Message[];
        model: string;
        frequency_penalty?: number | null;
        logit_bias?: Record<string, number> | null;
        logprobs?: boolean | null;
        max_completion_tokens?: number | null;
        modalities?: string[] | null;
        n?: number | null;
        parallel_tool_calls?: boolean | null;
        prediction?: Prediction | null;
        presence_penalty?: number | null;
        reasoning_effort?: ReasoningEffort | null;
        response_format?: ResponseFormat | null;
        seed?: number | null;
        service_tier?: ServiceTier | null;
        stop?: Stop | null;
        stream_options?: StreamOptions | null;
        temperature?: number | null;
        tool_choice?: ToolChoice | null;
        tools?: Tool[] | null;
        top_logprobs?: number | null;
        top_p?: number | null;
        web_search_options?: WebSearchOptions | null;
        max_tokens?: number | null;
        min_p?: number | null;
        plugins?: Plugin[] | null;
        provider?: ProviderPreferences | null;
        reasoning?: Reasoning | null;
        repetition_penalty?: number | null;
        top_a?: number | null;
        top_k?: number | null;
        usage?: Usage | null;
        verbosity?: Verbosity | null;
        models?: string[] | null;
      }

      export interface ChatCompletionCreateParamsStreaming
        extends ChatCompletionCreateParamsBase {
        stream: true;
      }

      export interface ChatCompletionCreateParamsNonStreaming
        extends ChatCompletionCreateParamsBase {
        stream?: false | null;
      }

      export type ChatCompletionCreateParams =
        | ChatCompletionCreateParamsStreaming
        | ChatCompletionCreateParamsNonStreaming;

      export type ServiceTier = "auto" | "default" | "flex";

      export type Stop = string | string[];

      export interface Prediction {
        content: Prediction.Content;
        type: "content";
      }

      export namespace Prediction {
        export type Content = string | Content.Part[];

        export namespace Content {
          export interface Part {
            text: string;
            type: "text";
          }
        }
      }

      export type ReasoningEffort = "low" | "medium" | "high";

      export type ResponseFormat =
        | ResponseFormat.Text
        | ResponseFormat.JsonObject
        | ResponseFormat.JsonSchema;

      export namespace ResponseFormat {
        export interface Text {
          type: "text";
        }

        export interface JsonObject {
          type: "json_object";
        }

        export interface JsonSchema {
          type: "json_schema";
          json_schema: JsonSchema.JsonSchema;
        }

        export namespace JsonSchema {
          export interface JsonSchema {
            name: string;
            description?: string | null;
            schema?: JsonValue;
            strict?: boolean | null;
          }
        }
      }

      export interface StreamOptions {
        include_usage?: boolean;
      }

      export type ToolChoice =
        | "none"
        | "auto"
        | "required"
        | ToolChoice.Function;

      export namespace ToolChoice {
        export interface Function {
          type: "function";
          function: Function.Function;
        }

        export namespace Function {
          export interface Function {
            name: string;
          }
        }
      }

      export interface WebSearchOptions {
        search_context_size?: WebSearchOptions.SearchContextSize | null;
        user_location?: WebSearchOptions.UserLocation | null;
      }

      export namespace WebSearchOptions {
        export type SearchContextSize = "low" | "medium" | "high";

        export interface UserLocation {
          approximate: UserLocation.Approximate;
          type: "approximate";
        }

        export namespace UserLocation {
          export interface Approximate {
            city?: string | null;
            country?: string | null;
            region?: string | null;
            // IANA format
            timezone?: string | null;
          }
        }
      }

      export type Tool = Tool.Function;

      export namespace Tool {
        export interface Function {
          function: Function.Definition;
          type: "function";
        }

        export namespace Function {
          export interface Definition {
            name: string;
            description?: string | null;
            parameters?: JsonValue;
            strict?: boolean | null;
          }
        }
      }

      export type Message =
        | Message.Developer
        | Message.System
        | Message.User
        | Message.Assistant
        | Message.Tool;

      export namespace Message {
        export interface Developer {
          role: "developer";
          content: Developer.Content;
          name?: string;
        }

        export namespace Developer {
          export type Content = string | Content.Part[];

          export namespace Content {
            export interface Part {
              text: string;
              type: "text";
            }
          }
        }

        export interface System {
          role: "system";
          content: System.Content;
          name?: string;
        }

        export namespace System {
          export type Content = string | Content.Part[];

          export namespace Content {
            export interface Part {
              text: string;
              type: "text";
            }
          }
        }

        export interface User {
          role: "user";
          content: User.Content;
          name?: string;
        }

        export namespace User {
          export type Content = string | Content.Part[];

          export namespace Content {
            export type Part =
              | Part.Text
              | Part.ImageUrl
              | Part.InputAudio
              | Part.File;

            export namespace Part {
              export interface Text {
                text: string;
                type: "text";
              }

              export interface ImageUrl {
                url: string;
                detail?: ImageUrl.Detail | null;
              }

              export namespace ImageUrl {
                export type Detail = "auto" | "low" | "high";
              }

              export interface InputAudio {
                data: string;
                format: InputAudio.Format;
              }

              export namespace InputAudio {
                export type Format = "wav" | "mp3";
              }

              export interface File {
                file_data?: string | null;
                file_id?: string | null;
                filename?: string | null;
              }
            }
          }
        }

        export interface Assistant {
          role: "assistant";
          content?: Assistant.Content | null;
          name?: string | null;
          refusal?: string | null;
          tool_calls?: Assistant.ToolCall[] | null;
        }

        export namespace Assistant {
          export type Content = string | Content.Part[];

          export namespace Content {
            export type Part = Part.Text | Part.Refusal;

            export namespace Part {
              export interface Text {
                text: string;
                type: "text";
              }
              export interface Refusal {
                refusal: string;
                type: "refusal";
              }
            }
          }

          export type ToolCall = ToolCall.Function;

          export namespace ToolCall {
            export interface Function {
              id: string;
              function: Function.Definition;
              type: "function";
            }

            export namespace Function {
              export interface Definition {
                name: string;
                arguments: string;
              }
            }
          }
        }

        export interface Tool {
          role: "tool";
          content?: Tool.Content | null;
          tool_call_id: string;
        }

        export namespace Tool {
          export type Content = string | Content.Part[];

          export namespace Content {
            export interface Part {
              text: string;
              type: "text";
            }
          }
        }
      }

      export interface ProviderPreferences {
        order?: string[] | null;
        allow_fallbacks?: boolean | null;
        require_parameters?: boolean | null;
        data_collection?: ProviderPreferences.DataCollection | null;
        only?: string[] | null;
        ignore?: string[] | null;
        quantizations?: string[] | null;
        sort?: string | null;
      }

      export namespace ProviderPreferences {
        export type DataCollection = "allow" | "deny";
      }

      export interface Plugin {
        id: string;
        [key: string]: JsonValue;
      }

      export interface Reasoning {
        max_tokens?: number | null;
        effort?: ReasoningEffort | null;
        enabled?: boolean | null;
      }

      export interface Usage {
        include: boolean;
      }

      export type Verbosity = "low" | "medium" | "high";
    }

    export namespace Response {
      export namespace Streaming {
        export interface ChatCompletionChunk {
          id: string;
          choices: Choice[];
          created: number;
          model: string;
          object: "chat.completion.chunk";
          service_tier?: ServiceTier;
          system_fingerprint?: string;
          usage?: Usage;
          provider?: string;
        }

        export namespace ChatCompletionChunk {
          export function merged(
            a: ChatCompletionChunk,
            b: ChatCompletionChunk
          ): [ChatCompletionChunk, boolean] {
            const id = a.id;
            const [choices, choicesChanged] = Choice.mergedList(
              a.choices,
              b.choices
            );
            const created = a.created;
            const model = a.model;
            const object = a.object;
            const [service_tier, service_tierChanged] = merge(
              a.service_tier,
              b.service_tier
            );
            const [system_fingerprint, system_fingerprintChanged] = merge(
              a.system_fingerprint,
              b.system_fingerprint
            );
            const [usage, usageChanged] = merge(a.usage, b.usage, Usage.merged);
            const [provider, providerChanged] = merge(a.provider, b.provider);
            if (
              choicesChanged ||
              service_tierChanged ||
              system_fingerprintChanged ||
              usageChanged ||
              providerChanged
            ) {
              return [
                {
                  id,
                  choices,
                  created,
                  model,
                  object,
                  ...(service_tier !== undefined ? { service_tier } : {}),
                  ...(system_fingerprint !== undefined
                    ? { system_fingerprint }
                    : {}),
                  ...(usage !== undefined ? { usage } : {}),
                  ...(provider !== undefined ? { provider } : {}),
                },
                true,
              ];
            } else {
              return [a, false];
            }
          }
        }

        export interface Choice {
          delta: Delta;
          finish_reason?: FinishReason;
          index: number;
          logprobs?: Logprobs;
        }

        export namespace Choice {
          export function merged(a: Choice, b: Choice): [Choice, boolean] {
            const [delta, deltaChanged] = merge(a.delta, b.delta, Delta.merged);
            const [finish_reason, finish_reasonChanged] = merge(
              a.finish_reason,
              b.finish_reason
            );
            const index = a.index;
            const [logprobs, logprobsChanged] = merge(
              a.logprobs,
              b.logprobs,
              Logprobs.merged
            );
            if (deltaChanged || finish_reasonChanged || logprobsChanged) {
              return [
                {
                  delta,
                  finish_reason,
                  index,
                  ...(logprobs !== undefined ? { logprobs } : {}),
                },
                true,
              ];
            } else {
              return [a, false];
            }
          }
          export function mergedList(
            a: Choice[],
            b: Choice[]
          ): [Choice[], boolean] {
            let merged: Choice[] | undefined = undefined;
            for (const choice of b) {
              const existingIndex = a.findIndex(
                ({ index }) => index === choice.index
              );
              if (existingIndex === -1) {
                if (merged === undefined) {
                  merged = [...a, choice];
                } else {
                  merged.push(choice);
                }
              } else {
                const [mergedChoice, choiceChanged] = Choice.merged(
                  a[existingIndex],
                  choice
                );
                if (choiceChanged) {
                  if (merged === undefined) {
                    merged = [...a];
                  }
                  merged[existingIndex] = mergedChoice;
                }
              }
            }
            return merged ? [merged, true] : [a, false];
          }
        }

        export interface Delta {
          content?: string;
          refusal?: string;
          role?: Role;
          tool_calls?: ToolCall[];
          reasoning?: string;
          images?: Image[];
        }

        export namespace Delta {
          export function merged(a: Delta, b: Delta): [Delta, boolean] {
            const [content, contentChanged] = merge(
              a.content,
              b.content,
              mergedString
            );
            const [refusal, refusalChanged] = merge(
              a.refusal,
              b.refusal,
              mergedString
            );
            const [role, roleChanged] = merge(a.role, b.role);
            const [tool_calls, tool_callsChanged] = merge(
              a.tool_calls,
              b.tool_calls,
              ToolCall.mergedList
            );
            const [reasoning, reasoningChanged] = merge(
              a.reasoning,
              b.reasoning,
              mergedString
            );
            const [images, imagesChanged] = merge(
              a.images,
              b.images,
              Image.mergedList
            );
            if (
              contentChanged ||
              reasoningChanged ||
              refusalChanged ||
              roleChanged ||
              tool_callsChanged ||
              imagesChanged
            ) {
              return [
                {
                  ...(content !== undefined ? { content } : {}),
                  ...(reasoning !== undefined ? { reasoning } : {}),
                  ...(refusal !== undefined ? { refusal } : {}),
                  ...(role !== undefined ? { role } : {}),
                  ...(tool_calls !== undefined ? { tool_calls } : {}),
                  ...(images !== undefined ? { images } : {}),
                },
                true,
              ];
            } else {
              return [a, false];
            }
          }
        }

        export type ToolCall = ToolCall.Function;

        export namespace ToolCall {
          export function merged(
            a: ToolCall,
            b: ToolCall
          ): [ToolCall, boolean] {
            return Function.merged(a, b);
          }
          export function mergedList(
            a: ToolCall[],
            b: ToolCall[]
          ): [ToolCall[], boolean] {
            let merged: ToolCall[] | undefined = undefined;
            for (const toolCall of b) {
              const existingIndex = a.findIndex(
                ({ index }) => index === toolCall.index
              );
              if (existingIndex === -1) {
                if (merged === undefined) {
                  merged = [...a, toolCall];
                } else {
                  merged.push(toolCall);
                }
              } else {
                const [mergedToolCall, toolCallChanged] = ToolCall.merged(
                  a[existingIndex],
                  toolCall
                );
                if (toolCallChanged) {
                  if (merged === undefined) {
                    merged = [...a];
                  }
                  merged[existingIndex] = mergedToolCall;
                }
              }
            }
            return merged ? [merged, true] : [a, false];
          }
          export interface Function {
            index: number;
            id?: string;
            function?: Function.Definition;
            type?: "function";
          }

          export namespace Function {
            export function merged(
              a: Function,
              b: Function
            ): [Function, boolean] {
              const index = a.index;
              const [id, idChanged] = merge(a.id, b.id);
              const [function_, functionChanged] = merge(
                a.function,
                b.function,
                Definition.merged
              );
              const [type, typeChanged] = merge(a.type, b.type);
              if (idChanged || functionChanged || typeChanged) {
                return [
                  {
                    index,
                    ...(id !== undefined ? { id } : {}),
                    ...(function_ !== undefined ? { function: function_ } : {}),
                    ...(type !== undefined ? { type } : {}),
                  },
                  true,
                ];
              } else {
                return [a, false];
              }
            }
            export interface Definition {
              name?: string;
              arguments?: string;
            }

            export namespace Definition {
              export function merged(
                a: Definition,
                b: Definition
              ): [Definition, boolean] {
                const [name, nameChanged] = merge(a.name, b.name);
                const [arguments_, argumentsChanged] = merge(
                  a.arguments,
                  b.arguments,
                  mergedString
                );
                if (nameChanged || argumentsChanged) {
                  return [
                    {
                      ...(name !== undefined ? { name } : {}),
                      ...(arguments_ !== undefined
                        ? { arguments: arguments_ }
                        : {}),
                    },
                    true,
                  ];
                } else {
                  return [a, false];
                }
              }
            }
          }
        }
      }

      export namespace Unary {
        export interface ChatCompletion {
          id: string;
          choices: Choice[];
          created: number;
          model: string;
          object: "chat.completion";
          service_tier?: ServiceTier;
          system_fingerprint?: string;
          usage?: Usage;
          provider?: string;
        }

        export interface Choice {
          message: Message;
          finish_reason: FinishReason;
          index: number;
          logprobs: Logprobs | null;
        }

        export interface Message {
          content: string | null;
          refusal: string | null;
          role: Role;
          annotations?: Annotation[];
          audio?: Audio;
          tool_calls?: ToolCall[];
          reasoning?: string;
          images?: Image[];
        }

        export type Annotation = Annotation.UrlCitation;

        export namespace Annotation {
          export interface UrlCitation {
            url_citation: UrlCitation.Definition;
          }

          export namespace UrlCitation {
            export interface Definition {
              end_index: number;
              start_index: number;
              title: string;
              url: string;
            }
          }
        }

        export interface Audio {
          id: string;
          data: string;
          expires_at: number;
          transcript: string;
        }

        export type ToolCall = ToolCall.Function;

        export namespace ToolCall {
          export interface Function {
            id: string;
            function: Function.Definition;
            type: "function";
          }

          export namespace Function {
            export interface Definition {
              name: string;
              arguments: string;
            }
          }
        }
      }

      export type ServiceTier = "auto" | "default" | "flex";

      export type FinishReason =
        | "stop"
        | "length"
        | "tool_calls"
        | "content_filter"
        | "error";

      export interface Usage {
        completion_tokens: number;
        prompt_tokens: number;
        total_tokens: number;
        completion_tokens_details?: Usage.CompletionTokensDetails;
        prompt_tokens_details?: Usage.PromptTokensDetails;
        cost?: number;
        cost_details?: Usage.CostDetails;
      }

      export namespace Usage {
        export function merged(a: Usage, b: Usage): [Usage, boolean] {
          const [completion_tokens, completion_tokensChanged] = merge(
            a.completion_tokens,
            b.completion_tokens,
            mergedNumber
          );
          const [prompt_tokens, prompt_tokensChanged] = merge(
            a.prompt_tokens,
            b.prompt_tokens,
            mergedNumber
          );
          const [total_tokens, total_tokensChanged] = merge(
            a.total_tokens,
            b.total_tokens,
            mergedNumber
          );
          const [completion_tokens_details, completion_tokens_detailsChanged] =
            merge(
              a.completion_tokens_details,
              b.completion_tokens_details,
              CompletionTokensDetails.merged
            );
          const [prompt_tokens_details, prompt_tokens_detailsChanged] = merge(
            a.prompt_tokens_details,
            b.prompt_tokens_details,
            PromptTokensDetails.merged
          );
          const [cost, costChanged] = merge(a.cost, b.cost, mergedNumber);
          const [cost_details, cost_detailsChanged] = merge(
            a.cost_details,
            b.cost_details,
            CostDetails.merged
          );
          if (
            completion_tokensChanged ||
            prompt_tokensChanged ||
            total_tokensChanged ||
            completion_tokens_detailsChanged ||
            prompt_tokens_detailsChanged ||
            costChanged ||
            cost_detailsChanged
          ) {
            return [
              {
                completion_tokens,
                prompt_tokens,
                total_tokens,
                ...(completion_tokens_details !== undefined
                  ? { completion_tokens_details }
                  : {}),
                ...(prompt_tokens_details !== undefined
                  ? { prompt_tokens_details }
                  : {}),
                ...(cost !== undefined ? { cost } : {}),
                ...(cost_details !== undefined ? { cost_details } : {}),
              },
              true,
            ];
          } else {
            return [a, false];
          }
        }
        export interface CompletionTokensDetails {
          accepted_prediction_tokens?: number;
          audio_tokens?: number;
          reasoning_tokens?: number;
          rejected_prediction_tokens?: number;
        }

        export namespace CompletionTokensDetails {
          export function merged(
            a: CompletionTokensDetails,
            b: CompletionTokensDetails
          ): [CompletionTokensDetails, boolean] {
            const [
              accepted_prediction_tokens,
              accepted_prediction_tokensChanged,
            ] = merge(
              a.accepted_prediction_tokens,
              b.accepted_prediction_tokens,
              mergedNumber
            );
            const [audio_tokens, audio_tokensChanged] = merge(
              a.audio_tokens,
              b.audio_tokens,
              mergedNumber
            );
            const [reasoning_tokens, reasoning_tokensChanged] = merge(
              a.reasoning_tokens,
              b.reasoning_tokens,
              mergedNumber
            );
            const [
              rejected_prediction_tokens,
              rejected_prediction_tokensChanged,
            ] = merge(
              a.rejected_prediction_tokens,
              b.rejected_prediction_tokens,
              mergedNumber
            );
            if (
              accepted_prediction_tokensChanged ||
              audio_tokensChanged ||
              reasoning_tokensChanged ||
              rejected_prediction_tokensChanged
            ) {
              return [
                {
                  ...(accepted_prediction_tokens !== undefined
                    ? { accepted_prediction_tokens }
                    : {}),
                  ...(audio_tokens !== undefined ? { audio_tokens } : {}),
                  ...(reasoning_tokens !== undefined
                    ? { reasoning_tokens }
                    : {}),
                  ...(rejected_prediction_tokens !== undefined
                    ? { rejected_prediction_tokens }
                    : {}),
                },
                true,
              ];
            } else {
              return [a, false];
            }
          }
        }

        export interface PromptTokensDetails {
          audio_tokens?: number;
          cached_tokens?: number;
        }

        export namespace PromptTokensDetails {
          export function merged(
            a: PromptTokensDetails,
            b: PromptTokensDetails
          ): [PromptTokensDetails, boolean] {
            const [audio_tokens, audio_tokensChanged] = merge(
              a.audio_tokens,
              b.audio_tokens,
              mergedNumber
            );
            const [cached_tokens, cached_tokensChanged] = merge(
              a.cached_tokens,
              b.cached_tokens,
              mergedNumber
            );
            if (audio_tokensChanged || cached_tokensChanged) {
              return [
                {
                  ...(audio_tokens !== undefined ? { audio_tokens } : {}),
                  ...(cached_tokens !== undefined ? { cached_tokens } : {}),
                },
                true,
              ];
            } else {
              return [a, false];
            }
          }
        }

        export interface CostDetails {
          upstream_inference_cost?: number;
          upstream_upstream_inference_cost?: number;
        }

        export namespace CostDetails {
          export function merged(
            a: CostDetails,
            b: CostDetails
          ): [CostDetails, boolean] {
            const [upstream_inference_cost, upstream_inference_costChanged] =
              merge(
                a.upstream_inference_cost,
                b.upstream_inference_cost,
                mergedNumber
              );
            const [
              upstream_upstream_inference_cost,
              upstream_upstream_inference_costChanged,
            ] = merge(
              a.upstream_upstream_inference_cost,
              b.upstream_upstream_inference_cost,
              mergedNumber
            );
            if (
              upstream_inference_costChanged ||
              upstream_upstream_inference_costChanged
            ) {
              return [
                {
                  ...(upstream_inference_cost !== undefined
                    ? { upstream_inference_cost }
                    : {}),
                  ...(upstream_upstream_inference_cost !== undefined
                    ? { upstream_upstream_inference_cost }
                    : {}),
                },
                true,
              ];
            } else {
              return [a, false];
            }
          }
        }
      }

      export interface Logprobs {
        content: Logprobs.Logprob[];
        refusal: Logprobs.Logprob[];
      }

      export namespace Logprobs {
        export function merged(a: Logprobs, b: Logprobs): [Logprobs, boolean] {
          const [content, contentChanged] = merge(
            a.content,
            b.content,
            Logprob.mergedList
          );
          const [refusal, refusalChanged] = merge(
            a.refusal,
            b.refusal,
            Logprob.mergedList
          );
          if (contentChanged || refusalChanged) {
            return [{ content, refusal }, true];
          } else {
            return [a, false];
          }
        }

        export interface Logprob {
          token: string;
          bytes: number[];
          logprob: number;
          top_logprobs: Logprob.TopLogprob[];
        }

        export namespace Logprob {
          export function mergedList(
            a: Logprob[],
            b: Logprob[]
          ): [Logprob[], boolean] {
            if (b.length === 0) {
              return [a, false];
            } else if (a.length === 0) {
              return [b, true];
            } else {
              return [[...a, ...b], true];
            }
          }

          export interface TopLogprob {
            token: string;
            bytes: number[] | null;
            logprob: number | null;
          }
        }
      }

      export type Role = "assistant";

      export type Image = Image.ImageUrl;

      export namespace Image {
        export function mergedList(a: Image[], b: Image[]): [Image[], boolean] {
          if (b.length === 0) {
            return [a, false];
          } else if (a.length === 0) {
            return [b, true];
          } else {
            return [[...a, ...b], true];
          }
        }
        export interface ImageUrl {
          type: "image_url";
          image_url: { url: string };
        }
      }
    }

    export interface ListOptions {
      count?: number | null;
      offset?: number | null;
    }

    export interface ListItem {
      id: string;
      created: string; // RFC 3339 timestamp
    }

    export async function list(
      openai: OpenAI,
      listOptions?: ListOptions,
      options?: OpenAI.RequestOptions
    ): Promise<{ data: ListItem[] }> {
      const response = await openai.chat.completions.list({
        query: listOptions,
        ...options,
      });
      return response as unknown as { data: ListItem[] };
    }

    export async function publish(
      openai: OpenAI,
      id: string,
      options?: OpenAI.RequestOptions
    ): Promise<void> {
      await openai.post(`/chat/completions/${id}/publish`, options);
    }

    export async function retrieve(
      openai: OpenAI,
      id: string,
      options?: OpenAI.RequestOptions
    ): Promise<{
      request: Request.ChatCompletionCreateParams;
      response: Response.Unary.ChatCompletion;
    }> {
      const response = await openai.chat.completions.retrieve(id, options);
      return response as unknown as {
        request: Request.ChatCompletionCreateParams;
        response: Response.Unary.ChatCompletion;
      };
    }

    export async function create(
      openai: OpenAI,
      body: Request.ChatCompletionCreateParamsStreaming,
      options?: OpenAI.RequestOptions
    ): Promise<
      Stream<Response.Streaming.ChatCompletionChunk | ObjectiveAIError>
    >;
    export async function create(
      openai: OpenAI,
      body: Request.ChatCompletionCreateParamsNonStreaming,
      options?: OpenAI.RequestOptions
    ): Promise<Response.Unary.ChatCompletion>;
    export async function create(
      openai: OpenAI,
      body: Request.ChatCompletionCreateParams,
      options?: OpenAI.RequestOptions
    ): Promise<
      | Stream<Response.Streaming.ChatCompletionChunk | ObjectiveAIError>
      | Response.Unary.ChatCompletion
    > {
      const response = await openai.post("/chat/completions", {
        body,
        ...options,
      });
      return response as unknown as
        | Stream<Response.Streaming.ChatCompletionChunk | ObjectiveAIError>
        | Response.Unary.ChatCompletion;
    }
  }
}

export namespace Query {
  export namespace Completions {
    export namespace Request {
      export interface ChatCompletionCreateParamsBase {
        messages: Chat.Completions.Request.Message[];
        model: Model;
        logprobs?: boolean | null;
        n?: number | null;
        prediction?: Chat.Completions.Request.Prediction | null;
        response_format?: Chat.Completions.Request.ResponseFormat | null;
        seed?: number | null;
        service_tier?: Chat.Completions.Request.ServiceTier | null;
        stream_options?: Chat.Completions.Request.StreamOptions | null;
        tools?: Chat.Completions.Request.Tool[] | null;
        top_logprobs?: number | null;
        usage?: Chat.Completions.Request.Usage | null;
        embeddings?: string | null;
      }

      export interface ChatCompletionCreateParamsStreaming
        extends ChatCompletionCreateParamsBase {
        stream: true;
      }

      export interface ChatCompletionCreateParamsNonStreaming
        extends ChatCompletionCreateParamsBase {
        stream?: false | null;
      }

      export type ChatCompletionCreateParams =
        | ChatCompletionCreateParamsStreaming
        | ChatCompletionCreateParamsNonStreaming;

      export type Model = string | QueryModelBase;
    }

    export namespace Response {
      export namespace Streaming {
        export interface ChatCompletionChunk {
          id: string;
          choices: Choice[];
          created: number;
          model: string;
          object: "chat.completion.chunk";
          service_tier?: Chat.Completions.Response.ServiceTier;
          system_fingerprint?: string;
          usage?: Chat.Completions.Response.Usage;
          training_table_data?: TrainingTableData;
        }

        export namespace ChatCompletionChunk {
          export function merged(
            a: ChatCompletionChunk,
            b: ChatCompletionChunk
          ): [ChatCompletionChunk, boolean] {
            const id = a.id;
            const [choices, choicesChanged] = Choice.mergedList(
              a.choices,
              b.choices
            );
            const created = a.created;
            const model = a.model;
            const object = a.object;
            const [service_tier, service_tierChanged] = merge(
              a.service_tier,
              b.service_tier
            );
            const [system_fingerprint, system_fingerprintChanged] = merge(
              a.system_fingerprint,
              b.system_fingerprint
            );
            const [usage, usageChanged] = merge(
              a.usage,
              b.usage,
              Chat.Completions.Response.Usage.merged
            );
            const [training_table_data, training_table_dataChanged] = merge(
              a.training_table_data,
              b.training_table_data
            );
            if (
              choicesChanged ||
              service_tierChanged ||
              system_fingerprintChanged ||
              usageChanged ||
              training_table_dataChanged
            ) {
              return [
                {
                  id,
                  choices,
                  created,
                  model,
                  object,
                  ...(service_tier !== undefined ? { service_tier } : {}),
                  ...(system_fingerprint !== undefined
                    ? { system_fingerprint }
                    : {}),
                  ...(usage !== undefined ? { usage } : {}),
                  ...(training_table_data !== undefined
                    ? { training_table_data }
                    : {}),
                },
                true,
              ];
            } else {
              return [a, false];
            }
          }
        }

        export interface Choice {
          delta: Chat.Completions.Response.Streaming.Delta;
          finish_reason: Chat.Completions.Response.FinishReason | null;
          index: number;
          logprobs?: Chat.Completions.Response.Logprobs;
          generate_id?: string;
          confidence_id?: ConfidenceId;
          confidence_weight?: number;
          confidence?: number;
          embedding?: EmbeddingsResponse | ObjectiveAIError;
          error?: ObjectiveAIError;
          model: string;
          model_index: number | null;
          completion_metadata: CompletionMetadata;
        }

        export namespace Choice {
          export function merged(a: Choice, b: Choice): [Choice, boolean] {
            const [delta, deltaChanged] = merge(
              a.delta,
              b.delta,
              Chat.Completions.Response.Streaming.Delta.merged
            );
            const [finish_reason, finish_reasonChanged] = merge(
              a.finish_reason,
              b.finish_reason
            );
            const index = a.index;
            const [logprobs, logprobsChanged] = merge(
              a.logprobs,
              b.logprobs,
              Chat.Completions.Response.Logprobs.merged
            );
            const [generate_id, generate_idChanged] = merge(
              a.generate_id,
              b.generate_id
            );
            const [confidence_id, confidence_idChanged] = merge(
              a.confidence_id,
              b.confidence_id
            );
            const [confidence_weight, confidence_weightChanged] = merge(
              a.confidence_weight,
              b.confidence_weight
            );
            const [confidence, confidenceChanged] = merge(
              a.confidence,
              b.confidence
            );
            const [embedding, embeddingChanged] = merge(
              a.embedding,
              b.embedding
            );
            const [error, errorChanged] = merge(a.error, b.error);
            const model = a.model;
            const model_index = a.model_index;
            const [completion_metadata, completion_metadataChanged] =
              CompletionMetadata.merged(
                a.completion_metadata,
                b.completion_metadata
              );
            if (
              deltaChanged ||
              finish_reasonChanged ||
              logprobsChanged ||
              generate_idChanged ||
              confidence_idChanged ||
              confidence_weightChanged ||
              confidenceChanged ||
              embeddingChanged ||
              errorChanged ||
              completion_metadataChanged
            ) {
              return [
                {
                  delta,
                  finish_reason,
                  index,
                  ...(logprobs !== undefined ? { logprobs } : {}),
                  ...(generate_id !== undefined ? { generate_id } : {}),
                  ...(confidence_id !== undefined ? { confidence_id } : {}),
                  ...(confidence_weight !== undefined
                    ? { confidence_weight }
                    : {}),
                  ...(confidence !== undefined ? { confidence } : {}),
                  ...(embedding !== undefined ? { embedding } : {}),
                  ...(error !== undefined ? { error } : {}),
                  model,
                  model_index,
                  completion_metadata,
                },
                true,
              ];
            } else {
              return [a, false];
            }
          }
          export function mergedList(
            a: Choice[],
            b: Choice[]
          ): [Choice[], boolean] {
            let merged: Choice[] | undefined = undefined;
            for (const choice of b) {
              const existingIndex = a.findIndex(
                ({ index }) => index === choice.index
              );
              if (existingIndex === -1) {
                if (merged === undefined) {
                  merged = [...a, choice];
                } else {
                  merged.push(choice);
                }
              } else {
                const [mergedChoice, choiceChanged] = Choice.merged(
                  a[existingIndex],
                  choice
                );
                if (choiceChanged) {
                  if (merged === undefined) {
                    merged = [...a];
                  }
                  merged[existingIndex] = mergedChoice;
                }
              }
            }
            return merged ? [merged, true] : [a, false];
          }
        }
      }

      export namespace Unary {
        export interface ChatCompletion {
          id: string;
          choices: Choice[];
          created: number;
          model: string;
          object: "chat.completion";
          service_tier?: Chat.Completions.Response.ServiceTier;
          system_fingerprint?: string;
          usage?: Chat.Completions.Response.Usage;
          training_table_data?: TrainingTableData;
        }

        export interface Choice {
          message: Chat.Completions.Response.Unary.Message;
          finish_reason: Chat.Completions.Response.FinishReason;
          index: number;
          logprobs: Chat.Completions.Response.Logprobs | null;
          generate_id: string | null;
          confidence_id: ConfidenceId | null;
          confidence_weight: number | null;
          confidence: number | null;
          embedding?: EmbeddingsResponse | ObjectiveAIError;
          error?: ObjectiveAIError;
          model: string;
          model_index: number | null;
          completion_metadata: CompletionMetadata;
        }
      }

      export interface TrainingTableData {
        response_format_hash: string;
        embeddings_response: EmbeddingsResponse;
      }

      export interface EmbeddingsResponse {
        data: EmbeddingsResponse.Embedding[];
        model: string;
        object: "list";
        usage?: Chat.Completions.Response.Usage;
      }

      export namespace EmbeddingsResponse {
        export interface Embedding {
          embedding: number[];
          index: number;
          object: "embedding";
        }
      }

      export interface CompletionMetadata {
        id: string;
        created: number;
        model: string;
        service_tier?: Chat.Completions.Response.ServiceTier;
        system_fingerprint?: string;
        usage?: Chat.Completions.Response.Usage;
        provider?: string;
      }

      export namespace CompletionMetadata {
        export function merged(
          a: CompletionMetadata,
          b: CompletionMetadata
        ): [CompletionMetadata, boolean] {
          const id = a.id;
          const created = a.created;
          const model = a.model;
          const [service_tier, service_tierChanged] = merge(
            a.service_tier,
            b.service_tier
          );
          const [system_fingerprint, system_fingerprintChanged] = merge(
            a.system_fingerprint,
            b.system_fingerprint
          );
          const [usage, usageChanged] = merge(
            a.usage,
            b.usage,
            Chat.Completions.Response.Usage.merged
          );
          if (
            service_tierChanged ||
            system_fingerprintChanged ||
            usageChanged
          ) {
            return [
              {
                id,
                created,
                model,
                ...(service_tier !== undefined ? { service_tier } : {}),
                ...(system_fingerprint !== undefined
                  ? { system_fingerprint }
                  : {}),
                ...(usage !== undefined ? { usage } : {}),
              },
              true,
            ];
          } else {
            return [a, false];
          }
        }
      }

      export type ConfidenceId = string | Record<string, number>;
    }

    export async function list(
      openai: OpenAI,
      listOptions?: Chat.Completions.ListOptions,
      options?: OpenAI.RequestOptions
    ): Promise<{ data: Chat.Completions.ListItem[] }> {
      const response = await openai.get("/query/completions", {
        query: listOptions,
        ...options,
      });
      return response as { data: Chat.Completions.ListItem[] };
    }

    export async function publish(
      openai: OpenAI,
      id: string,
      options?: OpenAI.RequestOptions
    ): Promise<void> {
      await openai.post(`/query/completions/${id}/publish`, options);
    }

    export async function retrieve(
      openai: OpenAI,
      id: string,
      options?: OpenAI.RequestOptions
    ): Promise<{
      request: Request.ChatCompletionCreateParams;
      response: Response.Unary.ChatCompletion;
    }> {
      const response = await openai.get(`/query/completions/${id}`, options);
      return response as {
        request: Request.ChatCompletionCreateParams;
        response: Response.Unary.ChatCompletion;
      };
    }

    export async function create(
      openai: OpenAI,
      body: Request.ChatCompletionCreateParamsStreaming,
      options?: OpenAI.RequestOptions
    ): Promise<
      Stream<Response.Streaming.ChatCompletionChunk | ObjectiveAIError>
    >;
    export async function create(
      openai: OpenAI,
      body: Request.ChatCompletionCreateParamsNonStreaming,
      options?: OpenAI.RequestOptions
    ): Promise<Response.Unary.ChatCompletion>;
    export async function create(
      openai: OpenAI,
      body: Request.ChatCompletionCreateParams,
      options?: OpenAI.RequestOptions
    ): Promise<
      | Stream<Response.Streaming.ChatCompletionChunk | ObjectiveAIError>
      | Response.Unary.ChatCompletion
    > {
      const response = await openai.post("/chat/completions", {
        body,
        ...options,
      });
      return response as unknown as
        | Stream<Response.Streaming.ChatCompletionChunk | ObjectiveAIError>
        | Response.Unary.ChatCompletion;
    }
  }
}

export namespace QueryTool {
  export namespace Completions {
    export namespace Request {
      export interface ChatCompletionCreateParamsBase {
        messages: Chat.Completions.Request.Message[];
        model: Query.Completions.Request.Model;
        logprobs?: boolean | null;
        n?: number | null;
        prediction?: Chat.Completions.Request.Prediction | null;
        response_format: ResponseFormat;
        seed?: number | null;
        service_tier?: Chat.Completions.Request.ServiceTier | null;
        stream_options?: Chat.Completions.Request.StreamOptions | null;
        tools?: Chat.Completions.Request.Tool[] | null;
        top_logprobs?: number | null;
        usage?: Chat.Completions.Request.Usage | null;
        embeddings?: string | null;
      }

      export interface ChatCompletionCreateParamsStreaming
        extends ChatCompletionCreateParamsBase {
        stream: true;
      }

      export interface ChatCompletionCreateParamsNonStreaming
        extends ChatCompletionCreateParamsBase {
        stream?: false | null;
      }

      export type ChatCompletionCreateParams =
        | ChatCompletionCreateParamsStreaming
        | ChatCompletionCreateParamsNonStreaming;

      export type ResponseFormat =
        | ResponseFormat.Simple
        | ResponseFormat.NumberQuery
        | ResponseFormat.MultipleChoiceQuery
        | ResponseFormat.MultipleChoiceOptionsQuery
        | ResponseFormat.WeightedAverageChoiceQuery;

      export namespace ResponseFormat {
        export type Simple =
          | {
              tool: "simple_query";
              top?: number | null;
            }
          | ({
              tool: "simple_query";
              top?: number | null;
            } & Chat.Completions.Request.ResponseFormat);

        export interface NumberQuery {
          tool: "number_query";
        }

        export interface MultipleChoiceQuery {
          tool: "multiple_choice_query";
          choices: string[];
        }

        export interface MultipleChoiceOptionsQuery {
          tool: "multiple_choice_options_query";
          min_items: number;
          max_items: number;
        }

        export type WeightedAverageChoiceQuery =
          | {
              tool: "weighted_average_choice_query";
              embeddings_model: string;
            }
          | ({
              tool: "weighted_average_choice_query";
              embeddings_model: string;
            } & Chat.Completions.Request.ResponseFormat);
      }
    }

    export namespace Response {
      export namespace Streaming {
        export interface ChatCompletionChunk {
          id: string;
          choices: Choice[];
          created: number;
          model: Model;
          object: "chat.completion.chunk";
          service_tier?: Chat.Completions.Response.ServiceTier;
          system_fingerprint?: string;
          usage?: Chat.Completions.Response.Usage;
        }

        export namespace ChatCompletionChunk {
          export function merged(
            a: ChatCompletionChunk,
            b: ChatCompletionChunk
          ): [ChatCompletionChunk, boolean] {
            const id = a.id;
            const [choices, choicesChanged] = Choice.mergedList(
              a.choices,
              b.choices
            );
            const created = a.created;
            const model = a.model;
            const object = a.object;
            const [service_tier, service_tierChanged] = merge(
              a.service_tier,
              b.service_tier
            );
            const [system_fingerprint, system_fingerprintChanged] = merge(
              a.system_fingerprint,
              b.system_fingerprint
            );
            const [usage, usageChanged] = merge(
              a.usage,
              b.usage,
              Chat.Completions.Response.Usage.merged
            );
            if (
              choicesChanged ||
              service_tierChanged ||
              system_fingerprintChanged ||
              usageChanged
            ) {
              return [
                {
                  id,
                  choices,
                  created,
                  model,
                  object,
                  ...(service_tier !== undefined ? { service_tier } : {}),
                  ...(system_fingerprint !== undefined
                    ? { system_fingerprint }
                    : {}),
                  ...(usage !== undefined ? { usage } : {}),
                },
                true,
              ];
            } else {
              return [a, false];
            }
          }
        }

        export interface Choice {
          delta: Delta;
          finish_reason: Chat.Completions.Response.FinishReason | null;
          index: number;
          logprobs?: Chat.Completions.Response.Logprobs;
        }

        export namespace Choice {
          export function merged(a: Choice, b: Choice): [Choice, boolean] {
            const [delta, deltaChanged] = merge(a.delta, b.delta, Delta.merged);
            const [finish_reason, finish_reasonChanged] = merge(
              a.finish_reason,
              b.finish_reason
            );
            const index = a.index;
            const [logprobs, logprobsChanged] = merge(
              a.logprobs,
              b.logprobs,
              Chat.Completions.Response.Logprobs.merged
            );
            if (deltaChanged || finish_reasonChanged || logprobsChanged) {
              return [
                {
                  delta,
                  finish_reason,
                  index,
                  ...(logprobs !== undefined ? { logprobs } : {}),
                },
                true,
              ];
            } else {
              return [a, false];
            }
          }
          export function mergedList(
            a: Choice[],
            b: Choice[]
          ): [Choice[], boolean] {
            let merged: Choice[] | undefined = undefined;
            for (const choice of b) {
              const existingIndex = a.findIndex(
                ({ index }) => index === choice.index
              );
              if (existingIndex === -1) {
                if (merged === undefined) {
                  merged = [...a, choice];
                } else {
                  merged.push(choice);
                }
              } else {
                const [mergedChoice, choiceChanged] = Choice.merged(
                  a[existingIndex],
                  choice
                );
                if (choiceChanged) {
                  if (merged === undefined) {
                    merged = [...a];
                  }
                  merged[existingIndex] = mergedChoice;
                }
              }
            }
            return merged ? [merged, true] : [a, false];
          }
        }

        export interface Delta {
          content?: string;
          refusal?: string;
          role?: Chat.Completions.Response.Role;
          tool_calls?: Chat.Completions.Response.Streaming.ToolCall[];
          reasoning?: Reasoning;
        }

        export namespace Delta {
          export function merged(a: Delta, b: Delta): [Delta, boolean] {
            const [content, contentChanged] = merge(
              a.content,
              b.content,
              mergedString
            );
            const [reasoning, reasoningChanged] = merge(
              a.reasoning,
              b.reasoning,
              Reasoning.merged
            );
            const [refusal, refusalChanged] = merge(
              a.refusal,
              b.refusal,
              mergedString
            );
            const [role, roleChanged] = merge(a.role, b.role);
            const [tool_calls, tool_callsChanged] = merge(
              a.tool_calls,
              b.tool_calls,
              Chat.Completions.Response.Streaming.ToolCall.mergedList
            );
            if (
              contentChanged ||
              reasoningChanged ||
              refusalChanged ||
              roleChanged ||
              tool_callsChanged
            ) {
              return [
                {
                  ...(content !== undefined ? { content } : {}),
                  ...(reasoning !== undefined ? { reasoning } : {}),
                  ...(refusal !== undefined ? { refusal } : {}),
                  ...(role !== undefined ? { role } : {}),
                  ...(tool_calls !== undefined ? { tool_calls } : {}),
                },
                true,
              ];
            } else {
              return [a, false];
            }
          }
        }

        export type Reasoning = ReasoningCompletion | ReasoningCompletion[];

        export namespace Reasoning {
          export function merged(
            a: Reasoning,
            b: Reasoning
          ): [Reasoning, boolean] {
            let merged: Reasoning | undefined = undefined;
            if (Array.isArray(a)) {
              if (Array.isArray(b)) {
                for (const item of b) {
                  if (merged === undefined) {
                    const existingIndex = a.findIndex(
                      ({ index, type }) =>
                        index === item.index && type === item.type
                    );
                    if (existingIndex === -1) {
                      merged = [...a, item];
                    } else if (item.type === "query") {
                      const [mergedItem, itemChanged] =
                        ReasoningCompletion.QueryCompletion.merged(
                          a[
                            existingIndex
                          ] as ReasoningCompletion.QueryCompletion,
                          item
                        );
                      if (itemChanged) {
                        merged = [...a];
                        merged[existingIndex] = mergedItem;
                      }
                    } else if (item.type === "chat") {
                      const [mergedItem, itemChanged] =
                        ReasoningCompletion.ChatCompletion.merged(
                          a[
                            existingIndex
                          ] as ReasoningCompletion.ChatCompletion,
                          item
                        );
                      if (itemChanged) {
                        merged = [...a];
                        merged[existingIndex] = mergedItem;
                      }
                    }
                  } else if (Array.isArray(merged) /* always true */) {
                    const existingIndex = merged.findIndex(
                      ({ index, type }) =>
                        index === item.index && type === item.type
                    );
                    if (existingIndex === -1) {
                      merged.push(item);
                    } else if (item.type === "query") {
                      const [mergedItem, itemChanged] =
                        ReasoningCompletion.QueryCompletion.merged(
                          merged[
                            existingIndex
                          ] as ReasoningCompletion.QueryCompletion,
                          item
                        );
                      if (itemChanged) {
                        merged[existingIndex] = mergedItem;
                      }
                    } else if (item.type === "chat") {
                      const [mergedItem, itemChanged] =
                        ReasoningCompletion.ChatCompletion.merged(
                          merged[
                            existingIndex
                          ] as ReasoningCompletion.ChatCompletion,
                          item
                        );
                      if (itemChanged) {
                        merged[existingIndex] = mergedItem;
                      }
                    }
                  }
                }
              } else {
                const existingIndex = a.findIndex(
                  ({ index, type }) => index === b.index && type === b.type
                );
                if (existingIndex === -1) {
                  merged = [...a, b];
                } else if (b.type === "query") {
                  const [mergedItem, itemChanged] =
                    ReasoningCompletion.QueryCompletion.merged(
                      a[existingIndex] as ReasoningCompletion.QueryCompletion,
                      b
                    );
                  if (itemChanged) {
                    merged = [...a];
                    merged[existingIndex] = mergedItem;
                  }
                } else if (b.type === "chat") {
                  const [mergedItem, itemChanged] =
                    ReasoningCompletion.ChatCompletion.merged(
                      a[existingIndex] as ReasoningCompletion.ChatCompletion,
                      b
                    );
                  if (itemChanged) {
                    merged = [...a];
                    merged[existingIndex] = mergedItem;
                  }
                }
              }
            } else {
              if (Array.isArray(b)) {
                merged = [a];
                for (const item of b) {
                  const existingIndex = merged.findIndex(
                    ({ index, type }) =>
                      index === item.index && type === item.type
                  );
                  if (existingIndex === -1) {
                    merged.push(item);
                  } else if (item.type === "query") {
                    const [mergedItem, itemChanged] =
                      ReasoningCompletion.QueryCompletion.merged(
                        merged[
                          existingIndex
                        ] as ReasoningCompletion.QueryCompletion,
                        item
                      );
                    if (itemChanged) {
                      merged[existingIndex] = mergedItem;
                    }
                  } else if (item.type === "chat") {
                    const [mergedItem, itemChanged] =
                      ReasoningCompletion.ChatCompletion.merged(
                        merged[
                          existingIndex
                        ] as ReasoningCompletion.ChatCompletion,
                        item
                      );
                    if (itemChanged) {
                      merged[existingIndex] = mergedItem;
                    }
                  }
                }
              } else {
                if (a.index === b.index && a.type === b.type) {
                  if (b.type === "query") {
                    const [mergedItem, itemChanged] =
                      ReasoningCompletion.QueryCompletion.merged(
                        a as ReasoningCompletion.QueryCompletion,
                        b
                      );
                    if (itemChanged) {
                      merged = mergedItem;
                    }
                  } else if (b.type === "chat") {
                    const [mergedItem, itemChanged] =
                      ReasoningCompletion.ChatCompletion.merged(
                        a as ReasoningCompletion.ChatCompletion,
                        b
                      );
                    if (itemChanged) {
                      merged = mergedItem;
                    }
                  }
                } else {
                  merged = [a, b];
                }
              }
            }
            return merged ? [merged, true] : [a, false];
          }
        }

        export type ReasoningCompletion =
          | ReasoningCompletion.QueryCompletion
          | ReasoningCompletion.ChatCompletion;

        export namespace ReasoningCompletion {
          export type QueryCompletion = {
            index: number;
            type: "query";
            error?: ObjectiveAIError;
          } & Query.Completions.Response.Streaming.ChatCompletionChunk;

          export namespace QueryCompletion {
            export function merged(
              a: QueryCompletion,
              b: QueryCompletion
            ): [QueryCompletion, boolean] {
              const [merged, changed] =
                Query.Completions.Response.Streaming.ChatCompletionChunk.merged(
                  a,
                  b
                );
              return changed
                ? [{ type: a.type, index: a.index, ...merged }, true]
                : [a, false];
            }
          }

          export type ChatCompletion = {
            index: number;
            type: "chat";
            error?: ObjectiveAIError;
          } & Chat.Completions.Response.Streaming.ChatCompletionChunk;

          export namespace ChatCompletion {
            export function merged(
              a: ChatCompletion,
              b: ChatCompletion
            ): [ChatCompletion, boolean] {
              const [merged, changed] =
                Chat.Completions.Response.Streaming.ChatCompletionChunk.merged(
                  a,
                  b
                );
              return changed
                ? [{ type: a.type, index: a.index, ...merged }, true]
                : [a, false];
            }
          }
        }
      }

      export namespace Unary {
        export interface ChatCompletion {
          id: string;
          choices: Choice[];
          created: number;
          model: Model;
          object: "chat.completion";
          service_tier?: Chat.Completions.Response.ServiceTier;
          system_fingerprint?: string;
          usage?: Chat.Completions.Response.Usage;
        }

        export interface Choice {
          message: Message;
          finish_reason: Chat.Completions.Response.FinishReason;
          index: number;
          logprobs: Chat.Completions.Response.Logprobs | null;
        }

        export interface Message {
          content: string | null;
          refusal: string | null;
          role: Chat.Completions.Response.Role;
          annotations?: Chat.Completions.Response.Unary.Annotation[];
          audio?: Chat.Completions.Response.Unary.Audio;
          tool_calls?: Chat.Completions.Response.Unary.ToolCall[];
          reasoning?: Reasoning;
        }

        export type Reasoning = ReasoningCompletion | ReasoningCompletion[];

        export type ReasoningCompletion =
          | ReasoningCompletion.QueryCompletion
          | ReasoningCompletion.ChatCompletion;

        export namespace ReasoningCompletion {
          export type QueryCompletion = {
            index: number;
            type: "query";
            error?: ObjectiveAIError;
          } & Query.Completions.Response.Unary.ChatCompletion;

          export type ChatCompletion = {
            index: number;
            type: "chat";
            error?: ObjectiveAIError;
          } & Chat.Completions.Response.Unary.ChatCompletion;
        }
      }

      export type Model =
        | "simple_query"
        | "number_query"
        | "multiple_choice_query"
        | "multiple_choice_options_query"
        | "weighted_average_choice_query";
    }

    export async function list(
      openai: OpenAI,
      listOptions?: Chat.Completions.ListOptions,
      options?: OpenAI.RequestOptions
    ): Promise<{ data: Chat.Completions.ListItem[] }> {
      const response = await openai.get("/query_tool/completions", {
        query: listOptions,
        ...options,
      });
      return response as { data: Chat.Completions.ListItem[] };
    }

    export async function publish(
      openai: OpenAI,
      id: string,
      options?: OpenAI.RequestOptions
    ): Promise<void> {
      await openai.post(`/query_tool/completions/${id}/publish`, options);
    }

    export async function retrieve(
      openai: OpenAI,
      id: string,
      options?: OpenAI.RequestOptions
    ): Promise<{
      request: Request.ChatCompletionCreateParams;
      response: Response.Unary.ChatCompletion;
    }> {
      const response = await openai.get(
        `/query_tool/completions/${id}`,
        options
      );
      return response as {
        request: Request.ChatCompletionCreateParams;
        response: Response.Unary.ChatCompletion;
      };
    }

    export async function create(
      openai: OpenAI,
      body: Request.ChatCompletionCreateParamsStreaming,
      options?: OpenAI.RequestOptions
    ): Promise<
      Stream<Response.Streaming.ChatCompletionChunk | ObjectiveAIError>
    >;
    export async function create(
      openai: OpenAI,
      body: Request.ChatCompletionCreateParamsNonStreaming,
      options?: OpenAI.RequestOptions
    ): Promise<Response.Unary.ChatCompletion>;
    export async function create(
      openai: OpenAI,
      body: Request.ChatCompletionCreateParams,
      options?: OpenAI.RequestOptions
    ): Promise<
      | Stream<Response.Streaming.ChatCompletionChunk | ObjectiveAIError>
      | Response.Unary.ChatCompletion
    > {
      const response = await openai.post("/chat/completions", {
        body,
        ...options,
      });
      return response as unknown as
        | Stream<Response.Streaming.ChatCompletionChunk | ObjectiveAIError>
        | Response.Unary.ChatCompletion;
    }
  }
}

export namespace QueryChat {
  export namespace Completions {
    export namespace Request {
      export interface ChatCompletionCreateParamsBase {
        messages: Chat.Completions.Request.Message[];
        model: string;
        frequency_penalty?: number | null;
        logit_bias?: Record<string, number> | null;
        logprobs?: boolean | null;
        max_completion_tokens?: number | null;
        modalities?: string[] | null;
        parallel_tool_calls?: boolean | null;
        prediction?: Chat.Completions.Request.Prediction | null;
        presence_penalty?: number | null;
        reasoning_effort?: Chat.Completions.Request.ReasoningEffort | null;
        response_format?: Chat.Completions.Request.ResponseFormat | null;
        seed?: number | null;
        service_tier?: Chat.Completions.Request.ServiceTier | null;
        stop?: Chat.Completions.Request.Stop | null;
        stream_options?: Chat.Completions.Request.StreamOptions | null;
        temperature?: number | null;
        top_logprobs?: number | null;
        top_p?: number | null;
        max_tokens?: number | null;
        min_p?: number | null;
        provider?: Chat.Completions.Request.ProviderPreferences | null;
        reasoning?: Chat.Completions.Request.Reasoning | null;
        repetition_penalty?: number | null;
        top_a?: number | null;
        top_k?: number | null;
        usage?: Chat.Completions.Request.Usage | null;
        verbosity?: Chat.Completions.Request.Verbosity | null;
        models?: string[] | null;
        training_table_name?: string | null;
        simple_query: QueryToolParams;
        multiple_choice_query: QueryToolParams;
        multiple_choice_options_query: QueryToolParams;
      }

      export interface ChatCompletionCreateParamsStreaming
        extends ChatCompletionCreateParamsBase {
        stream: true;
      }

      export interface ChatCompletionCreateParamsNonStreaming
        extends ChatCompletionCreateParamsBase {
        stream?: false | null;
      }

      export type ChatCompletionCreateParams =
        | ChatCompletionCreateParamsStreaming
        | ChatCompletionCreateParamsNonStreaming;

      export interface QueryToolParams {
        model: Query.Completions.Request.Model;
        logprobs?: boolean | null;
        n?: number | null;
        prediction?: Chat.Completions.Request.Prediction | null;
        seed?: number | null;
        service_tier?: Chat.Completions.Request.ServiceTier | null;
        tools?: Chat.Completions.Request.Tool[] | null;
        top_logprobs?: number | null;
        embeddings?: string | null;
      }
    }

    export namespace Response {
      export namespace Streaming {
        export interface ChatCompletionChunk {
          id: string;
          choices: Choice[];
          created: number;
          model: string;
          object: "chat.completion.chunk";
          service_tier?: Chat.Completions.Response.ServiceTier;
          system_fingerprint?: string;
          usage?: Chat.Completions.Response.Usage;
        }

        export namespace ChatCompletionChunk {
          export function merged(
            a: ChatCompletionChunk,
            b: ChatCompletionChunk
          ): [ChatCompletionChunk, boolean] {
            const id = a.id;
            const [choices, choicesChanged] = Choice.mergedList(
              a.choices,
              b.choices
            );
            const created = a.created;
            const model = a.model;
            const object = a.object;
            const [service_tier, service_tierChanged] = merge(
              a.service_tier,
              b.service_tier
            );
            const [system_fingerprint, system_fingerprintChanged] = merge(
              a.system_fingerprint,
              b.system_fingerprint
            );
            const [usage, usageChanged] = merge(
              a.usage,
              b.usage,
              Chat.Completions.Response.Usage.merged
            );
            if (
              choicesChanged ||
              service_tierChanged ||
              system_fingerprintChanged ||
              usageChanged
            ) {
              return [
                {
                  id,
                  choices,
                  created,
                  model,
                  object,
                  ...(service_tier !== undefined ? { service_tier } : {}),
                  ...(system_fingerprint !== undefined
                    ? { system_fingerprint }
                    : {}),
                  ...(usage !== undefined ? { usage } : {}),
                },
                true,
              ];
            } else {
              return [a, false];
            }
          }
        }

        export interface Choice {
          delta: Delta;
          finish_reason: Chat.Completions.Response.FinishReason | null;
          index: number;
          logprobs?: Chat.Completions.Response.Logprobs;
        }

        export namespace Choice {
          export function merged(a: Choice, b: Choice): [Choice, boolean] {
            const [delta, deltaChanged] = merge(a.delta, b.delta, Delta.merged);
            const [finish_reason, finish_reasonChanged] = merge(
              a.finish_reason,
              b.finish_reason
            );
            const index = a.index;
            const [logprobs, logprobsChanged] = merge(
              a.logprobs,
              b.logprobs,
              Chat.Completions.Response.Logprobs.merged
            );
            if (deltaChanged || finish_reasonChanged || logprobsChanged) {
              return [
                {
                  delta,
                  finish_reason,
                  index,
                  ...(logprobs !== undefined ? { logprobs } : {}),
                },
                true,
              ];
            } else {
              return [a, false];
            }
          }
          export function mergedList(
            a: Choice[],
            b: Choice[]
          ): [Choice[], boolean] {
            let merged: Choice[] | undefined = undefined;
            for (const choice of b) {
              const existingIndex = a.findIndex(
                ({ index }) => index === choice.index
              );
              if (existingIndex === -1) {
                if (merged === undefined) {
                  merged = [...a, choice];
                } else {
                  merged.push(choice);
                }
              } else {
                const [mergedChoice, choiceChanged] = Choice.merged(
                  a[existingIndex],
                  choice
                );
                if (choiceChanged) {
                  if (merged === undefined) {
                    merged = [...a];
                  }
                  merged[existingIndex] = mergedChoice;
                }
              }
            }
            return merged ? [merged, true] : [a, false];
          }
        }
        export interface Delta {
          content?: string;
          refusal?: string;
          role?: Chat.Completions.Response.Role;
          tool_calls?: Chat.Completions.Response.Streaming.ToolCall[];
          images?: Chat.Completions.Response.Image[];
          reasoning?: Reasoning;
        }

        export namespace Delta {
          export function merged(a: Delta, b: Delta): [Delta, boolean] {
            const [content, contentChanged] = merge(
              a.content,
              b.content,
              mergedString
            );
            const [refusal, refusalChanged] = merge(
              a.refusal,
              b.refusal,
              mergedString
            );
            const [role, roleChanged] = merge(a.role, b.role);
            const [tool_calls, tool_callsChanged] = merge(
              a.tool_calls,
              b.tool_calls,
              Chat.Completions.Response.Streaming.ToolCall.mergedList
            );
            const [images, imagesChanged] = merge(
              a.images,
              b.images,
              Chat.Completions.Response.Image.mergedList
            );
            const [reasoning, reasoningChanged] = merge(
              a.reasoning,
              b.reasoning,
              Reasoning.merged
            );
            if (
              contentChanged ||
              reasoningChanged ||
              refusalChanged ||
              roleChanged ||
              tool_callsChanged
            ) {
              return [
                {
                  ...(content !== undefined ? { content } : {}),
                  ...(refusal !== undefined ? { refusal } : {}),
                  ...(role !== undefined ? { role } : {}),
                  ...(tool_calls !== undefined ? { tool_calls } : {}),
                  ...(images !== undefined ? { images } : {}),
                  ...(reasoning !== undefined ? { reasoning } : {}),
                },
                true,
              ];
            } else {
              return [a, false];
            }
          }
        }

        export type Reasoning = ReasoningCompletion | ReasoningCompletion[];

        export namespace Reasoning {
          export function merged(
            a: Reasoning,
            b: Reasoning
          ): [Reasoning, boolean] {
            let merged: Reasoning | undefined = undefined;
            if (Array.isArray(a)) {
              if (Array.isArray(b)) {
                for (const item of b) {
                  if (merged === undefined) {
                    const existingIndex = a.findIndex(
                      ({ index, type }) =>
                        index === item.index && type === item.type
                    );
                    if (existingIndex === -1) {
                      merged = [...a, item];
                    } else if (item.type === "query_tool") {
                      const [mergedItem, itemChanged] =
                        ReasoningCompletion.QueryToolCompletion.merged(
                          a[
                            existingIndex
                          ] as ReasoningCompletion.QueryToolCompletion,
                          item
                        );
                      if (itemChanged) {
                        merged = [...a];
                        merged[existingIndex] = mergedItem;
                      }
                    } else if (item.type === "chat") {
                      const [mergedItem, itemChanged] =
                        ReasoningCompletion.ChatCompletion.merged(
                          a[
                            existingIndex
                          ] as ReasoningCompletion.ChatCompletion,
                          item
                        );
                      if (itemChanged) {
                        merged = [...a];
                        merged[existingIndex] = mergedItem;
                      }
                    }
                  } else if (Array.isArray(merged) /* always true */) {
                    const existingIndex = merged.findIndex(
                      ({ index, type }) =>
                        index === item.index && type === item.type
                    );
                    if (existingIndex === -1) {
                      merged.push(item);
                    } else if (item.type === "query_tool") {
                      const [mergedItem, itemChanged] =
                        ReasoningCompletion.QueryToolCompletion.merged(
                          merged[
                            existingIndex
                          ] as ReasoningCompletion.QueryToolCompletion,
                          item
                        );
                      if (itemChanged) {
                        merged[existingIndex] = mergedItem;
                      }
                    } else if (item.type === "chat") {
                      const [mergedItem, itemChanged] =
                        ReasoningCompletion.ChatCompletion.merged(
                          merged[
                            existingIndex
                          ] as ReasoningCompletion.ChatCompletion,
                          item
                        );
                      if (itemChanged) {
                        merged[existingIndex] = mergedItem;
                      }
                    }
                  }
                }
              } else {
                const existingIndex = a.findIndex(
                  ({ index, type }) => index === b.index && type === b.type
                );
                if (existingIndex === -1) {
                  merged = [...a, b];
                } else if (b.type === "query_tool") {
                  const [mergedItem, itemChanged] =
                    ReasoningCompletion.QueryToolCompletion.merged(
                      a[
                        existingIndex
                      ] as ReasoningCompletion.QueryToolCompletion,
                      b
                    );
                  if (itemChanged) {
                    merged = [...a];
                    merged[existingIndex] = mergedItem;
                  }
                } else if (b.type === "chat") {
                  const [mergedItem, itemChanged] =
                    ReasoningCompletion.ChatCompletion.merged(
                      a[existingIndex] as ReasoningCompletion.ChatCompletion,
                      b
                    );
                  if (itemChanged) {
                    merged = [...a];
                    merged[existingIndex] = mergedItem;
                  }
                }
              }
            } else {
              if (Array.isArray(b)) {
                merged = [a];
                for (const item of b) {
                  const existingIndex = merged.findIndex(
                    ({ index, type }) =>
                      index === item.index && type === item.type
                  );
                  if (existingIndex === -1) {
                    merged.push(item);
                  } else if (item.type === "query_tool") {
                    const [mergedItem, itemChanged] =
                      ReasoningCompletion.QueryToolCompletion.merged(
                        merged[
                          existingIndex
                        ] as ReasoningCompletion.QueryToolCompletion,
                        item
                      );
                    if (itemChanged) {
                      merged[existingIndex] = mergedItem;
                    }
                  } else if (item.type === "chat") {
                    const [mergedItem, itemChanged] =
                      ReasoningCompletion.ChatCompletion.merged(
                        merged[
                          existingIndex
                        ] as ReasoningCompletion.ChatCompletion,
                        item
                      );
                    if (itemChanged) {
                      merged[existingIndex] = mergedItem;
                    }
                  }
                }
              } else {
                if (a.index === b.index && a.type === b.type) {
                  if (b.type === "query_tool") {
                    const [mergedItem, itemChanged] =
                      ReasoningCompletion.QueryToolCompletion.merged(
                        a as ReasoningCompletion.QueryToolCompletion,
                        b
                      );
                    if (itemChanged) {
                      merged = mergedItem;
                    }
                  } else if (b.type === "chat") {
                    const [mergedItem, itemChanged] =
                      ReasoningCompletion.ChatCompletion.merged(
                        a as ReasoningCompletion.ChatCompletion,
                        b
                      );
                    if (itemChanged) {
                      merged = mergedItem;
                    }
                  }
                } else {
                  merged = [a, b];
                }
              }
            }
            return merged ? [merged, true] : [a, false];
          }
        }

        export type ReasoningCompletion =
          | ReasoningCompletion.QueryToolCompletion
          | ReasoningCompletion.ChatCompletion;

        export namespace ReasoningCompletion {
          export type QueryToolCompletion = {
            index: number;
            type: "query_tool";
            tool_call_id: string;
            error?: ObjectiveAIError;
          } & QueryTool.Completions.Response.Streaming.ChatCompletionChunk;

          export namespace QueryToolCompletion {
            export function merged(
              a: QueryToolCompletion,
              b: QueryToolCompletion
            ): [QueryToolCompletion, boolean] {
              const [merged, changed] =
                QueryTool.Completions.Response.Streaming.ChatCompletionChunk.merged(
                  a,
                  b
                );
              const [error, errorChanged] = merge(a.error, b.error);
              return changed || errorChanged
                ? [
                    {
                      index: a.index,
                      type: a.type,
                      tool_call_id: a.tool_call_id,
                      ...merged,
                      error,
                    },
                    true,
                  ]
                : [a, false];
            }
          }

          export type ChatCompletion = {
            index: number;
            type: "chat";
            error?: ObjectiveAIError;
          } & Chat.Completions.Response.Streaming.ChatCompletionChunk;

          export namespace ChatCompletion {
            export function merged(
              a: ChatCompletion,
              b: ChatCompletion
            ): [ChatCompletion, boolean] {
              const [merged, changed] =
                Chat.Completions.Response.Streaming.ChatCompletionChunk.merged(
                  a,
                  b
                );
              const [error, errorChanged] = merge(a.error, b.error);
              return changed || errorChanged
                ? [{ index: a.index, type: a.type, ...merged, error }, true]
                : [a, false];
            }
          }
        }
      }

      export namespace Unary {
        export interface ChatCompletion {
          id: string;
          choices: Choice[];
          created: number;
          model: string;
          object: "chat.completion";
          service_tier?: Chat.Completions.Response.ServiceTier;
          system_fingerprint?: string;
          usage?: Chat.Completions.Response.Usage;
        }

        export interface Choice {
          message: Message;
          finish_reason: Chat.Completions.Response.FinishReason;
          index: number;
          logprobs: Chat.Completions.Response.Logprobs | null;
        }

        export interface Message {
          content: string | null;
          refusal: string | null;
          role: Chat.Completions.Response.Role;
          annotations?: Chat.Completions.Response.Unary.Annotation[];
          audio?: Chat.Completions.Response.Unary.Audio;
          tool_calls?: Chat.Completions.Response.Unary.ToolCall[];
          images?: Chat.Completions.Response.Image[];
          reasoning?: Reasoning;
        }

        export type Reasoning = ReasoningCompletion | ReasoningCompletion[];

        export type ReasoningCompletion =
          | ReasoningCompletion.QueryToolCompletion
          | ReasoningCompletion.ChatCompletion;

        export namespace ReasoningCompletion {
          export type QueryToolCompletion = {
            index: number;
            type: "query_tool";
            tool_call_id: string;
            error?: ObjectiveAIError;
          } & QueryTool.Completions.Response.Unary.ChatCompletion;

          export type ChatCompletion = {
            index: number;
            type: "chat";
            error?: ObjectiveAIError;
          } & Chat.Completions.Response.Unary.ChatCompletion;
        }
      }
    }

    export async function list(
      openai: OpenAI,
      listOptions?: Chat.Completions.ListOptions,
      options?: OpenAI.RequestOptions
    ): Promise<{ data: Chat.Completions.ListItem[] }> {
      const response = await openai.get("/query_chat/completions", {
        query: listOptions,
        ...options,
      });
      return response as { data: Chat.Completions.ListItem[] };
    }

    export async function publish(
      openai: OpenAI,
      id: string,
      options?: OpenAI.RequestOptions
    ): Promise<void> {
      await openai.post(`/query_chat/completions/${id}/publish`, options);
    }

    export async function retrieve(
      openai: OpenAI,
      id: string,
      options?: OpenAI.RequestOptions
    ): Promise<{
      request: Request.ChatCompletionCreateParams;
      response: Response.Unary.ChatCompletion;
    }> {
      const response = await openai.get(
        `/query_chat/completions/${id}`,
        options
      );
      return response as {
        request: Request.ChatCompletionCreateParams;
        response: Response.Unary.ChatCompletion;
      };
    }

    export async function create(
      openai: OpenAI,
      body: Request.ChatCompletionCreateParamsStreaming,
      options?: OpenAI.RequestOptions
    ): Promise<
      Stream<Response.Streaming.ChatCompletionChunk | ObjectiveAIError>
    >;
    export async function create(
      openai: OpenAI,
      body: Request.ChatCompletionCreateParamsNonStreaming,
      options?: OpenAI.RequestOptions
    ): Promise<Response.Unary.ChatCompletion>;
    export async function create(
      openai: OpenAI,
      body: Request.ChatCompletionCreateParams,
      options?: OpenAI.RequestOptions
    ): Promise<
      | Stream<Response.Streaming.ChatCompletionChunk | ObjectiveAIError>
      | Response.Unary.ChatCompletion
    > {
      const response = await openai.post("/chat/completions", {
        body,
        ...options,
      });
      return response as unknown as
        | Stream<Response.Streaming.ChatCompletionChunk | ObjectiveAIError>
        | Response.Unary.ChatCompletion;
    }
  }
}

export interface QueryModelBase {
  models: QueryModel.QueryLlmBase[];
  weight: QueryModel.Weight;
}

export interface QueryModel {
  name: string;
  training_table_name?: string;
  models: QueryModel.QueryLlm[];
  weight: QueryModel.Weight;
}

export interface QueryModelWithMetadata extends QueryModel {
  user_id: string;
  created: string; // RFC 3339 timestamp
  requests: number;
  chat_completion_tokens: number;
  chat_prompt_tokens: number;
  chat_cost: number;
  embedding_completion_tokens: number;
  embedding_prompt_tokens: number;
  embedding_cost: number;
}

export namespace QueryModel {
  export type Weight = Weight.Static | Weight.TrainingTable;

  export namespace Weight {
    export interface Static {
      type: "static";
    }

    export interface TrainingTable {
      type: "training_table";
      embeddings_model: string;
      top: number;
    }
  }

  export interface QueryLlmBase {
    id: string;
    mode: QueryLlm.Mode;
    select_top_logprobs?: number | null;
    frequency_penalty?: number | null;
    logit_bias?: Record<string, number> | null;
    max_completion_tokens?: number | null;
    presence_penalty?: number | null;
    reasoning_effort?: Chat.Completions.Request.ReasoningEffort | null;
    stop?: Chat.Completions.Request.Stop | null;
    temperature?: number | null;
    top_p?: number | null;
    max_tokens?: number | null;
    min_p?: number | null;
    provider?: Chat.Completions.Request.ProviderPreferences | null;
    reasoning?: Chat.Completions.Request.Reasoning | null;
    repetition_penalty?: number | null;
    top_a?: number | null;
    top_k?: number | null;
    verbosity?: Chat.Completions.Request.Verbosity | null;
    models?: string[] | null;
    weight: QueryLlm.Weight;
  }

  export interface QueryLlmWithoutIndices extends QueryLlmBase {
    name: string;
    training_table_name?: string;
  }

  export interface QueryLlm extends QueryLlmWithoutIndices {
    index: number;
    training_table_index?: number;
  }

  export interface QueryLlmWithoutIndicesWithMetadata
    extends QueryLlmWithoutIndices {
    user_id: string;
    created: string; // RFC 3339 timestamp
    requests: number;
    chat_completion_tokens: number;
    chat_prompt_tokens: number;
    chat_cost: number;
    embedding_completion_tokens: number;
    embedding_prompt_tokens: number;
    embedding_cost: number;
  }

  export namespace QueryLlm {
    export type Mode =
      | "generate"
      | "select_thinking"
      | "select_non_thinking"
      | "select_thinking_logprobs"
      | "select_non_thinking_logprobs";

    export type Weight = Weight.Static | Weight.TrainingTable;

    export namespace Weight {
      export interface Static {
        type: "static";
        weight: number;
      }

      export interface TrainingTable {
        type: "training_table";
        base_weight: number;
        min_weight: number;
        max_weight: number;
      }
    }

    export async function retrieve(
      openai: OpenAI,
      model: string,
      retrieveOptions?: Models.RetrieveOptions,
      options?: OpenAI.RequestOptions
    ): Promise<QueryLlmWithoutIndices | QueryLlmWithoutIndicesWithMetadata> {
      const response = await openai.get(`/query_llms/${model}`, {
        query: retrieveOptions,
        ...options,
      });
      return response as
        | QueryLlmWithoutIndices
        | QueryLlmWithoutIndicesWithMetadata;
    }

    export async function retrieveValidate(
      openai: OpenAI,
      model: QueryLlmBase,
      retrieveOptions?: Models.RetrieveOptions,
      options?: OpenAI.RequestOptions
    ): Promise<QueryLlmWithoutIndices | QueryLlmWithoutIndicesWithMetadata> {
      const response = await openai.post("/query_llms", {
        query: retrieveOptions,
        body: model,
        ...options,
      });
      return response as
        | QueryLlmWithoutIndices
        | QueryLlmWithoutIndicesWithMetadata;
    }
  }

  export async function list(
    openai: OpenAI,
    listOptions?: Models.ListOptions,
    options?: OpenAI.RequestOptions
  ): Promise<{ data: string[] }> {
    const response = await openai.get("/query_models", {
      query: listOptions,
      ...options,
    });
    return response as { data: string[] };
  }

  export async function count(
    openai: OpenAI,
    options?: OpenAI.RequestOptions
  ): Promise<{ count: number }> {
    const response = await openai.get("/query_models/count", options);
    return response as { count: number };
  }

  export async function retrieve(
    openai: OpenAI,
    model: string,
    retrieveOptions?: Models.RetrieveOptions,
    options?: OpenAI.RequestOptions
  ): Promise<QueryModel | QueryModelWithMetadata> {
    const response = await openai.get(`/query_models/${model}`, {
      query: retrieveOptions,
      ...options,
    });
    return response as QueryModel | QueryModelWithMetadata;
  }

  export async function retrieveValidate(
    openai: OpenAI,
    model: QueryModelBase,
    retrieveOptions?: Models.RetrieveOptions,
    options?: OpenAI.RequestOptions
  ): Promise<QueryModel | QueryModelWithMetadata> {
    const response = await openai.post("/query_models", {
      query: retrieveOptions,
      body: model,
      ...options,
    });
    return response as QueryModel | QueryModelWithMetadata;
  }
}

export namespace Models {
  export interface Model {
    id: string;
    name: string;
    created: number;
    description: string;
    architecture: Architecture;
    top_provider: TopProvider;
    pricing: Pricing;
    context_length?: number;
    hugging_face_id?: string;
    per_request_limits?: Record<string, unknown>;
    supported_parameters?: string[];
  }

  export interface ModelWithProviders {
    id: string;
    name: string;
    created: number;
    description: string;
    architecture: Architecture;
    endpoints: Provider[];
  }

  export interface Architecture {
    input_modalities: string[];
    output_modalities: string[];
    tokenizer: string;
    instruct_type?: string;
  }

  export interface TopProvider {
    is_moderated: boolean;
    context_length?: number;
    max_completion_tokens?: number;
  }

  export interface Pricing {
    prompt: number;
    completion: number;
    image?: number;
    request?: number;
    input_cache_read?: number;
    input_cache_write?: number;
    web_search?: number;
    internal_reasoning?: number;
    discount?: number;
  }

  export interface Provider {
    name: string;
    tag: string;
    context_length?: number;
    pricing: Pricing;
    provider_name: string;
    supported_parameters?: string[];
    quantization?: string;
    max_completion_tokens?: number;
    max_prompt_tokens?: number;
    status?: unknown;
  }

  export interface ListOptions {
    count?: number;
    offset?: number;
    me?: boolean;
    sort?:
      | "created"
      | "tokens"
      | "completion_tokens"
      | "prompt_tokens"
      | "cost"
      | "requests";
    from?: string; // RFC 3339 timestamp
    to?: string; // RFC 3339 timestamp
  }

  export interface RetrieveOptions {
    metadata?: boolean | null;
    me?: boolean | null;
    from?: string | null; // RFC 3339 timestamp
    to?: string | null; // RFC 3339 timestamp
  }

  export async function list(
    openai: OpenAI,
    listOptions?: ListOptions,
    options?: OpenAI.RequestOptions
  ): Promise<{ data: Model[] }> {
    const response = await openai.models.list({
      query: listOptions,
      ...options,
    });
    return response as unknown as { data: Model[] };
  }

  export async function retrieve(
    openai: OpenAI,
    model: string,
    retrieveOptions?: Models.RetrieveOptions,
    options?: OpenAI.RequestOptions
  ): Promise<{ data: ModelWithProviders }> {
    const response = await openai.models.retrieve(model, {
      query: retrieveOptions,
      ...options,
    });
    return response as unknown as { data: ModelWithProviders };
  }
}

export namespace Auth {
  export interface ApiKey {
    api_key: string;
    created: string; // RFC 3339 timestamp
    expires: string | null; // RFC 3339 timestamp
    disabled: string | null; // RFC 3339 timestamp
    name: string;
    description: string | null;
  }

  export interface ApiKeyWithCost extends ApiKey {
    cost: number;
  }

  export namespace ApiKey {
    export async function list(
      openai: OpenAI,
      options?: OpenAI.RequestOptions
    ): Promise<{ data: ApiKeyWithCost[] }> {
      const response = await openai.get("/auth/keys", options);
      return response as { data: ApiKeyWithCost[] };
    }

    export async function create(
      openai: OpenAI,
      name: string,
      expires?: Date | null,
      description?: string | null,
      options?: OpenAI.RequestOptions
    ): Promise<ApiKey> {
      const response = await openai.post("/auth/keys", {
        body: {
          name,
          expires,
          description,
        },
        ...options,
      });
      return response as ApiKey;
    }

    export async function remove(
      openai: OpenAI,
      key: string,
      options?: OpenAI.RequestOptions
    ): Promise<ApiKey> {
      const response = await openai.delete("/auth/keys", {
        body: {
          api_key: key,
        },
        ...options,
      });
      return response as ApiKey;
    }
  }

  export interface OpenRouterApiKey {
    api_key: string;
  }

  export namespace OpenRouterApiKey {
    export async function retrieve(
      openai: OpenAI,
      options?: OpenAI.RequestOptions
    ): Promise<OpenRouterApiKey> {
      const response = await openai.get("/auth/keys/openrouter", options);
      return response as OpenRouterApiKey;
    }

    export async function create(
      openai: OpenAI,
      apiKey: string,
      options?: OpenAI.RequestOptions
    ): Promise<OpenRouterApiKey> {
      const response = await openai.post("/auth/keys/openrouter", {
        body: {
          api_key: apiKey,
        },
        ...options,
      });
      return response as OpenRouterApiKey;
    }

    export async function remove(
      openai: OpenAI,
      options?: OpenAI.RequestOptions
    ): Promise<OpenRouterApiKey> {
      const response = await openai.delete("/auth/keys/openrouter", options);
      return response as OpenRouterApiKey;
    }
  }

  export interface Credits {
    credits: number;
    total_credits_purchased: number;
    total_credits_used: number;
  }

  export namespace Credits {
    export async function retrieve(
      openai: OpenAI,
      options?: OpenAI.RequestOptions
    ): Promise<Credits> {
      const response = await openai.get("/auth/credits", options);
      return response as Credits;
    }
  }
}

export interface Metadata {
  query_requests: number;
  query_completion_tokens: number;
  query_prompt_tokens: number;
  query_cost: number;
  chat_requests: number;
  chat_completion_tokens: number;
  chat_prompt_tokens: number;
  chat_cost: number;
  embedding_completion_tokens: number;
  embedding_prompt_tokens: number;
  embedding_cost: number;
}

export namespace Metadata {
  export async function get(
    openai: OpenAI,
    options?: OpenAI.RequestOptions
  ): Promise<Metadata> {
    const response = await openai.get("/metadata", options);
    return response as Metadata;
  }
}

export type JsonValue =
  | null
  | boolean
  | number
  | string
  | JsonValue[]
  | { [key: string]: JsonValue };

export interface ObjectiveAIError {
  code: number;
  message: JsonValue;
}

function merge<T extends {}>(
  a: T,
  b: T,
  combine?: (a: T, b: T) => [T, boolean]
): [T, boolean];
function merge<T extends {}>(
  a: T | null,
  b: T | null,
  combine?: (a: T, b: T) => [T, boolean]
): [T | null, boolean];
function merge<T extends {}>(
  a: T | undefined,
  b: T | undefined,
  combine?: (a: T, b: T) => [T, boolean]
): [T | undefined, boolean];
function merge<T extends {}>(
  a: T | null | undefined,
  b: T | null | undefined,
  combine?: (a: T, b: T) => [T, boolean]
): [T | null | undefined, boolean];
function merge<T extends {}>(
  a: T | null | undefined,
  b: T | null | undefined,
  combine?: (a: T, b: T) => [T, boolean]
): [T | null | undefined, boolean] {
  if (a !== null && a !== undefined && b !== null && b !== undefined) {
    return combine ? combine(a, b) : [a, false];
  } else if (a !== null && a !== undefined) {
    return [a, false];
  } else if (b !== null && b !== undefined) {
    return [b, true];
  } else if (a === null || b === null) {
    return [null, false];
  } else {
    return [undefined, false];
  }
}

function mergedString(a: string, b: string): [string, boolean] {
  return b === "" ? [a, false] : [a + b, true];
}
function mergedNumber(a: number, b: number): [number, boolean] {
  return b === 0 ? [a, false] : [a + b, true];
}
