import axios from "axios";
import jwt_decode from 'jwt-decode';

import {ACCESS_TOKEN} from "../../constants/Constant";
import SetAuthToken from "../../utils/SetAuthHeader";

import {
  ACTIVATE_USER_ACCOUNT,
  ACTIVATION_ERRORS,
  CLEANUP_ERRORS,
  CLEANUP_POLL,
  CREATE_NON_SCHEDULED_POLL,
  CREATE_SCHEDULED_POLL,
  GET_ERRORS,
  IS_LOADING,
  LOGIN_ERRORS,
  LOGIN_USER,
  LOGOUT_USER,
  NON_SCHEDULED_POLL_ERRORS,
  REGISTER_USER,
  SCHEDULED_POLL_ERRORS
} from "./actionTypes";

export const RegisterUser = (UserData) => dispatch => {
  dispatch({type : IS_LOADING})
  axios.post("/api/v1/auth/signup", UserData)
      .then(result => {dispatch({type : REGISTER_USER, payload : result.data})

            })
      .catch((err) => {
                 dispatch({type : GET_ERRORS, payload : err.response.data})});
};

export const ActivateUserAccount = (token) => dispatch => {
  dispatch({type : IS_LOADING})
  axios.put(`/api/v1/auth/activate/${token}`)
      .then((result) => {
                dispatch({type : ACTIVATE_USER_ACCOUNT, payload : result.data})

            })
      .catch((err) => {dispatch(
                 {type : ACTIVATION_ERRORS, payload : err.response.data})});
};
export const LoginUser = (UserData) => dispatch => {
  dispatch({
    type : IS_LOADING

  })
  axios.post("/api/v1/auth/signin", UserData)
      .then(res => {
        // Save to localStorage
        // Set token to localStorage
        const {token} = res.data;
        // console.log(res.data.token)
        localStorage.setItem("jwtToken", token);
        // Set token to Auth header
        SetAuthToken(token)
        // Decode token to get user data
        const decoded = jwt_decode(token);
        dispatch({type : LOGIN_USER, payload : decoded})
      })
      .catch((err) => {
                 dispatch({type : LOGIN_ERRORS, payload : err.response.data})});
};
// LOGOUT USER
export const LogOutUser = () => dispatch => {
  // Remove token from local storage
  localStorage.removeItem("jwtToken");
  // Remove auth header for future requests
  SetAuthToken(false);
  dispatch({
    type : LOGOUT_USER,

  })
  // Redirect to login
  window.location.href = "/login";
};

export const OauthSuccess =
    (token) => dispatch => {
      const headertoken = "Bearer " + token
      localStorage.setItem(ACCESS_TOKEN, headertoken);
      SetAuthToken(headertoken)
      // Decode token to get user data
      const decoded = jwt_decode(token);
      dispatch({type : LOGIN_USER, payload : decoded})
    }
///
export const CreateNonScheduledPoll = (userId, pollData) => dispatch => {
  dispatch({type : IS_LOADING})
  axios.post(`/api/v1/polls/${userId}/non_scheduled_poll`, pollData)
      .then((result) => {dispatch({
              type : CREATE_NON_SCHEDULED_POLL,
            })

            })
      .catch((err) => {dispatch({
               type : NON_SCHEDULED_POLL_ERRORS,
               payload : err.response.data
             })});
};
export const CleanupPoll = (userId, pollData) =>
    dispatch => { dispatch({type : CLEANUP_POLL})};
export const CleanupErrors = (userId, pollData) =>
    dispatch => { dispatch({type : CLEANUP_ERRORS})};
export const CreateScheduledPoll = (userId, pollData) => dispatch => {
  dispatch({type : IS_LOADING})
  axios.post(`/api/v1/polls/${userId}/scheduled_poll`, pollData)
      .then((result) => {dispatch({
              type : CREATE_SCHEDULED_POLL,
            })

            })
      .catch((err) => {dispatch(
                 {type : SCHEDULED_POLL_ERRORS, payload : err.response.data})});
};
