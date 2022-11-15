import React, { Component } from 'react';

export default class ItemCart extends Component {
  render() {
    const { product, onChangeQuantity, onDeleteItem } = this.props;
    const { id, title, thumbnail, price, quantity } = product;

    return (
      <div>
        <button
          type="button"
          data-testid="remove-product"
          onClick={ () => onDeleteItem(id) }
        >
          Apagar
        </button>
        <img src={ thumbnail } alt={ title } />
        <h3 data-testid="shopping-cart-product-name">{ title }</h3>

        <div>
          <button
            type="button"
            id={ `${id}` }
            onClick={ () => onChangeQuantity(id, '-') }
            data-testid="product-decrease-quantity"
          >
            -
          </button>
          <span data-testid="shopping-cart-product-quantity">{ quantity }</span>
          <button
            type="button"
            id={ `${id}` }
            onClick={ () => onChangeQuantity(id, '+') }
            data-testid="product-increase-quantity"
          >
            +
          </button>
        </div>

        <p>
          {
            Intl.NumberFormat('pt-BR', {
              style: 'currency',
              currency: 'BRL',
            }).format(price)
          }
        </p>
        <hr />
      </div>
    );
  }
}

ItemCart.propTypes = {}.isRequired;
