import React from "react";
import Navbar from "../components/Navbar";
import Products from "../components/Products";
import StoreList from "../components/StoreList";
import slider2 from "../images/slider2.jpg";
import slider3 from "../images/slider3.jpg";
import slider4 from "../images/slider4.jpg";

function HomeScreen() {
  return (
    <div className="homeScreen">
      <Navbar />
      <div className="container-fluid homeScreen__container ">
        <div className="row homeScreen__row">
          <div className="col-12">
            <div
              id="carouselExampleControls"
              className="carousel slide"
              data-bs-ride="carousel"
            >
              <div className="carousel-inner">
                <div className="carousel-item active">
                  <img
                    src={slider2}
                    className="d-block w-100 image-fluid balsal"
                    alt="slider1"
                  />
                </div>
                <div className="carousel-item">
                  <img
                    src={slider3}
                    className="d-block w-100 image-fluid"
                    alt="slider2"
                  />
                </div>
                <div className="carousel-item">
                  <img
                    src={slider4}
                    className="d-block w-100 image-fluid"
                    alt="slider3"
                  />
                </div>
              </div>
              <button
                className="carousel-control-prev"
                type="button"
                data-bs-target="#carouselExampleControls"
                data-bs-slide="prev"
              >
                <span
                  className="carousel-control-prev-icon"
                  aria-hidden="true"
                ></span>
                <span className="visually-hidden">Previous</span>
              </button>
              <button
                className="carousel-control-next"
                type="button"
                data-bs-target="#carouselExampleControls"
                data-bs-slide="next"
              >
                <span
                  className="carousel-control-next-icon"
                  aria-hidden="true"
                ></span>
                <span className="visually-hidden">Next</span>
              </button>
            </div>
          </div>
        </div>
        <div className="container">
          <StoreList />
          <Products />
        </div>
      </div>
    </div>
  );
}

export default HomeScreen;
