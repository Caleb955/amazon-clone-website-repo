import { loadProductFetch } from '../data/products.js';
import { renderOrderSummary } from './checkout/renderOrderSummary.js';
import { renderPaymentSummary } from './checkout/renderPaymentSummary.js';

loadProductFetch().then(() => {
    renderPaymentSummary();
    renderOrderSummary();
});