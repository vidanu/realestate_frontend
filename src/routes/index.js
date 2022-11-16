import React from "react";
import { Redirect } from "react-router-dom";

// Profile

// Authentication related pages

//CBE Real Estate
import RERegister from "RealEstateCbe/pages/auth/RERegister";
import RELogin from "RealEstateCbe/pages/auth/RELogin";

// Dashboard
import Dashboard from "../RealEstateCbe/pages/user/Dashboard/RElandingGrid";
import UserProperty from "../RealEstateCbe/pages/user/Dashboard/YourProperty";
import REregisterProperty from "RealEstateCbe/pages/user/Property/REregisterProperty";
import REProjectOverview from "RealEstateCbe/pages/user/Dashboard/REProjectOverview";
import ContactUs from "RealEstateCbe/pages/user/Dashboard/ContactUs";
import REuserProfile from "RealEstateCbe/pages/user/Profile/REuserProfile";
//Admin
import Admin from "RealEstateCbe/pages/admin/Admin";
import UserList from "RealEstateCbe/pages/admin/usersList";
import PropertyList from "RealEstateCbe/pages/admin/propertiesList";
import UserDetails from "RealEstateCbe/pages/admin/UserDetails";
import PropertyDetails from "RealEstateCbe/pages/admin/PropertyDetails";
const authProtectedRoutes = [
  { path: "/dashboard", component: Dashboard },
  { path: "/userProperty", component: UserProperty },
  { path: "/RESellProperty", component: REregisterProperty },
  { path: "/contact-page", component: ContactUs },
  { path: "/REprojectoverview", component: REProjectOverview },

  // this route should be at the end of all other routes
  // eslint-disable-next-line react/display-name
  { path: "/", exact: true, component: () => <Redirect to="/dashboard" /> },
];

const publicRoutes = [
  // { path: "/RElogin", component: RELogin },
  { path: "/REregister", component: RERegister },
  { path: "/dashboard", component: Dashboard },
  { path: "/REuserProfile", component: REuserProfile },
  { path: "/REprojectoverview", component: REProjectOverview },
];
const privateRoutes = [{ path: "/RElogin", component: RELogin }];
const adminRoutes = [
  //Admin Page
  { path: "/admin-page", component: Admin },
  { path: "/userlist-page", component: UserList },
  { path: "/user-Detail", component: UserDetails },
  { path: "/propertylist-page", component: PropertyList },
  { path: "/property-Detail", component: PropertyDetails },
];
export { publicRoutes, authProtectedRoutes, privateRoutes, adminRoutes };
