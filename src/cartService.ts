import { CartContext, CartItem } from './types';
import { createCart, getCart, saveCart } from './salesforceCartClient';

export function createNewCart(): { cartId: string } {
  const cart = createCart();
  return { cartId: cart.cartId };
}

export function getCartDetails(cartId: string) {
  const cart = getCart(cartId);
  if (!cart) return null;
  return {
    items: cart.items,
    totals: calculateTotals(cart.items),
    expiresAt: cart.expiresAt
  };
}

export function addItem(cartId: string, sku: string, quantity: number) {
  const cart = getCart(cartId);
  if (!cart) return null;
  const idx = cart.items.findIndex(item => item.sku === sku);
  if (idx > -1) {
    cart.items[idx].quantity += quantity;
  } else {
    cart.items.push({ sku, quantity });
  }
  saveCart(cart);
  return cart.items;
}

export function removeItem(cartId: string, sku: string) {
  const cart = getCart(cartId);
  if (!cart) return null;
  cart.items = cart.items.filter(item => item.sku !== sku);
  saveCart(cart);
  return cart.items;
}

export function checkoutCart(cartId: string): boolean {
  const cart = getCart(cartId);
  if (!cart) return false;
  delete cart.items; // simple "finalize"
  saveCart(cart);
  return true;
}

function calculateTotals(items: CartItem[]): { subtotal: number; tax: number; total: number } {
  const subtotal = items.reduce((sum, i) => sum + 10 * i.quantity, 0);
  const tax = subtotal * 0.13;
  const total = subtotal + tax;
  return { subtotal, tax, total };
}
