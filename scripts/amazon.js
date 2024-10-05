import { products, loadProductFetch } from "../data/products.js";
import { addToCart, cart } from "../data/cart.js";
import '../data/cart.js';

loadProductFetch().then(() => {
  renderProducts();
})

function renderProducts() {
  let productHTML = '';

  products.forEach((product) => {
      productHTML +=
      `
          <div class="product-container">
            <div class="product-image-container">
              <img class="product-image"
                src="${product.image}">
            </div>

            <div class="product-name limit-text-to-2-lines">
              ${product.name}
            </div>

            <div class="product-rating-container">
              <img class="product-rating-stars"
                src="images/ratings/rating-${product.rating.stars * 10}.png">
              <div class="product-rating-count link-primary">
                ${product.rating.count}
              </div>
            </div>

            <div class="product-price">
              ${product.PriceUrl()}
            </div>

            <div class="product-quantity-container">
              <select>
                <option selected value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
              </select>
            </div>

            ${product.sizeUrl()}

            <div class="product-spacer"></div>
            
            <div class="added-to-cart">
            <img src="images/icons/checkmark.png">
            Added
            </div>

            
            <button class="add-to-cart-button button-primary js-add-to-cart-button" data-product-id="${product.id}">
              Add to Cart
            </button>
          </div>
      `;
  });

  document.querySelector('.js-products-grid')
      .innerHTML = productHTML;

  const addToCartButton = document.querySelectorAll('.js-add-to-cart-button');

  addToCartButton.forEach((button) => {
      button.addEventListener('click', () => {
          const {productId} = button.dataset;
          
          addToCart(productId);

          updateHeaderQuantity('.js-cart-quantity');
      });
  });

  function updateHeaderQuantity(selector) {
    let cartQuantity = 0;

    cart.forEach((cartItem) => {
      cartQuantity += cartItem.quantity;
    });

    document.querySelector(selector)
      .innerHTML = cartQuantity;
  }

  updateHeaderQuantity('.js-cart-quantity');
}