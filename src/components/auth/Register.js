import React, { useEffect, useState } from 'react';
import { SC } from '../helper/ServerCall';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../../redux/action/auth';
import TextFieldGroup from '../common/TextFieldGroup';
import { clearErrors } from '../../redux/action/post';
import axios from 'axios';
export const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const { errors } = useSelector((state) => state.errors);
  const [data, setData] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
    type: 'user',
    profileImage: '',
    errors: {},
  });

  const [isDisabled, setIsDisabled] = useState(false);

  useEffect(() => {
    setIsDisabled(false);
    if (
      !data?.name ||
      !data?.email ||
      !data?.password ||
      !data?.password2 ||
      !data?.type ||
      !data?.profileImage
    ) {
      setIsDisabled(true);
    }
    if (data?.password !== data?.password2) {
      setIsDisabled(true);
    }
  }, [data]);

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handelSubmit = (e) => {
    e.preventDefault();
    const { password2, errors, ...rest } = data;
    dispatch(registerUser(rest, navigate));
  };

  const handleAvatarUpload = (e) => {
    setData({
      ...data,
      profileImage: e.target.files[0],
    });
  };

  useEffect(() => {
    setData({
      ...data,
      errors,
    });
  }, [errors]);

  useEffect(() => {}, [data]);

  useEffect(() => {
    dispatch(clearErrors());
  }, []);
  if (isAuthenticated) {
    navigate('/dashboard');
  }
  return (
    <div className='register'>
      <div className='container'>
        <div className='row'>
          <div className='col-md-8 m-auto shadow-lg p-5 mb-4 bg-white rounded '>
            <h1 className='display-4 text-center'>Sign Up</h1>
            <p className='lead text-center'>Create your DevConnector account</p>
            <form onSubmit={handelSubmit}>
              <TextFieldGroup
                onChange={handleChange}
                type='text'
                placeholder='Name'
                value={data.name}
                name='name'
              />
              <TextFieldGroup
                onChange={handleChange}
                type='email'
                placeholder='Email Address'
                value={data.email}
                name='email'
              />
              <TextFieldGroup
                onChange={handleChange}
                type='select'
                options={[
                  { label: 'Admin', value: 'admin' },
                  { label: 'User', value: 'user', selected: true },
                ]}
                placeholder='User Type'
                value={data.type}
                name='type'
              />

              <TextFieldGroup
                onChange={handleChange}
                type='password'
                placeholder='Password'
                value={data.password}
                name='password'
              />

              <TextFieldGroup
                onChange={handleChange}
                type='password'
                placeholder='Confirm Password'
                value={data.password2}
                name='password2'
              />
              <div>
                <input
                  type='file'
                  className='btn btn-secondary btn-block mt-4'
                  onChange={handleAvatarUpload}
                />
              </div>
              <p className='text-danger'>{errors?.message}</p>
              <input
                type='submit'
                className={`btn ${
                  isDisabled ? 'btn-secondary' : 'btn-info'
                } btn-block mt-4`}
                disabled={isDisabled}
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
