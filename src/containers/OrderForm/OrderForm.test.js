import React from 'react';
import { shallow } from 'enzyme';
import { OrderForm, mapDispatchToProps } from './OrderForm';
import { addOrder } from '../../apiCalls';
import { setOrders } from '../../actions';

jest.mock('../../apiCalls.js');

const mockOrders = [
  {
    name: 'Amy',
    ingredients: [
      'steak',
      'pico de gallo',
      'guacamole'
    ],
    id: 4
  },
  {
    name: 'Raelyn',
    ingredients: [
      'queso fresco',
      'carnitas',
      'guacamole',
      'cilantro',
      'beans'
    ],
    id: 5
  }];

describe('OrderForm', () => {
  let wrapper;
  const mockSetOrders = jest.fn();
  const mockNameEvent = { target: { name: 'name', value: 'Amy'}};
  const mockIngredientEvent = { target: { name: 'steak'}}

  beforeEach(() => {
    wrapper = shallow(<OrderForm 
      setOrders={mockSetOrders}
      />)
  });

  it('should match the snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should update state onChange for name', () => {
    wrapper.instance().handleNameChange(mockNameEvent);
    expect(wrapper.state('name')).toEqual('Amy')
  });

  it.skip('should update state when ingredient button is clicked', () => {
    const mockEvent = { preventDefault: jest.fn() } 
    wrapper.find('button').at(2).simulate('click', mockEvent);
    wrapper.instance().handleIngredientChange(mockIngredientEvent);
    expect(wrapper.state('ingredients')).toEqual(['steak']);
  });

  it('should clear inputs after order is successfully submitted', () => {
    const mockState = {
      name: 'Amy',
      ingredients: ['steak', 'guacamole']
    };
    const expected = {
      name: '',
      ingredients: []
    }
    wrapper.instance().setState({name: 'Amy', ingredients: ['steak', 'guacamole']});
    expect(wrapper.state()).toEqual(mockState);
    wrapper.instance().clearInputs();
    expect(wrapper.state()).toEqual(expected);
  });

  it.skip('should call submitOrder when button is clicked', () => {
    wrapper.instance().submitOrder() = jest.fn()
    wrapper.find('button').at(12).simulate('click');
    expect(wrapper.instance().submitOrder()).toHaveBeenCalled();
  });

});

describe('mapDispatchToProps', () => {

  const mockDispatch = jest.fn();

  it('calls dispatch with a setOrders action', () => {
    const actionToDispatch = setOrders(mockOrders);
    const mappedProps = mapDispatchToProps(mockDispatch);
    mappedProps.setOrders(mockOrders);
    expect(mockDispatch).toHaveBeenCalledWith(actionToDispatch);
  });

});