import { CartContext, CartItem } from './types';

const INMEM_CARTS: Record<string, CartContext> = {};
const CART_TIMEOUT_MS = 10 * 60 * 1000; // 10 minutes

export function createCart(): CartContext {
  const cartId = Math.random().toString(36).substring(2);
  const now = Date.now();
  const context: CartContext = {
    cartId,
    items: [],
    createdAt: now,
    expiresAt: now + CART_TIMEOUT_MS
  };
  INMEM_CARTS[cartId] = context;
  return context;
}

export function getCart(cartId: string): CartContext | null {
  const cart = INMEM_CARTS[cartId];
  if (!cart || cart.expiresAt < Date.now()) {
    delete INMEM_CARTS[cartId];
    return null;
  }
  return cart;
}

export function saveCart(cart: CartContext) {
  INMEM_CARTS[cart.cartId] = cart;
}