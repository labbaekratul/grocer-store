import axios from "axios";
import React, { useEffect, useState } from "react";
import ListOfProducts from "../components/ListOfProducts";
import Sidebar from "../components/Sidebar";

function ProductList() {
  const [products, setProducts] = useState();

  useEffect(() => {
    const getproductData = async () => {
      const { data } = await axios.get("/api/products");
      setProducts(data);
    };
    getproductData();
  }, []);

  return (
    <div className="container-fluid">
      <div className="row">
        <Sidebar />
        <div className="col-10">
          <ListOfProducts products={products} />
        </div>
      </div>
    </div>
  );
}

export default ProductList;
