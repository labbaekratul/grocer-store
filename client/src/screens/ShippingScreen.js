import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CheckoutSteps from "../components/CheckoutSteps";
import Navbar from "../components/Navbar";
import { saveShippingAddress } from "../redux/actions/cartActions";

const ShippingScreen = (props) => {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  if (!userInfo) {
    props.history.push("/signin");
  }

  const [fullName, setFullName] = useState(shippingAddress.fullName);
  const [address, setAddress] = useState(shippingAddress.address);
  const [cityName, setCityName] = useState(shippingAddress.cityName);
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
  const [country, setCountry] = useState(shippingAddress.country);
  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      saveShippingAddress({ fullName, address, cityName, postalCode, country })
    );
    props.history.push("/payment");
  };

  return (
    <div className="shippingScreen">
      <Navbar />
      <div className="my-5">
        <CheckoutSteps step1 step2 />
      </div>
      <div className="container">
        <div className="row">
          <div className="col-12 text-center my-5">
            <h3>Shipping Address</h3>
          </div>

          <div className="col-12">
            <form
              className="d-flex flex-column justify-content-center align-items-center"
              onSubmit={submitHandler}
            >
              <div className="d-flex flex-column shiping_div">
                <label htmlFor="fullName">Full Name</label>
                <input
                  className="my-3"
                  type="text"
                  placeholder="Enter you full name"
                  id="fullName"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                />
              </div>
              <div className="d-flex flex-column shiping_div">
                <label htmlFor="address">Address</label>
                <input
                  className="my-3"
                  type="text"
                  placeholder="Enter you address"
                  id="address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  required
                />
              </div>
              <div className="d-flex flex-column shiping_div">
                <label htmlFor="cityName">City Name</label>
                <input
                  className="my-3"
                  type="text"
                  placeholder="Enter you city name"
                  id="cityName"
                  value={cityName}
                  onChange={(e) => setCityName(e.target.value)}
                  required
                />
              </div>
              <div className="d-flex flex-column shiping_div">
                <label htmlFor="postalCode">Postal Code</label>
                <input
                  className="my-3"
                  type="text"
                  placeholder="Enter your postal code"
                  id="postalCode"
                  value={postalCode}
                  onChange={(e) => setPostalCode(e.target.value)}
                  required
                />
              </div>
              <div className="d-flex flex-column shiping_div">
                <label htmlFor="country">Country</label>
                <input
                  className="my-3"
                  type="text"
                  placeholder="Enter you country name"
                  id="country"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  required
                />
              </div>
              <div className="addtocart_btnDiv10 my-5">
                <button className="addtocart_btn" type="submit">
                  Continue
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShippingScreen;
