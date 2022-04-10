import { Card } from "@material-ui/core";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import CheckoutSteps from "../components/CheckoutSteps";
import Loading from "../components/Loading";
import Navbar from "../components/Navbar";
import { createOrder } from "../redux/actions/orderActions";
import { ORDER_CREATE_RESET } from "../redux/constants/orderConstans";

const PlaceOrderScreen = (props) => {
  const cart = useSelector((state) => state.cart);
  if (!cart.paymentMethod) {
    props.history.push("/payment");
  }

  const orderCreate = useSelector((state) => state.orderCreate);
  const { loading, success, error, order } = orderCreate;

  const toPrice = (num) => Number(num.toFixed(2));
  cart.itemsPrice = toPrice(
    cart.cartItem.reduce((a, c) => a + c.qty * c.price, 0)
  );

  cart.shippingPrice = cart.itemsPrice > 100 ? toPrice(0) : toPrice(10);
  cart.taxPrice = toPrice(0.15 * cart.itemsPrice);
  cart.totalPrice = cart.itemsPrice + cart.shippingPrice + cart.taxPrice;

  const dispatch = useDispatch();
  const placeOrderHandler = () => {
    dispatch(createOrder({ ...cart, orderItems: cart.cartItem }));
  };

  useEffect(() => {
    if (success) {
      props.history.push(`/order/${order._id}`);
      dispatch({ type: ORDER_CREATE_RESET });
    }
  }, [success, dispatch, order, props.history]);

  return (
    <div>
      <Navbar />
      <div className="mt-5"></div>
      <CheckoutSteps step1 step2 step3 step4 />

      <div className="container-fluid">
        <div className="row placeOrderScreen_row">
          <div className="col-md-6 col-12">
            <Card className="placeOrderScreen_info">
              <h6>Shipping</h6>
              <p>
                <span>Name :</span>{" "}
                <span className="shiping_info_user">
                  {cart.shippingAddress.fullName}
                </span>
              </p>
              <p>
                <span>Address :</span>{" "}
                <span className="shiping_info_user">
                  {cart.shippingAddress.address},{" "}
                  {cart.shippingAddress.cityName},{" "}
                  {cart.shippingAddress.postalCode},{" "}
                  {cart.shippingAddress.country},
                </span>
              </p>
            </Card>
            <Card className="placeOrderScreen_info">
              <h6>Payment</h6>
              <p>
                <span>Method : </span>{" "}
                <span className="paypal-color">{cart.paymentMethod}</span>
              </p>
            </Card>
            <Card className="placeOrderScreen_info ">
              <h6>Order items</h6>
              {cart.cartItem.map((e, i) => (
                <div
                  className="d-flex align-items-center justify-content-between"
                  key={i}
                >
                  <Card className="mini-card">
                    <img className="mini-img" src={e.image} alt={e.name} />
                  </Card>
                  <Link to={`/products/${e.product}`}>
                    <span>{e.name}</span>
                  </Link>
                  <span>
                    {e.qty} x ${e.price} ={e.qty * e.price}
                  </span>
                </div>
              ))}
            </Card>
          </div>
          <div className="col-md-6 col-12 placeOrderScreen_total_summery">
            <div>
              <Card className="placeOrderScreen__summery">
                <h6>Order Summary</h6>
                <div className="d-flex justify-content-between">
                  <span>items</span> <span>${cart.itemsPrice}</span>
                </div>
                <div className="d-flex justify-content-between">
                  <span>shipping</span> <span>${cart.shippingPrice}</span>
                </div>
                <div className="d-flex justify-content-between">
                  <span>tax</span> <span>${cart.taxPrice}</span>
                </div>

                <div className="d-flex justify-content-between">
                  <span className="lastspan">Order Total</span>{" "}
                  <span className="lastspan">${cart.totalPrice}</span>
                </div>
                <div className="mt-4 ">
                  <button
                    className="addtocart_btn"
                    onClick={placeOrderHandler}
                    disabled={cart.cartItem.length === 0}
                  >
                    Place Order
                  </button>
                </div>
                {loading && <Loading />}
                {error && "Invalid Order"}
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrderScreen;
