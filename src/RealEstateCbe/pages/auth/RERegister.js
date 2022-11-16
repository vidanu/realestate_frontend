import React, { useState, useEffect } from "react"
import MetaTags from "react-meta-tags"
import { Link } from "react-router-dom"
import {
  Alert,
  Col,
  Container,
  Form,
  FormFeedback,
  Input,
  Label,
  Row,
} from "reactstrap"

// Formik Validation
import * as Yup from "yup"
import { useFormik } from "formik"

// import images
import REimage from "../../../assets/images/house.jpg"

import { REuserRegisteration } from "../../helpers/REbackend_helper"
import RECarousalPage from "../../pages/auth/RECarousal"

const RERegister = () => {
  const [registrationError, setRegistrationError] = useState("")
  const [registrationSuccess, setRegistrationSuccess] = useState("")
  const [loading, setLoading] = useState(false)
  //form validation
  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      firstname: "",
      lastname: "",
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      firstname: Yup.string().required("Please Enter Your firstname"),
      lastname: Yup.string().required("Please Enter Your lastname"),
      email: Yup.string().required("Please Enter Your Email"),
      password: Yup.string()
        .required("Please Enter Your Password")
        .matches(/^(?=.{5,})/, "Must Contain 5 Characters"),
    }),
    onSubmit: async (values, onSubmitProps) => {
      setLoading(true)
      //   dispatch(registerUser({ ...values, aflag: true }))
      const res = await REuserRegisteration({ ...values, aflag: true })
      if (res.success) {
        setRegistrationSuccess(res.msg)
        console.log(res,"res")
        onSubmitProps.resetForm()
      } else {
        setRegistrationError(res.msg)
        console.log("Response:",res)
      }
      setLoading(false)
    }
  })
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
                        <h5 className="text-primary">Register account</h5>
                        <p className="text-muted">Get your account now.</p>
                        <div className="mb-4 mb-md-5">
                          <Link to="dashboard" className="d-block auth-logo">
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
                            <h5 className="font-size-14 mb-3">Sign up using</h5>

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
                                  className="social-list-item bg-info text-white border-info"
                                >
                                  <i className="mdi mdi-twitter"></i>
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
                          onSubmit={e => {
                            e.preventDefault()
                            validation.handleSubmit()
                            return false
                          }}
                        >
                          {registrationSuccess && (
                            <Alert
                              className="fw-bolder text-center"
                              color="success"
                            >
                              {registrationSuccess}
                            </Alert>
                          )}

                          {registrationError && (
                            <Alert
                              color="danger"
                              className="fw-bolder text-center"
                            >
                              {registrationError}
                            </Alert>
                          )}

                          <div className="mb-3">
                            <Label className="form-label">FirstName</Label>
                            <Input
                              name="firstname"
                              type="text"
                              placeholder="Enter firstname"
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
                          </div>

                          <div className="mb-3">
                            <Label className="form-label">LastName</Label>
                            <Input
                              name="lastname"
                              type="text"
                              placeholder="Enter lastname"
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
                          </div>

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
                                Registering...
                              </button>
                            ) : (
                              <button
                                className="btn btn-primary btn-block "
                                type="submit"
                              >
                                Register
                              </button>
                            )}
                          </div>
                        </Form>

                        <div className="mt-2 text-center">
                          <p>
                            Already have an account ?{" "}
                            <Link
                              to="/RElogin"
                              className="font-weight-medium text-primary"
                            >
                              {" "}
                              Login
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
  )
}

export default RERegister
