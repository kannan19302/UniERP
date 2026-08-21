# Tenant model to RLS migration linkage: prisma/schema/ai-governance.prisma

Lexical linkage compares effective Prisma table names with tables named by RLS ENABLE/FORCE/CREATE POLICY migration statements. A match is structural evidence, not a runtime policy test.

| Model | Effective table | tenantId | Named by RLS migration | Status |
| --- | --- | --- | --- | --- |
| `AiProviderModel` | `ai_provider_models` | no | no | global/ownership review |
| `AiPromptVersion` | `ai_prompt_versions` | no | no | global/ownership review |
| `AiMcpServer` | `ai_mcp_servers` | no | no | global/ownership review |
| `AiRagIndex` | `ai_rag_indexes` | no | no | global/ownership review |
| `AiAgentRegistration` | `ai_agent_registrations` | no | no | global/ownership review |
| `AiEvalSuite` | `ai_eval_suites` | no | no | global/ownership review |
| `AiEvalCase` | `ai_eval_cases` | no | no | global/ownership review |
| `AiEvalRun` | `ai_eval_runs` | no | no | global/ownership review |
| `AiGuardrailPolicy` | `ai_guardrail_policies` | no | no | global/ownership review |
| `AiGuardrailEvent` | `ai_guardrail_events` | no | no | global/ownership review |

