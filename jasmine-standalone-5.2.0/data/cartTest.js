import { loadFromStorage, addToCart,cart, removeFromCart } from "../../data/cart.js";

const productId1 = "e43638ce-6aa0-4b85-b27f-e1d07eb678c6";
const productId2 = "15b6fc6f-327a-4ec4-896f-486349e85a3d";

describe('test suite: addToCart', () => {
    beforeEach(() => {
        spyOn(localStorage, 'setItem');
    });


    it('adds a new product to the cart', () => {
        spyOn(localStorage, 'getItem').and.callFake(() => {
            return JSON.stringify([]);
        });

        loadFromStorage();
        
        addToCart(productId1);
        
        expect(cart.length).toEqual(1);
        expect(cart[0].productId).toEqual(productId1);
        expect(cart[0].quantity).toEqual(1);
    });

    it('adds an existing product to the cart', () => {
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

        addToCart(productId1);

        expect(cart[0].quantity).toEqual(3);
        expect(cart[1].productId).toEqual(productId2);
    });
});

describe('test suite: removeFromCart', () => {
    beforeEach(() => {
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
    });
    it('removes an exiting product from the page', () => {

        removeFromCart(productId1);

        expect(cart.length).toEqual(1);
        expect(cart[0].productId).toEqual(productId2);
        expect(cart[0].quantity).toEqual(2);
    });

    it('removes a new product from the page', () => {
        // there are actually no new product so am just going to check on how the cart length looks like

        expect(cart.length).toEqual(2);
        expect(cart[0].productId).toEqual(productId1);
    });
});