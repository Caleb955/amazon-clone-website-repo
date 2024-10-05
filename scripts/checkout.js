import { loadProductFetch, products } from "../data/products.js";
import { cart, removeFromCart } from "../data/cart.js";
import dayjs from '../dayjs/index.js';
import { deliveryOptions } from "../data/deliveryOptions.js";
import formatCurrency from "./utils/money.js";

loadProductFetch().then(() => {
    let cartHTML = '';
    
    cart.forEach((cartItem) => {
        
        let dateString;

        deliveryOptions.forEach((option) => {
            let matchDeliveryId;

            if (option.id === cartItem.deliveryOptionId) {
                matchDeliveryId = option;
            }


            if (matchDeliveryId) {

                let date = dayjs().add(matchDeliveryId.deliveryDays, 'days');
                let day = date.format('dddd');
                let month = date.format('MMMM');
                let dayDate = date.format('DD');
                
                
                dateString = `${day}, ${month} ${dayDate}`;
            }
        });
        
        products.forEach((product) => {


            if (cartItem.productId === product.id) {
                cartHTML += `
                    <div class="cart-item-container js-cart-item-container-${product.id}">
                        <div class="delivery-date">
                        Delivery date: ${dateString}
                        </div>

                        <div class="cart-item-details-grid">
                        <img class="product-image"
                            src=${product.image}>

                        <div class="cart-item-details">
                            <div class="product-name">
                            ${product.name}
                            </div>
                            <div class="product-price">
                            ${product.PriceUrl()}
                            </div>
                            <div class="product-quantity">
                            <span>
                                Quantity: <span class="quantity-label">${cartItem.quantity}</span>
                            </span>
                            <span class="update-quantity-link link-primary">
                                Update
                            </span>
                            <span class="delete-quantity-link link-primary js-delete-quantity-link" data-product-id="${product.id}">
                                Delete
                            </span>
                            </div>
                        </div>

                        <div class="delivery-options">
                            ${deliveryOptionHTML(product.id, cartItem.deliveryOptionId)}
                        </div>
                        </div>
                    </div>
                `;
            }
        });
    });

    function deliveryOptionHTML(productId, OptionId) {
        let optionHTML = '';

        deliveryOptions.forEach((option) => {

            let date = dayjs().add(option.deliveryDays, 'days');
            let day = date.format('dddd');
            let month = date.format('MMMM');
            let dayDate = date.format('DD');

            if (day === 'Sunday') {
                callWeekend(1);
            } else if (day === 'Saturday') {
                callWeekend(2);
            }

            function callWeekend(param) {
                date = dayjs().add(option.deliveryDays + param, 'days');

                day = date.format('dddd');
                month = date.format('MMMM');
                dayDate = date.format('DD');
            }

            const dateString = `${day}, ${month} ${dayDate}`;
            
            optionHTML += `
                <div class="delivery-option">
                    <input type="radio" ${OptionId === option.id ? 'checked' : ''}
                    class="delivery-option-input"
                    name="delivery-option-${productId}">
    
                    <div>
                        <div class="delivery-option-date">
                            ${dateString}
                        </div>
    
                        <div class="delivery-option-price">
                            ${option.priceCents === 0 ? 'FREE' : `$${formatCurrency(option.priceCents)}`}
                        </div>
                    </div>
                </div>
            `
        });

        return optionHTML;
    }

    document.querySelector('.js-order-summary')
        .innerHTML = cartHTML;


    document.querySelectorAll('.js-delete-quantity-link').forEach((link) => {
        link.addEventListener('click', () => {
            const {productId} = link.dataset;
    
            removeFromCart(productId);
        });
    });
});