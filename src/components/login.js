import React, { useState, useEffect, Suspense } from "react";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userActions, login } from "../redux/_actions/user.actions";
import { useNavigate } from "react-router-dom";
import { userConstants, STATUS_MESSAGE } from '../constants/user.constants';
import { RoleConstants } from '../constants/role.constants';
import axios from "axios";

import "../../src/assets/css/login.css";
function LoginPage() {
  const [inputs, setInputs] = useState({
    username: "",
    password: "",
    code: "",
  });
  let navigate = useNavigate();

  const [showModal, setShowModal] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const { username, password, code } = inputs;
  const loggingIn = useSelector((state) => state.authentication.loggingIn);
  const alert = useSelector((state) => state.alert);
  const dispatch = useDispatch();
  const location = useLocation();
  const CustomDialog = React.lazy(() => import("../customDialog/customDialog"));
  const [questions, setQuestions] = useState();

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
  const fetchQuestions = async (category = "", difficulty = "") => {
    const { data } = await axios.get(
      `https://opentdb.com/api.php?amount=10${category && `&category=${category}`
      }${difficulty && `&difficulty=${difficulty}`}&type=multiple`
    );

    setQuestions(data.results);
  };
  function handleSubmit(e) {
    e.preventDefault();
    setSubmitted(true);
    if (username && password) {
      // get return url from location state or default to home page
      const { from } = location.state || { from: { pathname: "/" } };

      dispatch(login(username, password, from))
        .then((response) => {
          if (response.statusCode === STATUS_MESSAGE.SUCCESS) {
            //validatePassword(response.data.password).then(() => {
            localStorage.setItem('user', JSON.stringify(response.data));
            if (code) {
              localStorage.setItem('quizcode', JSON.stringify(code));


              //      getQuizByCode(localStorage.getItem('quizcode'));
              fetchQuestions(17, 'easy').then((response) => {
                navigate("/quiz", {
                  name: { username },
                  questions: { questions }

                });
              })


            }
            else if (response.data.role === RoleConstants.USER) {
              navigate("UserDashBoard");
            } else {
              navigate("AdminDashboard");
            }
            // })
          }
        });
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
                    name="code"
                    value={code}
                    className="form-control"
                    onChange={handleChange}
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
