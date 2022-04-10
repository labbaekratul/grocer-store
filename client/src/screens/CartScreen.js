import React, { useEffect } from "react";
import { addToCart, removeFromCart } from "../redux/actions/cartActions";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Button, Card } from "@material-ui/core";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import { FcEmptyTrash } from "react-icons/fc";
import Navbar from "../components/Navbar";

function CartScreen(props) {
  const productId = props.match.params.id;
  const qty = props.location.search
    ? Number(props.location.search.split("=")[1])
    : 1;

  const cart = useSelector((state) => state.cart);
  const { cartItem } = cart;
  const dispatch = useDispatch();
  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
  }, [productId, qty, dispatch]);

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const checkOutProceedHandler = () => {
    props.history.push("/signin?redirect=shipping");
  };

  return (
    <div className="cartScreen">
      <Navbar />
      <div className="container-fluid">
        <div className="row">
          <div className="shopingcartheading">
            <h4 className="text-center mb-5 mt-2 px-2">Shopping Cart</h4>
            <h4 className="dispaly_none text-center mb-5 mt-2 px-2">
              <Link to="/" className="goshop">
                Back to Shopping
              </Link>
            </h4>
          </div>
          <div className="col-md-8 col-12">
            {cartItem.length === 0 ? (
              <span className="alinment">
                <span className="empty_cart backToShop">
                  <span>
                    Cart is Empty... <FcEmptyTrash className="nav_trash" />
                  </span>
                  <span>
                    <Link to="/" className="goshop">
                      Back to Shopping
                    </Link>
                  </span>
                </span>
              </span>
            ) : (
              <div className="prolist_div">
                {cartItem.map((item) => (
                  <div key={item.product}>
                    <div className="row ">
                      <div className="col-md-6 col-12 mb-4">
                        <div className="cartToCart_products1">
                          <Card className="cartToCartImg">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="image-fluid cartToCartImg1"
                            />
                          </Card>
                          <div className="shopingCart_pname">
                            <Link to={`/product/${item.store}`}>
                              <span className="storeColor">{item.store}</span>
                            </Link>
                          </div>
                          <div className="shopingCart_pname">
                            <Link to={`/products/${item.product}`}>
                              {item.name}
                            </Link>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6 col-12 mb-4">
                        <div className="cartToCart_products1 itemjustify">
                          <Select
                            variant="outlined"
                            onChange={(e) =>
                              dispatch(
                                addToCart(item.product, Number(e.target.value))
                              )
                            }
                            value={item.qty}
                          >
                            {[...Array(item.countInStock).keys()].map((e) => (
                              <MenuItem key={e + 1} value={e + 1}>
                                {e + 1}
                              </MenuItem>
                            ))}
                          </Select>
                          <div className="price1">${item.price}</div>
                          <div>
                            <Button
                              variant="contained"
                              color="secondary"
                              className="delete_btn"
                              onClick={() =>
                                removeFromCartHandler(item.product)
                              }
                            >
                              Delete
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="col-md-4 col-12 ">
            <div className="add_to_cart_area_div1">
              <Card className="add_to_cart_area p-3">
                <div>
                  <p className="subtotal">
                    Total price for ({cartItem.reduce((a, c) => a + c.qty, 0)})
                    items : $
                    {Math.ceil(
                      cartItem.reduce((a, c) => a + c.price * c.qty, 0)
                    )}
                  </p>
                </div>
                <div className="addtocart_btnDiv">
                  <button
                    className="addtocart_btn"
                    onClick={checkOutProceedHandler}
                    disabled={cartItem.length === 0}
                  >
                    Proceed to Checkout
                  </button>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartScreen;
