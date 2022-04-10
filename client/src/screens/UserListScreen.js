import React from "react";
import Sidebar from "../components/Sidebar";
import UserList from "./UserList";

function UserListScreen() {
  return (
    <div className="container-fluid">
      <div className="row">
        <Sidebar />
        <div className="col-10">
          <UserList />
        </div>
      </div>
    </div>
  );
}

export default UserListScreen;
