import React from "react";
import OrderList from "../components/OrderList";
import Sidebar from "../components/Sidebar";

function OrderListScreen() {
  return (
    <div className="container-fluid">
      <div className="row">
        <Sidebar />
        <div className="col-10">
          <OrderList />
        </div>
      </div>
    </div>
  );
}

export default OrderListScreen;
