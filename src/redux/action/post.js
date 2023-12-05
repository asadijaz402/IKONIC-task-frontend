import {
  ADD_POST,
  GET_ERRORS,
  GET_POSTS,
  GET_POST,
  POST_LOADING,
  DELETE_POST,
  CLEAR_ERRORS,
  UPDATE_POST,
  POST_LIKE,
} from "./types";
import { SC } from "../../components/helper/ServerCall";

const initialState = {
  posts: [],
};

export const addPost = (data) => (dispatch) => {
  dispatch(clearErrors());
  SC.postCall({ url: "/post/create-post", data })
    .then((res) => {
      dispatch({
        type: ADD_POST,
        payload: res.data.data,
      });
      dispatch(getPosts());
    })
    .catch((err) => {
      console.log("error is ", err);
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      });
    });
};

export const getPost = (id) => (dispatch) => {
  dispatch(clearErrors());
  dispatch(postLoading());
  SC.getCall({ url: `/post/post/${id}` }).then((res) => {
    dispatch({
      type: GET_POST,
      payload: res.data,
    }).catch((err) => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      });
    });
  });
};

export const getPosts = () => (dispatch) => {
  dispatch(clearErrors());
  dispatch(postLoading());
  SC.getCall({ url: "/post/posts" })
    .then((res) => {
      dispatch({
        type: GET_POSTS,
        payload: res.data.posts,
      });
    })
    .catch((err) => {
      dispatch({
        type: GET_POSTS,
        payload: null,
      });
    });
};

export const postDelete = (id) => (dispatch) => {
  dispatch(clearErrors());
  dispatch(postLoading());
  SC.deleteCall({ url: `/post/delete-post?postId=${id}` })
    .then((res) => {
      dispatch({
        type: DELETE_POST,
        payload: id,
      });
      dispatch(getPosts());
    })
    .catch((err) => {
      console.log("err ", err);
      dispatch({
        type: GET_POSTS,
        payload: err.response.data,
      });
    });
};

export const postUpdate = (id, text) => (dispatch) => {
  console.log("post update dispatch ", id, text);
  let data = {
    id,
    text,
  };
  dispatch(clearErrors());
  dispatch(postLoading());
  console.log("Object is ", data);
  SC.postCall({ url: `/post/update-post`, data })
    .then((res) => {
      dispatch({
        type: UPDATE_POST,
        payload: res.data,
      });
      dispatch(getPosts());
    })
    .catch((err) => {
      dispatch({
        type: GET_POSTS,
        payload: err.response.data,
      });
    });
};

export const addLike = (id) => (dispatch) => {
  let data = {
    postId: id,
  };
  dispatch(clearErrors());
  SC.postCall({ url: `/post/isliked-post`, data })
    .then((res) => {
      dispatch({
        type: GET_POSTS,
        payload: [],
      });
      dispatch(getPosts());
      // dispatch({
      //   type: GET_ERRORS,
      //   payload: {},
      // });
    })
    .catch((err) => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      });
    });
};

export const getPostLike = (id) => (dispatch) => {
  console.log("In get Post Likes ", id);
  dispatch(clearErrors());
  dispatch(postLoading());
  SC.getCall({ url: `/post/post-likes?postId=${id}` })
    .then((res) => {
      console.log("Count all post likes ", res);
      dispatch({
        type: POST_LIKE,
        payload: res.data,
      });
      // dispatch(getPosts());
    })
    .catch((err) => {
      dispatch({
        type: GET_POSTS,
        payload: null,
      });
    });
};





export const clearErrors = () => (dispatch) => {
  dispatch({
    type: CLEAR_ERRORS,
  });
};

export const postLoading = () => (dispatch) => {
  dispatch({
    type: POST_LOADING,
  });
};
