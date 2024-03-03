import AuthService from "../../services/AuthService";
import { call, put, takeLatest } from "redux-saga/effects";
import {
  getActiveUser,
  login,
  logout,
  register,
  setActiveUser,
  setToken,
} from "./slice";

function* registerHandler(action) {
  try {
    const { user, token } = yield call(AuthService.register, action.payload);
    yield put(setToken(token));
    yield put(setActiveUser(user));
  } catch (error) {
    console.error("Registration failed:", error.message);
  }
}
function* loginHandler(action) {
  try {
    const { user, token } = yield call(AuthService.login, action.payload);
    yield put(setToken(token));
    yield put(setActiveUser(user));
  } catch (error) {
    alert("Invalid credentials");
  }
}

function* logoutHandler() {
  try {
    yield call(AuthService.logout);
    yield put(setToken(null));
    yield put(setActiveUser(null));
  } catch (error) {
    console.log(error);
  }
}

function* handleGetActiveUser() {
  try {
    const activeUser = yield call(AuthService.getActiveUser);
    yield put(setActiveUser(activeUser));
  } catch (error) {
    console.log(error);
  }
}

export function* watchRegister() {
  yield takeLatest(register.type, registerHandler);
}

export function* watchLogin() {
  yield takeLatest(login.type, loginHandler);
}

export function* watchLogout() {
  yield takeLatest(logout.type, logoutHandler);
}

export function* watchGetActiveUser() {
  yield takeLatest(getActiveUser.type, handleGetActiveUser);
}
