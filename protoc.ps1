npx protoc `
    --ts_out src/query/proto/ `
    --ts_opt "ts_nocheck" `
    --ts_opt "server_none" `
    --ts_opt "long_type_number" `
    objective_ai_proto/objective_ai.proto
