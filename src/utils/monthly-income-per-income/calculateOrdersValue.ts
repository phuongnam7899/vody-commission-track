import { Order } from "../../types/orders";

export const calculateOrdersValue = (orders: Order[]) => {
  return orders.reduce((acc, order) => {
    return acc + order.value;
  }, 0);
};
