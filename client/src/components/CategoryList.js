import axios from "axios";
import React, { useEffect, useState } from "react";
import ListOfCategory from "./ListOfCategory";

function OrderList() {
  const [category, setCategory] = useState([]);

  useEffect(() => {
    const getCategoryData = async () => {
      const { data } = await axios.get("/api/category");
      setCategory(data);
    };
    getCategoryData();
  }, []);

  return (
    <div>
      <ListOfCategory category={category} loading={false} />
    </div>
  );
}

export default OrderList;
