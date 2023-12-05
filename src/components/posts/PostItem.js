import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import {
  addLike,
  postDelete,
  postUpdate,
  getPosts,
  getPostLike,
} from "../../redux/action/post";

export const PostItem = ({ showAction = false, post }) => {
  const [updatePostCheck, setUpdatePostCheck] = useState(true);
  const [updatePost, setUpdatePost] = useState(post?.text);
  const [likes, setLikes] = useState(0);
  const [userPostLiked, setUserPostLiked] = useState(false);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const getPostLikes = () => {
    const storedData = localStorage.getItem("token");
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `http://localhost:5000/api/post/post-likes?postId=${post.id}`,
      headers: {
        Authorization: `Bearer ${storedData}`,
      },
    };

    axios
      .request(config)
      .then((response) => {
        setLikes(response.data.likeCounts);
        setUserPostLiked(response.data.interactionStatus);
        //dispatch(getPosts());
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getPostLikes();
    // dispatch(getPostLike(post.id));
  }, []);

  const onDelete = (id) => {
    dispatch(postDelete(id));
  };
  const handleLike = (id) => {
    console.log("Clicked on Liked Button ", id);
    dispatch(addLike(id));
  };

  const handleUpdatePost = () => {
    console.log("I am here ", updatePost, post.id);
    setUpdatePostCheck(true);

    dispatch(postUpdate(post.id, updatePost));
  };

  return (
    <div className="card card-body mb-3">
      <div className="row">
        <div className="col-md-2">
          <Link to={`/post/${post._id}`}>
            <img
              className="rounded-circle d-none d-md-block"
              src={`${process.env.REACT_APP_IMAGE_URL}${post.User.profileImage}`}
              alt=""
            />
          </Link>
          <br />
          <p className="text-center text-capitalize">{post.User.name}</p>
        </div>
        <div className="col-md-10">
          {updatePostCheck ? (
            <p className="lead">{post?.text}</p>
          ) : (
            <p>
              <input
                defaultValue={post?.text}
                onChange={(e) => setUpdatePost(e.target.value)}
              ></input>
              <button
                type="button"
                className="btn btn-light mr-1"
                style={{
                  backgroundColor: "#F4A62A",
                }}
                onClick={handleUpdatePost}
              >
                Update Post
              </button>
            </p>
          )}

          {showAction && (
            <div>
              {" "}
              <button
                onClick={() => handleLike(post?.id)}
                type="button"
                className="btn btn-light mr-1"
                style={{
                  backgroundColor: userPostLiked ? "lightsalmon" : "lightgray",
                }}
              >
                <i
                  className={
                    post?.likes?.some((post) => post?.user === user?.id)
                      ? "text-info fas fa-thumbs-up"
                      : "text-secondary fas fa-thumbs-up"
                  }
                ></i>
                <span className="badge badge-light" style={{ color: "black" }}>
                  {likes}
                </span>
              </button>
              {/* <button type="button" className="btn btn-light mr-1">
                <i className="text-secondary fas fa-thumbs-down"></i>
                  </button> */}
          
              {(user.data.userId == post.postedBy ||
                user.data.type == "admin") && (
                <>
                  <button
                    onClick={() =>
                      setUpdatePostCheck((prevState) => !prevState)
                    }
                    type="button"
                    className="btn btn-light mr-1"
                    style={{
                      backgroundColor: "#F4A62A",
                    }}
                  >
                    Edit
                  </button>

                  <button
                    className="btn btn-danger m-2"
                    onClick={() => onDelete(post?.id)}
                  >
                    <i className="fas fa-times" />
                  </button>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
