import * as actions from './index';

describe('actions', () => {

  it('should have a type SET_ORDERS', () => {
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
    const expectedAction = {
      type: 'SET_ORDERS',
      orders: mockOrders
    };
    const result = actions.setOrders(mockOrders);
    expect(result). toEqual(expectedAction)
  });

});