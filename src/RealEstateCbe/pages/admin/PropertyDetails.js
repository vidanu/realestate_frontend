import MetaTags from "react-meta-tags";
import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, CardBody, Button } from "reactstrap";
import { Link } from "react-router-dom";

//Import Breadcrumb
import Breadcrumb from "components/Common/Breadcrumb";
import { useQuery } from "RealEstateCbe/helpers/hooks/useQuery";
import DeleteModal from "RealEstateCbe/components/modals/DeleteModal";
import { useModal } from "RealEstateCbe/helpers/hooks/useModal";
import {
  getPropertyDetailsById,
  removeProperty,
} from "RealEstateCbe/helpers/REbackend_helper";
import { success } from "toastr";
import { set } from "lodash";

import toastr from "toastr";
import "toastr/build/toastr.min.css";

const PropertyDetails = () => {
  const query = useQuery();

  const [modalOpen, setModalOpen, toggleModal] = useModal(false);
  const [property, setGetProperty] = useState(null);
  // const [getPayment, setGetPayment] = useState(null);
  // const [paymentData, setPaymentData] = useState([]);

  const getPropertyId = async () => {
    const res = await getPropertyDetailsById({
      propertyId: query.get("id"),
    });
    if (res.success) {
      setGetProperty(res.Property);
      console.log("res", res);
    }
  };

  useEffect(() => {
    getPropertyId();
  }, []);

  const handleRemovingProperty = async () => {
    const payload = {
      PropertyID: [property?._id],
    };
    const res = await removeProperty(payload);
    if (res.success) {
      console.log(res);
      toastr.success(`Property has been Deactivated successfully`, "Success");
    } else {
      console.log("Error : ", res?.msg || "error");
    }
    setModalOpen(false);
  };
  return (
    <React.Fragment>
      <DeleteModal
        show={modalOpen}
        onDeleteClick={handleRemovingProperty}
        confirmText="Yes,DeActive"
        cancelText="Cancel"
        onCloseClick={toggleModal}
      />
      <div className="page-content">
        <MetaTags>
          <title>
            Property Deatails | RealEstate - Admin & Dashboard Template
          </title>
        </MetaTags>
        <Container fluid>
          <Link to="/propertylist-page">
            <Breadcrumb title="Real" breadcrumbItem="Property Details" />
          </Link>
          <Row>
            <Col lg="12">
              <Card>
                <CardBody>
                  <Row>
                    <label className="col-ms-2 font-size-14  col-lg-2 ">
                      Price : ₹
                    </label>
                    <div className="col-ms-2 font-size-14  col-lg-2 ">
                      <label className="fw-bolder">{property?.Price}</label>
                    </div>
                  </Row>
                  <Row>
                    <label className="col-ms-2 font-size-14 col-lg-2">
                      PlotSize :
                    </label>
                    <div className="col-ms-2 font-size-14 col-lg-2  ">
                      <label className="fw-bolder">{property?.PlotSize}</label>
                    </div>
                    <div className="col-ms-2 font-size-14 col-lg-2  ">
                      <label className="fw-bolder">{property?.Units}</label>
                    </div>
                  </Row>
                  {/* </div> */}
                  <Row>
                    <label className="col-ms-2 font-size-14 col-lg-2">
                      Area :
                    </label>
                    <div className="col-ms-2 font-size-14 col-lg-2  ">
                      <p className="fw-bolder">{property?.Area}</p>
                    </div>
                  </Row>
                  <Row>
                    <label className="col-ms-2 font-size-14 col-lg-2">
                      City :
                    </label>
                    <div className="col-ms-2 font-size-14 col-lg-8  ">
                      <label className="fw-bolder">{property?.City} </label>
                    </div>
                  </Row>
                  <Row>
                    <label className="col-ms-2 font-size-14  col-lg-2  ">
                      Landmark:
                    </label>
                    <div className="col-ms-2 font-size-14 col-lg-8 ">
                      <p className="col-ms-2 fw-bolder">
                        {property?.Landmark}{" "}
                      </p>
                    </div>
                  </Row>
                  <Row>
                    <label className="col-ms-2 font-size-14 col-lg-2 ">
                      Seller :
                    </label>
                    <div className="col-ms-2 font-size-14  col-lg-8  ">
                      <label className="fw-bolder">{property?.Seller}</label>
                    </div>
                  </Row>
                  <Row>
                    <label className="col-ms-2 font-size-14  col-lg-2 ">
                      Description:
                    </label>
                    <div className="col-ms-2 font-size-14 col-lg-8  ">
                      <p className="fw-bolder">{property?.Description} </p>
                    </div>
                  </Row>
                  <Row>
                    <label className="col-ms-2 font-size-14 col-lg-2">
                      Date :
                    </label>
                    <div className="col-ms-2 font-size-14  col-lg-8">
                      <label className="fw-bolder">{property?.date} </label>
                    </div>
                  </Row>

                  <Row>
                    <div className="modal-footer">
                      <Link to="/propertylist-page">
                        <button
                          type="button"
                          // onClick={() => {
                          //   handleClose()
                          // }}
                          className="btn btn-primary "
                          data-dismiss="modal"
                        >
                          Close
                        </button>
                      </Link>

                      <button
                        type="button"
                        className="btn btn-danger"
                        onClick={() => {
                          // setSelectedUser(user)
                          setModalOpen(true);
                        }}
                      >
                        DeActivate
                      </button>
                    </div>
                  </Row>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default PropertyDetails;
