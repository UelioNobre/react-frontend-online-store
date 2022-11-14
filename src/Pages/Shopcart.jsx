import { Component } from 'react';

import ItemCart from '../Components/ItemCart';
import produtos from './arquivo';

const getLocalStorage = () => {
  const LOCAL_STORAGE_KEY = 'KEY_LOCAL_STORAGE';
  const data = localStorage.getItem(LOCAL_STORAGE_KEY);
  return data ? JSON.parse(data) : [];
};

const currencyBR = (value) => {
  const formated = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);
  return formated;
};

const calculateQuantity = (operation, qtd) => {
  const updateQuantity = operation === '+' ? qtd + 1 : qtd - 1;
  const quantity = updateQuantity < 0 ? 0 : updateQuantity;
  return quantity;
};

export default class Shopcart extends Component {
  constructor() {
    super();

    this.state = {
      products: produtos,
    };

    this.changeQuantity = this.changeQuantity.bind(this);
    this.deleteItemCart = this.deleteItemCart.bind(this);
  }

  componentDidMount() {
    const products = produtos;

    // LOCALSTORAGE
    // const products = getLocalStorage();
    // console.log(productsLocalStorage);

    this.setState({
      products,
    });
  }

  deleteItemCart(productId) {
    const { products } = this.state;
    const produtosUpdated = products.filter(({ id }) => id !== productId);
    this.setState({
      products: produtosUpdated,
    });
  }

  changeQuantity(productId, qtd, operation) {
    const { products } = this.state;
    const product = products.find(({ id }) => productId === id);
    const quantity = calculateQuantity(operation, qtd);

    product.quantity = quantity;

    this.setState([...products, product]);
  }

  sumTotal() {
    const { products } = this.state;
    const accProduct = (acc, { quantity, price }) => acc + (quantity * price);
    const value = products.reduce((acc, product) => accProduct(acc, product), 0);

    return currencyBR(value);
  }

  render() {
    const { products } = this.state;

    return (
      <div>
        <h1>Carrinho de compras</h1>

        {
          (products.length === 0
            ? <p data-testid="shopping-cart-empty-message">Vazio</p>
            : (products.map((product, idx) => (
              <ItemCart
                key={ idx }
                product={ product }
                onChangeQuantity={ this.changeQuantity }
                onDeleteItem={ this.deleteItemCart }
              />
            )))
          )
        }
        <hr />
        <h2>{ `${this.sumTotal()}` }</h2>
      </div>
    );
  }
}
