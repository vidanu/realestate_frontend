import React, { useEffect, useState } from "react";

import MetaTags from "react-meta-tags";
import { Row, Col, CardBody, Card, Container } from "reactstrap";

// import images
import computer from "assets/images/coimbatorelogo.png";

const ContactUs = () => {
  return (
    <React.Fragment>
      <MetaTags>
        <title>Contact Us| Coimbatore RealEstate</title>
      </MetaTags>
      <div className="page-content">
        <div className="d-flex ">
          <div className="d-none d-xl-block  ps-lg-5 ms-lg-5 mt-2 ">
            <div className="my-5">
              <div className="justify-content-center">
                <img src={computer} height="250" />
              </div>
              <h4 className="mb-3 mt-5">
                <i className="bx bxs-quote-alt-left text-primary h1 align-middle me-3"></i>
                Home is the starting place of love, hope and dreams{" "}
                <i className="bx bxs-quote-alt-right text-primary h1 align-middle me-3"></i>
              </h4>
            </div>
          </div>
          <div className="container  ms-xl-1 mt-2 ">
            <Container className="cont1 mt-5">
              <Row className="justify-content-center">
                <Col md={10} lg={7} xl={9}>
                  <Card className="overflow-hidden justify-center">
                    <div className="">
                      <Row>
                        <Col className="col-7">
                          <div className="text-primary p-4">
                            <h5 className="text-primary"> View Contact !</h5>
                            <p></p>
                            <p> Mobile No: 7822222222</p>
                            <p>EMail : realescbe@gmail.com</p>
                            <strong>Address:</strong>
                            <p>
                              No:36,Nehru Street,Singanallur,Coimbatore-641005
                            </p>
                          </div>
                        </Col>
                      </Row>
                    </div>
                  </Card>
                </Col>
              </Row>
            </Container>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default ContactUs;
