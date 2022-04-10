import React from "react";
import Sidebar from "../components/Sidebar";
import StoresList from "../components/StoresList";

function StoreListScreen() {
  return (
    <div className="container-fluid">
      <div className="row">
        <Sidebar />
        <div className="col-10">
          <StoresList />
        </div>
      </div>
    </div>
  );
}

export default StoreListScreen;
