export const getOrders = async () => {
  const response = await fetch('http://localhost:3001/api/v1/orders')
  if(!response.ok) {
    throw Error('Unable to get orders right now. Try again later.')
  }
  const orders = await response.json()
  return orders.orders
}

