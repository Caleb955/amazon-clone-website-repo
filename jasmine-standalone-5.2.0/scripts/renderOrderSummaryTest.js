import { loadFromStorage, cart } from '../../data/cart.js';
import { renderOrderSummary } from '../../scripts/checkout/renderOrderSummary.js';
import { loadProductFetch } from '../../data/products.js';

// these test is going to be quite combact cause most thing wont work, cause these test is actually interacting with the dom

const productId1 = "e43638ce-6aa0-4b85-b27f-e1d07eb678c6";
const productId2 = "15b6fc6f-327a-4ec4-896f-486349e85a3d";

describe('test suite: renderOrderSummary, ', () => {
    beforeAll((done) => {
        loadProductFetch().then(() => {
            done();
        });
    });

    beforeEach(() => {
        document.querySelector('.js-test-summary')
            .innerHTML = `
                <div class="js-order-summary"></div>
                <div class="js-payment-summary"></div>
            `;
        
        spyOn(localStorage, 'setItem');

        spyOn(localStorage, 'getItem').and.callFake(() => {
            return JSON.stringify([{
                productId: productId1,
                quantity: 2,
                deliveryOptionId: "1"
            }, {
                productId: productId2,
                quantity: 2,
                deliveryOptionId: "2"
            }]);
        });

        loadFromStorage();

        renderOrderSummary();
    });

    afterEach(() => {
        document.querySelector('.js-test-summary')
            .innerHTML = '';
    })
    
    it('display the cart', () => {
        expect(
            document.querySelectorAll('.js-cart-item-container').length
        ).toEqual(2);

        expect(
            document.querySelector(`.js-cart-item-details-${productId1}`).innerText
        ).toContain('Quantity: 2');

        expect(
            document.querySelector(`.js-cart-item-details-${productId2}`).innerText
        ).toContain('$20.95');

        expect(localStorage.setItem).toHaveBeenCalledTimes(0);
        expect(localStorage.setItem).toHaveBeenCalledTimes(0);
    });

    it('removes a product', () => {
        document.querySelector(`.js-delete-quantity-link-${productId1}`).click();

        expect(
            document.querySelectorAll('.js-cart-item-container').length
        ).toEqual(1);

        expect(
            document.querySelector(`.js-cart-item-container-${productId1}`)
        ).toEqual(null);

        expect(
            document.querySelector(`.js-cart-item-container-${productId2}`)
        ).not.toEqual(null);

        expect(
            cart[0].deliveryOptionId
        ).toEqual('2');
    });
});
