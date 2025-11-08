# Architecture & Abstractions

This API is structured around three main building blocks:

**1. HTTP Layer (index.ts)**
Exposes REST endpoints for core cart actions (create, get, add item, remove item, checkout). Routes are minimal; actual business logic lives in services.

**2. Cart Service (cartService.ts)**
Contains all the functions responsible for handling cart operations. This includes creating a cart, modifying its contents, and managing expirations. The service is written as pure functions as much as possible, making it simple to unit test and understand.

**3. SalesforceCartClient Test Double (salesforceCartClient.ts)**
This module simulates a Salesforce cart context, managing in-memory cart state with expiry logic. No real calls to Salesforce or any external systems are made—just pure Node memory objects and a timeout check.

Type interfaces (in types.ts) tie every response together and keep everything robust in terms of TypeScript safety.

The approach prioritizes testability, modularity, and keeping things simple. Since persistence isn’t required, nothing leaves memory; everything is easy to reset and verify in tests.
