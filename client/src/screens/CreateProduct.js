import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Loading from "../components/Loading";
import Sidebar from "../components/Sidebar";
import { createProduct } from "../redux/actions/productActions";

function CreateProduct() {
  const [pname, setPname] = useState("");
  const [store, setStore] = useState("");
  const [storOption, setStorOption] = useState("");
  const [categoryOption, setCategoryOption] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [countInStock, setCountInStock] = useState(0);
  const [rating, setRating] = useState(0);
  const [reviews, setReviews] = useState(0);
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [loadingUpload, setLoadingUpload] = useState(false);
  const [errorUpload, setErrorUpload] = useState("");

  const dispatch = useDispatch();
  const history = useHistory();
  const productCreated = useSelector((state) => state.productCreate);

  useEffect(() => {
    const getStore = async () => {
      const { data } = await axios.get("/api/store");
      setStorOption(data);
    };
    getStore();
  }, []);

  useEffect(() => {
    const getCategory = async () => {
      const { data } = await axios.get("/api/category");
      setCategoryOption(data);
    };
    getCategory();
  }, []);

  useEffect(() => {
    if (productCreated.success) {
      alert("Product created successfully");
      history.push("/dashboard/products");
    }
  }, [productCreated, history]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      createProduct({
        name: pname,
        category: category,
        image: image,
        price: 120,
        countInStock: countInStock,
        store: store,
        rating: rating,
        numReviews: reviews,
        description: description,
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
            <h4>Create Product</h4>
            {productCreated.error && (
              <div>
                <p style={{ color: "red" }}>{productCreated.error}</p>
              </div>
            )}

            <div className="create-form">
              <form
                className="d-flex flex-column justify-content-center align-items-center mt-3 "
                onSubmit={submitHandler}
              >
                <div className="d-flex flex-column shiping_div creat-cc">
                  <label htmlFor="fullName">Product Name</label>
                  <input
                    className="my-3"
                    type="text"
                    placeholder="Enter you product name"
                    id="fullName"
                    value={pname}
                    onChange={(e) => setPname(e.target.value)}
                    required
                  />
                </div>
                <div className="d-flex flex-column shiping_div creat-cc mb-3">
                  <label htmlFor="fullName">Store Name</label>
                  <select
                    value={store}
                    onChange={(e) => setStore(e.target.value)}
                  >
                    <option>Select Store</option>
                    {storOption &&
                      storOption.map((x) => <option>{x.name}</option>)}
                  </select>
                </div>
                <div className="d-flex flex-column shiping_div creat-cc mb-3">
                  <label htmlFor="address">Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    <option>Select Category</option>
                    {categoryOption &&
                      categoryOption.map((x) => <option>{x.name}</option>)}
                  </select>
                </div>

                <div className="d-flex flex-column shiping_div creat-cc ">
                  <label htmlFor="postalCode">Price</label>
                  <input
                    className="my-3"
                    type="text"
                    placeholder="Price"
                    id="postalCode"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    required
                  />
                </div>
                <div className="d-flex flex-column shiping_div creat-cc ">
                  <label htmlFor="postalCode">CountInStock</label>
                  <input
                    className="my-3"
                    type="number"
                    placeholder="CountInStock"
                    id="postalCode"
                    value={countInStock}
                    onChange={(e) => setCountInStock(e.target.value)}
                    required
                  />
                </div>
                <div className="d-flex flex-column shiping_div creat-cc ">
                  <label htmlFor="country">Rating</label>
                  <input
                    className="my-3"
                    type="number"
                    placeholder="Rating"
                    id="country"
                    value={rating}
                    onChange={(e) => setRating(e.target.value)}
                    required
                  />
                </div>
                <div className="d-flex flex-column shiping_div creat-cc ">
                  <label htmlFor="country">Number of reviews</label>
                  <input
                    className="my-3"
                    type="number"
                    placeholder="Reviwes"
                    id="country"
                    value={reviews}
                    onChange={(e) => setReviews(e.target.value)}
                    required
                  />
                </div>

                <div className="d-flex flex-column shiping_div creat-cc ">
                  <label htmlFor="country">Descriptin</label>
                  <input
                    className="my-3"
                    type="text"
                    placeholder="Descripting"
                    id="country"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                  />
                </div>

                <div className="d-flex flex-column shiping_div creat-cc ">
                  <label htmlFor="country">Upload Images</label>
                  <input
                    className="my-3"
                    type="file"
                    placeholder="Descripting"
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

export default CreateProduct;
