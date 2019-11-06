import { orders } from './orders';

describe('orders', () => {

  it('should return the initial state', () => {
    const expected = [];
    const result = orders(undefined, {});
    expect(result).toEqual(expected);
  });

  it('should update state when SET_ORDERS is the type', () => {
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
    const mockAction = {
      type: 'SET_ORDERS',
      orders: mockOrders
    };
    const result = orders(mockOrders, mockAction);
    expect(result).toEqual(mockOrders)
  });

});