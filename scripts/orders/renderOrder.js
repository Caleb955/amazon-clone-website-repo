import dayjs from '../../dayjs/index.js';
import { products } from '../../data/products.js';
import formatCurrency from '../utils/money.js';
import { saveToStorage, updateHeaderQuantity } from '../../data/cart.js';
import { deliveryOptions } from '../../data/deliveryOptions.js';

let orderData = JSON.parse(localStorage.getItem('orderdata')) || '';

export function runOrder() {
    if (localStorage.getItem('orderdata')) {
        document.querySelector('.js-orders-grid')
            .innerHTML = orderData;
    } else {
        document.querySelector('.js-orders-grid')
            .innerHTML = `
                <div class="notice-container">
                    <svg class="smile-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M464 256A208 208 0 1 0 48 256a208 208 0 1 0 416 0zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zm177.6 62.1C192.8 334.5 218.8 352 256 352s63.2-17.5 78.4-33.9c9-9.7 24.2-10.4 33.9-1.4s10.4 24.2 1.4 33.9c-22 23.8-60 49.4-113.6 49.4s-91.7-25.5-113.6-49.4c-9-9.7-8.4-24.9 1.4-33.9s24.9-8.4 33.9 1.4zM144.4 208a32 32 0 1 1 64 0 32 32 0 1 1 -64 0zm192-32a32 32 0 1 1 0 64 32 32 0 1 1 0-64z"/></svg>

                    <span class="notice-message">You currently dont have any active orders</span>
                </div>
            `;
    }

    updateHeaderQuantity('.js-cart-quantity');
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
                <a href="tracking.html?productId=${imageUrl.id}&quantity=${detail.quantity}&deliveryData=${detail.deliveryOptionId}">
                    <button class="track-package-button button-secondary">
                        Track package
                    </button>
                </a>
            </div>
        `;
    });

    return productHTML;
}