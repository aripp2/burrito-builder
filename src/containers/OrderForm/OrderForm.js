import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addOrder } from '../../apiCalls';
import { setOrders } from '../../actions';

export class OrderForm extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      ingredients: []
    };
  }

  handleNameChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  }   

  handleIngredientChange = e => {
    e.preventDefault();
    this.setState({ingredients: [...this.state.ingredients, e.target.name]});
  }

  submitOrder = async() => {
    const { name, ingredients } = this.state;
    const { setOrders } = this.props;
    try {
      const orders = await addOrder(name, ingredients)
      setOrders(orders)
    } catch ({ message }) {
      console.log(message)
    }
    this.clearInputs()
  }

  clearInputs = () => {
    this.setState({name: '', ingredients: []});
  }

  render() {
    const { ingredients } = this.state;
    const possibleIngredients = ['beans', 'steak', 'carnitas', 'sofritas', 'lettuce', 'queso fresco', 'pico de gallo', 'hot sauce', 'guacamole', 'jalapenos', 'cilantro', 'sour cream'];
    const ingredientButtons = possibleIngredients.map(ingredient => {
      return (
        <button 
          key={ingredient} 
          name={ingredient} 
          onClick={e => this.handleIngredientChange(e)}>
          {ingredient}
        </button>
      )
    });

    return (
      <form>
        <input
          type='text'
          placeholder='Name'
          name='name'
          value={this.state.name}
          onChange={e => this.handleNameChange(e)}
        />

        { ingredientButtons }

        <p>Order: { this.state.ingredients.join(', ') || 'Nothing selected' }</p>

        <button
          disabled={!ingredients.length} 
          onClick={this.submitOrder}>
          Submit Order
        </button>
      </form>
    )
  }
}

export const mapDispatchToProps = dispatch => ({
  setOrders: orders => dispatch(setOrders(orders))
})

export default connect(null, mapDispatchToProps)(OrderForm);