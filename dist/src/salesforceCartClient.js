"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCart = createCart;
exports.getCart = getCart;
exports.saveCart = saveCart;
const INMEM_CARTS = {};
const CART_TIMEOUT_MS = 10 * 60 * 1000; // 10 minutes
function createCart() {
    const cartId = Math.random().toString(36).substring(2);
    const now = Date.now();
    const context = {
        cartId,
        items: [],
        createdAt: now,
        expiresAt: now + CART_TIMEOUT_MS
    };
    INMEM_CARTS[cartId] = context;
    return context;
}
function getCart(cartId) {
    const cart = INMEM_CARTS[cartId];
    if (!cart || cart.expiresAt < Date.now()) {
        delete INMEM_CARTS[cartId];
        return null;
    }
    return cart;
}
function saveCart(cart) {
    INMEM_CARTS[cart.cartId] = cart;
}
