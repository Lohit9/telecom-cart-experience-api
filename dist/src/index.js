"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cartService_1 = require("./cartService");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.post('/cart', (req, res) => {
    const result = (0, cartService_1.createNewCart)();
    res.status(201).json(result);
});
app.get('/cart/:cartId', (req, res) => {
    const response = (0, cartService_1.getCartDetails)(req.params.cartId);
    if (!response)
        return res.status(404).json({ error: 'Cart not found or expired' });
    res.json(response);
});
app.post('/cart/:cartId/items', (req, res) => {
    const { sku, quantity } = req.body;
    const items = (0, cartService_1.addItem)(req.params.cartId, sku, quantity);
    if (!items)
        return res.status(410).json({ error: 'Cart expired' });
    res.json({ items });
});
app.delete('/cart/:cartId/items/:sku', (req, res) => {
    const items = (0, cartService_1.removeItem)(req.params.cartId, req.params.sku);
    if (!items)
        return res.status(410).json({ error: 'Cart expired' });
    res.json({ items });
});
app.post('/cart/:cartId/checkout', (req, res) => {
    const success = (0, cartService_1.checkoutCart)(req.params.cartId);
    if (!success)
        return res.status(410).json({ error: 'Cart expired' });
    res.json({ result: 'success' });
});
// Listen
app.listen(3000, () => {
    console.log('API running at http://localhost:3000');
});
