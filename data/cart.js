export let cart = JSON.parse(localStorage.getItem('cart'));

if (!cart) {
    cart = [
        {
            productId:"e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
            quantity: 2,
            deliveryOptionId: "1"
        }, {
            productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
            quantity: 1,
            deliveryOptionId: "2"
        }
    ];
}

export function addToCart(productId) {
    let matchingItem = loopCart(productId);

    if (matchingItem) {
        matchingItem.quantity += 1;
    } else {
        cart.push({
            productId,
            quantity: 1
        });
    }

    saveToStorage();
}

function loopCart(productId) {
    let matchingItem;

    cart.forEach((cartItem) => {
        if (cartItem.productId === productId) {
            matchingItem = cartItem;
        }
    });

    return matchingItem;
}

function saveToStorage() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

export function removeFromCart(productId) {
    const newArray = [];

    cart.forEach((cartItem) => {
        if (productId !== cartItem.productId) {
            newArray.push(cartItem);
        }
    });

    cart = newArray;

    saveToStorage();

    const container = document.querySelector(`.js-cart-item-container-${productId}`);

    container.remove();
}