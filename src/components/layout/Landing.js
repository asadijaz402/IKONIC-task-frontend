import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
export const Landing = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);

  return (
    <div className="landing">
      <div className="dark-overlay landing-inner text-light">
        <div className="container">
          <div className="row">
            <div className="col-md-12 text-center">
              <h1 className="display-3 mb-4">User Profile</h1>
              {!isAuthenticated && (
                <div>
                  {" "}
                  <p className="lead"> Create a User profile, share posts</p>
                  <hr />
                  <Link to="register" className="btn btn-lg btn-info m-2">
                    Sign Up
                  </Link>
                  <Link to="login" className="btn btn-lg btn-light m-2 ">
                    Login
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
