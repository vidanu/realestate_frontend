import React, { useState, useEffect } from "react";
import MetaTags from "react-meta-tags";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import {
  Alert,
  Col,
  Container,
  Form,
  FormFeedback,
  Input,
  Label,
  Row,
} from "reactstrap";

// Formik Validation
import * as Yup from "yup";
import { useFormik } from "formik";

//Social Media Imports
import { GoogleLogin } from "react-google-login";
// import TwitterLogin from "react-twitter-auth"
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";

// import images
import REimage from "../../../assets/images/house.jpg";
import { REuserLogin } from "../../helpers/REbackend_helper";
import RECarousalPage from "../../pages/auth/RECarousal";
import { useUser } from "RealEstateCbe/contextProviders/userProvider";

const RELogin = (props) => {
  const { setCurrentUser } = useUser();
  const [loginError, setLoginError] = useState("");
  const [loading, setLoading] = useState(false);

  // const googleResponse = response => {}
  // const facebookResponse = e => {}

  //form validation
  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().required("Please Enter Your Email"),
      password: Yup.string().required("Please Enter Your Password"),
    }),
    onSubmit: async (values) => {
      setLoading(true);
      const res = await REuserLogin(values);
      if (res.success) {
        localStorage.setItem("authUser", JSON.stringify(res));
        setCurrentUser(res);
        props.history.push("/");
      } else {
        setLoginError(res?.msg);
      }
      setLoading(false);
      console.log("Response", values);
    },
  });
  return (
    <React.Fragment>
      <div>
        <MetaTags>
          <title>Register || Coimbatore RealEstate</title>
        </MetaTags>
        <Container fluid className="p-0">
          <Row className="g-0">
            <RECarousalPage />

            <Col xl={3}>
              <div className="auth-full-page-content p-md-5 p-4">
                <div className="w-100">
                  <div className="d-flex flex-column h-100">
                    <div className="my-auto">
                      <div>
                        <h5 className="text-bold">
                          Welcome to Coimbatore RealEstate
                        </h5>
                        <div className="mb-4 mb-md-5">
                          <Link
                            to="dashboard"
                            className="mt-2 d-block auth-logo"
                          >
                            <img
                              src={REimage}
                              alt=""
                              height="70"
                              className="auth-logo-dark"
                            />
                            <img
                              src={REimage}
                              alt=""
                              height="70"
                              className="auth-logo-light"
                            />
                          </Link>
                        </div>
                        <Form action="dashboard">
                          <div className="mb-1 text-start">
                            <h5 className="font-size-14 mb-3">Login using</h5>

                            <ul className="list-inline">
                              <li className="list-inline-item">
                                <Link
                                  to="#"
                                  className="social-list-item bg-primary text-white border-primary"
                                >
                                  <i className="mdi mdi-facebook"></i>
                                </Link>
                              </li>
                              <li className="list-inline-item">
                                <Link
                                  to="#"
                                  className="social-list-item bg-danger text-white border-danger"
                                >
                                  <i className="mdi mdi-google"></i>
                                </Link>
                              </li>
                            </ul>
                          </div>
                        </Form>
                      </div>

                      <div className="mt-4">
                        <Form
                          className="form-horizontal"
                          onSubmit={(e) => {
                            e.preventDefault();
                            validation.handleSubmit();
                            return false;
                          }}
                        >
                          {loginError && (
                            <Alert
                              className="fw-bolder text-center"
                              color="danger"
                            >
                              {loginError}
                            </Alert>
                          )}

                          <div className="mb-3">
                            <Label className="form-label">Email</Label>
                            <Input
                              id="email"
                              name="email"
                              className="form-control"
                              placeholder="Enter email"
                              type="email"
                              onChange={validation.handleChange}
                              onBlur={validation.handleBlur}
                              value={validation.values.email || ""}
                              invalid={
                                validation.touched.email &&
                                validation.errors.email
                                  ? true
                                  : false
                              }
                            />
                            {validation.touched.email &&
                            validation.errors.email ? (
                              <FormFeedback type="invalid">
                                {validation.errors.email}
                              </FormFeedback>
                            ) : null}
                          </div>
                          <div className="mb-3">
                            <Label className="form-label">Password</Label>
                            <Input
                              name="password"
                              type="password"
                              placeholder="Enter Password"
                              onChange={validation.handleChange}
                              onBlur={validation.handleBlur}
                              value={validation.values.password || ""}
                              invalid={
                                validation.touched.password &&
                                validation.errors.password
                                  ? true
                                  : false
                              }
                            />
                            {validation.touched.password &&
                            validation.errors.password ? (
                              <FormFeedback type="invalid">
                                {validation.errors.password}
                              </FormFeedback>
                            ) : null}
                          </div>

                          <div className="mt-3 d-grid">
                            {loading ? (
                              <button
                                type="button"
                                className="btn btn-dark"
                                style={{ cursor: "not-allowed" }}
                              >
                                <i className="bx bx-loader bx-spin font-size-16 align-middle me-2"></i>
                                Validating...
                              </button>
                            ) : (
                              <button
                                className="btn btn-warning btn-block "
                                type="submit"
                              >
                                Login
                              </button>
                            )}
                          </div>
                        </Form>

                        <div className="mt-2 text-center">
                          <p>
                            Does not have an account ?{" "}
                            <Link
                              to="/REregister"
                              className="font-weight-medium text-primary"
                            >
                              {" "}
                              Register
                            </Link>{" "}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* <div className="mt-4 mt-md-5 text-center">
                      <p className="mb-0">
                        © {new Date().getFullYear()}
                        Skote. Crafted with{" "}
                        <i className="mdi mdi-heart text-danger"></i> by
                        Themesbrand
                      </p>
                    </div> */}
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default RELogin;

RELogin.propTypes = {
  history: PropTypes.object,
};
