import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CheckoutSteps from "../components/CheckoutSteps";
import Navbar from "../components/Navbar";
import { savePaymentMethod } from "../redux/actions/cartActions";

const PaymentMethod = (props) => {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;
  if (!shippingAddress.address) {
    props.history.push("/shipping");
  }
  const [paymentMethod, setPaymentMethod] = useState("PayPal");
  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    props.history.push("/placeorder");
  };

  return (
    <div className="paymentmethod">
      <Navbar />
      <div className="my-5"></div>
      <CheckoutSteps step1 step2 step3 />
      <div className="container">
        <div className="row">
          <div className="col-12">
            <h4 className="text-center payment_un">Payment Method</h4>
            <form className="payment_form" onSubmit={submitHandler}>
              <div className="checkout_payment_div1">
                <input
                  type="radio"
                  value="Paypal"
                  id="paypal"
                  name="paymentMethod"
                  required
                  checked
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                <label htmlFor="paypal">PayPal</label>
              </div>
              <div className="checkout_payment_div1">
                <input
                  type="radio"
                  value="Stripe"
                  id="stripe"
                  name="paymentMethod"
                  required
                />
                <label htmlFor="stripe">Stripe</label>
              </div>
              <div className="checkout_payment_div">
                <button type="submit" className="addtocart_btn">
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

export default PaymentMethod;
