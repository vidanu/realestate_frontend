import { del, get, post, put } from "../helpers/REapi_helper";
import { SERVER_URL } from "../helpers/REConfiguration";
const BASE_URL = `${SERVER_URL}/api`;

const REuserRegisteration = (payload) =>
  post(`${BASE_URL}/user/register`, payload);
const REuserLogin = (payload) => post(`${BASE_URL}/user/login`, payload);
const ReuserUpdate = (payload) => put(`${BASE_URL}/user/edit`, payload);
const updatePassword = (payload) =>
  put(`${BASE_URL}/user/changepassword`, payload);

const RepropertyUpdate = (payload) =>
  put(`${BASE_URL}/property/propertyedit`, payload);
const RElogoutUser = () => get(`${BASE_URL}/user/logout`);
const REpropertyRegistration = (payload) =>
  post(`${BASE_URL}/property/Sellproperty`, payload);

const getAllProperty = (payload) =>
  post(`${BASE_URL}/property/properties`, payload);
const getPropertyById = (payload) =>
  post(`${BASE_URL}/user/propertydetails`, payload);
const getPropertybyUserId = (payload) =>
  post(`${BASE_URL}/property/getpropertyByUserId`, payload);

const getFileFromGFS = ({ id }) => get(`${SERVER_URL}/file/${id}`);
const getPropertyPicUpload = (payload) =>
  post(`${BASE_URL}/property/propertyPicUpload`, payload);

const getPropertyCount = (payload) =>
  post(`${BASE_URL}/user/propertyCount`, payload);

const REpropertyPicUpdate = (payload) =>
  put(`${BASE_URL}/user/profilePicUpdate`, payload);
//   const REpropertyPicUpdate = payload =>
//   put(`${BASE_URL}/property/propertyPicUpload`, payload)

// const REpropertyPicUpdate = payload =>
// put(`${BASE_URL}/property/getpropertypic`, payload)
//Mail
const mailRegister = (payload) =>
  post(`${BASE_URL}/mail/mailregister`, payload);
const sendMail = (payload) => post(`${BASE_URL}/mail/send`, payload);
//Admin
const adminLogin = (payload) => post(`${BASE_URL}/admin/adminLogin`, payload);
const allUsersList = () => get(`${BASE_URL}/admin/allUsersList`);
const getUserById = (payload) => post(`${BASE_URL}/admin/getUserById`, payload);
const removeUser = (payload) => put(`${BASE_URL}/admin/removeUser`, payload);
const removeProperty = (payload) =>
  put(`${BASE_URL}/admin/removeProperty`, payload);
const allPropertiesList = () => get(`${BASE_URL}/admin/allPropertiesList`);
const getPropertyDetailsById = (payload) =>
  post(`${BASE_URL}/admin/getPropertyDetailsById`, payload);
export {
  REpropertyPicUpdate,
  REuserRegisteration,
  REuserLogin,
  ReuserUpdate,
  RElogoutUser,
  getAllProperty,
  getPropertyCount,
  REpropertyRegistration,
  getPropertyById,
  getFileFromGFS,
  getPropertyPicUpload,
  getPropertybyUserId,
  RepropertyUpdate,
  adminLogin,
  allUsersList,
  getUserById,
  removeUser,
  allPropertiesList,
  getPropertyDetailsById,
  removeProperty,
  mailRegister,
  sendMail,
  updatePassword,
  // REpropertyPicUpdate
};
