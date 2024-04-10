import { useState } from "react";
import { Order } from "../../types/orders";
import { User } from "../../types/users";
import { calculateUserCommission } from "../../utils/monthly-by-level/calculateUserCommission";
import { formatMoney } from "../../utils/moneyFormat";
import { UserCommissionDetailTable } from "./components/UserCommissionDetailTable";
import "./styles.scss";

interface Props {
  month: number;
  year: number;
  orders: Order[];
  users: User[];
  bonusTracker: any;
}

export const MonthlyCommission = ({
  month,
  year,
  orders,
  users,
  bonusTracker,
}: Props) => {
  //   const ordersUntilThisMonth = orders.filter((order) => {
  //     return order.createdAt.isBefore(new Date(year, month, 1));
  //   });
  const [open, setOpen] = useState(true);
  const ordersWithinMonth = orders.filter((order) => {
    return (
      order.createdAt.month() == month - 1 && order.createdAt.year() == year
    );
  });

  const userWithCommission = calculateUserCommission(ordersWithinMonth, users);
  const calculateTotalCommission = (
    userWithCommission: any,
    username: string
  ) => {
    return userWithCommission[username].commission.reduce(
      (acc: number, commission: any) => {
        return acc + commission.orderValue * commission.commissionPercent;
      },
      0
    );
  };

  if (!Object.keys(bonusTracker).length) return null;
  return (
    <div style={{ borderBottom: "1px solid gray", paddingBottom: "2rem" }}>
      <h1
        onClick={() => {
          setOpen(!open);
        }}
        style={{ cursor: "pointer" }}
      >
        Tháng {month}/{year} <span>👁️‍🗨️</span>
      </h1>
      {open &&
        Object.values(userWithCommission)
          .sort((a: any, b: any) => {
            return (
              calculateTotalCommission(userWithCommission, b.username) -
              calculateTotalCommission(userWithCommission, a.username)
            );
          })
          .map(({ username, level, star, branchValue }: any, index) => {
            const paidCommission =
              bonusTracker[username][`m${month}y${year}`] || 0;
            const userTotalCommission = calculateTotalCommission(
              userWithCommission,
              username
            );
            if (userTotalCommission === 0) {
              return null;
            }
            return (
              <div style={{ marginBottom: "1rem" }}>
                <h2
                  className={
                    paidCommission < userTotalCommission ? "not-paid" : ""
                  }
                >
                  #{index + 1} {username} - {level} {star}⭐
                </h2>
                <h2>
                  Doanh thu nhánh: {formatMoney(branchValue)} <br /> HH đã trả:{" "}
                  {formatMoney(paidCommission)} /{" "}
                  {formatMoney(userTotalCommission)} -{" "}
                  <span
                    className={
                      paidCommission < userTotalCommission ? "not-paid" : ""
                    }
                  >
                    Còn lại: {formatMoney(userTotalCommission - paidCommission)}
                  </span>
                </h2>
                <UserCommissionDetailTable
                  username={username}
                  userWithCommission={userWithCommission}
                />
              </div>
            );
          })}
    </div>
  );
};
