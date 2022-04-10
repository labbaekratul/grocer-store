import { Card } from "@material-ui/core";
// import Axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Loading from "../components/Loading";
import MessageBox from "../components/MessageBox";
import Navbar from "../components/Navbar";
import { detailsOrder } from "../redux/actions/orderActions";
import { PayPalButton } from "react-paypal-button-v2";

const OrderScreen = (props) => {
  //   const [sdkready, setSdkready] = useState(false);
  const orderId = props.match.params.id;
  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, loading, error } = orderDetails;
  const dispatch = useDispatch();

  useEffect(() => {
    // const addPayPalScript = async () => {
    //   const { data } = await Axios.get("/api/config/paypal");
    //   const script = document.createElement("script");
    //   script.type = "text/javascript";
    //   script.src = `https://www.paypal.com/sdk/js?client-id=${data}`;
    //   script.async = true;
    //   script.onload = () => {
    //     setSdkready(true);
    //   };
    //   document.body.appendChild(script);
    // };

    // if (!order._id) {
    dispatch(detailsOrder(orderId));
    // } else {
    //   if (!order.isPaid) {
    //     if (!window.paypal) {
    //       addPayPalScript();
    //     } else {
    //       setSdkready(true);
    //     }
    //   }
    // }
  }, [dispatch, orderId]);

  //   const successPaymentHandler = () => {};

  return loading ? (
    <Loading />
  ) : error ? (
    <MessageBox />
  ) : (
    <div>
      <Navbar />

      <div className="container-fluid">
        <div className="my-4">
          <h5>
            <span style={{ color: "green" }}>ORDER ID :</span> {order._id}
          </h5>
        </div>
        <div className="row OrderScreen_row">
          <div className="col-md-6 col-12">
            <Card className="placeOrderScreen_info">
              <h6>Shipping</h6>
              <p>
                <span>Name :</span>{" "}
                <span className="shiping_info_user">
                  {order.shippingAddress.fullName}
                </span>
              </p>
              <p>
                <span>Address :</span>{" "}
                <span className="shiping_info_user">
                  {order.shippingAddress.address},{" "}
                  {order.shippingAddress.cityName},{" "}
                  {order.shippingAddress.postalCode},{" "}
                  {order.shippingAddress.country},
                </span>
                <div className="develeredstatus">
                  {order.isDeliveredAt ? (
                    <p className="successcolor mt-3">
                      Delivered at {order.deliveredAt}
                    </p>
                  ) : (
                    <p className="errorcolor mt-3">Not Delivered </p>
                  )}
                </div>
              </p>
            </Card>
            <Card className="placeOrderScreen_info">
              <h6>Payment</h6>
              <p>
                <span>Method : </span>{" "}
                <span className="paypal-color">{order.paymentMethod}</span>
              </p>
              <div className="develeredstatus">
                {order.isPaid ? (
                  <p className="successcolor mt-3">Paid at {order.paidAt}</p>
                ) : (
                  <p className="errorcolor mt-3">Not Paid </p>
                )}
              </div>
            </Card>
            <Card className="placeOrderScreen_info ">
              <h6>Order items</h6>
              {order.orderItems.map((e, i) => (
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
                  <span>items</span> <span>${order.itemsPrice}</span>
                </div>
                <div className="d-flex justify-content-between">
                  <span>shipping</span> <span>${order.shippingPrice}</span>
                </div>
                <div className="d-flex justify-content-between">
                  <span>tax</span> <span>${order.taxPrice}</span>
                </div>

                <div className="d-flex justify-content-between">
                  <span className="lastspan">Order Total</span>{" "}
                  <span className="lastspan">${order.totalPrice}</span>
                </div>
                <div className="paypal_div mt-4">
                  {!order.isPaid && (
                    <li>
                      <PayPalButton amount={order.totalPrice}></PayPalButton>
                    </li>
                  )}
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderScreen;
