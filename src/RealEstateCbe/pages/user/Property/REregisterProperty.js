import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import MetaTags from "react-meta-tags";
import {
  Row,
  Col,
  CardBody,
  Card,
  Alert,
  Container,
  Input,
  Label,
  Collapse,
  Form,
  FormFeedback,
} from "reactstrap";

// Formik Validation
import * as Yup from "yup";
import { useFormik } from "formik";

import { Link } from "react-router-dom";

// import images
import computer from "assets/images/coimbatorelogo.png";
import { REpropertyRegistration } from "RealEstateCbe/helpers/REbackend_helper";
import { useUser } from "RealEstateCbe/contextProviders/userProvider";
import { useHistory } from "react-router-dom";

import ReactTextareaAutosize from "react-textarea-autosize";
import { SERVER_URL } from "RealEstateCbe/helpers/REConfiguration";
import Header from "components/HorizontalLayout/Header";

const REregisterProperty = () => {
  const unitsList = [
    { value: "Cent", label: "Cent" },
    { value: "Sq.feet", label: "Sq.feet" },
    { value: "Acres", label: "Acres" },
  ];
  const history = useHistory();
  const [propertyregistrationError, setPropertyRegistrationError] =
    useState("");
  const [propertyregistrationSuccess, setPropertyRegistrationSuccess] =
    useState("");
  const [propertyPic, setPropertyPic] = useState([]);
  const [units, setUnits] = useState([]);

  const { currentUser, setCurrentUser } = useUser();

  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      email: currentUser.email,
      Housetype: "",
      Seller: "",
      Area: "",
      Landmark: "",
      City: "",
      Price: "",
      PlotSize: "",
      Units: "Sq.feet",
      Description: "",
    },
    validationSchema: Yup.object({
      Housetype: Yup.string().required("Please Enter Housetype"),
      Seller: Yup.string().required("Please Enter Your Promoter Name"),
      Area: Yup.string().required("Please Enter Your Location"),
      Landmark: Yup.string().required("Please Enter Your Landmark"),
      City: Yup.string().required("Please Enter Your City"),
      Price: Yup.number().required("Please Enter Your Price in 'Number'"),
      PlotSize: Yup.string().required("Please Enter Your PlotSize"),
      Description: Yup.string().required("Please Enter Your Description"),
    }),
    onSubmit: (values, onSubmitProps) => {
      handlePropertyReg({
        regUser: currentUser?._id,
        Housetype: values.Housetype,
        Seller: values.Seller,
        Area: values.Area,
        Landmark: values.Landmark,
        City: values.City,
        Price: values.Price,
        PlotSize: values.PlotSize,
        Units: values.Units,
        Description: values.Description,
        userID: currentUser.userID,
        propertyPic,
        status: "approved",
      });
      console.log("Data", values);
      onSubmitProps.resetForm();
    },
  });

  const convertBase64 = async (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };
  const handleImageUpload = async (e) => {
    const target = e.target;
    await Promise?.all(
      [...target.files].map(async (file) => {
        const res = await convertBase64(file);
        setPropertyPic((preValue) => [...preValue, res]);
      })
    );
  };
  const handlePropertyReg = async (payload) => {
    const res = await REpropertyRegistration(payload);
    if (res) {
      setPropertyRegistrationSuccess(res.msg);
      console.log("property", res);
      localStorage.setItem("authUser", JSON.stringify(res));
      // setCurrentUser(res)
      // history.push("/dashboard")
    } else {
      setPropertyRegistrationError(res.msg);
    }
    console.log("reg value: ", res);
  };
  console.log("pic", propertyPic.length);
  const nav = { backgroundColor: "#f17427d3" };

  return (
    <React.Fragment>
      <MetaTags>
        <title>Property Register | Coimbatore RealEstate</title>
      </MetaTags>
      <div className="page-content">
        <div className="d-flex ">
          <div className="d-none d-xl-block  ps-lg-5 ms-lg-5 mt-2 ">
            <div className="my-5">
              <div className="justify-content-center">
                <img src={computer} height="350" />
              </div>
              <h4 className="mb-3 mt-5">
                <i className="bx bxs-quote-alt-left text-primary h1 align-middle me-3"></i>
                Home is the starting place of love, hope and dreams{" "}
                <i className="bx bxs-quote-alt-right text-primary h1 align-middle me-3"></i>
              </h4>
            </div>
          </div>
          <div className="container  ms-xl-1 mt-2 ">
            <Container className="cont1">
              <Row className="justify-content-center">
                <Col md={8} lg={7} xl={9}>
                  <Card className="overflow-hidden">
                    <div className="bg-warning bg-soft">
                      <Row>
                        <Col className="col-7">
                          <div className="text-primary p-4">
                            <h5 className="text-primary"> Property Register</h5>
                            <p>Sell your Property by Registering</p>
                          </div>
                        </Col>
                      </Row>
                    </div>
                    <CardBody className="pt-0">
                      <div className="p-2">
                        <Form
                          className="form-horizontal"
                          onSubmit={(e) => {
                            e.preventDefault();
                            validation.handleSubmit();
                            return false;
                          }}
                        >
                          <div className="mb-2">
                            <Label className="form-label text-primary">
                              E-mail
                            </Label>
                            <Input
                              type="email"
                              name="email"
                              readOnly
                              className="form-control text-primary"
                              id="validationCustom04"
                              placeholder="Enter Your Email ID"
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

                          <div className="mb-2">
                            <Label className="form-label">House type</Label>
                            <Input
                              name="Housetype"
                              type="text"
                              placeholder="Enter Housetype"
                              onChange={validation.handleChange}
                              onBlur={validation.handleBlur}
                              value={validation.values.Housetype || ""}
                              invalid={
                                validation.touched.Housetype &&
                                validation.errors.Housetype
                                  ? true
                                  : false
                              }
                            />
                            {validation.touched.Housetype &&
                            validation.errors.Housetype ? (
                              <FormFeedback type="invalid">
                                {validation.errors.Housetype}
                              </FormFeedback>
                            ) : null}
                          </div>
                          <div className="mb-2">
                            <Label className="form-label">Promoter</Label>
                            <Input
                              name="Seller"
                              type="text"
                              placeholder="Enter Promoter"
                              onChange={validation.handleChange}
                              onBlur={validation.handleBlur}
                              value={validation.values.Seller || ""}
                              invalid={
                                validation.touched.Seller &&
                                validation.errors.Seller
                                  ? true
                                  : false
                              }
                            />
                            {validation.touched.Seller &&
                            validation.errors.lastname ? (
                              <FormFeedback type="invalid">
                                {validation.errors.Seller}
                              </FormFeedback>
                            ) : null}
                          </div>

                          <div className="mb-2">
                            <Label className="form-label">Location</Label>
                            <Input
                              name="Area"
                              type="text"
                              placeholder="Enter Location"
                              onChange={validation.handleChange}
                              onBlur={validation.handleBlur}
                              value={validation.values.Area || ""}
                              invalid={
                                validation.touched.Area &&
                                validation.errors.Area
                                  ? true
                                  : false
                              }
                            />
                            {validation.touched.Area &&
                            validation.errors.Area ? (
                              <FormFeedback type="invalid">
                                {validation.errors.Area}
                              </FormFeedback>
                            ) : null}
                          </div>
                          <div className="mb-2">
                            <Label className="form-label">Landmark</Label>
                            <Input
                              name="Landmark"
                              type="text"
                              placeholder="Enter Landmark"
                              onChange={validation.handleChange}
                              onBlur={validation.handleBlur}
                              value={validation.values.Landmark || ""}
                              invalid={
                                validation.touched.Landmark &&
                                validation.errors.Landmark
                                  ? true
                                  : false
                              }
                            />
                            {validation.touched.Landmark &&
                            validation.errors.Landmark ? (
                              <FormFeedback type="invalid">
                                {validation.errors.Landmark}
                              </FormFeedback>
                            ) : null}
                          </div>
                          <div className="mb-2">
                            <Label className="form-label">City</Label>
                            <Input
                              name="City"
                              type="text"
                              placeholder="Enter City"
                              onChange={validation.handleChange}
                              onBlur={validation.handleBlur}
                              value={validation.values.City || ""}
                              invalid={
                                validation.touched.City &&
                                validation.errors.City
                                  ? true
                                  : false
                              }
                            />
                            {validation.touched.City &&
                            validation.errors.City ? (
                              <FormFeedback type="invalid">
                                {validation.errors.City}
                              </FormFeedback>
                            ) : null}
                          </div>
                          <div className="mb-2">
                            <Label className="form-label">Price</Label>
                            <Input
                              name="Price"
                              type="number"
                              placeholder="Enter Price"
                              onChange={validation.handleChange}
                              onBlur={validation.handleBlur}
                              value={validation.values.Price || ""}
                              invalid={
                                validation.touched.Price &&
                                validation.errors.Price
                                  ? true
                                  : false
                              }
                            />
                            {validation.touched.Price &&
                            validation.errors.Price ? (
                              <FormFeedback type="invalid">
                                {validation.errors.Price}
                              </FormFeedback>
                            ) : null}
                          </div>
                          <Row>
                            <Label className="form-label">PlotSize</Label>
                            <Col lg={8}>
                              <div className="mb-2">
                                <Input
                                  name="PlotSize"
                                  type="text"
                                  placeholder="Enter PlotSize"
                                  onChange={validation.handleChange}
                                  onBlur={validation.handleBlur}
                                  value={validation.values.PlotSize || ""}
                                  invalid={
                                    validation.touched.PlotSize &&
                                    validation.errors.PlotSize
                                      ? true
                                      : false
                                  }
                                />
                              </div>
                            </Col>
                            {validation.touched.PlotSize &&
                            validation.errors.PlotSize ? (
                              <FormFeedback type="invalid">
                                {validation.errors.PlotSize}
                              </FormFeedback>
                            ) : null}
                            <Col lg={4}>
                              <Input
                                type="select"
                                name="Units"
                                onChange={validation.handleChange}
                                onBlur={validation.handleBlur}
                                value={validation.values.Units || ""}
                                invalid={
                                  validation.touched.Units &&
                                  validation.errors.Units
                                    ? true
                                    : false
                                }
                              >
                                <option value=" Sq.feet"> Sq.feet</option>
                                <option value="Cent">Cent</option>
                                <option value="Acres">Acres</option>
                              </Input>
                              {validation.touched.Units &&
                              validation.errors.Units ? (
                                <FormFeedback type="invalid">
                                  {validation.errors.Units}
                                </FormFeedback>
                              ) : null}
                              {/* <div className="mb-2">
                                <select
                                  name="Units"
                                  // option={unitsList}
                                  // value={validation.values.Units}
                                  onChange={validation.handleChange}
                                  // options={unitsList}
                                >
                                  <option value="1" defaultValue>
                                    Sq.feet
                                  </option>
                                  <option value="2">Cent</option>
                                  <option value="3">Acres</option>
                                  if(value==1) setUnits(Sq feet)
                                </select>
                                {validation.touched.Units &&
                                validation.errors.Units ? (
                                  <FormFeedback type="invalid">
                                    {validation.errors.Units}
                                  </FormFeedback>
                                ) : null}
                              </div> */}
                            </Col>
                          </Row>
                          <div className="mb-2">
                            <Label className="form-label">Description</Label>
                            <ReactTextareaAutosize
                              className="w-100 mt-1 mb-1 border border-light rounded-bottom"
                              name="Description"
                              type="text"
                              placeholder="  Enter Description"
                              onChange={validation.handleChange}
                              onBlur={validation.handleBlur}
                              value={validation.values.Description || ""}
                              // invalid={
                              //   validation.touched.Description &&
                              //   validation.errors.Description
                              //     ? true
                              //     : false
                              // }
                            />
                            {/* {validation.touched.Description &&
                            validation.errors.Description ? (
                              <FormFeedback type="invalid">
                                {validation.errors.Description}
                              </FormFeedback>
                            ) : null} */}
                          </div>

                          <div className="mb-2">
                            <Label className="form-label">
                              Select Your Property Image
                            </Label>
                            <Input
                              type="file"
                              multiple={true}
                              maxnumber="5S"
                              maxfilesize="5000000"
                              accept=".png, .jpg, .jpeg,.pdf,.webp"
                              onChange={handleImageUpload}
                            ></Input>
                          </div>
                          {propertyregistrationSuccess && (
                            <Alert
                              className="fw-bolder text-center"
                              color="success"
                            >
                              {propertyregistrationSuccess}
                            </Alert>
                          )}

                          {propertyregistrationError && (
                            <Alert
                              color="danger"
                              className="fw-bolder text-center"
                            >
                              {propertyregistrationError}
                            </Alert>
                          )}
                          <div className="mt-3 d-grid">
                            <button
                              //  onSubmit={REregisterProperty}
                              className="btn btn-success btn-block "
                              type="submit"
                            >
                              Register
                            </button>
                          </div>
                        </Form>
                      </div>
                    </CardBody>
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

export default REregisterProperty;
