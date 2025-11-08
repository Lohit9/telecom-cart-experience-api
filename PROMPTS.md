# Prompts and Notes

## Main Implementation Prompt

"Design and implement a minimalist REST API in Node.js with TypeScript for a telecom shopping cart. It should expose endpoints for cart operations (creation, item add/remove, checkout) as outlined in the specs below. All data must remain in-memory, with a fake SalesforceCartClient handling cart ID and expiry. Organize logic by HTTP layer, Cart Service (business/domain), and SalesforceCartClient (infrastructure/test double). Include TypeScript types for all request/response schemas.

Provide:

- `src/index.ts`: server & routes
- `src/cartService.ts`: service logic
- `src/salesforceCartClient.ts`: in-memory cart handling with expiry simulation
- `src/types.ts`: all relevant interfaces and types
- Unit tests in `tests/cartService.test.ts`
- Sample README with run instructions

Reference architecture and endpoint details below for expected behaviors.

See [SPEC-A-architecture.md](./SPEC-A-architecture.md) for architecture details.
See [SPEC-B-api.md](./SPEC-B-api.md) for endpoint contracts."

---

## Follow-Up Prompts

#### Prompt 1:

“Expand the unit test coverage in the  /tests  directory to include not just standard flows, but also critical edge cases. This should cover scenarios like cart expiration, repeated adds/removes for the same SKU, attempts to interact with a non-existent or expired cart, and any boundary or invalid input cases. For each function in  CartService , ensure that tests are isolated, use controlled test data, and do not rely on global state. Mock dependencies as needed to keep tests focused.”

#### Prompt 2:

“Audit each API route for consistent and informative error responses. Align all error objects with the structure defined in the endpoint contract spec ( { \"error\": \"message\" } ). Ensure that the API’s error handling is robust; for example, return precise error codes (404 for not found, 410 for expired contexts, etc.) and clear messages for each failure condition. Add tests that intentionally trigger errors to verify these behaviors.”

---
