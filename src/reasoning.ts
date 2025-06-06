import OpenAI from "openai";
import { JsonValue } from "./query";
import { Stream } from "openai/streaming";
import {
  QueryToolChatCompletionChunk,
  QueryToolChatCompletionChunkOk,
} from "./query_tool";

export interface ToolCallMessageContent {
  type: "tool_call_message";
  message: OpenAI.ChatCompletionAssistantMessageParam;
}

export namespace ToolCallMessageContent {
  /**
   * Converts the JSON reasoning of a reasoning message into a native ToolCallMessageContent object.
   * @param reasoning - The JSON to validate.
   */
  export function fromJson(
    reasoning: { type: "tool_call_message" } & { [key: string]: JsonValue }
  ): ToolCallMessageContent {
    return reasoning as unknown as ToolCallMessageContent;
  }
}

export interface ToolCall extends OpenAI.ChatCompletionMessageToolCall {
  /**
   * The function that the model called.
   */
  function: ToolCall.Function;
}

export namespace ToolCall {
  /**
   * Converts an OpenAI chat completion message tool call to a native ToolCall object.
   * @param toolCall - The OpenAI chat completion message tool call to convert.
   * @returns The converted ToolCall object.
   */
  export function fromOpenAIToolCall(
    toolCall: OpenAI.ChatCompletionMessageToolCall
  ): ToolCall {
    return {
      ...toolCall,
      function: Function.fromOpenAIFunction(toolCall.function),
    };
  }

  /**
   * If this is returned, then the assistant's arguments were invalid.
   */
  export interface QueriesFunction
    extends OpenAI.ChatCompletionMessageToolCall.Function {
    /**
     * The name of the function to call.
     */
    name: "queries";

    /**
     * The native JSON arguments of the function call.
     */
    parsed_arguments: JsonValue;
  }

  export interface ThinkFunction
    extends OpenAI.ChatCompletionMessageToolCall.Function {
    /**
     * The name of the function to call.
     */
    name: "think";

    /**
     * The native JSON arguments of the function call.
     */
    parsed_arguments: {
      think: string;
      cited_claims?: {
        think: string;
        claim: string;
        citations: string[];
        think_next: string;
      }[];
    };
  }

  export interface ObjectiveAINumberQueryFunction
    extends OpenAI.ChatCompletionMessageToolCall.Function {
    /**
     * The name of the function to call.
     */
    name: "objective_ai_number_query";

    /**
     * The native JSON arguments of the function call.
     */
    parsed_arguments: {
      think: string;
      query: string;
      model: string;
      think_next: string;
    };
  }

  export interface ObjectiveAIExpertQueryFunction
    extends OpenAI.ChatCompletionMessageToolCall.Function {
    /**
     * The name of the function to call.
     */
    name: "objective_ai_expert_query";

    /**
     * The native JSON arguments of the function call.
     */
    parsed_arguments: {
      think: string;
      query: string;
      model: string;
      think_next: string;
    };
  }

  export interface ObjectiveAIUnorderedOptionsQueryFunction
    extends OpenAI.ChatCompletionMessageToolCall.Function {
    /**
     * The name of the function to call.
     */
    name: "objective_ai_unordered_options_query";

    /**
     * The native JSON arguments of the function call.
     */
    parsed_arguments: {
      think: string;
      query: string;
      format: string;
      model: string;
      think_next: string;
    };
  }

  export type Function =
    | QueriesFunction
    | ThinkFunction
    | ObjectiveAINumberQueryFunction
    | ObjectiveAIExpertQueryFunction
    | ObjectiveAIUnorderedOptionsQueryFunction;

  export namespace Function {
    /**
     * Converts an OpenAI chat completion message tool call function to a native ToolCall.Function object.
     * @param function_ - The OpenAI chat completion message tool call function to convert.
     * @returns The converted ToolCall.Function object.
     */
    export function fromOpenAIFunction(
      function_: OpenAI.ChatCompletionMessageToolCall.Function
    ): ToolCall.Function {
      if (function_.name === "queries") {
        return {
          ...function_,
          parsed_arguments: JSON.parse(function_.arguments),
        } as QueriesFunction;
      } else if (function_.name === "think") {
        return {
          ...function_,
          parsed_arguments: JSON.parse(function_.arguments),
        } as ThinkFunction;
      } else if (function_.name === "objective_ai_number_query") {
        return {
          ...function_,
          parsed_arguments: JSON.parse(function_.arguments),
        } as ObjectiveAINumberQueryFunction;
      } else if (function_.name === "objective_ai_expert_query") {
        return {
          ...function_,
          parsed_arguments: JSON.parse(function_.arguments),
        } as ObjectiveAIExpertQueryFunction;
      } else if (function_.name === "objective_ai_unordered_options_query") {
        return {
          ...function_,
          parsed_arguments: JSON.parse(function_.arguments),
        } as ObjectiveAIUnorderedOptionsQueryFunction;
      } else {
        throw new Error(`Unknown tool call function name: ${function_.name}`);
      }
    }
  }
}

export interface ToolResponseChunkContent {
  type: "tool_response_chunk";
  tool_call_id: string;
  chunk: QueryToolChatCompletionChunkOk;
}

export namespace ToolResponseChunkContent {
  /**
   * Converts the JSON reasoning of a reasoning message into a native ToolResponseChunkContent object.
   * @param reasoning - The JSON to validate.
   */
  export function fromJson(
    reasoning: { type: "tool_response_chunk"; tool_call_id: string } & {
      [key: string]: JsonValue;
    }
  ): ToolResponseChunkContent {
    if (
      typeof reasoning.chunk === "object" &&
      reasoning.chunk !== null &&
      !Array.isArray(reasoning.chunk) &&
      "choices" in reasoning.chunk
    ) {
      return {
        type: "tool_response_chunk",
        tool_call_id: reasoning.tool_call_id,
        chunk: QueryToolChatCompletionChunk.fromOpenAIChatCompletionChunk(
          reasoning.chunk as unknown as OpenAI.ChatCompletionChunk
        ) as QueryToolChatCompletionChunkOk,
      };
    } else {
      return reasoning as unknown as ToolResponseChunkContent;
    }
  }
}

export interface ToolResponseMessageContent {
  type: "tool_response_message";
  message: OpenAI.ChatCompletionToolMessageParam;
}

export interface ErrorToolMessageContent {
  code: number;
  message: string;
  metadata?: JsonValue;
}

export namespace ErrorToolMessageContent {
  export function tryFromJson(
    json: JsonValue
  ): ErrorToolMessageContent | undefined {
    if (
      typeof json === "object" &&
      json !== null &&
      "code" in json &&
      "message" in json &&
      typeof json.code === "number" &&
      typeof json.message === "string"
    ) {
      return {
        code: json.code,
        message: json.message,
        metadata: json.metadata,
      };
    }
    return undefined;
  }

  export function tryFromContent(
    content: string | Array<OpenAI.ChatCompletionContentPartText>
  ): ErrorToolMessageContent | undefined {
    try {
      return ErrorToolMessageContent.tryFromJson(
        JSON.parse(
          typeof content === "string"
            ? content
            : content.map((c) => c.text).join("")
        )
      );
    } catch (e) {
      return undefined;
    }
  }
}

export namespace ToolResponseMessageContent {
  /**
   * Converts the JSON reasoning of a reasoning message into a native ToolResponseMessageContent object.
   * @param reasoning - The JSON to validate.
   */
  export function fromJson(
    reasoning: { type: "tool_response_message" } & { [key: string]: JsonValue }
  ): ToolResponseMessageContent {
    return reasoning as unknown as ToolResponseMessageContent;
  }
}

export type ReasoningContent =
  | ToolCallMessageContent
  | ToolResponseChunkContent
  | ToolResponseMessageContent;

export namespace ReasoningContent {
  /**
   * Converts the JSON reasoning of a reasoning message into a native ReasoningMessageContent object.
   * @param reasoning - The JSON to validate.
   */
  export function fromJson(reasoning: JsonValue): ReasoningContent {
    const throwError = (reason: string): never => {
      throw new Error(
        `reasoning was not a valid ObjectiveAI reasoning message line: ${reason}`
      );
    };
    if (
      typeof reasoning !== "object" ||
      reasoning === null ||
      Array.isArray(reasoning)
    ) {
      return throwError("not a JSON object");
    } else if (reasoning.type === "tool_call_message") {
      return ToolCallMessageContent.fromJson(
        reasoning as { type: "tool_call_message" } & {
          [key: string]: JsonValue;
        }
      );
    } else if (
      reasoning.type === "tool_response_chunk" &&
      typeof reasoning.tool_call_id === "string"
    ) {
      return ToolResponseChunkContent.fromJson(
        reasoning as { type: "tool_response_chunk"; tool_call_id: string } & {
          [key: string]: JsonValue;
        }
      );
    } else if (reasoning.type === "tool_response_message") {
      return ToolResponseMessageContent.fromJson(
        reasoning as { type: "tool_response_message" } & {
          [key: string]: JsonValue;
        }
      );
    } else {
      return throwError(`invalid type: ${reasoning.type}`);
    }
  }

  /**
   * Converts the JSON reasoning of a reasoning message into a native ReasoningMessageContent object.
   * @param reasoning - The JSON string to parse.
   */
  export function fromString(reasoning: string): ReasoningContent {
    return fromJson(JSON.parse(reasoning));
  }
}

export type ReasoningContents = ReasoningContent[];

export namespace ReasoningContents {
  /**
   * Merges two ReasoningContents objects.
   * @param self - The first ReasoningContents object.
   * @param chunk - The next ReasoningContents object to merge with the first.
   * @returns A new merged ReasoningContents object.
   */
  export function merge(
    self: ReasoningContents,
    chunk: ReasoningContents
  ): ReasoningContents {
    const merged: ReasoningContents = [...self];
    for (const content of chunk) {
      if (
        content.type === "tool_response_chunk" &&
        "choices" in content.chunk
      ) {
        const existingChunkIndex = merged.findIndex(
          (c) =>
            c.type === "tool_response_chunk" &&
            "choices" in c.chunk &&
            c.tool_call_id === content.tool_call_id
        );
        if (existingChunkIndex >= 0) {
          const { type, tool_call_id, chunk } = merged[
            existingChunkIndex
          ] as ToolResponseChunkContent;
          merged[existingChunkIndex] = {
            type,
            tool_call_id,
            chunk: QueryToolChatCompletionChunk.merged(
              chunk as QueryToolChatCompletionChunkOk,
              content.chunk
            ),
          };
        } else {
          merged.push(content);
        }
      } else {
        merged.push(content);
      }
    }
    return merged;
  }

  /**
   * Converts the JSON reasoning of a reasoning message into a native ReasoningContents object.
   * @param reasoning - The JSON Lines string to parse.
   */
  export function fromString(reasoning: string): ReasoningContents {
    return reasoning
      .split("\n")
      .filter((line) => line.trim() !== "")
      .map((line) => ReasoningContent.fromString(line));
  }
}

/**
 * Represents a streamed chunk of a chat completion response returned by the model,
 * based on the provided input.
 * [Learn more](https://platform.openai.com/docs/guides/streaming-responses).
 */
export interface ReasoningChatCompletionChunkOk
  extends OpenAI.ChatCompletionChunk {
  /**
   * A list of Reasoning chat completion choices.
   */
  choices: ReasoningChatCompletionChunk.Choice[];
}

export interface ReasoningChatCompletionChunkErr {
  code: number;
  message: JsonValue;
  metadata?: JsonValue;
}

export type ReasoningChatCompletionChunk =
  | ReasoningChatCompletionChunkOk
  | ReasoningChatCompletionChunkErr;

export namespace ReasoningChatCompletionChunk {
  /**
   * Merges two ReasoningChatCompletionChunk objects.
   * @param self - The first ReasoningChatCompletionChunk object.
   * @param chunk - The next ReasoningChatCompletionChunk object to merge with the first.
   * @returns A new merged ReasoningChatCompletionChunk object.
   */
  export function merged(
    self: ReasoningChatCompletionChunkOk,
    { choices, usage }: ReasoningChatCompletionChunkOk
  ): ReasoningChatCompletionChunkOk {
    const merged = { ...self };
    if (merged.usage === undefined || merged.usage === null) {
      merged.usage = usage;
    }
    for (const choice of choices) {
      const selfChoiceIndex = merged.choices.findIndex(
        (c) => c.index === choice.index
      );
      if (selfChoiceIndex >= 0) {
        merged.choices = [
          ...merged.choices.slice(0, selfChoiceIndex),
          Choice.merged(merged.choices[selfChoiceIndex], choice),
          ...merged.choices.slice(selfChoiceIndex + 1),
        ];
      } else {
        merged.choices = [...merged.choices, choice];
      }
    }
    return merged;
  }

  /**
   * Converts an OpenAI chat completion chunk to a Reasoning chat completion chunk.
   * @param chunk - The OpenAI chat completion chunk to convert.
   * @returns The converted Reasoning chat completion chunk.
   */
  export function fromOpenAIChatCompletionChunk(
    chunk: OpenAI.ChatCompletionChunk
  ): ReasoningChatCompletionChunk {
    if ("code" in chunk) {
      return chunk as unknown as ReasoningChatCompletionChunkErr;
    } else {
      return {
        ...chunk,
        choices: chunk.choices.map(Choice.fromOpenAIChoice),
      };
    }
  }

  export interface Choice extends OpenAI.ChatCompletionChunk.Choice {
    /**
     * A Reasoning completion delta generated by streamed model responses.
     */
    delta: Choice.Delta;
  }

  export namespace Choice {
    /**
     * Merges two Choice objects.
     * @param self - The first Choice object.
     * @param chunk - The next Choice object to merge with the first.
     * @returns A new merged Choice object.
     */
    export function merged(
      self: Choice,
      { delta, finish_reason, logprobs }: Choice
    ): Choice {
      return {
        delta: Delta.merged(self.delta, delta),
        finish_reason: self.finish_reason ?? finish_reason,
        index: self.index,
        logprobs: self.logprobs ?? logprobs,
      };
    }

    /**
     * Converts an OpenAI chat completion chunk choice to a Reasoning chat completion chunk choice.
     * @param choice - The OpenAI chat completion chunk choice to convert.
     * @returns The converted Reasoning chat completion chunk choice.
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
     * A Reasoning completion delta generated by streamed model responses.
     */
    export type Delta =
      | (OpenAI.ChatCompletionChunk.Choice.Delta & {
          /**
           * The reasoning of the chunk message.
           */
          reasoning: string;
          /**
           * The native JSON reasoning of the Reasoning completion delta.
           */
          parsed_reasoning: ReasoningContents;

          /**
           * Annotations for the message, when applicable, as when using the
           * [web search tool](https://platform.openai.com/docs/guides/tools-web-search?api-mode=chat).
           */
          annotations?: Array<OpenAI.ChatCompletionMessage.Annotation>;
        })
      | (OpenAI.ChatCompletionChunk.Choice.Delta & {
          /**
           * The reasoning of the chunk message.
           */
          reasoning?: undefined;
          /**
           * The native JSON reasoning of the Reasoning completion delta.
           */
          parsed_reasoning?: undefined;

          /**
           * Annotations for the message, when applicable, as when using the
           * [web search tool](https://platform.openai.com/docs/guides/tools-web-search?api-mode=chat).
           */
          annotations?: Array<OpenAI.ChatCompletionMessage.Annotation>;
        });

    export namespace Delta {
      /**
       * Merges two Delta objects.
       * @param self - The first Delta object.
       * @param chunk - The next Delta object to merge with the first.
       * @returns A new merged Delta object.
       */
      export function merged(
        {
          content: selfContent,
          reasoning: selfReasoning,
          parsed_reasoning: selfParsedReasoning,
          refusal: selfRefusal,
          role: selfRole,
          tool_calls: selfToolCalls,
          annotations: selfAnnotations,
        }: Delta,
        {
          content: mergeContent,
          reasoning: mergeReasoning,
          parsed_reasoning: mergeParsedReasoning,
          refusal: mergeRefusal,
          role: mergeRole,
          tool_calls: mergeToolCalls_,
          annotations: mergeAnnotations_,
        }: Delta
      ): Delta {
        const mergeStrings = (
          a: string | undefined | null,
          b: string | undefined | null
        ): string | undefined | null => {
          if (a === undefined || a === null) {
            return b;
          } else if (b === undefined || b === null) {
            return a;
          } else {
            return a + b;
          }
        };
        const mergeToolCalls = (
          existing:
            | OpenAI.Chat.Completions.ChatCompletionChunk.Choice.Delta.ToolCall[]
            | undefined,
          incoming:
            | OpenAI.Chat.Completions.ChatCompletionChunk.Choice.Delta.ToolCall[]
            | undefined
        ):
          | OpenAI.Chat.Completions.ChatCompletionChunk.Choice.Delta.ToolCall[]
          | undefined => {
          const mergeToolCall = (
            existing: OpenAI.ChatCompletionChunk.Choice.Delta.ToolCall,
            {
              function: function_,
              id,
              type,
            }: OpenAI.ChatCompletionChunk.Choice.Delta.ToolCall
          ): OpenAI.ChatCompletionChunk.Choice.Delta.ToolCall => {
            const mergedToolCall = { ...existing };
            if (mergedToolCall.id === undefined) {
              mergedToolCall.id = id;
            }
            if (mergedToolCall.type === undefined) {
              mergedToolCall.type = type;
            }
            if (mergedToolCall.function === undefined) {
              mergedToolCall.function = function_;
            } else {
              if (mergedToolCall.function.name === undefined) {
                mergedToolCall.function.name = function_?.name;
              }
              if (mergedToolCall.function.arguments === undefined) {
                mergedToolCall.function.arguments = function_?.arguments;
              } else if (function_?.arguments !== undefined) {
                mergedToolCall.function.arguments += function_.arguments;
              }
            }
            return mergedToolCall;
          };
          if (existing === undefined || existing.length === 0) {
            return incoming;
          } else if (incoming === undefined || incoming.length === 0) {
            return existing;
          } else {
            const merged = [...existing];
            for (const toolCall of incoming) {
              const existingToolCallIndex = merged.findIndex(
                (c) => c.id === toolCall.id
              );
              if (existingToolCallIndex >= 0) {
                merged[existingToolCallIndex] = mergeToolCall(
                  merged[existingToolCallIndex],
                  toolCall
                );
              } else {
                merged.push(toolCall);
              }
            }
            return merged;
          }
        };
        const mergeAnnotations = (
          existing: Array<OpenAI.ChatCompletionMessage.Annotation> | undefined,
          incoming: Array<OpenAI.ChatCompletionMessage.Annotation> | undefined
        ): Array<OpenAI.ChatCompletionMessage.Annotation> | undefined => {
          if (existing === undefined || existing.length === 0) {
            return incoming;
          } else if (incoming === undefined || incoming.length === 0) {
            return existing;
          } else {
            return [...existing, ...incoming];
          }
        };
        const mergedReasoning = mergeStrings(selfReasoning, mergeReasoning);
        let mergedParsedReasoning: ReasoningContents | undefined;
        if (mergedReasoning) {
          mergedParsedReasoning = ReasoningContents.merge(
            selfParsedReasoning ?? [],
            mergeParsedReasoning ?? []
          );
        } else {
          mergedParsedReasoning = undefined;
        }
        const delta = {
          content: mergeStrings(selfContent, mergeContent),
          reasoning: mergedReasoning,
          parsed_reasoning: mergedParsedReasoning,
          refusal: mergeStrings(selfRefusal, mergeRefusal),
          role: mergeRole ?? selfRole,
          tool_calls: mergeToolCalls(selfToolCalls, mergeToolCalls_),
          annotations: mergeAnnotations(selfAnnotations, mergeAnnotations_),
        };
        if (
          delta.reasoning === undefined &&
          delta.parsed_reasoning === undefined
        ) {
          return delta as typeof delta & {
            reasoning?: undefined;
            parsed_reasoning?: undefined;
          };
        } else if (delta.reasoning && delta.parsed_reasoning) {
          return delta as typeof delta & {
            reasoning: string;
            parsed_reasoning: ReasoningContents;
          };
        } else {
          throw new Error(
            "invalid reasoning delta: reasoning and parsed_reasoning must both be defined or both be undefined."
          );
        }
      }

      /**
       * Converts an OpenAI chat completion chunk choice delta to a Reasoning chat completion chunk choice delta.
       * @param delta - The OpenAI chat completion chunk choice delta to convert.
       * @returns The converted Reasoning chat completion chunk choice delta.
       */
      export function fromOpenAIDelta(
        delta: OpenAI.ChatCompletionChunk.Choice.Delta
      ): ReasoningChatCompletionChunk.Choice.Delta {
        const deltaCasted = delta as OpenAI.ChatCompletionChunk.Choice.Delta & {
          reasoning?: string;
        };
        if (deltaCasted.reasoning === undefined) {
          if ("reasoning" in deltaCasted) {
            // reasoning is present but undefined
            // parsed_reasoning will be present but undefined
            return {
              ...deltaCasted,
              reasoning: undefined,
              parsed_reasoning: undefined,
            };
          } else {
            // reasoning is not present
            // parsed_reasoning will be not present
            return { ...deltaCasted } as Delta;
          }
        } else {
          // reasoning is a string
          // parsed_reasoning will be a ReasoningContents
          return {
            ...deltaCasted,
            reasoning: deltaCasted.reasoning,
            parsed_reasoning: ReasoningContents.fromString(
              deltaCasted.reasoning
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
export interface ReasoningChatCompletion extends OpenAI.ChatCompletion {
  /**
   * A list of chat completion choices.
   */
  choices: Array<ReasoningChatCompletion.Choice>;
}

export namespace ReasoningChatCompletion {
  /**
   * Converts an OpenAI chat completion to a Query chat completion.
   * @param choice - The OpenAI chat completion to convert.
   * @returns The converted Reasoning chat completion.
   */
  export function fromOpenAIChatCompletion(
    chatCompletion: OpenAI.ChatCompletion
  ): ReasoningChatCompletion {
    return {
      ...chatCompletion,
      choices: chatCompletion.choices.map(Choice.fromOpenAIChoice),
    };
  }

  export interface Choice extends OpenAI.ChatCompletion.Choice {
    /**
     * A Reasoning completion message generated by the model.
     */
    message: Choice.Message;
  }

  export namespace Choice {
    /**
     * Converts an OpenAI chat completion choice to a Reasoning chat completion choice.
     * @param choice - The OpenAI chat completion choice to convert.
     * @returns The converted Reasoning chat completion choice.
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
     * A Reasoning completion message generated by the model.
     */
    export type Message =
      | (OpenAI.ChatCompletionMessage & {
          /**
           * The reasoning of the chunk message.
           */
          reasoning: string;
          /**
           * The native JSON reasoning of the Reasoning completion message.
           */
          parsed_reasoning: ReasoningContents;
        })
      | (OpenAI.ChatCompletionMessage & {
          /**
           * The reasoning of the chunk message.
           */
          reasoning?: undefined;
          /**
           * The native JSON reasoning of the Reasoning completion message.
           */
          parsed_reasoning?: undefined;
        });

    export namespace Message {
      /**
       * Converts an OpenAI chat completion message to a Reasoning chat completion message.
       * @param message - The OpenAI chat completion message to convert.
       * @returns The converted Reasoning chat completion message.
       */
      export function fromOpenAIMessage(
        message: OpenAI.ChatCompletionMessage
      ): Message {
        const messageCasted = message as OpenAI.ChatCompletionMessage & {
          reasoning?: string;
        };
        if (messageCasted.reasoning === undefined) {
          if ("reasoning" in messageCasted) {
            // reasoning is present but undefined
            // parsed_reasoning will be present but undefined
            return {
              ...messageCasted,
              reasoning: undefined,
              parsed_reasoning: undefined,
            };
          } else {
            // reasoning is not present
            // parsed_reasoning will be not present
            return { ...messageCasted } as Message;
          }
        } else {
          // reasoning is a string
          // parsed_reasoning will be a ReasoningContents
          return {
            ...messageCasted,
            reasoning: messageCasted.reasoning,
            parsed_reasoning: ReasoningContents.fromString(
              messageCasted.reasoning
            ),
          };
        }
      }
    }
  }
}

/**
 * Stream of ReasoningChatCompletionChunk objects.
 * Can be easily constructed from an OpenAI chat completion chunk stream.
 */
export type ReasoningStream = Stream<ReasoningChatCompletionChunkOk>;

export namespace ReasoningStream {
  /**
   * Converts an OpenAI chat completion chunk stream to a Reasoning chat completion chunk stream.
   * @param chunk - The OpenAI chat completion chunk stream to convert.
   * @returns The converted Reasoning chat completion chunk stream.
   */
  export function fromOpenAIStream(
    stream: Stream<OpenAI.ChatCompletionChunk>
  ): ReasoningStream {
    return new Stream(async function* () {
      for await (const chunk of stream) {
        const reasoningChunk =
          ReasoningChatCompletionChunk.fromOpenAIChatCompletionChunk(chunk);
        if ("code" in reasoningChunk) {
          throw new Error(JSON.stringify(reasoningChunk, null, 2));
        } else {
          yield reasoningChunk;
        }
      }
    }, stream.controller);
  }

  /**
   * Converts an OpenAI chat completion chunk stream to a merged Reasoning chat completion chunk stream.
   * Yields a continuously merged ReasoningChatCompletionChunk object, updating as data comes in.
   * @param chunk - The OpenAI chat completion chunk stream to convert.
   * @returns The converted merged Reasoning chat completion chunk stream.
   */
  export function merged(stream: ReasoningStream): ReasoningStream {
    return new Stream(async function* () {
      let merged: ReasoningChatCompletionChunkOk | null = null;
      for await (const chunk of stream) {
        if (merged === null) {
          merged = chunk;
        } else {
          merged = ReasoningChatCompletionChunk.merged(merged, chunk);
        }
        yield merged;
      }
    }, stream.controller);
  }
}
