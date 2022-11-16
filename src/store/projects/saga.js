import { call, put, takeEvery } from "redux-saga/effects"

// Crypto Redux States
import { GET_PROJECTS, GET_PROJECT_DETAIL, ADD_NEW_PROJECT, DELETE_PROJECT, UPDATE_PROJECT ,GET_PROPERTY__DETAIL } from "./actionTypes"
import {
  getProjectsSuccess,
  getProjectsFail,
  getProjectDetailSuccess,
  getProjectDetailFail,
  addProjectFail,
  addProjectSuccess,
  updateProjectSuccess,
  updateProjectFail,
  deleteProjectSuccess,
  deleteProjectFail,
  getAttorneyDetail,
  getAttorneyDetailSuccess,
  getAttorneyDetailFail,

} from "./actions"

//Include Both Helper File with needed methods
import { getProjects, getProjectsDetails, addNewProject, updateProject, deleteProject } from "helpers/fakebackend_helper"
import { get } from "lodash"
import {getPropertyById} from "../../RealEstateCbe/helpers/REbackend_helper"


//UPDATE ATTORNEY DETAILS
// function* onGetAttorneyDetail(id) {
//   try {
//     const response = yield call(getAttorneyByID({objectId:id}))
//     yield put(getAttorneyDetailSuccess(response))
//   } catch (error) {
//     yield put(getAttorneyDetailFail(error))
//   }
// }


function* fetchProjects() {
  try {
    const response = yield call(getProjects)
    yield put(getProjectsSuccess(response))
  } catch (error) {
    yield put(getProjectsFail(error))
  }
}

function* fetchProjectDetail({ projectId }) {
  try {
    const response = yield call(getProjectsDetails, projectId)
    yield put(getProjectDetailSuccess(response))
  } catch (error) {
    yield put(getProjectDetailFail(error))
  }
}

function* onUpdateProject({ payload: project }) {
  try {
    const response = yield call(updateProject, project)
    yield put(updateProjectSuccess(response))
  } catch (error) {
    yield put(updateProjectFail(error))
  }
}

function* onDeleteProject({ payload: project }) {
  try {
    const response = yield call(deleteProject, project)
    yield put(deleteProjectSuccess(response))
  } catch (error) {
    yield put(deleteProjectFail(error))
  }
}

function* onAddNewProject({ payload: project }) {
  try {
    const response = yield call(addNewProject, project)
    yield put(addProjectSuccess(response))
  } catch (error) {

    yield put(addProjectFail(error))
  }
}
function* onGetPropertyByID({ payload: user }) {
  try {
    console.log(user,"before call")
    const response = yield call(getPropertyById,{objectId:user.user.objectId});
    console.log(response,'dinesh res');
    yield put(getProjectDetailSuccess(response))
  } catch (error) {
    //yield put(addProjectFail(error))
  }
}

function* projectsSaga() {

  yield takeEvery(GET_PROJECTS, fetchProjects)
  yield takeEvery(GET_PROJECT_DETAIL, fetchProjectDetail)
  yield takeEvery(ADD_NEW_PROJECT, onAddNewProject)
  yield takeEvery(UPDATE_PROJECT, onUpdateProject)
  yield takeEvery(DELETE_PROJECT, onDeleteProject)
  yield takeEvery(GET_PROPERTY__DETAIL, onGetPropertyByID)

}

export default projectsSaga
