import OpenAI from "openai";
import { Stream } from "openai/streaming";

/**
 * JSON value type.
 */
export type JsonValue =
  | string
  | number
  | boolean
  | null
  | JsonValue[]
  | { [key: string]: JsonValue };

/**
 * The native JSON content of an assistant query message.
 * This is the message content that is returned by an ObjectiveAI metamodel.
 */
export interface QueryAssistantMessageContent {
  /**
   * The ID of the choice. A unique hash of the JSON response.
   */
  choice_id: string;

  /**
   * The ID of the LLM request that generated this message.
   * [Learn more](https://platform.openai.com/docs/api-reference/chat/object#chat/object-id).
   */
  request_id: string;

  /**
   * The LLM used to generate the message.
   * [Learn more](https://platform.openai.com/docs/api-reference/chat/create#chat-create-model).
   */
  model: string;

  /**
   * The sampling temperature used to generate the message.
   * [Learn more](https://platform.openai.com/docs/api-reference/chat/create#chat-create-temperature).
   */
  temperature: number;

  /**
   * The top_p probability mass used to generate the message.
   * [Learn more](https://platform.openai.com/docs/api-reference/chat/create#chat-create-top_p).
   */
  top_p: number;

  /**
   * The provider hosting the LLM.
   */
  provider: string;

  /**
   * The generated reasoning for the response.
   */
  reasoning: string;

  /**
   * The generated JSON response.
   * If undefined, then another choice with the same choice_id contains the response.
   */
  response?: JsonValue;

  /**
   * The weight of the response.
   */
  weight: number;

  /**
   * The usage of the response.
   * [Learn more](https://platform.openai.com/docs/api-reference/chat/object#chat/object-usage).
   */
  usage: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
}

export namespace QueryAssistantMessageContent {
  /**
   * Converts the JSON content of a query message into a native QueryMessageContent object.
   * @param content - The JSON to validate.
   */
  export function fromJson(content: JsonValue): QueryAssistantMessageContent {
    const throwError = (reason: string): never => {
      throw new Error(
        `content was not a valid ObjectiveAI query message: ${reason}`
      );
    };
    if (
      typeof content !== "object" ||
      content === null ||
      Array.isArray(content)
    ) {
      return throwError("content was not a JSON object");
    }
    const {
      choice_id,
      request_id,
      model,
      temperature,
      top_p,
      provider,
      reasoning,
      response,
      weight,
      usage,
    } = content;
    if (typeof choice_id !== "string") {
      return throwError("choice_id was not a string");
    }
    if (typeof request_id !== "string") {
      return throwError("request_id was not a string");
    }
    if (typeof model !== "string") {
      return throwError("model was not a string");
    }
    if (typeof temperature !== "number") {
      return throwError("temperature was not a number");
    }
    if (typeof top_p !== "number") {
      return throwError("top_p was not a number");
    }
    if (typeof provider !== "string") {
      return throwError("provider was not a string");
    }
    if (typeof reasoning !== "string") {
      return throwError("reasoning was not a string");
    }
    // if (response !== undefined && typeof response !== "object") {
    //   return throwError("response was not an object");
    // }
    if (typeof weight !== "number") {
      return throwError("weight was not a number");
    }
    if (typeof usage !== "object" || usage === null || Array.isArray(usage)) {
      return throwError("usage was not a valid object");
    }
    const { prompt_tokens, completion_tokens, total_tokens } = usage;
    if (typeof prompt_tokens !== "number") {
      return throwError("prompt_tokens was not a number");
    }
    if (typeof completion_tokens !== "number") {
      return throwError("completion_tokens was not a number");
    }
    if (typeof total_tokens !== "number") {
      return throwError("total_tokens was not a number");
    }
    return content as QueryAssistantMessageContent;
  }

  /**
   * Converts the JSON content of a query message into a native QueryMessageContent object.
   * @param content - The JSON string to parse.
   */
  export function fromString(content: string): QueryAssistantMessageContent {
    return fromJson(JSON.parse(content));
  }
}

/**
 * Represents a streamed chunk of a chat completion response returned by the model,
 * based on the provided input.
 * [Learn more](https://platform.openai.com/docs/guides/streaming-responses).
 */
export interface QueryChatCompletionChunk extends OpenAI.ChatCompletionChunk {
  /**
   * A list of Query chat completion choices.
   */
  choices: Array<QueryChatCompletionChunk.Choice>;
}

export namespace QueryChatCompletionChunk {
  /**
   * Merges two QueryChatCompletionChunk objects.
   * @param self - The first QueryChatCompletionChunk object.
   * @param chunk - The next QueryChatCompletionChunk object to merge with the first.
   * @returns A new merged QueryChatCompletionChunk object.
   */
  export function merged(
    self: QueryChatCompletionChunk,
    { choices, usage }: QueryChatCompletionChunk
  ): QueryChatCompletionChunk {
    for (const choice of choices) {
      if (!self.choices.some((c) => c.index === choice.index)) {
        self.choices.push(choice);
      }
    }
    if (self.usage === undefined || self.usage === null) {
      self.usage = usage;
    }
    return { ...self };
  }

  /**
   * Converts an OpenAI chat completion chunk to a Query chat completion chunk.
   * @param chunk - The OpenAI chat completion chunk to convert.
   * @returns The converted Query chat completion chunk.
   */
  export function fromOpenAIChatCompletionChunk(
    chunk: OpenAI.ChatCompletionChunk
  ): QueryChatCompletionChunk {
    return {
      ...chunk,
      choices: chunk.choices.map(Choice.fromOpenAIChoice),
    };
  }

  export interface Choice extends OpenAI.ChatCompletionChunk.Choice {
    /**
     * A Query completion delta generated by streamed model responses.
     */
    delta: Choice.Delta;
  }

  export namespace Choice {
    /**
     * Converts an OpenAI chat completion chunk choice to a Query chat completion chunk choice.
     * @param choice - The OpenAI chat completion chunk choice to convert.
     * @returns The converted Query chat completion chunk choice.
     */
    export function fromOpenAIChoice(
      choice: OpenAI.ChatCompletionChunk.Choice
    ): Choice {
      return {
        ...choice,
        delta: Delta.fromOpenAIDelta(choice.delta),
      };
    }

    /**
     * A Query completion delta generated by streamed model responses.
     */
    export type Delta =
      | (OpenAI.ChatCompletionChunk.Choice.Delta & {
          /**
           * The contents of the chunk message.
           */
          content: string;
          /**
           * The native JSON contents of the Query completion delta.
           */
          query_content: QueryAssistantMessageContent;
        })
      | (OpenAI.ChatCompletionChunk.Choice.Delta & {
          /**
           * The contents of the chunk message.
           */
          content: null;
          /**
           * The native JSON contents of the Query completion delta.
           */
          query_content: null;
        })
      | (OpenAI.ChatCompletionChunk.Choice.Delta & {
          /**
           * The contents of the chunk message.
           */
          content?: undefined;
          /**
           * The native JSON contents of the Query completion delta.
           */
          query_content?: undefined;
        });

    export namespace Delta {
      /**
       * Converts an OpenAI chat completion chunk choice delta to a Query chat completion chunk choice delta.
       * @param delta - The OpenAI chat completion chunk choice delta to convert.
       * @returns The converted Query chat completion chunk choice delta.
       */
      export function fromOpenAIDelta(
        delta: OpenAI.ChatCompletionChunk.Choice.Delta
      ): Delta {
        if (delta.content === undefined) {
          if ("content" in delta) {
            // content is present but undefined
            // query_content will be present but undefined
            return {
              ...delta,
              content: undefined,
              query_content: undefined,
            };
          } else {
            // content is not present
            // query_content will be not present
            return { ...delta } as Delta;
          }
        } else if (delta.content === null || delta.content === "") {
          // content is null
          // query_content will be null
          return {
            ...delta,
            content: null,
            query_content: null,
          };
        } else {
          // content is a string
          // query_content will be a QueryAssistantMessageContent
          return {
            ...delta,
            content: delta.content,
            query_content: QueryAssistantMessageContent.fromString(
              delta.content
            ),
          };
        }
      }
    }
  }
}

/**
 * Represents a chat completion response returned by model, based on the provided
 * input.
 */
export interface QueryChatCompletion extends OpenAI.ChatCompletion {
  /**
   * A list of chat completion choices.
   */
  choices: Array<QueryChatCompletion.Choice>;
}

export namespace QueryChatCompletion {
  /**
   * Converts an OpenAI chat completion to a Query chat completion.
   * @param choice - The OpenAI chat completion to convert.
   * @returns The converted Query chat completion.
   */
  export function fromOpenAIChatCompletion(
    chatCompletion: OpenAI.ChatCompletion
  ): QueryChatCompletion {
    return {
      ...chatCompletion,
      choices: chatCompletion.choices.map(Choice.fromOpenAIChoice),
    };
  }

  export interface Choice extends OpenAI.ChatCompletion.Choice {
    /**
     * A query completion message generated by the model.
     */
    message: Choice.Message;
  }

  export namespace Choice {
    /**
     * Converts an OpenAI chat completion choice to a Query chat completion choice.
     * @param choice - The OpenAI chat completion choice to convert.
     * @returns The converted Query chat completion choice.
     */
    export function fromOpenAIChoice(
      choice: OpenAI.ChatCompletion.Choice
    ): Choice {
      return {
        ...choice,
        message: Message.fromOpenAIMessage(choice.message),
      };
    }

    /**
     * A query completion message generated by the model.
     */
    export type Message =
      | (OpenAI.ChatCompletionMessage & {
          /**
           * The contents of the message.
           */
          content: string;
          /**
           * The native JSON contents of the query completion message.
           */
          query_content: QueryAssistantMessageContent;
        })
      | (OpenAI.ChatCompletionMessage & {
          /**
           * The contents of the message.
           */
          content: null;
          /**
           * The native JSON contents of the query completion message.
           */
          query_content: null;
        });

    export namespace Message {
      /**
       * Converts an OpenAI chat completion message to a Query chat completion message.
       * @param message - The OpenAI chat completion message to convert.
       * @returns The converted Query chat completion message.
       */
      export function fromOpenAIMessage(
        message: OpenAI.ChatCompletionMessage
      ): Message {
        if (message.content === null || message.content === "") {
          // content is null
          // query_content will be null
          return { ...message, content: null, query_content: null };
        } else {
          // content is a string
          // query_content will be a QueryAssistantMessageContent
          return {
            ...message,
            content: message.content,
            query_content: QueryAssistantMessageContent.fromString(
              message.content
            ),
          };
        }
      }
    }
  }
}

/**
 * Stream of QueryChatCompletionChunk objects.
 * Can be easily constructed from an OpenAI chat completion chunk stream.
 */
export type QueryStream = Stream<QueryChatCompletionChunk>;

export namespace QueryStream {
  /**
   * Converts an OpenAI chat completion chunk stream to a Query chat completion chunk stream.
   * @param chunk - The OpenAI chat completion chunk stream to convert.
   * @returns The converted Query chat completion chunk stream.
   */
  export function fromOpenAIStream(
    stream: Stream<OpenAI.ChatCompletionChunk>
  ): QueryStream {
    return new Stream(async function* () {
      for await (const chunk of stream) {
        yield QueryChatCompletionChunk.fromOpenAIChatCompletionChunk(chunk);
      }
    }, stream.controller);
  }

  /**
   * Converts an OpenAI chat completion chunk stream to a merged Query chat completion chunk stream.
   * Yields a continuously merged QueryChatCompletionChunk object, updating as data comes in.
   * @param chunk - The OpenAI chat completion chunk stream to convert.
   * @returns The converted merged Query chat completion chunk stream.
   */
  export function merged(
    stream: Stream<QueryChatCompletionChunk>
  ): QueryStream {
    return new Stream(async function* () {
      let merged: QueryChatCompletionChunk | null = null;
      for await (const chunk of stream) {
        if (merged === null) {
          merged = chunk;
        } else {
          merged = QueryChatCompletionChunk.merged(merged, chunk);
        }
        yield merged;
      }
    }, stream.controller);
  }
}

/**
 * The native JSON content of a query tool message.
 * This is the message content that should be sent back to a model, if it has invoked query as a tool call.
 */
export interface QueryToolMessageContent {
  /**
   * The choices generated by the query.
   * Each choice has a unique JSON response.
   */
  choices: QueryToolMessageContent.Choice[];

  /**
   * The ID of the choice with the highest confidence score.
   */
  winner_id: string;

  /**
   * The confidence score of the winning choice.
   */
  winner_confidence: number;
}

export namespace QueryToolMessageContent {
  /**
   * Converts an iterable of QueryAssistantMessageContent into a QueryToolMessageContent object.
   * @param contents - The iterable of QueryAssistantMessageContent to convert.
   * @returns The converted QueryToolMessageContent object.
   */
  export function fromQueryAssistantMessageContents(
    contents: Iterable<QueryAssistantMessageContent>
  ): QueryToolMessageContent {
    const choices: Choice[] = [];
    let total_weight = 0;

    // push all choices, set confidence as weight for now, we'll normalize later
    for (const content of contents) {
      const { choice_id, reasoning, response, weight } = content;
      total_weight += weight;
      const choice = choices.find((c) => c.id === choice_id);
      if (choice) {
        // we found a choice with the same ID, so we can merge the reasoning
        choice.reasoning.push(reasoning);
        choice.response_confidence += weight;
        if (
          choice.response === null &&
          response !== undefined &&
          response !== null
        ) {
          choice.response = response; // this choice has the response
        }
      } else {
        // we didn't find a choice with the same ID, so we need to create a new one
        choices.push({
          id: choice_id,
          reasoning: [reasoning],
          response: response ?? null, // another choice with the same ID has the response
          response_confidence: weight,
        });
      }
    }

    // normalize confidence and pick the winner
    let winner_id = "";
    let winner_confidence = 0;
    for (const choice of choices) {
      choice.response_confidence /= total_weight;
      if (choice.response_confidence > winner_confidence) {
        winner_confidence = choice.response_confidence;
        winner_id = choice.id;
      }
    }

    return {
      choices,
      winner_id,
      winner_confidence,
    };
  }

  /**
   * Converts an iterable of QueryChatCompletionChunk into a QueryToolMessageContent object.
   * @param chunks - The iterable of QueryChatCompletionChunk to convert.
   * @returns The converted QueryToolMessageContent object.
   */
  export function fromQueryChatCompletionChunks(
    chunks: Iterable<QueryChatCompletionChunk>
  ): QueryToolMessageContent {
    return fromQueryAssistantMessageContents(
      (function* () {
        for (const { choices } of chunks) {
          for (const {
            delta: { query_content },
          } of choices) {
            if (query_content !== undefined && query_content !== null) {
              yield query_content;
            }
          }
        }
      })()
    );
  }

  /**
   * Converts a QueryChatCompletionChunk into a QueryToolMessageContent object.
   * @param chunk - The QueryChatCompletionChunk to convert.
   * @returns The converted QueryToolMessageContent object.
   */
  export function fromQueryChatCompletionChunk(
    chunk: QueryChatCompletionChunk
  ): QueryToolMessageContent {
    return fromQueryAssistantMessageContents(
      (function* () {
        for (const {
          delta: { query_content },
        } of chunk.choices) {
          if (query_content !== undefined && query_content !== null) {
            yield query_content;
          }
        }
      })()
    );
  }

  /**
   * Converts a QueryChatCompletion into a QueryToolMessageContent object.
   * @param chunk - The QueryChatCompletion to convert.
   * @returns The converted QueryToolMessageContent object.
   */
  export function fromQueryChatCompletion(
    chunk: QueryChatCompletion
  ): QueryToolMessageContent {
    return fromQueryAssistantMessageContents(
      (function* () {
        for (const {
          message: { query_content },
        } of chunk.choices) {
          if (query_content !== undefined && query_content !== null) {
            yield query_content;
          }
        }
      })()
    );
  }

  export interface Choice {
    /**
     * The ID of the choice. A unique hash of the JSON response.
     */
    id: string;

    /**
     * The generated reasonings for the response.
     */
    reasoning: string[];

    /**
     * The generated JSON response.
     */
    response: JsonValue;

    /**
     * The confidence score of the response. All choices add up to 1.
     */
    response_confidence: number;
  }
}
