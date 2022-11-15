import { Component } from 'react';

import ItemCart from '../Components/ItemCart';
import { getItem, setItem } from '../services/localStorage';

const LOCAL_STORAGE_KEY = 'cartSaved';

const getLocalStorage = () => {
  const data = getItem(LOCAL_STORAGE_KEY);
  return data ? JSON.parse(data) : [];
};

const currencyBR = (value) => {
  const formated = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);
  return formated;
};

const calculateQuantity = (qtd, operation) => {
  const updateQuantity = operation === '+' ? qtd + 1 : qtd - 1;
  const quantity = updateQuantity < 0 ? 0 : updateQuantity;
  return quantity;
};

export default class Shopcart extends Component {
  constructor() {
    super();

    this.state = {
      products: [],
    };

    this.changeQuantity = this.changeQuantity.bind(this);
    this.deleteItemCart = this.deleteItemCart.bind(this);
  }

  componentDidMount() {
    const products = getLocalStorage();

    this.setState({
      products,
    });
  }

  deleteItemCart(productId) {
    const products = getLocalStorage();
    const produtosUpdated = products.filter(({ id }) => id !== productId);
    this.setState({
      products: produtosUpdated,
    });
    setItem(LOCAL_STORAGE_KEY, produtosUpdated);
  }

  changeQuantity(productId, operation) {
    const productsLocalStorage = getLocalStorage();
    const products = productsLocalStorage.map((product) => {
      const quantity = calculateQuantity(product.quantity, operation);

      if (product.id === productId) {
        product.quantity = quantity;
      }

      return product;
    });

    this.setState({
      products,
    });

    setItem(LOCAL_STORAGE_KEY, products);
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
