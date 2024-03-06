import { NavLink } from "react-router-dom";
import "./styles.scss";

export const Navbar = () => {
  return (
    <header>
      <NavLink to="/">Theo Cấp Bậc</NavLink>
      <NavLink to="/income-per-income">TN/TN</NavLink>
      <NavLink to="/group-revenue-bonus">Thưởng DT Nhóm</NavLink>
      <NavLink to="/leader">Thưởng Lãnh Đạo</NavLink>
    </header>
  );
};
