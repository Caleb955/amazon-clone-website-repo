export let cart;

loadFromStorage();

export function loadFromStorage() {
    cart = JSON.parse(localStorage.getItem('cart'));

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
}

export function addToCart(productId) {
    let matchingItem = loopCart(productId);

    if (matchingItem) {
        matchingItem.quantity += 1;
    } else {
        cart.push({
            productId,
            quantity: 1,
            deliveryOptionId: "1"
        });
    }

    saveToStorage('cart', cart);
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

export function saveToStorage(param, param2) {
    localStorage.setItem(param, JSON.stringify(param2));
}

export function removeFromCart(productId) {
    const newArray = [];

    cart.forEach((cartItem) => {
        if (productId !== cartItem.productId) {
            newArray.push(cartItem);
        }
    });

    cart = newArray;

    saveToStorage('cart', cart);
}

export function updateDeliveryOption(param1, param2) {
    const matchingId = loopCart(param1);
    
    matchingId.deliveryOptionId = param2;
    saveToStorage('cart', cart);
}

export function updateHeaderQuantity(selector) {
    let cartQuantity = 0;

    cart.forEach((cartItem) => {
      cartQuantity += cartItem.quantity;
    });

    document.querySelector(selector)
      .innerHTML = cartQuantity;
  }