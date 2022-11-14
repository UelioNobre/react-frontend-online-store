import React, { Component } from 'react';

export default class ItemCart extends Component {
  render() {
    const { product, onChangeQuantity, onDeleteItem } = this.props;
    const { id, title, thumbnail, price, quantity } = product;

    return (
      <div>
        <button type="button" onClick={ () => onDeleteItem(id) }>Apagar</button>
        <img src={ thumbnail } alt={ title } />
        <h3>{ title }</h3>

        <div>
          <button
            type="button"
            id={ `${id}` }
            onClick={ () => onChangeQuantity(id, quantity, '-') }
          >
            -
          </button>
          <span>{ quantity }</span>
          <button
            type="button"
            id={ `${id}` }
            onClick={ () => onChangeQuantity(id, quantity, '+') }
            data-testid="product-add-to-cart"
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
