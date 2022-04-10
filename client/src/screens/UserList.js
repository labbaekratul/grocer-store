import axios from "axios";
import React, { useEffect, useState } from "react";
import ListOfUsers from "./ListOfUsers";

function UserList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const getproductData = async () => {
      const { data } = await axios.get("/api/users");
      setUsers(data);
    };
    getproductData();
  }, []);

  return (
    <div>
      <ListOfUsers users={users?.users} loading={false} />
    </div>
  );
}

export default UserList;
