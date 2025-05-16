import {
  ChatCompletionContentPart,
  ChatCompletionContentPartRefusal,
  ChatCompletionCreateParams,
  ChatCompletionMessageParam,
  ChatCompletionMessageToolCall,
  ChatCompletionTool,
} from "openai/resources/chat";
import {
  ResponseFormatJSONObject,
  ResponseFormatJSONSchema,
  ResponseFormatText,
} from "openai/resources/shared";
import { Value } from "src/query/proto/google/protobuf/struct";
import { StringValue } from "src/query/proto/google/protobuf/wrappers";
import {
  ContentPart,
  JsonSchema,
  Message,
  MessageContent,
  QueryRequest,
  Stop,
  Tool,
  ToolCall,
} from "src/query/proto/objective_ai_proto/objective_ai";

export function convertRequest({
  messages,
  model,
  response_format,
  stop,
  max_completion_tokens,
  tools,
}: ChatCompletionCreateParams): QueryRequest {
  if (response_format === undefined) {
    throw new Error("response_format is required");
  }
  return {
    messages: messages.map(convertMessage),
    metaModel: model,
    responseFormat: convertResponseFormat(response_format),
    stop: stop !== undefined && stop !== null ? convertStop(stop) : undefined,
    maxTokens:
      max_completion_tokens !== undefined && max_completion_tokens !== null
        ? { value: max_completion_tokens }
        : undefined,
    tools: tools !== undefined ? tools.map(convertTool) : [],
  };
}

function convertMessage(message: ChatCompletionMessageParam): Message {
  if (message.role === "user") {
    const { content } = message;
    return {
      kind: {
        oneofKind: "user",
        user: {
          content: convertMessageContent(content),
        },
      },
    };
  } else if (message.role === "assistant") {
    const { tool_calls } = message;
    const content = message.content || "";
    return {
      kind: {
        oneofKind: "assistant",
        assistant: {
          content: convertMessageContent(content),
          toolCalls:
            tool_calls !== undefined ? tool_calls.map(convertToolCall) : [],
        },
      },
    };
  } else if (message.role === "system") {
    const { content } = message;
    return {
      kind: {
        oneofKind: "system",
        system: {
          content: convertMessageContent(content),
        },
      },
    };
  } else if (message.role === "tool") {
    const { content, tool_call_id } = message;
    return {
      kind: {
        oneofKind: "tool",
        tool: {
          content: convertMessageContent(content),
          toolCallId: tool_call_id,
        },
      },
    };
  } else {
    throw new Error(`'${message.role}' message role is not supported`);
  }
}

function convertResponseFormat(
  responseFormat:
    | ResponseFormatText
    | ResponseFormatJSONSchema
    | ResponseFormatJSONObject
): JsonSchema {
  if (responseFormat.type === "json_schema") {
    const {
      json_schema: { schema: schema_ = {} },
    } = responseFormat;
    return convertSchema(schema_);
  } else {
    throw new Error(
      `'${responseFormat.type}' response format is not supported`
    );
  }
}

function convertStop(stop: string | Array<string>): Stop {
  if (typeof stop === "string") {
    return {
      kind: {
        oneofKind: "text",
        text: stop,
      },
    };
  } else {
    return {
      kind: {
        oneofKind: "texts",
        texts: {
          texts: stop,
        },
      },
    };
  }
}

function convertTool({
  function: { name, description, parameters },
}: ChatCompletionTool): Tool {
  return {
    kind: {
      oneofKind: "function",
      function: {
        name,
        description:
          description !== undefined ? { value: description } : undefined,
        parameters:
          parameters !== undefined
            ? Value.fromJson(parameters as {})
            : Value.fromJson({}),
      },
    },
  };
}

function convertSchema({
  type: type_,
  description: description_,
  enum: enum_,
  items,
  properties,
}: Record<string, unknown>): JsonSchema {
  const tryToStringValue = (s: unknown): StringValue | undefined => {
    if (typeof s === "string") {
      return { value: s };
    } else {
      return undefined;
    }
  };
  if (typeof type_ === "string") {
    const type = type_.toLowerCase();
    const description = tryToStringValue(description_);
    if (type === "boolean") {
      return {
        kind: {
          oneofKind: "boolean",
          boolean: {
            description,
          },
        },
      };
    } else if (type === "number") {
      return {
        kind: {
          oneofKind: "number",
          number: {
            description,
          },
        },
      };
    } else if (type === "integer") {
      return {
        kind: {
          oneofKind: "integer",
          integer: {
            description,
          },
        },
      };
    } else if (type === "string") {
      return {
        kind: {
          oneofKind: "string",
          string: {
            description,
            enum: Array.isArray(enum_)
              ? enum_.filter((s) => typeof s === "string")
              : [],
          },
        },
      };
    } else if (type === "array") {
      return {
        kind: {
          oneofKind: "array",
          array: {
            description,
            items:
              items !== undefined && items !== null
                ? convertSchema(items as Record<string, unknown>)
                : convertSchema({}),
          },
        },
      };
    } else if (type === "object") {
      return {
        kind: {
          oneofKind: "object",
          object: {
            description,
            properties: Object.entries(properties || {}).map(
              ([key, value]) => ({ key, value: convertSchema(value) })
            ),
          },
        },
      };
    }
  }
  throw new Error(`'${type_}' schema type is not supported`);
}

function convertMessageContent(
  content:
    | string
    | Array<ChatCompletionContentPart | ChatCompletionContentPartRefusal>
): MessageContent {
  if (typeof content === "string") {
    return {
      kind: {
        oneofKind: "text",
        text: content,
      },
    };
  } else {
    return {
      kind: {
        oneofKind: "parts",
        parts: {
          parts: content.map(convertContentPart),
        },
      },
    };
  }
}

function convertContentPart(
  part: ChatCompletionContentPart | ChatCompletionContentPartRefusal
): ContentPart {
  if (part.type === "text") {
    const { text } = part;
    return {
      kind: {
        oneofKind: "text",
        text,
      },
    };
  } else if (part.type === "image_url") {
    const {
      image_url: { url, detail },
    } = part;
    return {
      kind: {
        oneofKind: "imageUrl",
        imageUrl: {
          url,
          detail: detail !== undefined ? { value: detail } : undefined,
        },
      },
    };
  } else {
    throw new Error(`'${part.type}' content part is not supported`);
  }
}

function convertToolCall({
  id,
  function: { arguments: arguments_, name },
}: ChatCompletionMessageToolCall): ToolCall {
  return {
    id,
    kind: {
      oneofKind: "function",
      function: {
        name,
        arguments: Value.fromJsonString(arguments_),
      },
    },
  };
}
