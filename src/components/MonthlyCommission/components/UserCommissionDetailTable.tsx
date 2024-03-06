import { productTypeMapRevert } from "../../../hooks/useOrders";
import { formatMoney } from "../../../utils/moneyFormat";

interface UserCommissionDetailTableProps {
  userWithCommission: any;
  username: string;
}

export const UserCommissionDetailTable = ({
  userWithCommission,
  username,
}: UserCommissionDetailTableProps) => {
  return (
    <table>
      <tr>
        <td>Ngày</td>
        <td>Mã Đơn Hàng</td>
        <td>Người Mua</td>
        <td>Loại Sản Phẩm</td>
        <td>Giá trị đơn</td>
        <td>Hoa Hồng</td>
      </tr>
      {userWithCommission[username].commission.map((commission: any) => {
        const {
          date,
          order,
          buyer,
          orderProductType,
          orderValue,
          commissionPercent,
        } = commission;
        return (
          <tr>
            <td>{date.format("DD/MM/YYYY")}</td>
            <td>{order}</td>
            <td>{buyer}</td>
            <td>{productTypeMapRevert[orderProductType]}</td>
            <td>{formatMoney(orderValue)}</td>
            <td>
              {(commissionPercent * 100).toFixed(1)}% (
              {formatMoney(orderValue * commissionPercent)})
            </td>
          </tr>
        );
      })}
    </table>
  );
};
