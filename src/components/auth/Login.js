import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { loginUser } from '../../redux/action/auth';
import { useNavigate } from 'react-router-dom';
import TextFieldGroup from '../common/TextFieldGroup';
import { clearErrors } from '../../redux/action/post';
export const Login = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const [data, setData] = useState({
    email: '',
    password: '',
    errors: {},
  });
  const { isAuthenticated } = useSelector((state) => state.auth);
  const { errors } = useSelector((state) => state.errors);
  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handelSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser(data));
  };

  useEffect(() => {
    setData({
      ...data,
      errors,
    });
  }, [errors]);

  useEffect(() => {
    dispatch(clearErrors());
  }, []);
  if (isAuthenticated) {
    navigate('/feed');
  }

  return (
    <div className='login'>
      <div className='container'>
        <div className='row'>
          <div className='col-md-8 m-auto shadow-lg p-5 mb-4 bg-white rounded '>
            <h1 className='display-4 text-center'>Log In</h1>
            <p className='lead text-center'>
              Sign in to your User Profile account
            </p>
            <form onSubmit={handelSubmit}>
              <TextFieldGroup
                onChange={handleChange}
                type='email'
                placeholder='Email Address'
                value={data.email}
                name='email'
              />
              <br />
              <TextFieldGroup
                onChange={handleChange}
                type='password'
                placeholder='Password'
                value={data.password}
                name='password'
              />
              <p className='text-danger'>{errors?.message}</p>
              <input type='submit' className='btn btn-info btn-block mt-4' />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
