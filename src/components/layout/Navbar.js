import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../redux/action/auth';
export const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const [collapse, setCollapse] = useState(true);
  const { isAuthenticated, user } = useSelector((state) => state.auth);


  const logoutUser = () => {
    dispatch(logout(navigate));
  };
  if (location.pathname === '/') {
    return;
  }
  return (
    <nav className='navbar navbar-expand-sm navbar-dark bg-dark mb-4'>
      <div className='container'>
        <Link className='navbar-brand' to='/'>
          User-PROFILE
        </Link>
        <button
          onClick={() => setCollapse(!collapse)}
          className='navbar-toggler'
          type='button'
          data-bs-toggle='collapse'
          data-target='#mobile-nav'
        >
          <span className='navbar-toggler-icon'></span>
        </button>

        <div
          className={`${collapse && 'collapse'} navbar-collapse`}
          id='mobile-nav'
        >
          {!isAuthenticated ? (
            <ul className='navbar-nav m-auto'>
              <li className='nav-item' onClick={() => setCollapse(!collapse)}>
                <Link className='nav-link' to='/register'>
                  Sign Up
                </Link>
              </li>
              <li className='nav-item' onClick={() => setCollapse(!collapse)}>
                <Link className='nav-link' to='/login'>
                  Login
                </Link>
              </li>
            </ul>
          ) : (
            <ul className='navbar-nav m-auto'>
              <li
                className='nav-item m-2'
                style={{ color: 'white' }}
                onClick={() => setCollapse(!collapse)}
              >
                <Link className='nav-link' to='/feed'>
                  Post Feed{' '}
                </Link>
              </li>
              <li
                className='nav-item m-2'
                style={{ color: 'white' }}
                onClick={() => setCollapse(!collapse)}
              >
                <Link className='nav-link' to='/dashboard'>
                  Dashboard{' '}
                </Link>
              </li>
              <li
                className='nav-item m-2'
                style={{ color: 'white' }}
                onClick={() => setCollapse(!collapse)}
              >
                <Link className='nav-link' to='/dashboard'>
                  {user.name}
                </Link>
              </li>
              <li
                className='nav-item '
                style={{ color: 'white' }}
                onClick={() => setCollapse(!collapse)}
              >
                {' '}
                <a href={'#'} className='nav-link' onClick={logoutUser}>
                  <img
                    className='rounded-circle'
                    src={user.profileImage}
                    alt={user.name}
                    style={{ width: '25px', height: '25px', margin: '5px' }}
                    title='profile image'
                  />
                  Logout
                </a>
              </li>
            </ul>
          )}
        </div>
      </div>
    </nav>
  );
};
