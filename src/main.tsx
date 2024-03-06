import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { MonthlyPage } from "./pages/MonthlyPage.tsx";
import { Layout } from "./pages/Layout.tsx";
import { IncomePerIncomePage } from "./pages/IncomePerIncomePage.tsx";
import { LeaderBonusPage } from "./pages/LeaderBonusPage.tsx";
import { GroupRevenueBonusPage } from "./pages/GroupRevenueBonusPage.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Layout>
        <MonthlyPage />
      </Layout>
    ),
  },
  {
    path: "/income-per-income",
    element: (
      <Layout>
        <IncomePerIncomePage />
      </Layout>
    ),
  },
  {
    path: "/group-revenue-bonus",
    element: (
      <Layout>
        <GroupRevenueBonusPage />
      </Layout>
    ),
  },
  {
    path: "/leader",
    element: (
      <Layout>
        <LeaderBonusPage />
      </Layout>
    ),
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <RouterProvider router={router} />
);
