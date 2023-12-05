import { act } from "react-dom/test-utils";
import {
  ADD_POST,
  DELETE_POST,
  GET_ERRORS,
  GET_POST,
  GET_POSTS,
  POST_LIKE,
  POST_LOADING,
  UPDATE_POST,
} from "../action/types";

const initialState = {
  posts: [],
  loading: false,
  post: {},
  likeCounts: 0,
  interactionStatus: false,
};

const postReducer = (state = initialState, action) => {


  switch (action.type) {
    case ADD_POST:
      return { ...state, posts: [action.payload, ...state.posts] };
    case GET_POST:
      return { ...state, post: action.payload, loading: false };

    case GET_POSTS:
      return { ...state, posts: action.payload, loading: false };
    case UPDATE_POST:
      return { ...state, posts: [action.payload, ...state.posts] };
    case DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter((item) => item._id !== action.payload),
        loading: false,
      };
    case POST_LIKE:
      return {
        ...state,
        likeCounts: action.payload.likeCounts,
        interactionStatus: action.payload.interactionStatus,
      };
    case POST_LOADING:
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
};

export default postReducer;
