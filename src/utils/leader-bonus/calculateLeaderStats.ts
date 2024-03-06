import { User } from "../../types/users";
import { checkUserLeaderLevel } from "./checkUserLeaderLevel";

export const calculateLeaderStats = (users: any, orders: any) => {
  const userTotalDirectRevenue: any = {};

  for (let user of users) {
    userTotalDirectRevenue[user.username] = 0;
  }
  for (let order of orders) {
    const buyerInfo = users.find(
      (user: User) => user.username === order.username
    );

    if (buyerInfo!.parent) {
      userTotalDirectRevenue[buyerInfo!.parent] += order.value;
    }
  }

  const calculateBranchValue = (user: User) => {
    let value = userTotalDirectRevenue[user.username];
    const children = users.filter((u: User) => u.parent === user.username);
    for (let child of children) {
      value += calculateBranchValue(child);
    }
    return value;
  };
  const userLeaderStats: any = {};

  for (let user of users) {
    const userTop3DirectChildren = users
      .filter((u: User) => u.parent === user.username)
      .sort((a: User, b: User) => {
        return calculateBranchValue(b) - calculateBranchValue(a);
      })
      .slice(0, 4)
      .map((u: User) => {
        return {
          ...u,
          branchRevenue: calculateBranchValue(u),
        };
      });

    userLeaderStats[user.username] = {
      ...user,
      directRevenue: userTotalDirectRevenue[user.username],
      branchRevenue: calculateBranchValue(user),
      userTop3DirectChildren,
    };
  }
  for (let user of users) {
    userLeaderStats[user.username].leaderLevel = checkUserLeaderLevel(
      userLeaderStats,
      user.username
    );
    userLeaderStats[user.username].userTop3DirectChildren = userLeaderStats[
      user.username
    ].userTop3DirectChildren.map((child: any) => {
      return {
        ...child,
        leaderLevel: checkUserLeaderLevel(userLeaderStats, child.username),
      };
    });
  }
  return userLeaderStats;
};
