import dayjs from '../../dayjs/index.js';
import { loadProductFetch, products } from '../../data/products.js';
import formatCurrency from '../utils/money.js';
import { cart, saveToStorage } from '../../data/cart.js';
import { deliveryOptions } from '../../data/deliveryOptions.js';

loadProductFetch().then(() => {
    runOrder();
});

let orderData = JSON.parse(localStorage.getItem('orderdata')) || '';

function runOrder() {
    document.querySelector('.js-orders-grid')
        .innerHTML = orderData;
}

const datePlaced = dayjs().format('MMMM, D');

export function createOrder(cart) {
    let total = 0;
    let idConcat = '';

    const data = cart.map((cartItem) => {
        let matchingId;
        products.forEach((product) => {
            if (cartItem.productId === product.id) {
                matchingId = product;
            }
        });

        total += matchingId.priceCents;
        idConcat += matchingId.id;

        return matchingId;
    });


    orderData += `
        <div class="order-container">
            <div class="order-header">
                <div class="order-header-left-section">
                <div class="order-date">
                    <div class="order-header-label">Order Placed:</div>
                    <div>${datePlaced}</div>
                </div>
                <div class="order-total">
                    <div class="order-header-label">Total:</div>
                    <div>$${formatCurrency(total)}</div>
                </div>
                </div>

                <div class="order-header-right-section">
                <div class="order-header-label">Order ID:</div>
                <div>${2 > 1 ? "27cba69d-4c3d-4098-b42d-ac7fa62b7664" : idConcat}</div>
                </div>
            </div>

            <div class="order-details-grid">
            ${callProduct(cart, data)}
            </div>
        </div>`;

    saveToStorage('orderdata', orderData)
}

function callProduct(param, param2) {
    let productHTML = '';

    param.forEach((detail) => {
        let imageUrl;

        param2.find((data) => {
            if (data.id === detail.productId) {
                imageUrl = data;
            }
        });

        const dateData = deliveryOptions.find((option) => {
            return option.id === detail.deliveryOptionId;
        });

        const date = dayjs().add(dateData.deliveryDays, 'days');
        const dateString = `${date.format('MMMM')} ${date.format('D')}`;

        productHTML += `
            <div class="product-image-container">
                <img src="${imageUrl.image}">
            </div>


            <div class="product-details">
                <div class="product-name">
                    ${imageUrl.name}
                </div>
                <div class="product-delivery-date">
                    Arriving on: ${dateString}
                </div>
                <div class="product-quantity">
                    Quantity: ${detail.quantity}
                </div>
                <button class="buy-again-button button-primary">
                    <img class="buy-again-icon" src="images/icons/buy-again.png">
                    <span class="buy-again-message">Buy it again</span>
                </button>
            </div>

            <div class="product-actions">
                <a href="tracking.html">
                    <button class="track-package-button button-secondary">
                    Track package
                    </button>
                </a>
            </div>
        `;
    });

    return productHTML;
}