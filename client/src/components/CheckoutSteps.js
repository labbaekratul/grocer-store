import React from "react";

const CheckoutSteps = (props) => {
  return (
    <div className="checkoutsteps">
      <div className="container">
        <div className="row checkout-steps">
          <div
            className={
              props.step1 ? "active col-3 text-center" : "col-3 text-center"
            }
          >
            <p className="steps">Sign In</p>
          </div>
          <div
            className={
              props.step2 ? "active col-3 text-center" : "col-3 text-center"
            }
          >
            <p className="steps">Shipping</p>
          </div>
          <div
            className={
              props.step3 ? "active col-3 text-center" : "col-3 text-center"
            }
          >
            <p className="steps">Payment</p>
          </div>
          <div
            className={
              props.step4 ? "active col-3 text-center" : "col-3 text-center"
            }
          >
            <p className="steps">Place Order</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutSteps;
