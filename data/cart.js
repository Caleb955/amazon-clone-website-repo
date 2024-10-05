export const cart = JSON.parse(localStorage.getItem('cart')) || [];

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