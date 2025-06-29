import OpenAI from "openai";
import { APIPromise } from "openai/core";
import { Stream } from "openai/streaming";

export namespace ObjectiveAI {
  export namespace Chat {
    export namespace Completions {
      export function create(
        openai: OpenAI,
        body: ChatCompletionCreateParams & { stream: true },
        options?: OpenAI.RequestOptions
      ): APIPromise<Stream<ChatCompletionChunk>>;
      export function create(
        openai: OpenAI,
        body: ChatCompletionCreateParams & { stream?: false },
        options?: OpenAI.RequestOptions
      ): APIPromise<ChatCompletion>;
      export function create(
        openai: OpenAI,
        body: Query.ChatCompletionCreateParams & { stream: true },
        options?: OpenAI.RequestOptions
      ): APIPromise<Stream<Query.ChatCompletionChunk>>;
      export function create(
        openai: OpenAI,
        body: Query.ChatCompletionCreateParams & { stream?: false },
        options?: OpenAI.RequestOptions
      ): APIPromise<Query.ChatCompletion>;
      export function create(
        openai: OpenAI,
        body: QueryTool.ChatCompletionCreateParams & { stream: true },
        options?: OpenAI.RequestOptions
      ): APIPromise<Stream<QueryTool.ChatCompletionChunk>>;
      export function create(
        openai: OpenAI,
        body: QueryTool.ChatCompletionCreateParams & { stream?: false },
        options?: OpenAI.RequestOptions
      ): APIPromise<QueryTool.ChatCompletion>;
      export function create(
        openai: OpenAI,
        body:
          | ChatCompletionCreateParams
          | Query.ChatCompletionCreateParams
          | QueryTool.ChatCompletionCreateParams,
        options?: OpenAI.RequestOptions
      ): APIPromise<
        | ChatCompletion
        | Stream<ChatCompletionChunk>
        | Query.ChatCompletion
        | Stream<Query.ChatCompletionChunk>
        | QueryTool.ChatCompletion
        | Stream<QueryTool.ChatCompletionChunk>
      > {
        return openai.chat.completions.create(body, options) as APIPromise<
          | ChatCompletion
          | Stream<ChatCompletionChunk>
          | Query.ChatCompletion
          | Stream<Query.ChatCompletionChunk>
          | QueryTool.ChatCompletion
          | Stream<QueryTool.ChatCompletionChunk>
        >;
      }

      export type ChatCompletionCreateParams =
        OpenAI.Chat.Completions.ChatCompletionCreateParams & {
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
        };

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
        extends OpenAI.Chat.Completions.ChatCompletionChunk {
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
      }

      export namespace ChatCompletionChunk {
        export type Choice =
          OpenAI.Chat.Completions.ChatCompletionChunk.Choice & {
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
          };

        export namespace Choice {
          export interface Delta
            extends OpenAI.Chat.Completions.ChatCompletionChunk.Choice.Delta {
            /**
             * Reasoning generated by the model, if applicable.
             */
            reasoning?: string;
          }
        }
      }

      /**
       * Represents a chat completion response returned by model, based on the provided
       * input.
       */
      export interface ChatCompletion
        extends OpenAI.Chat.Completions.ChatCompletion {
        /**
         * A list of chat completion choices. Can be more than one if `n` is greater
         * than 1.
         */
        choices: ChatCompletion.Choice[];
        /**
         * Usage statistics for the completion request.
         */
        usage?: Usage;
      }

      export namespace ChatCompletion {
        export type Choice = OpenAI.Chat.Completions.ChatCompletion.Choice & {
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
        };

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
        export type ChatCompletionCreateParams =
          Chat.Completions.ChatCompletionCreateParams & {
            /**
             * If provided, embeddings will be generated for each response choice.
             */
            embeddings?: Embeddings.Model;
            /**
             * If provided, will override the default weight for models with a corresponding index.
             */
            weights?: (number | null)[];
          };

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

        export interface Model {
          /**
           * The id for the model.
           */
          id: string;
          /**
           * The index of the model, within the parent Query Model.
           */
          index: number;
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
        }

        /**
         * Represents a streamed chunk of a chat completion response returned by the model,
         * based on the provided input.
         * [Learn more](https://platform.openai.com/docs/guides/streaming-responses).
         */
        export interface ChatCompletionChunk
          extends Chat.Completions.ChatCompletionChunk {
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
          export type Choice = Chat.Completions.ChatCompletionChunk.Choice & {
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
          };
        }

        /**
         * Represents a chat completion response returned by model, based on the provided
         * input.
         */
        export interface ChatCompletion
          extends Chat.Completions.ChatCompletion {
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
          export type Choice = Chat.Completions.ChatCompletion.Choice & {
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
          };
        }
      }

      export namespace QueryTool {
        export type ChatCompletionCreateParams =
          Query.ChatCompletionCreateParams & {
            /**
             * The 'n' parameter to propagate to the upstream Query.
             * The base 'n' parameter controls the number of Query Tool choices,
             * whereas 'query_n' controls the number of Query choices per Query Tool choice.
             */
            query_n?: number;
          };

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
          extends Chat.Completions.ChatCompletionChunk {
          /**
           * A list of chat completion choices. Can contain more than one elements if `n` is
           * greater than 1. Can also be empty for the last chunk if you set
           * `stream_options: {"include_usage": true}`.
           */
          choices: ChatCompletionChunk.Choice[];
        }

        export namespace ChatCompletionChunk {
          export type Choice = Chat.Completions.ChatCompletionChunk.Choice & {
            /**
             * A chat completion delta generated by streamed model responses.
             */
            delta: Choice.Delta;
          };

          export namespace Choice {
            export interface Delta
              extends OpenAI.Chat.Completions.ChatCompletionChunk.Choice.Delta {
              /**
               * The upstream Query used to generate this response choice.
               */
              reasoning?: Query.ChatCompletionChunk[];
            }
          }
        }

        /**
         * Represents a chat completion response returned by model, based on the provided
         * input.
         */
        export interface ChatCompletion
          extends Chat.Completions.ChatCompletion {
          /**
           * A list of chat completion choices. Can be more than one if `n` is greater
           * than 1.
           */
          choices: ChatCompletion.Choice[];
        }

        export namespace ChatCompletion {
          export type Choice = Chat.Completions.ChatCompletion.Choice & {
            /**
             * A chat completion message generated by the model.
             */
            message: Choice.Message;
          };

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
  }

  export interface Error {
    code: number;
    message:
      | null
      | boolean
      | number
      | string
      | unknown[]
      | Record<string, unknown>;
  }
}
