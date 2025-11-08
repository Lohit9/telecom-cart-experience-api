export interface CartItem {
    sku: string;
    quantity: number;
}

export interface CartContext {
    cartId: string;
    items: CartItem[];
    createdAt: number;
    expiresAt: number;
}

export interface CartTotals {
    subtotal: number;
    tax: number;
    total: number;
}