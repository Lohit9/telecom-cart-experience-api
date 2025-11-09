"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cartService_1 = require("../src/cartService");
describe('Cart Service', () => {
    it('creates a cart and adds/removes items', () => {
        const { cartId } = (0, cartService_1.createNewCart)();
        expect(cartId).toBeDefined();
        let items = (0, cartService_1.addItem)(cartId, 'SKU1', 2);
        expect(items).not.toBeNull();
        expect(items.length).toBe(1);
        items = (0, cartService_1.addItem)(cartId, 'SKU1', 1);
        expect(items[0].quantity).toBe(3);
        items = (0, cartService_1.addItem)(cartId, 'SKU2', 1);
        expect(items).not.toBeNull();
        expect(items.length).toBe(2);
        items = (0, cartService_1.removeItem)(cartId, 'SKU1');
        expect(items).not.toBeNull();
        expect(items.find(i => i.sku === 'SKU1')).toBeUndefined();
        const details = (0, cartService_1.getCartDetails)(cartId);
        expect(details).not.toBeNull();
        expect(details.items.length).toBe(1);
    });
    it('rejects expired carts', () => {
        jest.useFakeTimers();
        const { cartId } = (0, cartService_1.createNewCart)();
        // Simulate cart expiry
        jest.advanceTimersByTime(7200000); // 2 hours
        expect((0, cartService_1.addItem)(cartId, 'SKU1', 1)).toBeNull();
        expect((0, cartService_1.getCartDetails)(cartId)).toBeNull();
        jest.useRealTimers();
    });
    it('can checkout a valid cart', () => {
        const { cartId } = (0, cartService_1.createNewCart)();
        (0, cartService_1.addItem)(cartId, 'SKU1', 1);
        expect((0, cartService_1.checkoutCart)(cartId)).toBe(true);
    });
});
