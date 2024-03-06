import { useEffect } from "react";
import { useOrders } from "../hooks/useOrders";
import { useUsers } from "../hooks/useUsers";
import { calculateUsersBranchRevenue } from "../utils/monthly-income-per-income/calculateUsersBranchRevenue";
import { User } from "../types/users";
import { GroupRevenueBonusTable } from "../components/GroupRevenueBonusTable";

type UserWithBranchRevenue = User & { branchRevenue: number };

export const GroupRevenueBonusPage = () => {
  const { users, fetchUsers } = useUsers();
  const { orders, fetchOrders } = useOrders();
  // TODO: Validate users and orders
  useEffect(() => {
    fetchUsers();
    fetchOrders();
  }, []);

  const userTotalBranchRevenue: any = calculateUsersBranchRevenue(
    users,
    orders
  );
  const usersWithChildrenRevenue = users.map((user: User) => {
    const children: User[] = users.filter(
      (u: User) => u.parent === user.username
    );
    return {
      ...user,
      children: children
        .map((c: User) => {
          return { ...c, branchRevenue: userTotalBranchRevenue[c.username] };
        })
        .sort(
          (a: UserWithBranchRevenue, b: UserWithBranchRevenue) =>
            b.branchRevenue - a.branchRevenue
        ),
    };
  });

  const userWithGroupRevenueBonusStats = usersWithChildrenRevenue.map(
    (user) => {
      const [topRevenueChild, secondTopRevenueChild, ...othersChildren] =
        user.children;
      const stackValue = 400000000;
      const totalOtherChildrenRevenue = othersChildren.reduce(
        (acc, child) => acc + child.branchRevenue,
        0
      );
      const maximumBonusTimes = Math.floor(
        Math.min(
          topRevenueChild ? topRevenueChild.branchRevenue / stackValue : 0,
          secondTopRevenueChild
            ? secondTopRevenueChild.branchRevenue / stackValue
            : 0,
          totalOtherChildrenRevenue ? totalOtherChildrenRevenue / stackValue : 0
        )
      );
      return {
        ...user,
        maximumBonusTimes,
        totalOtherChildrenRevenue,
        othersChildren,
      };
    }
  );

  if (users.length === 0 || orders.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div>
        <GroupRevenueBonusTable
          userWithGroupRevenueBonusStats={userWithGroupRevenueBonusStats}
        />
      </div>
    </>
  );
};
