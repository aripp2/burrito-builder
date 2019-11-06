import React from 'react';
import { shallow } from 'enzyme';
import { Orders, mapStateToProps, mapDispatchToProps } from './Orders';
import { getOrders } from '../../apiCalls';
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
const mockSetOrders = jest.fn();

describe('Orders', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<Orders 
      orders={mockOrders}
      setOrders={mockSetOrders}
      />)
  });

  it('should match the snapshot', () => {
    expect(wrapper).toMatchSnapshot()
  });

  it('should call getOrders', () => {
    getOrders.mockImplementation(() => Promise.resolve(mockOrders))
    expect(getOrders).toHaveBeenCalled();
  });

});

describe('mapStateToProps', () => {

  it('should return an object of orders array', () => {
    const mockState = {
      orders: mockOrders
    };
    const expected = {
      orders: mockOrders
    };
    const mappedProps = mapStateToProps(mockState);
    expect(mappedProps).toEqual(expected);
  });

});

describe('mapDispatchToProps', () => {

  const mockDispatch = jest.fn();

  it('calls dispatch with a setOrders action', () => {
    const actionToDispatch = setOrders(mockOrders);
    const mappedProps = mapDispatchToProps(mockDispatch);
    mappedProps.setOrders(mockOrders);
    expect(mockDispatch).toHaveBeenCalledWith(actionToDispatch)
  });

});