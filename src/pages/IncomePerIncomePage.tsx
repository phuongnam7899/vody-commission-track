import { useEffect } from "react";
import { useOrders } from "../hooks/useOrders";
import { useUsers } from "../hooks/useUsers";
import { MonthlyIncomePerIncome } from "../components/MonthlyIncomePerIncome";
import { useIncomePerIncomePaidTracker } from "../hooks/useIncomePerIncomePaidTracker";

const months: number[] = [];
const thisMonth = new Date().getMonth() + 1;
for (let i = thisMonth; i >= 1; i--) {
  months.push(i);
}

export const IncomePerIncomePage = () => {
  const { users, fetchUsers } = useUsers();
  const { orders, fetchOrders } = useOrders();
  const { incomePerIncomePaidTrackers, fetchIncomePerIncomePaidTracker } =
    useIncomePerIncomePaidTracker();

  // TODO: Validate users and orders
  useEffect(() => {
    fetchUsers();
    fetchOrders();
    fetchIncomePerIncomePaidTracker();
  }, []);
  if (
    users.length === 0 ||
    orders.length === 0 ||
    Object.keys(incomePerIncomePaidTrackers).length === 0
  ) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {months.map((month) => {
        return (
          <MonthlyIncomePerIncome
            month={month}
            year={2024}
            orders={orders}
            users={users}
            incomePerIncomePaidTrackers={incomePerIncomePaidTrackers}
          />
        );
      })}
    </>
  );
};
