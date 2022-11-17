import PropTypes from "prop-types";
import React from "react";
import { Link } from "react-router-dom";
import { Card, CardBody, Row, Col, Container } from "reactstrap";
import { propImages } from "../../../helpers/mockData";
import { useState, useEffect } from "react";
import SendMail from "RealEstateCbe/components/chat/style/SendMail";
import { useToggle } from "RealEstateCbe/helpers/hooks/useToggle";
const RELandingCard = (props) => {
  const imgIndex = Math.floor(Math.random() * 5);
  const { user, property } = props;
  const {
    toggleOpen: mailModalOpen,
    setToggleOpen: setMailModalOpen,
    toggleIt: toggleMailModal,
  } = useToggle(false);
  const [sellerContact, setSellerContact] = useState(false);
  console.log(user);
  return (
    <React.Fragment>
      <Col xl="6" sm="4">
        {user && (
          <SendMail
            open={mailModalOpen}
            setOpen={setMailModalOpen}
            toggleOpen={toggleMailModal}
            currentProperty={user._id}
          />
        )}
        {/* <Col xl="8" sm="2"> */}
        {/* <div className="container mt-2"> */}

        <Card className=" border-dark ">
          <div className="bg-warning bg-soft">
            <Row className="">
              <Link to={`/REprojectoverview?uid=${user._id}`}>
                <CardBody>
                  <div className="">
                    <div className="d-xl-block   ">
                      <div className="justify-content-center">
                        <div className="text-center">
                          <img
                            // className=" avatar-xl "
                            src={user?.propertyPic[0]}
                            height="200"
                            width="200"
                            alt="No Images"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </CardBody>

                {/* <div className="container ">
                  <Row className="justify-content-center">
                    <Col sm={9} md={8} lg={7} xl={9}>
                      {/* </div> 
                      <div className=" mb-2">
                        <div className="overflow-hidden justify-content-center">
                          <CardBody>
                            <div className=""> */}
                <div className="container">
                  <container className="mt-2">
                    <div className=" flex-grow-1 overflow-hidden">
                      <Row className="justify-content-center">
                        <Col sm={9} md={8} lg={7} xl={9}>
                          <Row>
                            {/* <label className=" font-size-14  col-lg-4 ">
                              House Type :
                            </label> */}
                            <div className="text-center font-size-18  ">
                              <label className="fw-bolder text-center text-warning">
                                {user?.Housetype + " for Sale"}
                              </label>
                            </div>
                          </Row>
                          <Row className="justify-content-center">
                            <label className=" col-ms-2 font-size-14  col-lg-4 ">
                              Price :
                            </label>
                            <div className="text-left col-ms-2 font-size-14  col-lg-4 ">
                              <label className="text-left  fw-bolder ">
                                {"₹ " + user?.Price}
                              </label>
                            </div>
                          </Row>
                          <Row className="justify-content-center">
                            <label className="col-ms-2 font-size-14 col-lg-4">
                              PlotSize :
                            </label>
                            <div className=" text-left col-ms-2 font-size-14 col-lg-2 ">
                              <label className=" text-left fw-bolder">
                                {user?.PlotSize}
                              </label>
                            </div>
                            <div className="text-left col-ms-2 font-size-14 col-lg-2  ">
                              <label className="text-left fw-bolder">
                                {user?.Units}
                              </label>
                            </div>
                          </Row>
                          {/* </div> */}
                          <Row className="justify-content-center">
                            <label className="col-ms-2 font-size-14 col-lg-4">
                              Location :
                            </label>
                            <div className="text-left col-ms-2 font-size-14 col-lg-4">
                              <label className="text-left fw-bolder">
                                {user?.Area}
                              </label>
                            </div>
                          </Row>
                          <Row className="justify-content-center">
                            <label className="col-ms-2 font-size-14 col-lg-4">
                              City :
                            </label>
                            <div className="col-ms-2 font-size-14 col-lg-4 ">
                              <label className="fw-bolder">{user?.City} </label>
                            </div>
                          </Row>
                        </Col>
                      </Row>
                    </div>
                  </container>
                </div>
                {/* </div>
                          </CardBody>
                        </div>
                      </div>
                    </Col>
                  </Row>
                </div> */}
                {/* </Container> */}

                {/* <div className="container mt-2 mt-3"> */}
                {/* <h5 className="font-size-14 mb-1 text-dark text-body">
                      {user?.Housetype + " for Sale"}
                    </h5>

                    <p className="font-size-14 text-body ">{user?.Price}</p>
                    {/* <p className="font-size-14 text-body ">{user?.Area}</p> 
                    <p className="font-size-14 text-body">{user?.Landmark}</p>
                    <p className="font-size-14 text-body">{user?.City}</p>
                  </div> */}
                {/* <p className="text-body font-size-18">{user?.Seller}</p> */}
                {/* </CardBody> */}
              </Link>
            </Row>

            <div className="">
              <Row>
                <div className=" text-center col ">
                  <button
                    type="button"
                    onClick={() => {
                      setSellerContact(!sellerContact);
                    }}
                    className="btn btn-primary btn-block "
                  >
                    Contact
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setMailModalOpen(true);
                    }}
                    className="btn btn-success "
                    data-dismiss="modal"
                  >
                    Send Mail
                  </button>
                </div>

                {sellerContact && (
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
                    <p>EMail : realescbe@gmail.com</p>
                    <strong>Address:</strong>
                    <p>No:36,Nehru Street,Singanallur,Coimbatore-641005</p>
                  </div>
                )}

                {/* <Link to="/propertylist-page"> */}
                {/* <div className="col">
                <button
                  type="button"
                  onClick={() => {
                    setMailModalOpen(true);
                  }}
                  className="btn btn-primary "
                  data-dismiss="modal"
                >
                  Send Mail
                </button>
              </div> */}
                {/* </Link> */}
              </Row>
            </div>
          </div>
        </Card>

        {/* </div> */}
      </Col>
    </React.Fragment>
  );
};

RELandingCard.propTypes = {
  user: PropTypes.object,
  property: PropTypes.object,
};

export default RELandingCard;
