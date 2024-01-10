import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Loader from '../layouts/Loader';
import { useAlert } from 'react-alert';
import { useSelector, useDispatch } from 'react-redux';
import { login, clearErrors } from '../../actions/userAction';


const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const alert = useAlert();
  const dispatch = useDispatch();
  const { isAuthenticated, loading, error } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isAuthenticated) {
      window.location.href = '/';
    }
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
  }, [dispatch, alert, isAuthenticated, error]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="row wrapper">
            <div className="col-10 col-lg-5">
              <form className="shadow-lg" onSubmit={submitHandler}>
                <h1 className="mb-4 text-center">Login</h1>
                <div className="form-group">
                  <label htmlFor="email_field">Email</label>
                  <input
                    type="email"
                    placeholder='Enter your Mail '
                    id="email_field"
                    className="form-control"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="password_field">Password</label>
                  <input
                    type="password"
                    placeholder='Enter your Password'
                    id="password_field"
                    className="form-control"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className="form-group mt-2 ">
                  <Link to="/users/forgetPassword" id='fg'>
                    Forgot Password?
                  </Link>
                </div>
                <button
                  id="login_button"
                  type="submit"
                  className="btn btn-block py-2 "
                >
                  LOGIN
                </button>
                <div className="form-group mt-3">
                <Link to="/users/signup" id='nwu'>
                  NEW USER?
                </Link>
                </div>
              </form>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Login;
