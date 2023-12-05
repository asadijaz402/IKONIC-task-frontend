import React, { useState, useEffect } from "react";
import TextFieldGroup from "../common/TextFieldGroup";
import { useSelector, useDispatch } from "react-redux";
import { addPost, getPosts } from "../../redux/action/post";

export const PostForm = () => {
  const dispatch = useDispatch();
  const { errors } = useSelector((state) => state.errors);
  const { user } = useSelector((state) => state.auth);

  const [data, setData] = useState({
    text: "",
  });

  useEffect(() => {
    dispatch(getPosts());
  }, []);

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addPost(data));
    setData({
      text: "",
    });
  };

  return (
    <div className="post-form mb-3">
      <div className="card card-info">
        <div className="card-header bg-info text-white">Say Somthing...</div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <TextFieldGroup
                className="form-control form-control-lg"
                type="textarea"
                placeholder="Create a post"
                name="text"
                onChange={handleChange}
                error={errors?.text}
                value={data?.text}
              />
            </div>
            <button type="submit" className="btn btn-dark mt-2">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
