import axios from "axios";
import React, { useEffect, useState } from "react";
import ListOfStores from "./ListOfStores";

function StoresList() {
  const [stores, setStores] = useState([]);

  useEffect(() => {
    const getproductData = async () => {
      const { data } = await axios.get("/api/store");
      setStores(data);
    };
    getproductData();
  }, []);

  console.log(stores);

  return (
    <div>
      <ListOfStores stores={stores} loading={false} />
    </div>
  );
}

export default StoresList;
