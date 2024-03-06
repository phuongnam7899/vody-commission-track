import { useEffect } from "react";
import "./App.css";
import { useUsers } from "./hooks/useUsers";
import { useOrders } from "./hooks/useOrders";

function App() {
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
  return <></>;
}

export default App;
