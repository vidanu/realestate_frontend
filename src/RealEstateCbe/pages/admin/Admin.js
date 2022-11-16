import React, { useEffect, useState } from "react";
import MetaTags from "react-meta-tags";
import {
  Container,
  Row,
  Col,
  Button,
  Card,
  CardTitle,
  CardBody,
  Form,
  Table,
} from "reactstrap";
import { Link } from "react-router-dom";
//Import Breadcrumb
import Breadcrumbs from "../../../components/Common/Breadcrumb";
import RealEstateImg from "../../../assets/images/realestate.png";
import {
  allUsersList,
  allPropertiesList,
} from "RealEstateCbe/helpers/REbackend_helper";

const Admin = () => {
  const [allUsers, setAllUsers] = useState([]);
  const [allProperties, setAllProperties] = useState([]);
  //   const handleApprovedAttorney = async () => {
  //     const payload = {
  //       status: "approved",
  //       attorneyID: [selectedReqAttorney?._id],
  //       userID: [selectedReqAttorney?._id],
  //     };
  //     const res = await attorneyStatusUpdate(payload);
  //     if (res.success) {
  //       // console.log(res)
  //       await getReqAttorneys();
  //     } else {
  //       console.log("Error : ", res);
  //     }
  //   };

  //   const handleRejectAttorney = async () => {
  //     const payload = {
  //       status: "rejected",
  //       attorneyID: [selectedReqAttorney?._id],
  //       userID: [selectedReqAttorney?._id],
  //     };
  //     const res = await attorneyStatusUpdate(payload);
  //     if (res.success) {
  //       // console.log(res)
  //       await getReqAttorneys();
  //     } else {
  //       console.log("Error : ", res);
  //     }
  //   };

  useEffect(() => {
    const getAllUsers = async () => {
      const res = await allUsersList({});
      // console.log("res" ,res);
      if (res.success) {
        setAllUsers(res.users);
      }
    };
    getAllUsers();
  }, []);
  useEffect(() => {
    const getAllProperties = async () => {
      const res = await allPropertiesList({});
      // console.log("res" ,res);
      if (res.success) {
        setAllProperties(res.properties);
      }
    };
    getAllProperties();
  }, []);
  return (
    <React.Fragment>
      <div className="page-content">
        <MetaTags>
          <title>Property Register | Coimbatore RealEstate</title>
        </MetaTags>
        <Container fluid>
          <Breadcrumbs title={"Real"} breadcrumbItem={"Admin Dashboard"} />
          {/* <h5>Admin Dashboard</h5> */}

          <Row>
            <Col xl="4">
              <Card className="overflow-hidden">
                <div className="bg-primary bg-soft">
                  <Row>
                    <Col xs="7">
                      <div className="text-primary p-3">
                        <h5 className="text-primary">WELCOME ADMIN !</h5>
                        <p>Admin Dashboard</p>
                      </div>
                    </Col>
                    <Col xs="5" className="align-self-center">
                      <img
                        src={RealEstateImg}
                        alt=""
                        className="img-fluid avatar-sm"
                      />
                    </Col>
                  </Row>
                </div>
                <CardBody className="pt-0">
                  <Row>
                    <Col sm="4">
                      <h5 className="font-size-15 mt-4 ms-4">User</h5>
                      <p className="text-muted mb-0 ms-4">{allUsers.length}</p>
                    </Col>
                    {/* <Col sm="4">
                      <h5 className="font-size-15 mt-4 ms-4">Properties</h5>
                      <p className="text-muted mb-0 ms-4">
                        {allProperties.length}
                      </p>
                    </Col> */}

                    <Col sm="8">
                      <div className="pt-4">
                        <Row>
                          <Col xs="6">
                            <h5 className="font-size-15">Properties</h5>
                            <p className="text-muted mb-0">
                              {allProperties.length}
                            </p>
                          </Col>
                          {/* <Col xs="6">
                            <h5 className="font-size-15">Firms</h5>
                            <p className="text-muted mb-0">{allFirms.length}</p>
                          </Col> */}
                        </Row>
                      </div>
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </Col>
            <Col xl="8">
              <Row>
                <Col md="4">
                  <Card className="overflow-hidden p-4">
                    <CardBody>
                      <div className="d-flex">
                        <div className="flex-grow-1">
                          <h5 className="fw-medium mt-2">Users List</h5>
                          <Link to="/userlist-page">
                            <Button
                              color="primary"
                              type="view"
                              className="mt-4"
                            >
                              View
                            </Button>
                          </Link>
                        </div>
                        <div className="avatar-sm rounded-circle bg-primary align-self-top mini-stat-icon">
                          <span className="avatar-title rounded-circle bg-primary">
                            <i
                              className={"bx " + "bx bx-user" + " font-size-24"}
                            ></i>
                          </span>
                        </div>
                      </div>
                    </CardBody>
                  </Card>
                </Col>

                <Col md="6">
                  <Card className="overflow-hidden p-4">
                    <CardBody>
                      <div className="d-flex">
                        <div className="flex-grow-1">
                          <h5 className="fw-medium mt-2">Properties List</h5>
                          <Link to="/propertylist-page">
                            <Button
                              color="primary"
                              type="view"
                              className="mt-4"
                            >
                              View
                            </Button>
                          </Link>
                        </div>
                        <div className="avatar-sm rounded-circle bg-primary align-self-top mini-stat-icon">
                          <span className="avatar-title rounded-circle bg-primary">
                            <i
                              className={"bx " + "bx bx-user" + " font-size-24"}
                            ></i>
                          </span>
                        </div>
                      </div>
                    </CardBody>
                  </Card>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default Admin;
