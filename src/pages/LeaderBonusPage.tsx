import { useEffect } from "react";
import { useOrders } from "../hooks/useOrders";
import { useUsers } from "../hooks/useUsers";
import { formatMoney } from "../utils/moneyFormat";
import { calculateLeaderStats } from "../utils/leader-bonus/calculateLeaderStats";

export const LeaderBonusPage = () => {
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
  const userLeaderStats: any = calculateLeaderStats(users, orders);
  return (
    <div>
      <table>
        <tr>
          <td>Người Dùng</td>
          <td>Cấp Lãnh Đạo</td>
          <td>Doanh Thu Trực Tiếp</td>
          <td>Doanh Thu Nhánh</td>
          <td>Các Nhánh Top</td>
        </tr>
        {Object.values(userLeaderStats)
          .sort((a: any, b: any) => {
            return b.branchRevenue - a.branchRevenue;
          })
          .filter((leaderStat: any) => {
            return leaderStat.branchRevenue > 0;
          })
          .map((leaderStat: any) => {
            const {
              branchRevenue,
              directRevenue,
              leaderLevel,
              username,
              userTop3DirectChildren,
              claimedLeaderBonus,
            } = leaderStat;
            return (
              <tr>
                <td>{username}</td>
                <td
                  className={
                    leaderLevel > claimedLeaderBonus
                      ? "not-claim-bonus-yet"
                      : ""
                  }
                >
                  {leaderLevel}⭐ (Đã nhận {claimedLeaderBonus}⭐)
                </td>
                <td>{formatMoney(directRevenue)}</td>
                <td>{formatMoney(branchRevenue)}</td>
                <td>
                  {userTop3DirectChildren.map((child: any) => {
                    return (
                      <div>
                        {child.username} - {child.leaderLevel}⭐ -{" "}
                        {formatMoney(child.branchRevenue)}
                      </div>
                    );
                  })}
                </td>
              </tr>
            );
          })}
      </table>
    </div>
  );
};
