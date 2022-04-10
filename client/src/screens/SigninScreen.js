import React, { useEffect, useState } from "react";
import logo from "../images/logo.png";
import { Link } from "react-router-dom";
import { Card } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { signin } from "../redux/actions/userActions";
import Loading from "../components/Loading";

function SigninScreen(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const redirect = props.location.search
    ? props.location.search.split("=")[1]
    : "/";

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo, loading, error } = userSignin;

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(signin(email, password));
  };

  useEffect(() => {
    if (userInfo) {
      props.history.push(redirect);
    }
  }, [props.history, redirect, userInfo]);

  return (
    <div className="signinScreen">
      <div className="signin_bar">
        <div className="container signin_bar_container">
          <div className="signin_bar_logoNoption">
            <Link to="/">
              <img src={logo} alt="logo" className="navbar__logo" />
              {/* <h4>
                <span style={{ color: "#41326C" }}>DELI</span>
                <span style={{ color: "#9BC716" }}>CERY</span>
              </h4> */}
            </Link>
            <select value="English" className="signin_bar_option">
              <option value="English">English</option>
            </select>
          </div>
        </div>
        <div className="container singinform_container">
          <div className="row singinform_row">
            <div className="col-lg-6 col-md-12 col-12">
              <span className="signin_para">May 24 - Jun 6, 2021 PT</span>
              <h1 className="mt-3 signin_heading">
                2021 Beauty Online <br />
                trade Show
              </h1>
              <p className="signin_para1">
                Healthy, sustainable and <br /> trending product
              </p>
            </div>
            <div className="col-lg-6 col-md-8 col-12 ">
              <div className="sigin_box_col">
                <form className="balsal99" onSubmit={submitHandler}>
                  <Card className="px-4 py-5 add_to_cart_area">
                    <div className="siginin_flex ">
                      {loading && <Loading />}
                      {error && <p className="mb-2 errorcolor">{error}</p>}
                      <label htmlFor="email">Account:</label>
                      <input
                        type="text"
                        placeholder="Email address or member ID"
                        id="email"
                        required
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                    <div className="siginin_flex">
                      <label htmlFor="password">Password:</label>
                      <input
                        type="password"
                        placeholder="Password"
                        id="password"
                        required
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>
                    <div className="checkboxpart">
                      <input type="checkbox" /> <label>Stay signed in</label>
                    </div>
                    <div className="addtocart_btnDiv ">
                      <button className="addtocart_btn" type="submit">
                        Sign In
                      </button>
                    </div>

                    <div className="register_btn_div">
                      <span>New Customer? </span>{" "}
                      <Link
                        to={`/register?redirect=${redirect}`}
                        className="new_acc_link"
                      >
                        Create your accunt
                      </Link>
                    </div>
                  </Card>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SigninScreen;
