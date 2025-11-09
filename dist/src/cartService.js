"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createNewCart = createNewCart;
exports.getCartDetails = getCartDetails;
exports.addItem = addItem;
exports.removeItem = removeItem;
exports.checkoutCart = checkoutCart;
const salesforceCartClient_1 = require("./salesforceCartClient");
function createNewCart() {
    const cart = (0, salesforceCartClient_1.createCart)();
    return { cartId: cart.cartId };
}
function getCartDetails(cartId) {
    const cart = (0, salesforceCartClient_1.getCart)(cartId);
    if (!cart)
        return null;
    return {
        items: cart.items,
        totals: calculateTotals(cart.items),
        expiresAt: cart.expiresAt
    };
}
function addItem(cartId, sku, quantity) {
    const cart = (0, salesforceCartClient_1.getCart)(cartId);
    if (!cart)
        return null;
    const idx = cart.items.findIndex(item => item.sku === sku);
    if (idx > -1) {
        cart.items[idx].quantity += quantity;
    }
    else {
        cart.items.push({ sku, quantity });
    }
    (0, salesforceCartClient_1.saveCart)(cart);
    return cart.items;
}
function removeItem(cartId, sku) {
    const cart = (0, salesforceCartClient_1.getCart)(cartId);
    if (!cart)
        return null;
    cart.items = cart.items.filter(item => item.sku !== sku);
    (0, salesforceCartClient_1.saveCart)(cart);
    return cart.items;
}
function checkoutCart(cartId) {
    const cart = (0, salesforceCartClient_1.getCart)(cartId);
    if (!cart)
        return false;
    cart.items = []; // simple "finalize"
    (0, salesforceCartClient_1.saveCart)(cart);
    return true;
}
function calculateTotals(items) {
    const subtotal = items.reduce((sum, i) => sum + 10 * i.quantity, 0);
    const tax = subtotal * 0.13;
    const total = subtotal + tax;
    return { subtotal, tax, total };
}
