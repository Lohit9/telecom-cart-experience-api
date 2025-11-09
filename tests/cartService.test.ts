import { createNewCart, addItem, getCartDetails, removeItem, checkoutCart } from '../src/cartService';

describe('Cart Service', () => {
  it('creates a cart and adds/removes items', () => {
    const { cartId } = createNewCart();
    expect(cartId).toBeDefined();

    let items = addItem(cartId, 'SKU1', 2);
    expect(items).not.toBeNull();
    expect(items!.length).toBe(1);
    items = addItem(cartId, 'SKU1', 1);
    expect(items![0].quantity).toBe(3);

    items = addItem(cartId, 'SKU2', 1);
    expect(items).not.toBeNull();
    expect(items!.length).toBe(2);

    items = removeItem(cartId, 'SKU1');
    expect(items).not.toBeNull();
    expect(items!.find(i => i.sku === 'SKU1')).toBeUndefined();

    const details = getCartDetails(cartId);
    expect(details).not.toBeNull();
    expect(details!.items.length).toBe(1);
  });

  it('rejects expired carts', () => {
    jest.useFakeTimers();
    const { cartId } = createNewCart();

    // Simulate cart expiry
    jest.advanceTimersByTime(7200000); // 2 hours

    expect(addItem(cartId, 'SKU1', 1)).toBeNull();
    expect(getCartDetails(cartId)).toBeNull();

    jest.useRealTimers();
  });

  it('can checkout a valid cart', () => {
    const { cartId } = createNewCart();
    addItem(cartId, 'SKU1', 1);
    expect(checkoutCart(cartId)).toBe(true);
  });
});
