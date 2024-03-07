import { Order } from "../../types/orders";
import { User } from "../../types/users";
import { calculateCommissionRate } from "./calculateCommissionRate";
import { calculateUsersStar } from "./calculateUsersStar";
import { convertLevelToNumber } from "./convertLevelToNumber";

export const calculateUserCommission = (
  ordersWithinMonth: Order[],
  users: User[]
) => {
  const userWithStar = calculateUsersStar(users, ordersWithinMonth);
  const usersObject: any = {};
  userWithStar.forEach((user) => {
    usersObject[user.username] = {
      ...user,
      commission: [],
    };
  });
  for (let order of ordersWithinMonth) {
    let buyerInfo = usersObject[order.username];
    let buyerLevelNumber = convertLevelToNumber(buyerInfo.level);
    let parentUsername = buyerInfo.parent;
    let parentInfo: any = {};
    let parentLevelNumber = 0;
    let starLeft = 0;
    while (parentUsername && parentUsername !== "admin") {
      parentInfo = usersObject[parentUsername];
      parentLevelNumber = convertLevelToNumber(parentInfo.level);
      if (buyerLevelNumber + 1 === parentLevelNumber) {
        const { rate, starLeft: newStarLeft } = calculateCommissionRate(
          order.productType,
          parentInfo.star,
          starLeft
        );
        usersObject[buyerInfo.parent].commission.push({
          order: order.id,
          buyer: order.username,
          date: order.createdAt,
          orderProductType: order.productType,
          orderValue: order.value,
          commissionPercent: rate,
        });
        starLeft = Math.min(
          newStarLeft,
          usersObject[buyerInfo.parent].star - buyerInfo.star
        );
      }
      if (buyerLevelNumber + 2 === parentLevelNumber) {
        const { rate } = calculateCommissionRate(
          order.productType,
          parentInfo.star,
          starLeft
        );

        usersObject[buyerInfo.parent].commission.push({
          order: order.id,
          buyer: order.username,
          date: order.createdAt,
          orderProductType: order.productType,
          orderValue: order.value,
          commissionPercent: rate * 2,
        });
        starLeft = 0;
      }
      buyerInfo = parentInfo;
      buyerLevelNumber = parentLevelNumber;

      parentUsername =
        parentInfo.parent && parentInfo.parent !== "admin"
          ? usersObject[parentInfo.parent].username
          : null;
    }
  }
  return usersObject;
};
