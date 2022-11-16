import React, { useState } from "react";
import PropTypes from "prop-types";
import { Card, CardBody, Col, Row, Label, Alert } from "reactstrap";
import toastr from "toastr";
import "toastr/build/toastr.min.css";
import { propImages } from "../../../helpers/mockData";
import { map } from "lodash";
// import Alert from "react-bootstrap/Alert";
const REProjectDetail = (props) => {
  const { user } = props;
  const [imageIndex, setImageIndex] = useState(0);
  const [sellerContact, setSellerContact] = useState(false);
  const [show, setShow] = useState(true);
  //Toaster settings
  toastr.options = {
    progressBar: true,
    closeButton: true,
  };

  const handleNextClick = () => {
    if (imageIndex < user?.propertyPic?.length - 1) {
      setImageIndex((prevState) => prevState + 1);
    } else {
      setImageIndex(0);
    }
  };
  const handlePrevClick = () => {
    if (imageIndex < 1) {
      setImageIndex(user?.propertyPic?.length - 1);
    } else {
      setImageIndex((prevState) => prevState - 1);
    }
  };

  return (
    <React.Fragment>
      <div className="d-flex">
        <div className="container mt-5">
          <div className=" mt-5 flex-grow-1 overflow-hidden">
            {/* <h5 className=" ms-2 font-size-14 mb-1 text-dark">
              {user?.propertyName}
            </h5> */}
            <Row>
              <label className="col-ms-2 font-size-14  col-lg-2 ">
                Price : ₹
              </label>
              <div className="col-ms-2 font-size-14  col-lg-2 ">
                <label className="fw-bolder">{user?.Price}</label>
              </div>
            </Row>
            <Row>
              <label className="col-ms-2 font-size-14 col-lg-2">
                PlotSize :
              </label>
              <div className="col-ms-2 font-size-14 col-lg-2  ">
                <label className="fw-bolder">{user?.PlotSize}</label>
              </div>
              <div className="col-ms-2 font-size-14 col-lg-2  ">
                <label className="fw-bolder">{user?.Units}</label>
              </div>
            </Row>
            {/* </div> */}
            <Row>
              <label className="col-ms-2 font-size-14 col-lg-2">Area :</label>
              <div className="col-ms-2 font-size-14 col-lg-2  ">
                <p className="fw-bolder">{user?.Area}</p>
              </div>
            </Row>
            <Row>
              <label className="col-ms-2 font-size-14 col-lg-2">City :</label>
              <div className="col-ms-2 font-size-14 col-lg-8  ">
                <label className="fw-bolder">{user?.City} </label>
              </div>
            </Row>
            <Row>
              <label className="col-ms-2 font-size-14  col-lg-2  ">
                Landmark:
              </label>
              <div className="col-ms-2 font-size-14 col-lg-8 ">
                <p className="col-ms-2 fw-bolder">{user?.Landmark} </p>
              </div>
            </Row>
            <Row>
              <label className="col-ms-2 font-size-14 col-lg-2 ">
                Seller :
              </label>
              <div className="col-ms-2 font-size-14  col-lg-8  ">
                <label className="fw-bolder">{user?.Seller}</label>
              </div>
            </Row>
            <Row>
              <label className="col-ms-2 font-size-14  col-lg-2 ">
                Description:
              </label>
              <div className="col-ms-2 font-size-14 col-lg-8  ">
                <p className="fw-bolder">{user?.Description} </p>
              </div>
            </Row>
            <Row>
              <label className="col-ms-2 font-size-14 col-lg-2">Date :</label>
              <div className="col-ms-2 font-size-14  col-lg-8">
                <label className="fw-bolder">{user?.date} </label>
              </div>
            </Row>
            {/* <div className="container mt-3  d-flex  flex-row-reverse col-ms-2  "> */}
            <div className="container mt-3  d-flex col-ms-2  ">
              <button
                type="button"
                onClick={() => {
                  setSellerContact(!sellerContact);
                }}
                className="btn btn-dark btn-block "
              >
                Contact
              </button>
            </div>
            <div className="p-2">
              {sellerContact && (
                <div className="container mt-3">
                  <div className="alert alert-info alert-dismissible ">
                    <button
                      type="button"
                      onClick={() => {
                        setSellerContact(!sellerContact);
                      }}
                      className="btn-close"
                      data-bs-dismiss="alert"
                    ></button>
                    <h4>
                      <strong>View Contact!</strong>
                    </h4>
                    <p> Mobile No: 7822222222</p>
                    <p>EMail : reacrescbe@gmail.com</p>
                    <strong>Address:</strong>
                    <p>No:36,Nehru Street,Singanallur,Coimbatore-641005</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="container mt-3">
          <Card className="image-slider ">
            <div
              className="carousel slide"
              id="carouselExampleControls"
              data-bs-ride="carousel"
            >
              <div className="carousel-inner ">
                <div className="carousel-item active ">
                  <img
                    className="d-block w-70"
                    src={user?.propertyPic[imageIndex]}
                    alt="..."
                  />
                </div>
              </div>
              <button
                className="carousel-control-prev  "
                type="button"
                data-bs-target="#carouselExampleControls"
                data-bs-slide="prev"
              >
                <span
                  className="carousel-control-prev-icon  bg-dark "
                  aria-hidden="true"
                  onClick={() => handlePrevClick()}
                ></span>
                <span className="visually-hidden">Previous</span>
              </button>
              <button
                className="carousel-control-next "
                type="button"
                data-bs-target="#carouselExampleControls"
                data-bs-slide="next"
              >
                <span
                  className="carousel-control-next-icon bg-dark "
                  aria-hidden="true"
                  onClick={() => handleNextClick()}
                ></span>
                {}
                <span className="visually-hidden">Next</span>
              </button>
            </div>
            {/* </Swipe> */}
            {/* </CardBody> */}
          </Card>
        </div>
      </div>
    </React.Fragment>
  );
};
REProjectDetail.propTypes = {
  user: PropTypes.object,
};

export default REProjectDetail;
