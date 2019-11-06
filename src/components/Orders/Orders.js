import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setOrders } from '../../actions';
import { getOrders } from '../../apiCalls';

import './Orders.css';

export class Orders extends Component {
  // constructor() {
  //   super();
  //   this.state = {

  //   }
  // } 

  async componentDidMount() {
    const { setOrders } = this.props;
    try {
      const orders = await getOrders();
      setOrders(orders);
    } catch ({ message }) {
      console.log(message)
    }
  }

  render() {
    const { orders } = this.props
    const orderEls = orders.map(order => {
    return (
      <div className="order" key={order.id}>
        <h3>{order.name}</h3>
        <ul className="ingredient-list">
          {order.ingredients.map(ingredient => {
            return <li key={ingredient}>{ingredient}</li>
          })}
        </ul>
      </div>
    )
  });
    return (
      <section>
        { orderEls.length ? orderEls : <p>No orders yet!</p> }
      </section>
    )
  }
}

export const mapStateToProps = ({ orders }) => ({
  orders
});

export const mapDispatchToProps = dispatch => ({
  setOrders: orders => dispatch(setOrders(orders))
});

export default connect(mapStateToProps, mapDispatchToProps)(Orders);