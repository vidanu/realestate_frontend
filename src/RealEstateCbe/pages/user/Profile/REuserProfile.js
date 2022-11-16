import MetaTags from "react-meta-tags";
import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Alert,
  CardBody,
  FormGroup,
  Button,
  Label,
  Input,
  FormFeedback,
  Form,
} from "reactstrap";

// Formik Validation
import * as Yup from "yup";
import { useFormik } from "formik";

//redux
import { useSelector, useDispatch } from "react-redux";

import { withRouter } from "react-router-dom";

//Import Breadcrumb
import Breadcrumb from "../../../../components/Common/Breadcrumb";

// users
import { useUser } from "RealEstateCbe/contextProviders/userProvider";
import { ReuserUpdate } from "RealEstateCbe/helpers/REbackend_helper";
const REuserProfile = (props) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [proloading, setProLoading] = useState(false);
  const { currentUser, setCurrentUser } = useUser();
  const [email, setemail] = useState("");
  const [firstname, setfirstname] = useState("");
  const [lastname, setlastname] = useState("");
  const [idx, setidx] = useState(1);
  const [updateSuccess, setUpdateSuccess] = useState("");
  const [updateError, setUpdateError] = useState("");
  const [passwordUpdateSuccess, setPasswordUpateSuccess] = useState("");
  const [passwordUpdateError, setPasswordUpateError] = useState("");

  const { error, success } = useSelector((state) => ({
    error: state.Profile.error,
    success: state.Profile.success,
  }));

  useEffect(() => {
    if (currentUser) {
      const obj = JSON.parse(localStorage.getItem("authUser"));
      if (process.env.REACT_APP_DEFAULTAUTH === "firebase") {
        setname(obj.displayName);
        setemail(obj.email);
        setidx(obj.userID);
      } else if (
        process.env.REACT_APP_DEFAULTAUTH === "fake" ||
        process.env.REACT_APP_DEFAULTAUTH === "jwt"
      ) {
        setfirstname(obj.firstname);
        setlastname(obj.lastname);
        setemail(obj.email);
        setidx(obj.userID);
      }
      setTimeout(() => {
        // dispatch(resetProfileFlag());
      }, 3000);
    }
  }, [dispatch, success]);

  // Form validation
  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      firstname: currentUser?.firstname,
      lastname: currentUser?.lastname,
    },
    validationSchema: Yup.object({
      firstname: Yup.string().required("Please Enter Your First Name"),
      lastname: Yup.string().required("Please Enter Your Last Name"),
    }),
    onSubmit: async (values, onSubmitProps) => {
      setLoading(true);
      const res = await ReuserUpdate({ ...values, email: currentUser?.email });
      console.log(res, "res name");
      if (res.success) {
        setUpdateError("");
        localStorage.setItem("authUser", JSON.stringify(res));
        setCurrentUser(res);
        setUpdateSuccess("User Details updated Successfully");
      } else {
        setUpdateSuccess("");
        setCurrentUser(res);
        setUpdateError("Failed to update user details!!");
      }
      setLoading(false);
    },
  });
  const handleUpdatePassword = async () => {
    if (validation.values.password === validation.values.confirmPassword) {
      const res = await updatePassword({
        userID: currentUser.userID,
        password: validation.values.password,
      });

      if (res.success) {
        setPasswordUpateError("");
        localStorage.setItem("authUser", JSON.stringify(res));
        setCurrentUser(res);
        validation.values.password = "";
        validation.values.confirmPassword = "";
        setPasswordUpateSuccess(res.msg);
      } else {
        setPasswordUpateSuccess("");
        setPasswordUpateError("Failed to update password !!");
      }
    } else console.log("miss match password and confirm password");
    setProLoading(false);
  };
  return (
    <React.Fragment>
      <div className="page-content">
        <MetaTags>
          <title>Profile | Real Estate</title>
        </MetaTags>
        <Container fluid>
          {/* Render Breadcrumb */}
          <Breadcrumb title="Real" breadcrumbItem="Profile" />

          <Row>
            <Col lg="12">
              {/* {error && error ? <Alert color="danger">{error}</Alert> : null}
              {success ? <Alert color="success">{success}</Alert> : null} */}
              {updateError && <Alert color="danger">{updateError}</Alert>}
              {updateSuccess && <Alert color="success">{updateSuccess}</Alert>}
              {/* {profileUpdateError && (
                <Alert color="danger">{profileUpdateError}</Alert>
              )}
              {profileUpdateSuccess && (
                <Alert color="success">{profileUpdateSuccess}</Alert>
              )} */}
              {passwordUpdateError && (
                <Alert color="danger">{passwordUpdateError}</Alert>
              )}
              {passwordUpdateSuccess && (
                <Alert color="success">{passwordUpdateSuccess}</Alert>
              )}
              <Card>
                <CardBody>
                  <div className="d-flex">
                    {/* <div className="ms-3">
                      <img
                        src={avatar}
                        alt=""
                        className="avatar-md rounded-circle img-thumbnail"
                      />
                    </div> */}
                    <div className="flex-grow-1 align-self-center">
                      <div className="text-muted">
                        <h5>{firstname + " " + lastname}</h5>
                        <p className="mb-1">{email}</p>
                        {/* <p className="mb-0">Id no: #{idx}</p> */}
                      </div>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>

          <h4 className="card-title mb-4">Update User Details</h4>

          <Card>
            <CardBody>
              <Form
                className="needs-validation"
                onSubmit={(e) => {
                  e.preventDefault();
                  validation.handleSubmit();
                  return false;
                }}
              >
                <Row>
                  <Col md="6">
                    <FormGroup className="mb-3">
                      <Label htmlFor="validationCustom01">First name</Label>
                      <Input
                        name="firstname"
                        placeholder="First name"
                        type="text"
                        className="form-control"
                        id="validationCustom01"
                        onChange={validation.handleChange}
                        onBlur={validation.handleBlur}
                        value={validation.values.firstname || ""}
                        invalid={
                          validation.touched.firstname &&
                          validation.errors.firstname
                            ? true
                            : false
                        }
                      />
                      {validation.touched.firstname &&
                      validation.errors.firstname ? (
                        <FormFeedback type="invalid">
                          {validation.errors.firstname}
                        </FormFeedback>
                      ) : null}
                    </FormGroup>
                  </Col>
                </Row>

                <Row>
                  <Col md="6">
                    <FormGroup className="mb-3">
                      <Label htmlFor="validationCustom02">Last name</Label>
                      <Input
                        name="lastname"
                        placeholder="Last name"
                        type="text"
                        className="form-control"
                        id="validationCustom02"
                        onChange={validation.handleChange}
                        onBlur={validation.handleBlur}
                        value={validation.values.lastname || ""}
                        invalid={
                          validation.touched.lastname &&
                          validation.errors.lastname
                            ? true
                            : false
                        }
                      />
                      {validation.touched.lastname &&
                      validation.errors.lastname ? (
                        <FormFeedback type="invalid">
                          {validation.errors.lastname}
                        </FormFeedback>
                      ) : null}
                    </FormGroup>
                  </Col>
                </Row>

                <Button color="primary" type="submit">
                  SUBMIT
                </Button>
              </Form>
            </CardBody>
          </Card>
          {/* <h4 className="card-title mb-4">Password Update</h4> */}

          {/* <Card>
            <CardBody>
              <Row>
                <Col md="6">
                  <FormGroup className="mb-3">
                    <Label htmlFor="validationCustom02">New Password</Label>
                    <Input
                      name="password"
                      placeholder="New Password"
                      type="password"
                      className="form-control"
                      id="  "
                      onChange={validation.handleChange}
                      // onBlur={validation.handleBlur}
                      value={validation.values.password || ""}
                      // invalid={
                      //   validation.touched.lastname &&
                      //   validation.errors.lastname
                      //     ? true
                      //     : false
                      // }
                    />
                    {/* {validation.touched.lastname &&
            validation.errors.lastname ? (
              <FormFeedback type="invalid">
                {validation.errors.lastname}
              </FormFeedback>
            ) : null} 
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col md="6">
                  <FormGroup className="mb-3">
                    <Label htmlFor="validationCustom02">Confirm Password</Label>
                    <Input
                      name="confirmPassword"
                      placeholder="Confirm Password"
                      type="password"
                      className="form-control"
                      id="validationCustom02"
                      onChange={validation.handleChange}
                      // onBlur={validation.handleBlur}
                      value={validation.values.confirmPassword || ""}
                      // invalid={
                      //   validation.touched.lastname &&
                      //   validation.errors.lastname
                      //     ? true
                      //     : false
                      // }
                    />
                    {/* {validation.touched.lastname &&
            validation.errors.lastname ? (
              <FormFeedback type="invalid">
                {validation.errors.lastname}
              </FormFeedback>
            ) : null} 
                  </FormGroup>
                </Col>
              </Row>
              {loading ? (
                <button
                  type="button"
                  className="btn btn-dark"
                  style={{ cursor: "not-allowed" }}
                >
                  <i className="bx bx-loader bx-spin font-size-16 align-middle me-2"></i>
                  Registering...
                </button>
              ) : (
                <Button
                  color="primary"
                  type="submit"
                  onClick={() => {
                    handleUpdatePassword();
                  }}
                >
                  Update
                </Button>
              )}
            </CardBody>
          </Card> */}
        </Container>
      </div>
    </React.Fragment>
  );
};

export default withRouter(REuserProfile);
