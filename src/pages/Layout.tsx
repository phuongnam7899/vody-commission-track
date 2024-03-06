import { Navbar } from "../components/Navbar";
import "../App.scss";

export const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="layout">
      <Navbar />
      <main>{children}</main>
    </div>
  );
};
