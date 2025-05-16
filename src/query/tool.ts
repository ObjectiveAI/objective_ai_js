import { QueryResponse } from "./proto/objective_ai_proto/objective_ai";
import { Value } from "./proto/google/protobuf/struct";

export type JsonValue =
  | number
  | string
  | boolean
  | null
  | JsonObject
  | JsonArray;

export type JsonObject = { [key: string]: JsonValue };

export interface JsonArray extends Array<JsonValue> {}

export interface QueryToolContent {
  choices: QueryToolContentChoice[];
  winner_id: string;
  winner_confidence: number;
}

export interface QueryToolContentChoice {
  id: string;
  reasoning: string[];
  response: JsonValue;
  response_confidence: number;
}

export function queryToolContent({
  choices: protoChoices,
}: QueryResponse): QueryToolContent {
  const choices: QueryToolContentChoice[] = [];
  let winning_choice: QueryToolContentChoice | null = null;
  for (const { id, message, votes, confidence } of protoChoices) {
    const choice = {
      id,
      reasoning: votes.map(({ reasoning }) => reasoning),
      response:
        message?.content !== undefined ? Value.toJson(message.content) : {},
      response_confidence: confidence,
    };
    if (
      winning_choice === null ||
      confidence > winning_choice.response_confidence
    ) {
      winning_choice = choice;
    }
  }
  return {
    choices,
    winner_id: winning_choice?.id || "",
    winner_confidence: winning_choice?.response_confidence || 0,
  };
}
