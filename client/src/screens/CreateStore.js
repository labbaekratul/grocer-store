import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Loading from "../components/Loading";
import Sidebar from "../components/Sidebar";
import { createStore } from "../redux/actions/storeAction";

function CreateStore() {
  const [name, setName] = useState();
  const [deliveryTime, setDeliveryTime] = useState();
  //   const [openingTime, setOpeningTime] = useState("Monday - Friday (9am - 6pm)");
  const [image, setImage] = useState();
  const [loadingUpload, setLoadingUpload] = useState(false);
  const [errorUpload, setErrorUpload] = useState("");

  const dispatch = useDispatch();
  const history = useHistory();
  const storeCreate = useSelector((state) => state.storeCreate);

  useEffect(() => {
    if (storeCreate?.success) {
      alert("Store created successfully");
      history.push("/dashboard/stores");
    }
  }, [storeCreate, history]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      createStore({
        name,
        image,
        deliveryTime,
        openingTime: "Monday - Friday (9am - 6pm)",
      })
    );
  };

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const bodyFormData = new FormData();
    bodyFormData.append("image", file);
    setLoadingUpload(true);
    try {
      const { data } = await axios.post("/api/uploads", bodyFormData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${userInfo.token}`,
        },
      });
      setImage(data);
      setLoadingUpload(false);
    } catch (error) {
      setErrorUpload(error.message);
      setLoadingUpload(false);
    }
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <Sidebar />
        <div className="col-10 ">
          <div className="product-create">
            <h4>Create Store</h4>
            {storeCreate?.error && (
              <div>
                <p style={{ color: "red" }}>{storeCreate?.error}</p>
              </div>
            )}

            <div className="create-form">
              <form
                className="d-flex flex-column justify-content-center align-items-center mt-3 "
                onSubmit={submitHandler}
              >
                <div className="d-flex flex-column shiping_div creat-cc">
                  <label htmlFor="fullName">Store Name</label>
                  <input
                    className="my-3"
                    type="text"
                    id="fullName"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>

                <div className="d-flex flex-column shiping_div creat-cc ">
                  <label htmlFor="postalCode">Delivery Time</label>
                  <input
                    className="my-3"
                    type="text"
                    id="postalCode"
                    value={deliveryTime}
                    onChange={(e) => setDeliveryTime(e.target.value)}
                    required
                  />
                </div>
                {/* <div className="d-flex flex-column shiping_div creat-cc ">
                  <label htmlFor="postalCode">Opening Time</label>
                  <input
                    className="my-3"
                    type="number"
                    id="postalCode"
                    value={openingTime}
                    onChange={(e) => setOpeningTime(e.target.value)}
                    required
                  />
                </div> */}

                <div className="d-flex flex-column shiping_div creat-cc ">
                  <label htmlFor="country">Upload Images</label>
                  <input
                    className="my-3"
                    type="file"
                    id="country"
                    required
                    onChange={uploadFileHandler}
                  />
                  {loadingUpload && <Loading />}{" "}
                  {errorUpload && (
                    <p style={{ color: "red" }}>File is not uploaded</p>
                  )}
                </div>

                <div className="addtocart_btnDiv10 my-5">
                  <button className="addtocart_btn" type="submit">
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateStore;
