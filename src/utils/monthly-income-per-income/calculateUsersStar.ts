import { Order } from "../../types/orders";
import { User } from "../../types/users";
import { calculateOrdersValue } from "./calculateOrdersValue";
import { calculateUsersBranchRevenue } from "./calculateUsersBranchRevenue";

const getInternalProductOrders = (orders: Order[]) => {
  return orders.filter(
    (order) =>
      order.productType === "nft" || order.productType === "investVD" || "vip"
  );
};

export const calculateUsersStar = (
  users: User[],
  ordersWithinMonth: Order[],
  orders: Order[],
  month: number,
  year: number
) => {
  const userTotalBranchRevenue: any = calculateUsersBranchRevenue(
    users,
    ordersWithinMonth
  );
  return users.map((user) => {
    const userBranchValue = userTotalBranchRevenue[user.username];
    const internalProductOrders = getInternalProductOrders(orders);
    const internalProductOrdersByUserUntilThisMonth =
      internalProductOrders.filter((order) => {
        let isBeforeThisMonth = true;
        if (order.createdAt.year() === year) {
          isBeforeThisMonth = order.createdAt.month() < month;
        }
        if (order.createdAt.year() < year) {
          isBeforeThisMonth = true;
        }
        if (order.createdAt.year() > year) {
          isBeforeThisMonth = false;
        }
        // const isBeforeThisMonth = order.createdAt.year() < year ? true : order.createdAt.month() < month;
        return order.username === user.username && isBeforeThisMonth;
      });
    const totalInternalBoughtValue = calculateOrdersValue(
      internalProductOrdersByUserUntilThisMonth
    );
    let userIncomePerIncomePercent = 0;
    if (totalInternalBoughtValue < 1000000) {
      userIncomePerIncomePercent = 0;
    } else if (totalInternalBoughtValue < 10000000) {
      userIncomePerIncomePercent = 0.1;
    } else if (totalInternalBoughtValue < 50000000) {
      userIncomePerIncomePercent = 0.2;
    } else if (totalInternalBoughtValue < 100000000) {
      userIncomePerIncomePercent = 0.25;
    } else if (totalInternalBoughtValue < 500000000) {
      userIncomePerIncomePercent = 0.3;
    } else if (totalInternalBoughtValue < 1000000000) {
      userIncomePerIncomePercent = 0.35;
    } else {
      userIncomePerIncomePercent = 0.4;
    }
    let userStar = 0;
    if (user.level === "Collaborator") {
      userStar = 0;
    }
    if (user.level === "Employee") {
      if (userBranchValue < 100000000) {
        userStar = 1;
      } else if (userBranchValue < 400000000) {
        userStar = 2;
      } else {
        userStar = 3;
      }
    }
    if (user.level === "Manager") {
      if (userBranchValue < 200000000) {
        userStar = 1;
      } else if (userBranchValue < 800000000) {
        userStar = 2;
      } else {
        userStar = 3;
      }
    }
    return {
      ...user,
      branchValue: userBranchValue,
      star: userStar,
      totalInternalBoughtValue,
      userIncomePerIncomePercent,
    };
  });
};
