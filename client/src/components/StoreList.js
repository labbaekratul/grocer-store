import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { listStores } from "../redux/actions/storeAction";

function StoreList() {
  const Stores = useSelector((state) => state.storeList);
  const { stores, loading } = Stores;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listStores());
  }, [dispatch]);

  return (
    <div className="container">
      <h4 style={{ textAlign: "center", marginBottom: "50px" }}>
        List of Stores
      </h4>
      <div className="row store-card-row">
        {loading
          ? "loading"
          : stores?.map((x, i) => (
              <div className="col-4" key={i}>
                <Link to={`/product/${x?.name}`}>
                  <div className="store-card shadow ">
                    <div className="store-card-img">
                      <img src={x.image} alt={i} />
                      {}
                    </div>
                    <div className="store-card-details">
                      <span>{x.name}</span>
                      <small>{x.deliveryTime}</small>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
      </div>
    </div>
  );
}

export default StoreList;
