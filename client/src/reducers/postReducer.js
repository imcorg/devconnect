import {
  GET_POST,
  GET_POSTS,
  POST_LOADING,
  ADD_POST,
  DELETE_POST
} from '../actions/types'

const initialState = {
  post: null,
  posts: null,
  loading: false
}

export default function (state = initialState, action) {
  switch (action.type) {
    case POST_LOADING:
      return {
        ...state,
        loading: true
      }
    case GET_POST:
      return {
        ...state,
        post: action.payload,
        loading: false
      }
    case ADD_POST:
      return {
        ...state,
        posts: [action.payload, ...state.posts],
        loading: false
      }
    case DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter(post => post._id !== action.payload)
      }
    case GET_POSTS:
      return {
        ...state,
        posts: action.payload,
        loading: false
      }
    default:
      return state
  }
}
