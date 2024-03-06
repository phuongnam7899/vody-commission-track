import { Order } from "../../types/orders";
import { User } from "../../types/users";

export const calculateUsersBranchRevenue = (users: User[], orders: Order[]) => {
  const userTotalDirectRevenue: any = {};
  if (!users.length || !orders.length) {
    return {};
  }

  for (let user of users) {
    userTotalDirectRevenue[user.username] = 0;
  }
  console.log("users", users);

  for (let order of orders) {
    console.log("user.username", order.username);

    const buyerInfo = users.find((user) => user.username === order.username);
    if (buyerInfo!.parent) {
      userTotalDirectRevenue[buyerInfo!.parent] += order.value;
    }
  }

  const calculateBranchValue = (user: User) => {
    let value = userTotalDirectRevenue[user.username];
    const children = users.filter((u) => u.parent === user.username);
    for (let child of children) {
      value += calculateBranchValue(child);
    }
    return value;
  };
  const userTotalBranchRevenue: any = {};

  for (let user of users) {
    userTotalBranchRevenue[user.username] = calculateBranchValue(user);
  }
  return userTotalBranchRevenue;
};
