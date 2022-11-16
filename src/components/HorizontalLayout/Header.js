import React, { useState } from "react"
import PropTypes from "prop-types"

import { connect } from "react-redux"

import { Link } from "react-router-dom"

// Redux Store
import { showRightSidebarAction, toggleLeftmenu } from "../../store/actions"
// reactstrap
import { Row, Col, Dropdown, DropdownToggle, DropdownMenu } from "reactstrap"

// Import menuDropdown
import NotificationDropdown from "../CommonForBoth/TopbarDropdown/NotificationDropdown"
import ProfileMenu from "../CommonForBoth/TopbarDropdown/ProfileMenu"

import logo from "../../assets/images/coimbatorelogo.png"
import logoLight from "../../assets/images/coimbatorelogo.png"
import logoLightSvg from "../../assets/images/coimbatorelogo.png"
import logoDark from "../../assets/images/coimbatorelogo.png"

import REProfile from "RealEstateCbe/pages/user/Profile/REprofileMenu"


//i18n
import { withTranslation } from "react-i18next"

const Header = props => {
   return (
    <React.Fragment>
      <header id="page-topbar">
        <div className="navbar-header">
          <div className="d-flex">
            <div className="navbar-brand-box mb-3">
              <Link to="/" className="logo logo-dark">
                <span className="logo-sm">
                  <img src={logo} alt="" height="130" />
                </span>
                <span className="logo-lg">
                  <img src={logoDark} alt="" height="80" />
                </span>
              </Link>

              <Link to="/" className="logo logo-light">
                <span className="logo-sm">
                  <img src={logoLightSvg} alt="" height="130" />
                </span>
                <span className="logo-lg">
                  <img src={logoLight} alt="" height="80" />
                </span>
              </Link>
            </div>

           
          </div>
          <div className="d-flex align-items-center">

            <REProfile />
          </div>
          
        </div>
      </header>
    </React.Fragment>
  )
}

Header.propTypes = {
  leftMenu: PropTypes.any,
  showRightSidebar: PropTypes.any,
  showRightSidebarAction: PropTypes.func,
  t: PropTypes.any,
  toggleLeftmenu: PropTypes.func,
}

const mapStatetoProps = state => {
  const { layoutType, showRightSidebar, leftMenu } = state.Layout
  return { layoutType, showRightSidebar, leftMenu }
}

export default connect(mapStatetoProps, {
  showRightSidebarAction,
  toggleLeftmenu,
})(withTranslation()(Header))
