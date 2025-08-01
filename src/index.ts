import OpenAI from "openai";
import { APIPromise } from "openai/core";
import { Stream } from "openai/streaming";
import OpenAIChatCompletions from "openai/resources/chat/completions";

export namespace ObjectiveAI {
  export namespace Chat {
    export namespace Completions {
      export function create(
        openai: OpenAI,
        body: ChatCompletionCreateParamsStreaming,
        options?: OpenAI.RequestOptions
      ): APIPromise<Stream<ChatCompletionChunk | Error>>;
      export function create(
        openai: OpenAI,
        body: ChatCompletionCreateParamsNonStreaming,
        options?: OpenAI.RequestOptions
      ): APIPromise<ChatCompletion>;
      export function create(
        openai: OpenAI,
        body: Query.ChatCompletionCreateParamsStreaming,
        options?: OpenAI.RequestOptions
      ): APIPromise<Stream<Query.ChatCompletionChunk | Error>>;
      export function create(
        openai: OpenAI,
        body: Query.ChatCompletionCreateParamsNonStreaming,
        options?: OpenAI.RequestOptions
      ): APIPromise<Query.ChatCompletion>;
      export function create(
        openai: OpenAI,
        body: QueryTool.ChatCompletionCreateParamsStreaming,
        options?: OpenAI.RequestOptions
      ): APIPromise<Stream<QueryTool.ChatCompletionChunk | Error>>;
      export function create(
        openai: OpenAI,
        body: QueryTool.ChatCompletionCreateParamsNonStreaming,
        options?: OpenAI.RequestOptions
      ): APIPromise<QueryTool.ChatCompletion>;
      export function create(
        openai: OpenAI,
        body:
          | ChatCompletionCreateParamsStreaming
          | Query.ChatCompletionCreateParamsStreaming,
        options?: OpenAI.RequestOptions
      ): APIPromise<
        | Stream<ChatCompletionChunk | Error>
        | Stream<Query.ChatCompletionChunk | Error>
      >;
      export function create(
        openai: OpenAI,
        body:
          | ChatCompletionCreateParamsStreaming
          | QueryTool.ChatCompletionCreateParamsStreaming,
        options?: OpenAI.RequestOptions
      ): APIPromise<
        | Stream<ChatCompletionChunk | Error>
        | Stream<QueryTool.ChatCompletionChunk | Error>
      >;
      export function create(
        openai: OpenAI,
        body:
          | Query.ChatCompletionCreateParamsStreaming
          | QueryTool.ChatCompletionCreateParamsStreaming,
        options?: OpenAI.RequestOptions
      ): APIPromise<
        | Stream<Query.ChatCompletionChunk | Error>
        | Stream<QueryTool.ChatCompletionChunk | Error>
      >;
      export function create(
        openai: OpenAI,
        body:
          | ChatCompletionCreateParamsStreaming
          | Query.ChatCompletionCreateParamsStreaming
          | QueryTool.ChatCompletionCreateParamsStreaming,
        options?: OpenAI.RequestOptions
      ): APIPromise<
        | Stream<ChatCompletionChunk | Error>
        | Stream<Query.ChatCompletionChunk | Error>
        | Stream<QueryTool.ChatCompletionChunk | Error>
      >;
      export function create(
        openai: OpenAI,
        body:
          | ChatCompletionCreateParamsNonStreaming
          | Query.ChatCompletionCreateParamsNonStreaming,
        options?: OpenAI.RequestOptions
      ): APIPromise<ChatCompletion | Query.ChatCompletion>;
      export function create(
        openai: OpenAI,
        body:
          | ChatCompletionCreateParamsNonStreaming
          | QueryTool.ChatCompletionCreateParamsNonStreaming,
        options?: OpenAI.RequestOptions
      ): APIPromise<
        ChatCompletion | Query.ChatCompletion | QueryTool.ChatCompletion
      >;
      export function create(
        openai: OpenAI,
        body:
          | Query.ChatCompletionCreateParamsNonStreaming
          | QueryTool.ChatCompletionCreateParamsNonStreaming,
        options?: OpenAI.RequestOptions
      ): APIPromise<Query.ChatCompletion | QueryTool.ChatCompletion>;
      export function create(
        openai: OpenAI,
        body:
          | ChatCompletionCreateParamsNonStreaming
          | Query.ChatCompletionCreateParamsNonStreaming
          | QueryTool.ChatCompletionCreateParamsNonStreaming,
        options?: OpenAI.RequestOptions
      ): APIPromise<
        ChatCompletion | Query.ChatCompletion | QueryTool.ChatCompletion
      >;
      export function create(
        openai: OpenAI,
        body:
          | ChatCompletionCreateParams
          | Query.ChatCompletionCreateParams
          | QueryTool.ChatCompletionCreateParams,
        options?: OpenAI.RequestOptions
      ): APIPromise<
        | ChatCompletion
        | Stream<ChatCompletionChunk | Error>
        | Query.ChatCompletion
        | Stream<Query.ChatCompletionChunk | Error>
        | QueryTool.ChatCompletion
        | Stream<QueryTool.ChatCompletionChunk | Error>
      > {
        return openai.chat.completions.create(
          body as Omit<typeof body, "model" | "response_format"> & {
            model: string;
            response_format?: OpenAI.ChatCompletionCreateParams["response_format"];
          },
          options
        ) as APIPromise<
          | ChatCompletion
          | Stream<ChatCompletionChunk | Error>
          | Query.ChatCompletion
          | Stream<Query.ChatCompletionChunk | Error>
          | QueryTool.ChatCompletion
          | Stream<QueryTool.ChatCompletionChunk | Error>
        >;
      }

      export interface ChatCompletionCreateParamsBase
        extends OpenAIChatCompletions.ChatCompletionCreateParamsBase {
        /**
         * Model ID used to generate the response, like `gpt-4o` or `o3`. OpenAI offers a
         * wide range of models with different capabilities, performance characteristics,
         * and price points. Refer to the
         * [model guide](https://platform.openai.com/docs/models) to browse and compare
         * available models.
         */
        model: string;
        /**
         * OpenRouter provider preferences.
         */
        provider?: ChatCompletionCreateParams.ProviderPreferences;
        /**
         * OpenRouter plugins.
         */
        plugins?: ChatCompletionCreateParams.Plugin[];
        /**
         * OpenRouter reasoning configuration (e.g. for Gemini or Anthropic models).
         */
        reasoning?: ChatCompletionCreateParams.Reasoning;
        /**
         * OpenRouter usage accounting configuration.
         */
        usage?: ChatCompletionCreateParams.Usage;
      }

      export interface ChatCompletionCreateParamsStreaming
        extends ChatCompletionCreateParamsBase {
        /**
         * If set to true, the model response data will be streamed to the client as it is
         * generated using
         * [server-sent events](https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events/Using_server-sent_events#Event_stream_format).
         * See the
         * [Streaming section below](https://platform.openai.com/docs/api-reference/chat/streaming)
         * for more information, along with the
         * [streaming responses](https://platform.openai.com/docs/guides/streaming-responses)
         * guide for more information on how to handle the streaming events.
         */
        stream: true;
      }

      export interface ChatCompletionCreateParamsNonStreaming
        extends ChatCompletionCreateParamsBase {
        /**
         * If set to true, the model response data will be streamed to the client as it is
         * generated using
         * [server-sent events](https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events/Using_server-sent_events#Event_stream_format).
         * See the
         * [Streaming section below](https://platform.openai.com/docs/api-reference/chat/streaming)
         * for more information, along with the
         * [streaming responses](https://platform.openai.com/docs/guides/streaming-responses)
         * guide for more information on how to handle the streaming events.
         */
        stream: false;
      }

      export type ChatCompletionCreateParams =
        | ChatCompletionCreateParamsStreaming
        | ChatCompletionCreateParamsNonStreaming;

      export namespace ChatCompletionCreateParams {
        /**
         * OpenRouter provider preferences.
         */
        export interface ProviderPreferences {
          /**
           * List of provider slugs to try in order (e.g. ["anthropic", "openai"]).
           * [Learn more](https://openrouter.ai/docs/features/provider-routing#ordering-specific-providers)
           */
          order?: string[];
          /**
           * Whether to allow backup providers when the primary is unavailable.
           * [Learn more](https://openrouter.ai/docs/features/provider-routing#disabling-fallbacks)
           * [Default: true]
           */
          allow_fallbacks?: boolean;
          /**
           * Only use providers that support all parameters in your request.
           * [Learn more](https://openrouter.ai/docs/features/provider-routing#requiring-providers-to-support-all-parameters-beta)
           * [Default: false]
           */
          require_parameters?: boolean;
          /**
           * Control whether to use providers that may store data.
           * [Learn more](https://openrouter.ai/docs/features/provider-routing#requiring-providers-to-comply-with-data-policies)
           * [Default: "allow"]
           */
          data_collection?: "allow" | "deny";
          /**
           * List of provider slugs to allow for this request.
           * [Learn more](https://openrouter.ai/docs/features/provider-routing#allowing-only-specific-providers)
           */
          only?: string[];
          /**
           * 	List of provider slugs to skip for this request.
           * [Learn more](https://openrouter.ai/docs/features/provider-routing#ignoring-providers)
           */
          ignore?: string[];
          /**
           * List of quantization levels to filter by (e.g. ["int4", "int8"]).
           * [Learn more](https://openrouter.ai/docs/features/provider-routing#quantization)
           */
          quantizations?: string[];
          /**
           * Sort providers by price or throughput. (e.g. "price" or "throughput").
           * [Learn more](https://openrouter.ai/docs/features/provider-routing#provider-sorting)
           */
          sort?: string;
          /**
           * The maximum pricing you want to pay for this request.
           * [Learn more](https://openrouter.ai/docs/features/provider-routing#maximum-price)
           */
          max_price?: Record<string, unknown>;
        }

        /**
         * OpenRouter plugin.
         */
        export type Plugin = Record<string, unknown> & { id: string };

        /**
         * OpenRouter reasoning configuration (e.g. for Gemini or Anthropic models).
         */
        export interface Reasoning {
          /**
           * Directly specifies the maximum number of tokens to use for reasoning.
           * [Learn more](https://openrouter.ai/docs/use-cases/reasoning-tokens)
           */
          max_tokens: number;
        }

        /**
         * OpenRouter usage accounting configuration.
         */
        export interface Usage {
          /**
           * Whether to include cost in response usage.
           * [Learn more](https://openrouter.ai/docs/use-cases/usage-accounting#streaming-with-usage-information)
           */
          include: boolean;
        }
      }

      /**
       * Represents a streamed chunk of a chat completion response returned by the model,
       * based on the provided input.
       * [Learn more](https://platform.openai.com/docs/guides/streaming-responses).
       */
      export interface ChatCompletionChunk
        extends Omit<OpenAI.Chat.Completions.ChatCompletionChunk, "choices"> {
        /**
         * A list of chat completion choices. Can contain more than one elements if `n` is
         * greater than 1. Can also be empty for the last chunk if you set
         * `stream_options: {"include_usage": true}`.
         */
        choices: ChatCompletionChunk.Choice[];
        /**
         * An optional field that will only be present when you set
         * `stream_options: {"include_usage": true}` in your request. When present, it
         * contains a null value **except for the last chunk** which contains the token
         * usage statistics for the entire request.
         *
         * **NOTE:** If the stream is interrupted or cancelled, you may not receive the
         * final usage chunk which contains the total token usage for the request.
         */
        usage?: Usage;
        /**
         * The openrouter provider which served the response.
         */
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
        export function deepClone({
          id,
          choices,
          created,
          model,
          object,
          service_tier,
          system_fingerprint,
          usage,
        }: ChatCompletionChunk): ChatCompletionChunk {
          return {
            id,
            choices: Choice.deepCloneList(choices),
            created,
            model,
            object,
            ...(service_tier !== undefined ? { service_tier } : {}),
            ...(system_fingerprint !== undefined ? { system_fingerprint } : {}),
            ...(usage !== undefined ? { usage: Usage.deepClone(usage) } : {}),
          };
        }

        export interface Choice
          extends Omit<
            OpenAI.Chat.Completions.ChatCompletionChunk.Choice,
            "finish_reason"
          > {
          /**
           * A chat completion delta generated by streamed model responses.
           */
          delta: Choice.Delta;
          /**
           * The reason the model stopped generating tokens. This will be `stop` if the model
           * hit a natural stop point or a provided stop sequence, `length` if the maximum
           * number of tokens specified in the request was reached, `content_filter` if
           * content was omitted due to a flag from our content filters, `tool_calls` if the
           * model called a tool, or `function_call` (deprecated) if the model called a
           * function.
           */
          finish_reason:
            | "stop"
            | "length"
            | "tool_calls"
            | "content_filter"
            | "function_call"
            | "error"
            | null;
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
              Chat.Completions.ChatCompletionChunk.Choice.Logprobs.merged
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
          export function deepClone({
            delta,
            finish_reason,
            index,
            logprobs,
          }: Choice): Choice {
            return {
              delta: Delta.deepClone(delta),
              finish_reason,
              index,
              ...(logprobs !== undefined
                ? { logprobs: logprobs ? Logprobs.deepClone(logprobs) : null }
                : {}),
            };
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
          export function deepCloneList(choices: Choice[]): Choice[] {
            return choices.map(Choice.deepClone);
          }

          export namespace Logprobs {
            export function merged(
              a: OpenAI.Chat.Completions.ChatCompletionChunk.Choice.Logprobs,
              b: OpenAI.Chat.Completions.ChatCompletionChunk.Choice.Logprobs
            ): [
              OpenAI.Chat.Completions.ChatCompletionChunk.Choice.Logprobs,
              boolean
            ] {
              const [content, contentChanged] = merge(
                a.content,
                b.content,
                TokenLogprob.mergedList
              );
              const [refusal, refusalChanged] = merge(
                a.refusal,
                b.refusal,
                TokenLogprob.mergedList
              );
              if (contentChanged || refusalChanged) {
                return [{ content, refusal }, true];
              } else {
                return [a, false];
              }
            }
            export function deepClone({
              content,
              refusal,
            }: OpenAI.Chat.Completions.ChatCompletionChunk.Choice.Logprobs): OpenAI.Chat.Completions.ChatCompletionChunk.Choice.Logprobs {
              return {
                content: content ? TokenLogprob.deepCloneList(content) : null,
                refusal: refusal ? TokenLogprob.deepCloneList(refusal) : null,
              };
            }

            export namespace TokenLogprob {
              export function deepClone({
                token,
                bytes,
                logprob,
                top_logprobs,
              }: OpenAI.Chat.Completions.ChatCompletionTokenLogprob): OpenAI.Chat.Completions.ChatCompletionTokenLogprob {
                return {
                  token,
                  bytes: bytes ? [...bytes] : null,
                  logprob,
                  top_logprobs: top_logprobs.map(
                    ({ token, bytes, logprob }) => ({
                      token,
                      bytes: bytes ? [...bytes] : null,
                      logprob,
                    })
                  ),
                };
              }
              export function mergedList(
                a: OpenAI.Chat.Completions.ChatCompletionTokenLogprob[],
                b: OpenAI.Chat.Completions.ChatCompletionTokenLogprob[]
              ): [
                OpenAI.Chat.Completions.ChatCompletionTokenLogprob[],
                boolean
              ] {
                if (b.length > 0) {
                  return [[...a, ...b], true];
                } else {
                  return [a, false];
                }
              }
              export function deepCloneList(
                logprobs: OpenAI.Chat.Completions.ChatCompletionTokenLogprob[]
              ): OpenAI.Chat.Completions.ChatCompletionTokenLogprob[] {
                return logprobs.map(TokenLogprob.deepClone);
              }
            }
          }

          export interface Delta
            extends OpenAI.Chat.Completions.ChatCompletionChunk.Choice.Delta {
            /**
             * Reasoning generated by the model, if applicable.
             */
            reasoning?: string;
            /**
             * The role of the author of this message.
             */
            role?: "assistant";
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
            export function deepClone({
              content,
              reasoning,
              refusal,
              role,
              tool_calls,
            }: Delta): Delta {
              return {
                ...(content !== undefined ? { content } : {}),
                ...(reasoning !== undefined ? { reasoning } : {}),
                ...(refusal !== undefined ? { refusal } : {}),
                ...(role !== undefined ? { role } : {}),
                ...(tool_calls !== undefined
                  ? { tool_calls: ToolCall.deepCloneList(tool_calls) }
                  : {}),
              };
            }

            export namespace ToolCall {
              export function merged(
                a: OpenAI.Chat.Completions.ChatCompletionChunk.Choice.Delta.ToolCall,
                b: OpenAI.Chat.Completions.ChatCompletionChunk.Choice.Delta.ToolCall
              ): [
                OpenAI.Chat.Completions.ChatCompletionChunk.Choice.Delta.ToolCall,
                boolean
              ] {
                const index = a.index;
                const [id, idChanged] = merge(a.id, b.id);
                const [function_, functionChanged] = merge(
                  a.function,
                  b.function,
                  Function.merged
                );
                const [type, typeChanged] = merge(a.type, b.type);
                if (idChanged || functionChanged || typeChanged) {
                  return [
                    {
                      index,
                      ...(id !== undefined ? { id } : {}),
                      ...(function_ !== undefined
                        ? { function: function_ }
                        : {}),
                      ...(type !== undefined ? { type } : {}),
                    },
                    true,
                  ];
                } else {
                  return [a, false];
                }
              }
              export function deepClone({
                index,
                id,
                function: function_,
                type,
              }: OpenAI.Chat.Completions.ChatCompletionChunk.Choice.Delta.ToolCall): OpenAI.Chat.Completions.ChatCompletionChunk.Choice.Delta.ToolCall {
                return {
                  index,
                  ...(id !== undefined ? { id } : {}),
                  ...(function_ !== undefined
                    ? { function: Function.deepClone(function_) }
                    : {}),
                  ...(type !== undefined ? { type } : {}),
                };
              }
              export function mergedList(
                a: OpenAI.Chat.Completions.ChatCompletionChunk.Choice.Delta.ToolCall[],
                b: OpenAI.Chat.Completions.ChatCompletionChunk.Choice.Delta.ToolCall[]
              ): [
                OpenAI.Chat.Completions.ChatCompletionChunk.Choice.Delta.ToolCall[],
                boolean
              ] {
                let merged:
                  | OpenAI.Chat.Completions.ChatCompletionChunk.Choice.Delta.ToolCall[]
                  | undefined = undefined;
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
              export function deepCloneList(
                toolCalls: OpenAI.Chat.Completions.ChatCompletionChunk.Choice.Delta.ToolCall[]
              ): OpenAI.Chat.Completions.ChatCompletionChunk.Choice.Delta.ToolCall[] {
                return toolCalls.map(ToolCall.deepClone);
              }

              export namespace Function {
                export function merged(
                  a: OpenAI.Chat.Completions.ChatCompletionChunk.Choice.Delta.ToolCall.Function,
                  b: OpenAI.Chat.Completions.ChatCompletionChunk.Choice.Delta.ToolCall.Function
                ): [
                  OpenAI.Chat.Completions.ChatCompletionChunk.Choice.Delta.ToolCall.Function,
                  boolean
                ] {
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
                export function deepClone({
                  name,
                  arguments: arguments_,
                }: OpenAI.Chat.Completions.ChatCompletionChunk.Choice.Delta.ToolCall.Function): OpenAI.Chat.Completions.ChatCompletionChunk.Choice.Delta.ToolCall.Function {
                  return {
                    ...(name !== undefined ? { name } : {}),
                    ...(arguments_ !== undefined
                      ? { arguments: arguments_ }
                      : {}),
                  };
                }
              }
            }
          }
        }
      }

      /**
       * Represents a chat completion response returned by model, based on the provided
       * input.
       */
      export interface ChatCompletion
        extends Omit<OpenAI.Chat.Completions.ChatCompletion, "choices"> {
        /**
         * A list of chat completion choices. Can be more than one if `n` is greater
         * than 1.
         */
        choices: ChatCompletion.Choice[];
        /**
         * Usage statistics for the completion request.
         */
        usage?: Usage;
        /**
         * The openrouter provider which served the response.
         */
        provider?: string;
      }

      export namespace ChatCompletion {
        export interface Choice
          extends Omit<
            OpenAI.Chat.Completions.ChatCompletion.Choice,
            "finish_reason"
          > {
          /**
           * The reason the model stopped generating tokens. This will be `stop` if the model
           * hit a natural stop point or a provided stop sequence, `length` if the maximum
           * number of tokens specified in the request was reached, `content_filter` if
           * content was omitted due to a flag from our content filters, `tool_calls` if the
           * model called a tool, or `function_call` (deprecated) if the model called a
           * function.
           */
          finish_reason:
            | "stop"
            | "length"
            | "tool_calls"
            | "content_filter"
            | "function_call"
            | "error";
          /**
           * A chat completion message generated by the model.
           */
          message: Choice.Message;
        }

        export namespace Choice {
          export interface Message extends OpenAI.ChatCompletionMessage {
            /**
             * Reasoning generated by the model, if applicable.
             */
            reasoning?: string;
          }
        }
      }

      export namespace Query {
        export interface ChatCompletionCreateParamsBase
          extends Omit<
            Chat.Completions.ChatCompletionCreateParamsBase,
            "model"
          > {
          /**
           * Model ID used to generate the response, like `gpt-4o` or `o3`. OpenAI offers a
           * wide range of models with different capabilities, performance characteristics,
           * and price points. Refer to the
           * [model guide](https://platform.openai.com/docs/models) to browse and compare
           * available models.
           */
          model: `objectiveai/${string}` | SetQueryModel;
          /**
           * If provided, embeddings will be generated for each response choice.
           */
          embeddings?: Embeddings.Model;
          /**
           * If provided, will override the default weight for models with a corresponding index.
           */
          weights?: (number | null)[];
        }

        export interface ChatCompletionCreateParamsStreaming
          extends ChatCompletionCreateParamsBase {
          /**
           * If set to true, the model response data will be streamed to the client as it is
           * generated using
           * [server-sent events](https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events/Using_server-sent_events#Event_stream_format).
           * See the
           * [Streaming section below](https://platform.openai.com/docs/api-reference/chat/streaming)
           * for more information, along with the
           * [streaming responses](https://platform.openai.com/docs/guides/streaming-responses)
           * guide for more information on how to handle the streaming events.
           */
          stream: true;
        }

        export interface ChatCompletionCreateParamsNonStreaming
          extends ChatCompletionCreateParamsBase {
          /**
           * If set to true, the model response data will be streamed to the client as it is
           * generated using
           * [server-sent events](https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events/Using_server-sent_events#Event_stream_format).
           * See the
           * [Streaming section below](https://platform.openai.com/docs/api-reference/chat/streaming)
           * for more information, along with the
           * [streaming responses](https://platform.openai.com/docs/guides/streaming-responses)
           * guide for more information on how to handle the streaming events.
           */
          stream: false;
        }

        export type ChatCompletionCreateParams =
          | ChatCompletionCreateParamsStreaming
          | ChatCompletionCreateParamsNonStreaming;

        export interface TrainingTableData {
          /**
           * A unique hash of the provided response_format from the completions request.
           */
          schema_hash: number;
          /**
           * The embeddings response for the completions request messages.
           */
          embeddings_response: Embeddings.CreateEmbeddingResponse;
        }

        export namespace TrainingTableData {
          export function deepClone({
            schema_hash,
            embeddings_response,
          }: TrainingTableData): TrainingTableData {
            return {
              schema_hash,
              embeddings_response:
                Embeddings.CreateEmbeddingResponse.deepClone(
                  embeddings_response
                ),
            };
          }
        }

        export interface SetQueryModel {
          /**
           * The list of models used in the query model.
           */
          models: SetModel[];
          /**
           * The weight variant used for the query model.
           */
          weight: QueryModel.Weight;
          /**
           * List of users authorized to use the query model, besides the creator.
           * Never present for global query models.
           */
          users?: string[];
        }

        export interface QueryModel extends SetQueryModel {
          /**
           * The list of models used in the query model.
           */
          models: Model[];
          /**
           * The name of the query model.
           */
          name: string;
          /**
           * The creation timestamp of the query model.
           * Number of seconds since the Unix epoch.
           */
          created: number;
          /**
           * The version of the query model.
           * Always a whole number.
           */
          version: number;
          /**
           * The ID of the user who created the query model.
           * If not provided, this is a global query model.
           */
          created_by?: string;
        }

        export namespace QueryModel {
          export type Weight =
            | {
                type: "static";
              }
            | {
                type: "training_table";
                /**
                 * The embeddings model which generates embeddings of the prompt.
                 */
                embeddings_model: Embeddings.Model;
                /**
                 * The number of historical records to retrieve for computing per-model weights.
                 */
                top: number;
              };
        }

        export interface SetModel {
          /**
           * The id for the model.
           */
          id: string;
          /**
           * The mode of the model.
           */
          mode: Model.Mode;
          /**
           * The weight assigned to the model.
           */
          weight: Model.Weight;
          /**
           * Number between -2.0 and 2.0. Positive values penalize new tokens based on their
           * existing frequency in the text so far, decreasing the model's likelihood to
           * repeat the same line verbatim.
           */
          frequency_penalty?: number;
          /**
           * Number between -2.0 and 2.0. Positive values penalize new tokens based on
           * whether they appear in the text so far, increasing the model's likelihood to
           * talk about new topics.
           */
          presence_penalty?: number;
          /**
           * Constrains effort on reasoning for
           * [reasoning models](https://platform.openai.com/docs/guides/reasoning). Currently
           * supported values are `low`, `medium`, and `high`. Reducing reasoning effort can
           * result in faster responses and fewer tokens used on reasoning in a response.
           */
          reasoning_effort?: "low" | "medium" | "high";
          /**
           * What sampling temperature to use, between 0 and 2. Higher values like 0.8 will
           * make the output more random, while lower values like 0.2 will make it more
           * focused and deterministic. We generally recommend altering this or `top_p` but
           * not both.
           */
          temperature?: number;
          /**
           * An alternative to sampling with temperature, called nucleus sampling, where the
           * model considers the results of the tokens with top_p probability mass. So 0.1
           * means only the tokens comprising the top 10% probability mass are considered.
           *
           * We generally recommend altering this or `temperature` but not both.
           */
          top_p?: number;
          /**
           * OpenRouter provider preferences.
           */
          provider?: ChatCompletionCreateParams.ProviderPreferences;
          /**
           * OpenRouter reasoning configuration (e.g. for Gemini or Anthropic models).
           */
          reasoning?: ChatCompletionCreateParams.Reasoning;
        }

        export interface Model extends SetModel {
          /**
           * The index of the model, within the parent Query Model.
           */
          index: number;
        }

        export namespace Model {
          export type Mode =
            | "generate"
            | "select_thinking"
            | "select_non_thinking";

          export type Weight =
            | {
                type: "static";
                weight: number;
              }
            | {
                type: "training_table";
                base_weight: number;
                min_weight: number;
                max_weight: number;
              };
        }

        export interface ChoiceCompletionMetadata {
          /**
           * A unique identifier for the chat completion.
           */
          id: string;
          /**
           * The Unix timestamp (in seconds) of when the chat completion was created.
           */
          created: number;
          /**
           * The model used for the chat completion.
           */
          model: string;
          /**
           * Specifies the latency tier to use for processing the request. This parameter is
           * relevant for customers subscribed to the scale tier service:
           *
           * - If set to 'auto', and the Project is Scale tier enabled, the system will
           *   utilize scale tier credits until they are exhausted.
           * - If set to 'auto', and the Project is not Scale tier enabled, the request will
           *   be processed using the default service tier with a lower uptime SLA and no
           *   latency guarentee.
           * - If set to 'default', the request will be processed using the default service
           *   tier with a lower uptime SLA and no latency guarentee.
           * - If set to 'flex', the request will be processed with the Flex Processing
           *   service tier.
           *   [Learn more](https://platform.openai.com/docs/guides/flex-processing).
           * - When not set, the default behavior is 'auto'.
           *
           * When this parameter is set, the response body will include the `service_tier`
           * utilized.
           */
          service_tier?: "auto" | "default" | "flex";
          /**
           * This fingerprint represents the backend configuration that the model runs with.
           *
           * Can be used in conjunction with the `seed` request parameter to understand when
           * backend changes have been made that might impact determinism.
           */
          system_fingerprint?: string;
          /**
           * Usage statistics for the completion request.
           */
          usage?: Usage;
          /**
           * The openrouter provider which served the response.
           */
          provider?: string;
        }

        export namespace ChoiceCompletionMetadata {
          export function merged(
            a: ChoiceCompletionMetadata,
            b: ChoiceCompletionMetadata
          ): [ChoiceCompletionMetadata, boolean] {
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
            const [usage, usageChanged] = merge(a.usage, b.usage, Usage.merged);
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
          export function deepClone({
            id,
            created,
            model,
            service_tier,
            system_fingerprint,
            usage,
          }: ChoiceCompletionMetadata): ChoiceCompletionMetadata {
            return {
              id,
              created,
              model,
              ...(service_tier !== undefined ? { service_tier } : {}),
              ...(system_fingerprint !== undefined
                ? { system_fingerprint }
                : {}),
              ...(usage !== undefined ? { usage: Usage.deepClone(usage) } : {}),
            };
          }
        }

        /**
         * Represents a streamed chunk of a chat completion response returned by the model,
         * based on the provided input.
         * [Learn more](https://platform.openai.com/docs/guides/streaming-responses).
         */
        export interface ChatCompletionChunk
          extends Omit<Chat.Completions.ChatCompletionChunk, "provider"> {
          /**
           * A list of chat completion choices. Can contain more than one elements if `n` is
           * greater than 1. Can also be empty for the last chunk if you set
           * `stream_options: {"include_usage": true}`.
           */
          choices: ChatCompletionChunk.Choice[];
          /**
           * Training table data as generated for Query models with 'TrainingTable' weight mode.
           */
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
            const [usage, usageChanged] = merge(a.usage, b.usage, Usage.merged);
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
          export function deepClone({
            id,
            choices,
            created,
            model,
            object,
            service_tier,
            system_fingerprint,
            usage,
            training_table_data,
          }: ChatCompletionChunk): ChatCompletionChunk {
            return {
              id,
              choices: Choice.deepCloneList(choices),
              created,
              model,
              object,
              ...(service_tier !== undefined ? { service_tier } : {}),
              ...(system_fingerprint !== undefined
                ? { system_fingerprint }
                : {}),
              ...(usage !== undefined ? { usage: Usage.deepClone(usage) } : {}),
              ...(training_table_data !== undefined
                ? {
                    training_table_data:
                      TrainingTableData.deepClone(training_table_data),
                  }
                : {}),
            };
          }

          export interface Choice
            extends Chat.Completions.ChatCompletionChunk.Choice {
            /**
             * The 'id' of the response choice.
             * Each response choice with the same 'id' is treated as the same
             * with regards to confidence.
             */
            id?: string;
            /**
             * The weight of this particular response choice.
             */
            weight?: number;
            /**
             * The confidence of this response choice, and all other response
             * choices with the same 'id'.
             * 0.0 - 1.0
             */
            confidence?: number;
            /**
             * If requested, an embedding of the content of this response choice.
             */
            embedding?: Embeddings.CreateEmbeddingResponse | Error;
            /**
             * An error encountered while generating this response choice.
             * If an error occurs, finish_reason will also be 'error'.
             */
            error?: Error;
            /**
             * The model which generated this response choice.
             */
            model: Model;
            /**
             * Upstream metadata for the completion which generated this response choice.
             */
            completion_metadata: ChoiceCompletionMetadata;
          }

          export namespace Choice {
            export function merged(a: Choice, b: Choice): [Choice, boolean] {
              const [delta, deltaChanged] = merge(
                a.delta,
                b.delta,
                Chat.Completions.ChatCompletionChunk.Choice.Delta.merged
              );
              const [finish_reason, finish_reasonChanged] = merge(
                a.finish_reason,
                b.finish_reason
              );
              const index = a.index;
              const [logprobs, logprobsChanged] = merge(
                a.logprobs,
                b.logprobs,
                Chat.Completions.ChatCompletionChunk.Choice.Logprobs.merged
              );
              const [id, idChanged] = merge(a.id, b.id);
              const [weight, weightChanged] = merge(a.weight, b.weight);
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
              const [completion_metadata, completion_metadataChanged] =
                ChoiceCompletionMetadata.merged(
                  a.completion_metadata,
                  b.completion_metadata
                );
              if (
                deltaChanged ||
                finish_reasonChanged ||
                logprobsChanged ||
                idChanged ||
                weightChanged ||
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
                    ...(id !== undefined ? { id } : {}),
                    ...(weight !== undefined ? { weight } : {}),
                    ...(confidence !== undefined ? { confidence } : {}),
                    ...(embedding !== undefined ? { embedding } : {}),
                    ...(error !== undefined ? { error } : {}),
                    model,
                    completion_metadata,
                  },
                  true,
                ];
              } else {
                return [a, false];
              }
            }
            export function deepClone({
              delta,
              finish_reason,
              index,
              logprobs,
              id,
              weight,
              confidence,
              embedding,
              error,
              model,
              completion_metadata,
            }: Choice): Choice {
              return {
                delta:
                  Chat.Completions.ChatCompletionChunk.Choice.Delta.deepClone(
                    delta
                  ),
                finish_reason,
                index,
                ...(logprobs !== undefined
                  ? {
                      logprobs: logprobs
                        ? Chat.Completions.ChatCompletionChunk.Choice.Logprobs.deepClone(
                            logprobs
                          )
                        : null,
                    }
                  : {}),
                ...(id !== undefined ? { id } : {}),
                ...(weight !== undefined ? { weight } : {}),
                ...(confidence !== undefined ? { confidence } : {}),
                ...(embedding !== undefined
                  ? {
                      embedding:
                        "data" in embedding
                          ? Embeddings.CreateEmbeddingResponse.deepClone(
                              embedding
                            )
                          : Error.deepClone(embedding),
                    }
                  : {}),
                ...(error !== undefined ? { error } : {}),
                model,
                completion_metadata:
                  ChoiceCompletionMetadata.deepClone(completion_metadata),
              };
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
            export function deepCloneList(choices: Choice[]): Choice[] {
              return choices.map(Choice.deepClone);
            }
          }
        }

        /**
         * Represents a chat completion response returned by model, based on the provided
         * input.
         */
        export interface ChatCompletion
          extends Omit<Chat.Completions.ChatCompletion, "provider"> {
          /**
           * A list of chat completion choices. Can be more than one if `n` is greater
           * than 1.
           */
          choices: ChatCompletion.Choice[];
          /**
           * Training table data as generated for Query models with 'TrainingTable' weight mode.
           */
          training_table_data?: TrainingTableData;
        }

        export namespace ChatCompletion {
          export interface Choice
            extends Chat.Completions.ChatCompletion.Choice {
            /**
             * The 'id' of the response choice.
             * Each response choice with the same 'id' is treated as the same
             * with regards to confidence.
             */
            id: string | null;
            /**
             * The weight of this particular response choice.
             */
            weight: number | null;
            /**
             * The confidence of this response choice, and all other response
             * choices with the same 'id'.
             * 0.0 - 1.0
             */
            confidence: number | null;
            /**
             * If requested, an embedding of the content of this response choice.
             */
            embedding?: Embeddings.CreateEmbeddingResponse | Error;
            /**
             * An error encountered while generating this response choice.
             * If an error occurs, finish_reason will also be 'error'.
             */
            error?: Error;
            /**
             * The model which generated this response choice.
             */
            model: Model;
            /**
             * Upstream metadata for the completion which generated this response choice.
             */
            completion_metadata: ChoiceCompletionMetadata;
          }
        }
      }

      export namespace QueryTool {
        export interface ChatCompletionCreateParamsBase
          extends Omit<
            Query.ChatCompletionCreateParamsBase,
            "response_format"
          > {
          /**
           * An object specifying the format that the model must output.
           *
           * Setting to `{ "type": "json_schema", "json_schema": {...} }` enables Structured
           * Outputs which ensures the model will match your supplied JSON schema. Learn more
           * in the
           * [Structured Outputs guide](https://platform.openai.com/docs/guides/structured-outputs).
           *
           * Setting to `{ "type": "json_object" }` enables the older JSON mode, which
           * ensures the message the model generates is valid JSON. Using `json_schema` is
           * preferred for models that support it.
           */
          response_format: ResponseFormat;
          /**
           * The 'n' parameter to propagate to the upstream Query.
           * The base 'n' parameter controls the number of Query Tool choices,
           * whereas 'query_n' controls the number of Query choices per Query Tool choice.
           */
          query_n?: number;
        }

        export interface ChatCompletionCreateParamsStreaming
          extends ChatCompletionCreateParamsBase {
          /**
           * If set to true, the model response data will be streamed to the client as it is
           * generated using
           * [server-sent events](https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events/Using_server-sent_events#Event_stream_format).
           * See the
           * [Streaming section below](https://platform.openai.com/docs/api-reference/chat/streaming)
           * for more information, along with the
           * [streaming responses](https://platform.openai.com/docs/guides/streaming-responses)
           * guide for more information on how to handle the streaming events.
           */
          stream: true;
        }

        export interface ChatCompletionCreateParamsNonStreaming
          extends ChatCompletionCreateParamsBase {
          /**
           * If set to true, the model response data will be streamed to the client as it is
           * generated using
           * [server-sent events](https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events/Using_server-sent_events#Event_stream_format).
           * See the
           * [Streaming section below](https://platform.openai.com/docs/api-reference/chat/streaming)
           * for more information, along with the
           * [streaming responses](https://platform.openai.com/docs/guides/streaming-responses)
           * guide for more information on how to handle the streaming events.
           */
          stream: false;
        }

        export type ChatCompletionCreateParams =
          | ChatCompletionCreateParamsStreaming
          | ChatCompletionCreateParamsNonStreaming;

        export type ResponseFormat =
          | {
              tool: "statistical_summary";
              think: boolean;
            }
          | {
              tool: "weighted_average_choice";
              model: Embeddings.Model;
            }
          | ({
              tool: "weighted_average_choice";
              model: Embeddings.Model;
            } & OpenAI.ChatCompletionCreateParams["response_format"]);

        /**
         * Represents a streamed chunk of a chat completion response returned by the model,
         * based on the provided input.
         * [Learn more](https://platform.openai.com/docs/guides/streaming-responses).
         */
        export interface ChatCompletionChunk
          extends Omit<
            Chat.Completions.ChatCompletionChunk,
            "choices" | "provider"
          > {
          /**
           * A list of chat completion choices. Can contain more than one elements if `n` is
           * greater than 1. Can also be empty for the last chunk if you set
           * `stream_options: {"include_usage": true}`.
           */
          choices: ChatCompletionChunk.Choice[];
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
          export function deepClone({
            id,
            choices,
            created,
            model,
            object,
            service_tier,
            system_fingerprint,
            usage,
          }: ChatCompletionChunk): ChatCompletionChunk {
            return {
              id,
              choices: Choice.deepCloneList(choices),
              created,
              model,
              object,
              ...(service_tier !== undefined ? { service_tier } : {}),
              ...(system_fingerprint !== undefined
                ? { system_fingerprint }
                : {}),
              ...(usage !== undefined ? { usage: Usage.deepClone(usage) } : {}),
            };
          }

          export interface Choice
            extends Omit<Chat.Completions.ChatCompletionChunk.Choice, "delta"> {
            /**
             * A chat completion delta generated by streamed model responses.
             */
            delta: Choice.Delta;
          }

          export namespace Choice {
            export function merged(a: Choice, b: Choice): [Choice, boolean] {
              const [delta, deltaChanged] = merge(
                a.delta,
                b.delta,
                Delta.merged
              );
              const [finish_reason, finish_reasonChanged] = merge(
                a.finish_reason,
                b.finish_reason
              );
              const index = a.index;
              const [logprobs, logprobsChanged] = merge(
                a.logprobs,
                b.logprobs,
                Chat.Completions.ChatCompletionChunk.Choice.Logprobs.merged
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
            export function deepClone({
              delta,
              finish_reason,
              index,
              logprobs,
            }: Choice): Choice {
              return {
                delta: Delta.deepClone(delta),
                finish_reason,
                index,
                ...(logprobs !== undefined
                  ? {
                      logprobs: logprobs
                        ? Chat.Completions.ChatCompletionChunk.Choice.Logprobs.deepClone(
                            logprobs
                          )
                        : null,
                    }
                  : {}),
              };
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
            export function deepCloneList(choices: Choice[]): Choice[] {
              return choices.map(Choice.deepClone);
            }

            export interface Delta
              extends OpenAI.Chat.Completions.ChatCompletionChunk.Choice.Delta {
              /**
               * The upstream Query used to generate this response choice.
               */
              reasoning?: Query.ChatCompletionChunk;
              /**
               * The role of the author of this message.
               */
              role?: "assistant";
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
                  Query.ChatCompletionChunk.merged
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
                  Chat.Completions.ChatCompletionChunk.Choice.Delta.ToolCall
                    .mergedList
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
              export function deepClone({
                content,
                reasoning,
                refusal,
                role,
                tool_calls,
              }: Delta): Delta {
                return {
                  ...(content !== undefined ? { content } : {}),
                  ...(reasoning !== undefined ? { reasoning } : {}),
                  ...(refusal !== undefined ? { refusal } : {}),
                  ...(role !== undefined ? { role } : {}),
                  ...(tool_calls !== undefined
                    ? {
                        tool_calls:
                          Chat.Completions.ChatCompletionChunk.Choice.Delta.ToolCall.deepCloneList(
                            tool_calls
                          ),
                      }
                    : {}),
                };
              }
            }
          }
        }

        /**
         * Represents a chat completion response returned by model, based on the provided
         * input.
         */
        export interface ChatCompletion
          extends Omit<
            Chat.Completions.ChatCompletion,
            "choices" | "provider"
          > {
          /**
           * A list of chat completion choices. Can be more than one if `n` is greater
           * than 1.
           */
          choices: ChatCompletion.Choice[];
        }

        export namespace ChatCompletion {
          export interface Choice
            extends Omit<Chat.Completions.ChatCompletion.Choice, "message"> {
            /**
             * A chat completion message generated by the model.
             */
            message: Choice.Message;
          }

          export namespace Choice {
            export interface Message extends OpenAI.ChatCompletionMessage {
              /**
               * The upstream Query used to generate this response choice.
               */
              reasoning: Query.ChatCompletion;
            }
          }
        }
      }
    }
  }

  export namespace Embeddings {
    export type Model = "deepinfra/qwen/qwen3-embedding-4b";

    export interface CreateEmbeddingResponse
      extends OpenAI.Embeddings.CreateEmbeddingResponse {
      /**
       * The usage information for the request.
       */
      usage: Usage;
    }

    export namespace CreateEmbeddingResponse {
      export function deepClone({
        data,
        model,
        object,
        usage,
      }: CreateEmbeddingResponse): CreateEmbeddingResponse {
        return {
          data: data.map(Embedding.deepClone),
          model,
          object,
          usage: Usage.deepClone(usage),
        };
      }

      export namespace Embedding {
        export function deepClone({
          embedding,
          index,
          object,
        }: OpenAI.Embeddings.Embedding): OpenAI.Embeddings.Embedding {
          return {
            embedding: [...embedding],
            index,
            object,
          };
        }
      }
    }
  }

  export interface Usage extends OpenAI.CompletionUsage {
    /**
     * The cost of the completion request.
     */
    cost?: number;
    /**
     * The upstream costs of the completion request.
     */
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
    export function deepClone({
      completion_tokens,
      prompt_tokens,
      total_tokens,
      completion_tokens_details,
      prompt_tokens_details,
      cost,
      cost_details,
    }: Usage): Usage {
      return {
        completion_tokens,
        prompt_tokens,
        total_tokens,
        ...(completion_tokens_details !== undefined
          ? {
              completion_tokens_details: CompletionTokensDetails.deepClone(
                completion_tokens_details
              ),
            }
          : {}),
        ...(prompt_tokens_details !== undefined
          ? {
              prompt_tokens_details: PromptTokensDetails.deepClone(
                prompt_tokens_details
              ),
            }
          : {}),
        ...(cost !== undefined ? { cost } : {}),
        ...(cost_details !== undefined
          ? { cost_details: CostDetails.deepClone(cost_details) }
          : {}),
      };
    }

    export namespace CompletionTokensDetails {
      export function merged(
        a: OpenAI.CompletionUsage.CompletionTokensDetails,
        b: OpenAI.CompletionUsage.CompletionTokensDetails
      ): [OpenAI.CompletionUsage.CompletionTokensDetails, boolean] {
        const [accepted_prediction_tokens, accepted_prediction_tokensChanged] =
          merge(
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
        const [rejected_prediction_tokens, rejected_prediction_tokensChanged] =
          merge(
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
              ...(reasoning_tokens !== undefined ? { reasoning_tokens } : {}),
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
      export function deepClone({
        accepted_prediction_tokens,
        audio_tokens,
        reasoning_tokens,
        rejected_prediction_tokens,
      }: OpenAI.CompletionUsage.CompletionTokensDetails): OpenAI.CompletionUsage.CompletionTokensDetails {
        return {
          ...(accepted_prediction_tokens !== undefined
            ? { accepted_prediction_tokens }
            : {}),
          ...(audio_tokens !== undefined ? { audio_tokens } : {}),
          ...(reasoning_tokens !== undefined ? { reasoning_tokens } : {}),
          ...(rejected_prediction_tokens !== undefined
            ? { rejected_prediction_tokens }
            : {}),
        };
      }
    }

    export namespace PromptTokensDetails {
      export function merged(
        a: OpenAI.CompletionUsage.PromptTokensDetails,
        b: OpenAI.CompletionUsage.PromptTokensDetails
      ): [OpenAI.CompletionUsage.PromptTokensDetails, boolean] {
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
      export function deepClone({
        audio_tokens,
        cached_tokens,
      }: OpenAI.CompletionUsage.PromptTokensDetails): OpenAI.CompletionUsage.PromptTokensDetails {
        return {
          ...(audio_tokens !== undefined ? { audio_tokens } : {}),
          ...(cached_tokens !== undefined ? { cached_tokens } : {}),
        };
      }
    }

    export interface CostDetails {
      /**
       * The cost of the completion request from upstream.
       */
      upstream_inference_cost?: number;
      /**
       * The cost of the completion request from upstream's upstream.
       */
      upstream_upstream_inference_cost?: number;
    }

    export namespace CostDetails {
      export function merged(
        a: CostDetails,
        b: CostDetails
      ): [CostDetails, boolean] {
        const [upstream_inference_cost, upstream_inference_costChanged] = merge(
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
      export function deepClone({
        upstream_inference_cost,
        upstream_upstream_inference_cost,
      }: CostDetails): CostDetails {
        return {
          ...(upstream_inference_cost !== undefined
            ? { upstream_inference_cost }
            : {}),
          ...(upstream_upstream_inference_cost !== undefined
            ? { upstream_upstream_inference_cost }
            : {}),
        };
      }
    }
  }

  export interface Error {
    code: number;
    message: unknown;
  }

  export namespace Error {
    export function deepClone({ code, message }: Error): Error {
      return {
        code,
        message: deepCloneJsonValue(message),
      };
    }
  }

  export namespace Models {
    export interface Model {
      id: string;
      name: string;
      created: number;
      description: string;
      architecture: Model.Architecture;
      top_provider: Model.TopProvider;
      pricing: Model.Pricing;
      context_length?: number;
      hugging_face_id?: string;
      per_request_limits?: Record<string, unknown>;
      supported_parameters?: string[];
    }

    export async function list(
      openai: OpenAI,
      options?: OpenAI.RequestOptions
    ): Promise<{ data: Model[] }> {
      const response = await openai.models.list(options);
      return response as unknown as { data: Model[] };
    }

    export interface ModelWithProviders {
      id: string;
      name: string;
      created: number;
      description: string;
      architecture: Model.Architecture;
      endpoints: Model.Provider[];
    }

    export async function retrieve(
      openai: OpenAI,
      model: string,
      options?: OpenAI.RequestOptions
    ): Promise<{ data: ModelWithProviders }> {
      const response = await openai.models.retrieve(model, options);
      return response as unknown as { data: ModelWithProviders };
    }

    export namespace Model {
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
    }
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
  function deepCloneJsonValue(value: unknown): unknown {
    if (Array.isArray(value)) {
      return value.map(deepCloneJsonValue);
    } else if (typeof value === "object" && value !== null) {
      return Object.fromEntries(
        Object.entries(value).map(([key, val]) => [
          key,
          deepCloneJsonValue(val),
        ])
      );
    }
    return value;
  }
}
