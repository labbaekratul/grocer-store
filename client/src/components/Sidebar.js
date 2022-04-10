import React from "react";
import { useHistory } from "react-router-dom";
import { NavLink } from "react-router-dom";

function Sidebar() {
  const history = useHistory();

  const changepath = () => {
    history.push("/dashboard");
  };

  return (
    <div className="col-2 sidebar-dashboard">
      <h4 onClick={changepath}>Dashboard</h4>
      <div className="dashboard-links">
        <NavLink
          to="/dashboard/products"
          activeStyle={{
            fontWeight: "bold",
            color: "red",
          }}
        >
          Product
        </NavLink>
        <NavLink
          to="/dashboard/users"
          activeStyle={{
            fontWeight: "bold",
            color: "red",
          }}
        >
          User
        </NavLink>
        <NavLink
          to="/dashboard/orders"
          activeStyle={{
            fontWeight: "bold",
            color: "red",
          }}
        >
          Order
        </NavLink>
        <NavLink
          to="/dashboard/stores"
          activeStyle={{
            fontWeight: "bold",
            color: "red",
          }}
        >
          Store
        </NavLink>

        <NavLink
          to="/dashboard/category"
          activeStyle={{
            fontWeight: "bold",
            color: "red",
          }}
        >
          Category
        </NavLink>

        <NavLink
          to="/"
          activeStyle={{
            fontWeight: "bold",
            color: "Green",
          }}
        >
          Home
        </NavLink>
      </div>
    </div>
  );
}

export default Sidebar;
