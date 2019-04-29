import axios from 'axios'
import setAuthToken from '../utils/setAuthToken'
import { GET_ERRORS, SET_CURRENT_USER } from '../actions/types'
import jwt_decode from 'jwt-decode'

// Register User
export const registerUser = (userData, history) => dispatch => {
  axios
    .post('/api/users/register', userData)
    .then(res => history.push('/login'))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    )
}

// Login Get User Token
export const loginUser = userData => dispatch => {
  axios
    .post('/api/users/login', userData)
    .then(res => {
      // Save to Local Storage
      const { token } = res.data
      // Store to ls
      localStorage.setItem('jwtToken', token)
      // Set token to Auth headers
      setAuthToken(token)
      // Decode token to get User info
      const decoded = jwt_decode(token)
      // Set current user
      dispatch(setCurrentUser(decoded))
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    )
}

// Set Login User
export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  }
}

// Log user out
export const logoutUser = () => dispatch => {
  // Remove localStorage
  localStorage.removeItem('jwtToken')
  // Remove Auth Token
  setAuthToken(false)
  dispatch(setCurrentUser({}))
}
