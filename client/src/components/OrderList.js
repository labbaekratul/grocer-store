import axios from "axios";
import React, { useEffect, useState } from "react";
import ListOfOrders from "./ListOfOrders";

function OrderList() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const getproductData = async () => {
      const { data } = await axios.get("/api/orders");
      setOrders(data);
    };
    getproductData();
  }, []);

  return (
    <div>
      <ListOfOrders orders={orders} loading={false} />
    </div>
  );
}

export default OrderList;
