import React, { useState } from "react";
import { BsSearch } from "react-icons/bs";
import { FcBusinessman } from "react-icons/fc";
import { FcAddDatabase } from "react-icons/fc";
import { FcSms } from "react-icons/fc";
import { FcMoneyTransfer } from "react-icons/fc";
import { FcPaid } from "react-icons/fc";
import { Link, useHistory } from "react-router-dom";
// import { BsArrowDownShort } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
// import { GrUserAdmin } from "react-icons/gr";
import { FaCaretDown } from "react-icons/fa";
import { signout } from "../redux/actions/userActions";
import logo from "../images/logo.png";
import axios from "axios";

function Navbar() {
  const [name, setName] = useState("");
  const [category, setCategory] = useState();
  const cart = useSelector((state) => state.cart);
  const history = useHistory();
  const { cartItem } = cart;
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const dispatch = useDispatch();
  const SignOutHandler = () => {
    dispatch(signout());
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (name) {
      history.push(`/search/${name}`);
    }
  };

  const getCategory = async () => {
    const { data } = await axios.get("/api/products/categories");
    setCategory(data);
  };

  return (
    <div className="navbar1">
      <div className="container-fluid ">
        <div className="row">
          <div className="col-lg-2 col-2 logo">
            <Link to="/">
              <img src={logo} alt="logo" className="navbar__logo" />
            </Link>
          </div>
          <div
            className="col-lg-7 col-md-6 col-12
           searchbar"
          >
            <form className="searchbar__div row" onSubmit={submitHandler}>
              <span className="col-2 Products_">
                {/* Products <BsArrowDownShort /> */}
                <div class="btn-sm  dropdown dropdwon-category">
                  <button
                    class="btn btn-info dropdown-toggle"
                    type="button"
                    id="dropdownMenuButton1"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                    onClick={getCategory}
                  >
                    Category
                  </button>
                  <ul
                    class="dropdown-menu"
                    aria-labelledby="dropdownMenuButton1"
                  >
                    {category &&
                      category.map((x, i) => (
                        <li key={i}>
                          <Link to={`/category/${x}`}>{x}</Link>
                        </li>
                      ))}
                  </ul>
                </div>
              </span>
              <input
                type="text"
                className="searchbar_input col-8"
                placeholder="What are you looking for..."
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <div className="search_btn col-2">
                <BsSearch />
                <small type="submit">Search</small>
              </div>
            </form>
          </div>
          <div className="col-lg-3 col-md-6 col-12 user_nav_col">
            <div className="user_nav">
              <FcBusinessman className="nav_icos" />

              <span>
                {userInfo?.name ? (
                  <Link to="#" className="linkClass">
                    {userInfo?.name}
                  </Link>
                ) : (
                  <Link to="/signin" className="linkClass">
                    Sign in
                  </Link>
                )}
                <span className="signoutrelative">
                  <FaCaretDown />
                  <span className="signoutafter">
                    <Link
                      to="/#signout"
                      className="linkClass"
                      onClick={SignOutHandler}
                    >
                      Signout
                    </Link>
                  </span>
                </span>
              </span>
            </div>
            <div className="user_nav">
              {userInfo?.isAdmin === true ? (
                <Link to="/dashboard">
                  <FcAddDatabase className="nav_icos" />
                </Link>
              ) : (
                <FcSms className="nav_icos" />
              )}
              <span>
                {userInfo?.isAdmin === true ? (
                  <Link to="/dashboard">Dashboard</Link>
                ) : (
                  "Messages"
                )}
              </span>
            </div>
            <div className="user_nav">
              <Link to="/ordershisyory" className="user_nav">
                <FcMoneyTransfer className="nav_icos" />
                <span className="text-order">Orders</span>
              </Link>
            </div>
            <div className="user_nav">
              <span className="cart_align1">
                <span className="linktetst">
                  <Link to="/cart" className="BuSket">
                    <FcPaid className="nav_icos" />
                  </Link>
                </span>
                <span className="cart_amout ">
                  {cartItem.length > 0 && cartItem.length}
                </span>
              </span>

              <Link to="/cart" className="BuSket">
                <span>Cart</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
