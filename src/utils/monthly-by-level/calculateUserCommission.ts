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
    // console.log("order", order);
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
        // console.log(
        //   `user ${usersObject[buyerInfo.parent].username} (${
        //     usersObject[buyerInfo.parent].star
        //   })`
        // );
        // console.log(`Get (${rate}%) (No skip level) +`);
        starLeft = Math.min(
          newStarLeft,
          usersObject[buyerInfo.parent].star - buyerInfo.star
        );
        // console.log("starLeft", starLeft);
      }
      if (buyerLevelNumber + 2 === parentLevelNumber) {
        const { rate } = calculateCommissionRate(
          order.productType,
          parentInfo.star,
          starLeft
        );
        // console.log("buyerInfo", buyerInfo);

        // console.log("user", usersObject[buyerInfo.parent]);

        usersObject[buyerInfo.parent].commission.push({
          order: order.id,
          buyer: order.username,
          date: order.createdAt,
          orderProductType: order.productType,
          orderValue: order.value,
          commissionPercent: rate * 2,
        });
        // console.log("user", usersObject[buyerInfo.parent].username);
        // console.log(`Get (${rate * 2}%) (Skip 1 level)`);
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
