import { findProducts } from "../data/products.js";
import { loadProductFetch } from "../data/products.js";
import { updateHeaderQuantity } from "../data/cart.js";

console.warn('deliveryTime is depreciated');

const url = new URL(window.location);
const productId = url.searchParams.get('productId');
const quantity = url.searchParams.get('quantity');
const deliveryId = url.searchParams.get('deliveryData');

loadProductFetch().then(() => {
    const data = findProducts(productId);

    updateHeaderQuantity('.js-cart-quantity');

    
    const html = `
    <div class="order-tracking">
        <a class="back-to-orders-link link-primary" href="orders.html">
        View all orders
        </a>
    
        <div class="delivery-date">
        Arriving on Monday, June 13
        </div>
    
        <div class="product-info">
            ${data.name}
        </div>
    
        <div class="product-info">
        Quantity: ${quantity}
        </div>
    
        <img class="product-image" src=${data.image}>
    
        <div class="progress-labels-container">
        <div class="progress-label">
            Preparing
        </div>
        <div class="progress-label current-status">
            Shipped
        </div>
        <div class="progress-label">
            Delivered
        </div>
        </div>
    
        <div class="progress-bar-container">
        <div class="progress-bar"></div>
        </div>
    </div>
    `
    document.querySelector('.js-main')
        .innerHTML = html;

    const warningNotice = document.querySelector('.js-warning-notice');

    function returnCartAlert() {
        warningNotice.style.transform = 'translateY(-100%)';
        warningNotice.style.opacity = '';
    }

    let timeoutId;

    clearTimeout(timeoutId);

    warningNotice.style.transition = 'transform .4s ease-in-out, opacity .4s ease-in-out'
    warningNotice.style.transform = '';
    warningNotice.style.opacity = '1';

    timeoutId = setTimeout(() => {
        returnCartAlert();
    }, 3000);
});



