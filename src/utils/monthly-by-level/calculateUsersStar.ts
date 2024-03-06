import { Order } from "../../types/orders";
import { User } from "../../types/users";
import { calculateUsersBranchRevenue } from "./calculateUsersBranchRevenue";

export const calculateUsersStar = (
  users: User[],
  ordersWithinMonth: Order[]
) => {
  const userTotalBranchRevenue: any = calculateUsersBranchRevenue(
    users,
    ordersWithinMonth
  );

  return users.map((user) => {
    const userBranchValue = userTotalBranchRevenue[user.username];

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
    };
  });
};
