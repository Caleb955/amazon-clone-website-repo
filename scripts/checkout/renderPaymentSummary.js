import { updateHeaderQuantity, cart } from "../../data/cart.js";
import { products } from "../../data/products.js";
import { deliveryOptions } from "../../data/deliveryOptions.js";
import formatCurrency from "../utils/money.js";

export function renderPaymentSummary() {
    let productTotal = 0;
    let shippingTotal = 0;
    let totalBeforeTax = 0;
    let tax = 0;
    let total = 0;

    cart.forEach((cartItem) => {
        let matchingId;
        products.forEach((product) => {
            if (product.id === cartItem.productId) {
                matchingId = product;
            }
        });

        let shipping;

        deliveryOptions.find((option) => {
            if (option.id === cartItem.deliveryOptionId) {
                shipping = option.priceCents;
            }
        });

        productTotal += matchingId.priceCents;
        shippingTotal += shipping;
        totalBeforeTax = productTotal + shippingTotal;
        tax = totalBeforeTax * 0.1;
        total = totalBeforeTax + tax;
    });
    
    const payment = `
        <div class="payment-summary-title">
            Order Summary
        </div>
    
        <div class="payment-summary-row">
            <div>Items (<span class="js-checkout-sum">3</span>):</div>
            <div class="payment-summary-money">$${formatCurrency(productTotal)}</div>
        </div>
    
        <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money">$${formatCurrency(shippingTotal)}</div>
        </div>
    
        <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">$${formatCurrency(totalBeforeTax)}</div>
        </div>
    
        <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money">$${formatCurrency(tax)}</div>
        </div>
    
        <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money">$${formatCurrency(total)}</div>
        </div>
    
        <button class="place-order-button button-primary">
            Place your order
        </button>
    `;
    
    
    document.querySelector('.js-payment-summary')
        .innerHTML = payment;
    
    updateHeaderQuantity('.js-checkout-sum')
}