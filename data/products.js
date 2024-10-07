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

  sizeUrl() {
    return '';
  }
}

class Clothing extends Product {
  sizeChartLink;

  constructor(value) {
    super(value)
    this.sizeChartLink = value.sizeChartLink;
  }

  sizeUrl() {
    return `<a href="${this.sizeChartLink}" target="_blank">view more size</a>`;
  }
}

export function findProducts(productId) {
  const data = products.find((product) => {
    if (product.id === productId) {
      return product;
    }
  });

  return data;
}

export function loadProductFetch() {
  const promise = 
  fetch('backend/products.json').then((response) => {
    return response.json();
  }).then((output) => {
    products = output.map((data) => {
      if (data.type === 'clothing') return new Clothing(data);
      else return new Product(data)
    });

    console.log('Load product successfull');
  });

  return promise;
}