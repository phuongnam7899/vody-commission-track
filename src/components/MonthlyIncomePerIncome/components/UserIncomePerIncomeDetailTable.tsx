import { formatMoney } from "../../../utils/moneyFormat";

interface UserIncomePerIncomeDetailTableProps {
  userWithIncomePerIncome: any;
  username: string;
  userIncomePerIncomePercent: number;
}

export const UserIncomePerIncomeDetailTable = ({
  userWithIncomePerIncome,
  username,
  userIncomePerIncomePercent,
}: UserIncomePerIncomeDetailTableProps) => {
  return (
    <table>
      <tr>
        <td>Người Được Giới Thiệu</td>
        <td>Thu nhập</td>
        <td>Thu nhập/Thu nhập</td>
      </tr>
      {userWithIncomePerIncome[username].userAllChildrenWithTotalCommission
        .sort((a: any, b: any) => {
          return b.totalCommision - a.totalCommision;
        })
        .map((commission: any) => {
          const { username, totalCommision } = commission;
          return (
            <tr>
              <td>{username}</td>
              <td>{formatMoney(totalCommision)}</td>
              <td>
                {formatMoney(totalCommision * userIncomePerIncomePercent)}
              </td>
            </tr>
          );
        })}
    </table>
  );
};
