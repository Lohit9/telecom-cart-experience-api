# API Endpoint Contracts

**POST /cart**

- Purpose: Create a new cart.
- Response: 201 Created  
  `{ "cartId": string }`

**GET /cart/:cartId**

- Purpose: Get current cart, contents, totals, and expiry.
- Response: 200 OK  
  `{ "items": [...], "totals": {...}, "expiresAt": <timestamp> }`
- 404 if not found or expired.

**POST /cart/:cartId/items**

- Purpose: Add an item to the cart.
- Body: `{ "sku": string, "quantity": number }`
- Response: 200 OK  
  `{ "items": [...] }`
- 410 if cart has expired.

**DELETE /cart/:cartId/items/:sku**

- Purpose: Remove item from cart.
- Response: 200 OK  
  `{ "items": [...] }`
- 410 if cart expired.

**POST /cart/:cartId/checkout**

- Purpose: "Checkout" the cart (finalize).
- Response: 200 OK `{ "result": "success" }`
- 410 if cart expired.

Errors are always in form `{ "error": "message" }`.
All endpoints return data in JSON.
