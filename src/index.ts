import express from 'express';
import {
  createNewCart,
  getCartDetails,
  addItem,
  removeItem,
  checkoutCart
} from './cartService';

const app = express();
app.use(express.json());

app.post('/cart', (req, res) => {
  const result = createNewCart();
  res.status(201).json(result);
});

app.get('/cart/:cartId', (req, res) => {
  const response = getCartDetails(req.params.cartId);
  if (!response) return res.status(404).json({ error: 'Cart not found or expired' });
  res.json(response);
});

app.post('/cart/:cartId/items', (req, res) => {
  const { sku, quantity } = req.body;
  const items = addItem(req.params.cartId, sku, quantity);
  if (!items) return res.status(410).json({ error: 'Cart expired' });
  res.json({ items });
});

app.delete('/cart/:cartId/items/:sku', (req, res) => {
  const items = removeItem(req.params.cartId, req.params.sku);
  if (!items) return res.status(410).json({ error: 'Cart expired' });
  res.json({ items });
});

app.post('/cart/:cartId/checkout', (req, res) => {
  const success = checkoutCart(req.params.cartId);
  if (!success) return res.status(410).json({ error: 'Cart expired' });
  res.json({ result: 'success' });
});

// Listen
app.listen(3000, () => {
  console.log('API running at http://localhost:3000');
});
