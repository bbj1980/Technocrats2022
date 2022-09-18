import React, { useState, useEffect, Suspense } from "react";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../redux/_actions/user.actions";
import { Row, Col } from "react-bootstrap";
import { browserHistory } from "react-router";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

import "../../src/assets/css/login.css";
function LoginPage() {
  const [inputs, setInputs] = useState({
    username: "",
    password: "",
    code: "",
  });
  const [showModal, setShowModal] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const { username, password, code } = inputs;
  const loggingIn = useSelector((state) => state.authentication.loggingIn);
  const alert = useSelector((state) => state.alert);
  const dispatch = useDispatch();
  const location = useLocation();
  const CustomDialog = React.lazy(() => import("../customDialog/customDialog"));
  const hideEvent = () => {
    setShowModal(false);
  };
  // reset login status
  useEffect(() => {
    if (localStorage.getItem("user")) {
      dispatch(userActions.logout());
      window.location.href = "";
    }
  }, []);

  function handleChange(e) {
    const { name, value } = e.target;
    setInputs((inputs) => ({ ...inputs, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();

    setSubmitted(true);
    if (username && password) {
      // get return url from location state or default to home page
      const { from } = location.state || { from: { pathname: "/" } };
      dispatch(userActions.login(username, password, from));
    }
  }

  return (
    <>
      <section className="login-bg">
        <div className="login-popup">
          <div className="login-container">
            <Suspense fallback={<div>Loading ...</div>}>
              {alert.type === "alert-danger" && !loggingIn && submitted && (
                <CustomDialog
                  show={submitted}
                  size="lg"
                  title={"Message"}
                  body={alert.message}
                  hideEvent={hideEvent}
                />
              )}
            </Suspense>

            <Suspense fallback={<div>Loading ...</div>}>
              {showModal && (
                <CustomDialog
                  show={showModal}
                  size="lg"
                  body={"test info"}
                  title={"info"}
                  hideEvent={hideEvent}
                />
              )}
            </Suspense>
            <div className="popup-header">Login</div>
            <div className="popup-body mx-auto">
              <form name="form" onSubmit={handleSubmit}>
                <div className="form-group">
                  <label>Username</label>
                  <input
                    type="text"
                    name="username"
                    value={username}
                    onChange={handleChange}
                    className={
                      "form-control" +
                      (submitted && !username ? " is-invalid" : "")
                    }
                  />
                  {submitted && !username && (
                    <div className="invalid-feedback">Username is required</div>
                  )}
                </div>
                <div className="form-group">
                  <label>Password</label>
                  <input
                    type="password"
                    name="password"
                    value={password}
                    onChange={handleChange}
                    className={
                      "form-control" +
                      (submitted && !password ? " is-invalid" : "")
                    }
                  />
                  {submitted && !password && (
                    <div className="invalid-feedback">Password is required</div>
                  )}
                </div>

                <div className="form-group">
                  <label>Code</label>
                  <input
                    type="text"
                    name="text"
                    value={code}
                    onChange={handleChange}
                    className={
                      "form-control" +
                      (submitted && !password ? " is-invalid" : "")
                    }
                  />
                </div>

                <div className="form-group margintop10 row-center">
                  <div className="invalid-feedback">{alert.message}dd</div>

                  <Link to="/register" className="btn btn-link">
                    <button className="btn btn-primary">Register</button>
                  </Link>
                  <button className="btn btn-primary">
                    {loggingIn && (
                      <span className="spinner-border spinner-border-sm mr-1"></span>
                    )}
                    Login
                  </button>
                  {/* <Stack spacing={2} direction="row">
                    <Link to="/">
                      <Button variant="outlined">Register</Button>
                    </Link>

                    <Button variant="contained" type="submit">
                      {loggingIn && (
                        <span className="spinner-border spinner-border-sm mr-1"></span>
                      )}
                      Login
                    </Button>
                  </Stack> */}
                  {/* <Button
                    as={Col}
                    variant="primary"
                    onClick={() => setShowModal(true)}
                  >
                    Info
                  </Button> */}
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default LoginPage;
