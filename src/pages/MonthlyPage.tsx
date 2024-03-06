import { useEffect } from "react";
import { MonthlyCommission } from "../components/MonthlyCommission";
import { useOrders } from "../hooks/useOrders";
import { useUsers } from "../hooks/useUsers";
const months: number[] = [];
const thisMonth = new Date().getMonth() + 1;
for (let i = thisMonth; i >= 1; i--) {
  months.push(i);
}
export const MonthlyPage = () => {
  const { users, fetchUsers } = useUsers();
  const { orders, fetchOrders } = useOrders();
  // TODO: Validate users and orders
  useEffect(() => {
    fetchUsers();
    fetchOrders();
  }, []);
  if (users.length === 0 || orders.length === 0) {
    return <div>Loading...</div>;
  }
  return (
    <>
      {months.map((month) => {
        return (
          <MonthlyCommission
            month={month}
            year={2024}
            orders={orders}
            users={users}
          />
        );
      })}
      <MonthlyCommission month={12} year={2023} orders={orders} users={users} />
    </>
  );
};
