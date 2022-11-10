import { Component } from 'react';

import ItemCart from '../Components/ItemCart';
import produtos from './arquivo';

export default class Shopcart extends Component {
  constructor() {
    super();

    this.state = {
      products: produtos,
    };

    this.changeQuantity = this.changeQuantity.bind(this);
  }

  changeQuantity(e) {
    const { id } = e.target;
    const idIndex = id.replace('add_', '');
    const { products } = this.state;
    const product = products[idIndex];
    const total = product.quantity + 1;

    // Com esse click
    this.setState((prevState) => {
      prevState.products[idIndex].quantity = total;
    });
  }

  sumTotal() {
    const { products } = this.state;
    const accProduct = (acc, { quantity, price }) => acc + (quantity * price);
    return products.reduce((acc, product) => accProduct(acc, product), 0);
  }

  render() {
    const { products } = this.state;

    return (
      <div>
        <span data-testid="shopping-cart-empty-message">
          Vazio
        </span>

        <h1>Carrinho de compras</h1>
        {
          products.map((product, idx) => (
            <ItemCart
              key={ idx }
              product={ product }
              onChangeQuantity={ this.changeQuantity }
              idx={ idx }
            />
          ))
        }
        <hr />
        <h2>{ `Total ${this.sumTotal()}` }</h2>
      </div>
    );
  }
}
