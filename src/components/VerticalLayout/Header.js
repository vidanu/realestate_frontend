import PropTypes from "prop-types";
import React, { useState } from "react";

import { connect } from "react-redux";
import { Row, Col } from "reactstrap";
import { Link } from "react-router-dom";

// Reactstrap
import { Dropdown, DropdownToggle, DropdownMenu } from "reactstrap";

// Import menuDropdown
import LanguageDropdown from "../CommonForBoth/TopbarDropdown/LanguageDropdown";
// import { adminLogout } from "rainComputing/helpers/backend_helper";

import RealEstateImg from "../../../src/assets/images/realestate.png";

//i18n
import { withTranslation } from "react-i18next";

// Redux Store
import {
  showRightSidebarAction,
  toggleLeftmenu,
  changeSidebarType,
} from "../../store/actions";

const Header = (props) => {
  function tToggle() {
    var body = document.body;
    if (window.screen.width <= 998) {
      body.classList.toggle("sidebar-enable");
    } else {
      body.classList.toggle("vertical-collpsed");
      body.classList.toggle("sidebar-enable");
    }
  }

  // const handleLogout = async () => {
  //   const res = await adminLogout();
  //   if (res.success) {
  //     localStorage.removeItem("authAdmin");
  //     // histroy.push("/admin")
  //   } else {
  //     console.log("Logout failed");
  //   }
  // };

  return (
    <React.Fragment>
      <header id="page-topbar">
        <div className="navbar-header">
          <div className="d-flex">
            <div className="navbar-brand-box d-lg-none d-md-block">
              <Link to="/admin-page" className="logo logo-dark">
                <span className="logo-sm">
                  <img src={RealEstateImg} alt="" height="30" />
                </span>
              </Link>
              <Link to="/admin-page" className="logo logo-light">
                <span className="logo-sm">
                  <img src={RealEstateImg} alt="" height="30" />
                </span>
              </Link>
            </div>
            <button
              type="button"
              onClick={() => {
                tToggle();
              }}
              className="btn btn-sm px-3 font-size-16 header-item "
              id="vertical-menu-btn"
            >
              <i className="fa fa-fw fa-bars" />
            </button>
          </div>
          <div className="d-flex">
            <LanguageDropdown />
            <div className="dropdown d-none d-lg-inline-block ms-1"></div>
            <div className="mt-4">
              <Link
                to="/"
                className="dropdown-item"
                // onClick={() => {
                //   handleLogout();
                // }}
              >
                <i className="bx bx-power-off font-size-16 align-middle me-1 text-danger" />
                <span>{props.t("Logout")}</span>
              </Link>
            </div>
            {/* <NotificationDropdown /> */}
            {/* <ProfileMenu /> */}
            <div></div>
          </div>
        </div>
      </header>
    </React.Fragment>
  );
};

Header.propTypes = {
  changeSidebarType: PropTypes.func,
  leftMenu: PropTypes.any,
  leftSideBarType: PropTypes.any,
  showRightSidebar: PropTypes.any,
  showRightSidebarAction: PropTypes.func,
  t: PropTypes.any,
  toggleLeftmenu: PropTypes.func,
};

const mapStatetoProps = (state) => {
  const { layoutType, showRightSidebar, leftMenu, leftSideBarType } =
    state.Layout;
  return { layoutType, showRightSidebar, leftMenu, leftSideBarType };
};

export default connect(mapStatetoProps, {
  showRightSidebarAction,
  toggleLeftmenu,
  changeSidebarType,
})(withTranslation()(Header));
