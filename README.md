# Telecom Cart API

A lightweight Node.js/TypeScript REST API for a telecom shopping cart. The backend is powered by an in-memory SalesforceCartClient test double (no real database or Salesforce calls). Designed for fast feedback, clear separation of concerns, and easy testability.

## Stack

- Node.js 20+
- TypeScript
- Express (minimal)
- Jest (tests)

## Getting Started

1. Install dependencies: `npm install`
2. Build the project: `npm run build`
3. Start the server: `npm start`
4. Run tests: `npm test`

## Structure

- `src/`: main code (server, service logic, test double).
- `tests/`: key unit tests.
- All current state is volatile and only persists in memory.

## Design Notes

- Purely stateless; cart context expires after X minutes idle (simulated).
- Every service operation is test-backed.
- Known Gaps: Not production hardened, no persistence layer, and no authentication.

Please see SPEC-A-architecture.md and SPEC-B-api.md for detailed design/contract information.
