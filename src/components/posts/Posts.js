import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { PostForm } from "./PostForm";
import { Spinner } from "../common/Spinner";
import { PostFeed } from "./PostFeed";
export const Posts = () => {
  const { posts, loading } = useSelector((state) => state?.post);
  return (
    <div className="feed">
      <div className="container">
        <div className="row">
          <div className="col-md-12"></div>
          <PostForm />
          {loading || posts === null ? <Spinner /> : <PostFeed posts={posts} />}
        </div>
      </div>
    </div>
  );
};
