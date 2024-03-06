import { formatMoney } from "../../utils/moneyFormat";

interface Props {
  userWithGroupRevenueBonusStats: any;
}

export const GroupRevenueBonusTable = ({
  userWithGroupRevenueBonusStats,
}: Props) => {
  return (
    <table>
      <tr>
        <td>Người Dùng</td>
        <td>Nhánh top 1</td>
        <td>Nhánh top 2</td>
        <td>Các nhánh còn lại</td>
        <td>Số lần có thể nhận</td>
        <td>Số lần đã nhận</td>
      </tr>
      {userWithGroupRevenueBonusStats
        .sort((a: any, b: any) => {
          return b.maximumBonusTimes - a.maximumBonusTimes;
        })
        .filter((groupRevenueStat: any) => {
          return groupRevenueStat.maximumBonusTimes > 0;
        })
        .map((groupRevenueStat: any) => {
          const {
            username,
            maximumBonusTimes,
            othersChildren,
            children,
            totalOtherChildrenRevenue,
            claimedGroupRevenueBonus,
          } = groupRevenueStat;
          return (
            <tr>
              <td>{username}</td>
              <td>
                {children[0] && (
                  <>
                    <div>{children[0].username}</div>
                    <div>{formatMoney(children[0].branchRevenue)}</div>
                  </>
                )}
              </td>
              <td>
                {children[1] && (
                  <>
                    <div>{children[1].username}</div>
                    <div>{formatMoney(children[1].branchRevenue)}</div>
                  </>
                )}
              </td>
              <td>
                <b>Tổng: {formatMoney(totalOtherChildrenRevenue)}</b>
                {othersChildren.map((child: any) => {
                  return (
                    <div>
                      {child.username} - {formatMoney(child.branchRevenue)}
                    </div>
                  );
                })}
              </td>
              <td
                className={
                  maximumBonusTimes > claimedGroupRevenueBonus
                    ? "not-claim-bonus-yet"
                    : ""
                }
              >
                {maximumBonusTimes}
              </td>
              <td>{claimedGroupRevenueBonus}</td>
            </tr>
          );
        })}
    </table>
  );
};
