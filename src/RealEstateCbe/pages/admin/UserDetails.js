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
  getUserById,
  removeUser,
} from "RealEstateCbe/helpers/REbackend_helper";
import { success } from "toastr";
import { set } from "lodash";

import toastr from "toastr";
import "toastr/build/toastr.min.css";

const UserDetails = () => {
  const query = useQuery();
  const [modalOpen, setModalOpen, toggleModal] = useModal(false);
  const [getUser, setGetUser] = useState(null);
  // const [getPayment, setGetPayment] = useState(null);
  // const [paymentData, setPaymentData] = useState([]);

  const getUserId = async () => {
    const res = await getUserById({
      userId: query.get("id"),
    });
    if (res.success) {
      setGetUser(res.User);
      console.log("res", res);
    }
  };

  useEffect(() => {
    getUserId();
  }, []);

  // const getAllPaymentData = async () => {
  //   const res = await allPaymentData({});
  //   if (res.success) {
  //     setPaymentData(res.paymentIntent);
  //   }
  // };

  const handleRemovingUser = async () => {
    const payload = {
      userID: [getUser?._id],
    };
    const res = await removeUser(payload);
    if (res.success) {
      console.log(res);
      toastr.success(`User has been Deactivated successfully`, "Success");

      await getAllUsers();
    } else {
      console.log("Error : ", res?.msg || "error");
    }
    setModalOpen(false);
  };
  return (
    <React.Fragment>
      <DeleteModal
        show={modalOpen}
        onDeleteClick={handleRemovingUser}
        confirmText="Yes,DeActive"
        cancelText="Cancel"
        onCloseClick={toggleModal}
      />
      <div className="page-content">
        <MetaTags>
          <title>User Deatails | RealEstate - Admin & Dashboard Template</title>
        </MetaTags>
        <Container fluid>
          <Link to="/userlist-page">
            <Breadcrumb title="Real" breadcrumbItem="User Details" />
          </Link>
          <Row>
            <Col lg="12">
              <Card>
                <CardBody>
                  <Row>
                    <label className="col-md-5 col-lg-2 col-form-label">
                      User Name
                    </label>
                    <div className="col-md-5 col-lg-2 col-form-label ">
                      <label className="fw-bolder">
                        {getUser?.firstname + " " + getUser?.lastname}
                      </label>
                    </div>
                  </Row>
                  <Row className="my-md-3">
                    <label className="col-md-5 col-lg-2 col-form-label">
                      Email
                    </label>
                    <div className="col-md-5 col-lg-2 col-form-label ">
                      <label className="fw-bolder text-primary">
                        {getUser?.email}
                      </label>
                    </div>
                  </Row>

                  <Row>
                    <div className="modal-footer">
                      <Link to="/userlist-page">
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

export default UserDetails;
