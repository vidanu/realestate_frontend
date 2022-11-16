import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import toastr from "toastr";
import { Alert, Input, Label, FormFeedback, Form } from "reactstrap";
import axios from "axios";
import { SERVER_URL } from "RealEstateCbe/helpers/REConfiguration";
import { Button, Col, Modal, ModalBody, ModalHeader, Row } from "reactstrap";

import { sendMail, mailRegister } from "RealEstateCbe/helpers/REbackend_helper";
// Formik Validation
import * as Yup from "yup";
import { useFormik } from "formik";
const SendMail = ({ open, setOpen, toggleOpen, currentProperty }) => {
  toastr.options = {
    progressBar: true,
    closeButton: true,
  };

  const [loading, setLoading] = useState(false);
  const [mailReg, setMailReg] = useState([]);
  const [mailSend, setMailSend] = useState([]);
  /*Closing Modal */
  const handleClose = () => {
    setOpen(false);
  };
  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      firstname: "",
      lastname: "",
      email: "",
      phoneno: "",
    },
    validationSchema: Yup.object({
      firstname: Yup.string().required("Please Enter Your firstname"),
      lastname: Yup.string().required("Please Enter Your lastname"),
      email: Yup.string().required("Please Enter Your Email"),
      phoneno: Yup.number().required("Please Enter Your ContactNo."),
    }),
    onSubmit: (values, onSubmitProps) => {
      handleMail({
        firstname: values.firstname,
        lastname: values.lastname,
        email: values.email,
        phoneno: values.phoneno,
        propRef: currentProperty,
      });
      console.log("Data", values);
      onSubmitProps.resetForm();
    },
  });
  const handleMail = async (payload) => {
    const res = await mailRegister(payload);
    const res1 = await sendMail(payload);
    if (res) {
      setMailReg(res.msg);
      console.log("Mail Reg", res);
    } else {
      console.log("Error : ", res?.msg || "error");
    }
    if (res1) {
      setMailSend(res1.msg);
      console.log("Mail", res1);
      toastr.success(`Mail has been Sent successfully`, "Success");
    } else {
      console.log("Error : ", res1?.msg || "error");
      toastr.error(`Failed to send Mail`, "Failed!!!");
    }
    // console.log("reg Mail: ", res);
    // console.log(" Mail: ", res1);
  };

  return (
    <>
      <Modal
        isOpen={open}
        toggle={toggleOpen}
        centered={true}
        size="lg"
        backdrop={"static"}
      >
        <ModalBody>
          <div className="p-2">
            <Form
              className="form-horizontal"
              onSubmit={(e) => {
                e.preventDefault();
                validation.handleSubmit();
                return false;
              }}
            >
              <div className=" align-items-center">
                <span className="text-center fw-medium">
                  Enter Your Details
                </span>
              </div>
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
                    validation.touched.firstname && validation.errors.firstname
                      ? true
                      : false
                  }
                />
                {validation.touched.firstname && validation.errors.firstname ? (
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
                    validation.touched.lastname && validation.errors.lastname
                      ? true
                      : false
                  }
                />
                {validation.touched.lastname && validation.errors.lastname ? (
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
                    validation.touched.email && validation.errors.email
                      ? true
                      : false
                  }
                />
                {validation.touched.email && validation.errors.email ? (
                  <FormFeedback type="invalid">
                    {validation.errors.email}
                  </FormFeedback>
                ) : null}
              </div>
              <div className="mb-3">
                <Label className="form-label">Contact No.</Label>
                <Input
                  name="phoneno"
                  type="number"
                  placeholder="Enter Contact Number"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.phoneno || ""}
                  invalid={
                    validation.touched.phoneno && validation.errors.phoneno
                      ? true
                      : false
                  }
                />
                {validation.touched.phoneno && validation.errors.phoneno ? (
                  <FormFeedback type="invalid">
                    {validation.errors.phoneno}
                  </FormFeedback>
                ) : null}
              </div>
              <div className="modal-footer">
                <div className="d-flex">
                  <button className="btn  btn-success " type="submit">
                    Send Mail
                  </button>
                </div>
                <Link to="/">
                  <button
                    type="button"
                    className="btn btn-primary "
                    data-dismiss="modal"
                  >
                    Close
                  </button>
                </Link>
              </div>
            </Form>
          </div>
        </ModalBody>
      </Modal>
    </>
  );
};

SendMail.propTypes = {
  open: PropTypes.bool,
  setOpen: PropTypes.func,
  toggleOpen: PropTypes.func,
  currentProperty: PropTypes.string,
};
export default React.memo(SendMail);
