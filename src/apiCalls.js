export const getOrders = async () => {
  const url = 'http://localhost:3001/api/v1/orders';
  const response = await fetch(url)
  if(!response.ok) {
    throw Error('Unable to get orders right now. Try again later.')
  }
  const orders = await response.json()
  return orders.orders
}

export const addOrder = async(name, ingredients) => {
  const url = 'http://localhost:3001/api/v1/orders';
  const options = {
    method: 'POST',
    body: JSON.stringify({
      name,
      ingredients
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  };
  const response = await fetch(url, options)
  if(!response.ok) {
    throw Error('Unable to add this order. Try again later.')
  }
  return getOrders();
}
