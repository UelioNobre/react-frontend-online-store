import React, { Component } from 'react';

export default class ItemCart extends Component {
  constructor() {
    super();

    this.handlerClick = this.handlerClick.bind(this);
  }

  // Falta atualizar o click.
  handlerClick() {
    const { product } = this.props;
    const { quantity } = product;
    console.log(quantity);
  }

  render() {
    const { idx, product } = this.props;
    const { title, thumbnail, price, quantity } = product;

    return (
      <div>
        <button type="button">X</button>
        <img src={ thumbnail } alt={ title } />
        <h3>{ title }</h3>

        <div>
          <button type="button"> - </button>
          <span>{ quantity }</span>
          <button
            type="button"
            id={ `add_${idx}` }
            onClick={ this.handlerClick }
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
