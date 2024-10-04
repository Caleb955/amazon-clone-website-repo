import formatCurrency from "../scripts/utils/money.js";


export let products = [];

class Product {
  id;
  image;
  name;
  rating;
  priceCents;

  constructor(value) {
      this.id = value.id;
      this.image = value.image;
      this.name = value.name;
      this.rating = value.rating;
      this.priceCents = value.priceCents;
  }

  PriceUrl() {
      return `$${formatCurrency(this.priceCents)}`;
  }
}

export function loadProductFetch() {
  const promise = 
  fetch('backend/products.json').then((response) => {
    return response.json();
  }).then((output) => {
    products = output.map((data) => {
        return new Product(data)
    });

    console.log('Load product successfull');
  });

  return promise;
}