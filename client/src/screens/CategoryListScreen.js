import React from "react";
import CategoryList from "../components/CategoryList";
import Sidebar from "../components/Sidebar";

function CategoryListScreen() {
  return (
    <div className="container-fluid">
      <div className="row">
        <Sidebar />
        <div className="col-10">
          <CategoryList />
        </div>
      </div>
    </div>
  );
}

export default CategoryListScreen;
