import { useEffect } from "react";
import { MonthlyCommission } from "../components/MonthlyCommission";
import { useOrders } from "../hooks/useOrders";
import { useUsers } from "../hooks/useUsers";
import { useBonusTracker } from "../hooks/useBonusTracker";
const months: number[] = [];
const thisMonth = new Date().getMonth() + 1;
for (let i = thisMonth; i >= 1; i--) {
  months.push(i);
}
export const MonthlyPage = () => {
  const { users, fetchUsers } = useUsers();
  const { orders, fetchOrders } = useOrders();
  const { bonusTrackers, fetchBonusTrackers } = useBonusTracker();

  // TODO: Validate users and orders
  useEffect(() => {
    fetchUsers();
    fetchOrders();
    fetchBonusTrackers();
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
            bonusTracker={bonusTrackers}
          />
        );
      })}
      {/* <MonthlyCommission month={12} year={2023} orders={orders} users={users} bonusTracker={bonusTrackers[`m1y2023`]}/> */}
    </>
  );
};
