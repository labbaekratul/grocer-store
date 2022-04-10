import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import { register } from "../redux/actions/userActions";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../components/Loading";

function RegistrationScreen(props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCpassword] = useState("");

  const redirect = props.location.search
    ? props.location.search.split("=")[1]
    : "/";

  const userRegister = useSelector((state) => state.userRegister);
  const { userInfo, loading, error } = userRegister;

  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== cpassword) {
      alert("Password and Confirm Password are not matched");
    } else {
      dispatch(register(name, email, password));
    }
  };

  useEffect(() => {
    if (userInfo) {
      props.history.push(redirect);
    }
  }, [props.history, redirect, userInfo]);

  return (
    <div className="registrationscreen">
      <Navbar />
      <div className="container">
        <div className="row">
          <div className="col-12">
            <form className="hudaintest" onSubmit={submitHandler}>
              <h4> Create New Accout</h4>
              <div>
                {loading && <Loading />}
                {error && <p className="mb-2 errorcolor">{error}</p>}
                <div className="resDiv">
                  <label htmlFor="name">Name</label>
                  <input
                    type="text"
                    placeholder="Please enter your name"
                    id="Name"
                    className="resinput"
                    required
                    onChange={(e) => setName(e.target.value)}
                  ></input>
                </div>
                <div className="resDiv">
                  <label htmlFor="email">Email Address</label>
                  <input
                    type="text"
                    placeholder="Please enter your email"
                    id="email"
                    className="resinput"
                    required
                    onChange={(e) => setEmail(e.target.value)}
                  ></input>
                </div>
                <div className="resDiv">
                  <label htmlFor="password">Login Password</label>
                  <input
                    type="password"
                    placeholder="Please set your login password"
                    id="password"
                    className="resinput"
                    required
                    onChange={(e) => setPassword(e.target.value)}
                  ></input>
                </div>
                <div className="resDiv">
                  <label htmlFor="cPassword">Confirm Password</label>
                  <input
                    type="password"
                    placeholder="Please confirm your password"
                    id="cPassword"
                    className="resinput"
                    required
                    onChange={(e) => setCpassword(e.target.value)}
                  ></input>
                </div>
                <div className="addtocart_btnDiv mt-5">
                  <button className="addtocart_btn" type="submit">
                    Registration
                  </button>
                </div>
                <div className="mt-2 mb-5 ">
                  <p className="alhc">
                    Already have an account?{" "}
                    <span>
                      <Link
                        to={`/signin?redirect=${redirect}`}
                        className="linkclas"
                      >
                        Sign-In
                      </Link>
                    </span>
                  </p>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegistrationScreen;
