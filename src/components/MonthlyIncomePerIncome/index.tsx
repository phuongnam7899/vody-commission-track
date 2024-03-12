import { useState } from "react";
import { Order } from "../../types/orders";
import { User } from "../../types/users";
import { calculateUserCommission } from "../../utils/monthly-income-per-income/calculateUserCommission";
import { formatMoney } from "../../utils/moneyFormat";
import { UserIncomePerIncomeDetailTable } from "./components/UserIncomePerIncomeDetailTable";
// import "./styles.scss";

interface Props {
  month: number;
  year: number;
  orders: Order[];
  users: User[];
  incomePerIncomePaidTrackers: any;
}

const calculateUserIncomePerIncome = (userWithCommission: any) => {
  const userWithIncomePerIncome: any = {};
  Object.values(userWithCommission).map((user: any) => {
    const userAllChildren = Object.values(userWithCommission).filter(
      (u: any) => {
        return u.parent === user.username;
      }
    );
    const userAllChildrenWithTotalCommission = userAllChildren.map((u: any) => {
      const totalCommision = u.commission.reduce(
        (acc: number, commission: any) => {
          return acc + commission.orderValue * commission.commissionPercent;
        },
        0
      );
      return { ...u, totalCommision };
    });
    userWithIncomePerIncome[user.username] = {
      ...user,
      userAllChildrenWithTotalCommission,
      incomePerIncome:
        userAllChildrenWithTotalCommission.reduce((acc: number, u: any) => {
          return acc + u.totalCommision;
        }, 0) * user.userIncomePerIncomePercent,
    };
  });
  return userWithIncomePerIncome;
};

export const MonthlyIncomePerIncome = ({
  month,
  year,
  orders,
  users,
  incomePerIncomePaidTrackers,
}: Props) => {
  const [open, setOpen] = useState(true);
  const ordersWithinMonth = orders.filter((order) => {
    return (
      order.createdAt.month() == month - 1 && order.createdAt.year() == year
    );
  });

  const userWithCommission = calculateUserCommission(
    ordersWithinMonth,
    users,
    orders,
    month,
    year
  );
  const userWithIncomePerIncome =
    calculateUserIncomePerIncome(userWithCommission);

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
        Object.values(userWithIncomePerIncome)
          .sort((a: any, b: any) => {
            return b.incomePerIncome - a.incomePerIncome;
          })
          .map(
            (
              {
                username,
                level,
                star,
                incomePerIncome,
                totalInternalBoughtValue,
                userIncomePerIncomePercent,
              }: any,
              index
            ) => {
              if (incomePerIncome === 0) {
                return null;
              }

              const paidIncomePerIncome =
                incomePerIncomePaidTrackers[username][`m${month}y${year}`];
              return (
                <div style={{ marginBottom: "1rem" }}>
                  <h2
                    className={
                      incomePerIncome - paidIncomePerIncome > 0
                        ? "not-paid"
                        : ""
                    }
                  >
                    #{index + 1} {username} - {level} {star}⭐
                  </h2>
                  <h2>
                    Chi tiêu Vody:{formatMoney(totalInternalBoughtValue)} - Tỉ
                    lệ TN/TN: {userIncomePerIncomePercent * 100}% <br></br>{" "}
                    TN/TN đã trả: {formatMoney(paidIncomePerIncome)} {" / "}
                    {formatMoney(incomePerIncome)} - Còn lại:{" "}
                    <span
                      className={
                        incomePerIncome - paidIncomePerIncome > 0
                          ? "not-paid"
                          : ""
                      }
                    >
                      {formatMoney(incomePerIncome - paidIncomePerIncome)}
                    </span>
                  </h2>
                  <UserIncomePerIncomeDetailTable
                    username={username}
                    userWithIncomePerIncome={userWithIncomePerIncome}
                    userIncomePerIncomePercent={userIncomePerIncomePercent}
                  />
                </div>
              );
            }
          )}
    </div>
  );
};
