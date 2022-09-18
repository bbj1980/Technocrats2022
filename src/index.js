import React, { useEffect, useReducer } from "react";
import ReactDOM from "react-dom";
import { RoleConstants } from "./constants/role.constants";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import { history } from "./_helpers/history";
import { alertActions } from "./redux/_actions/alert.actions";
import PrivateRoute from "./components/PrivateRoute";
import { configureFakeBackend } from "./_helpers/fake-backend";
import store from "./redux/store";
import { useDispatch, useSelector } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";
import { ErrorBoundary } from "react-error-boundary";

const ErrorHandler = React.lazy(() => import("./components/error"));
const App = React.lazy(() => import("./App"));
const Dashboard = React.lazy(() => import("./components/dashboard"));
const Contact = React.lazy(() => import("./components/contact"));
const NoPage = React.lazy(() => import("./components/nopage"));
const Layout = React.lazy(() => import("./components/layout"));
const Login = React.lazy(() => import("./components/login"));
const Register = React.lazy(() => import("./components/register"));
const LogOut = React.lazy(() => import("./components/logout"));
const UpdateProfile = React.lazy(() => import("./components/updateProfile"));
const AdminQuiz = React.lazy(() =>
  import("./components/dashboard/quiz/admin.quiz")
);
const ManageQuestion = React.lazy(() =>
  import("./components/dashboard/quiz/managequestion")
);
const StartQuiz = React.lazy(() =>
  import("./components/dashboard/quiz/startquiz")
);
const JoinQuiz = React.lazy(() =>
  import("./components/dashboard/quiz/joinquiz")
);
const QuestionPreview = React.lazy(() =>
  import("./components/dashboard/quiz/questionpreview")
);
const LiveQuiz = React.lazy(() =>
  import("./components/dashboard/quiz/livequiz")
);
const AdminLiveQuiz = React.lazy(() =>
  import("./components/dashboard/quiz/adminlivequiz")
);

export default function Index() {
  const alert = useSelector((state) => state.alert);
  const dispatch = useDispatch();
  useEffect(() => {
    history.listen((location, action) => {
      // clear alert on location change
      dispatch(alertActions.clear());
    });
  });
  const [explode, setExplode] = React.useState(true);
  return (
    <ErrorBoundary
      FallbackComponent={ErrorHandler}
      onReset={() => setExplode(false)}
      resetKeys={[explode]}
    >
      <React.Suspense fallback={<div>wait</div>}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route
                path="/contactus"
                element={
                  <PrivateRoute>
                    <Contact />
                  </PrivateRoute>
                }
              />

              <Route
                path="dashboard"
                element={
                  <PrivateRoute
                    allowedrole={[RoleConstants.USER, RoleConstants.ADMIN]}
                  >
                    <Dashboard />{" "}
                  </PrivateRoute>
                }
              />
              <Route
                path="createquiz"
                element={
                  <PrivateRoute
                    allowedrole={[RoleConstants.USER, RoleConstants.ADMIN]}
                  >
                    <AdminQuiz />{" "}
                  </PrivateRoute>
                }
              />
              <Route
                path="managequestion"
                element={
                  <PrivateRoute
                    allowedrole={[RoleConstants.USER, RoleConstants.ADMIN]}
                  >
                    <ManageQuestion />{" "}
                  </PrivateRoute>
                }
              />
              <Route
                path="startquiz"
                element={
                  <PrivateRoute
                    allowedrole={[RoleConstants.USER, RoleConstants.ADMIN]}
                  >
                    <StartQuiz />{" "}
                  </PrivateRoute>
                }
              />
              <Route
                path="joinquiz"
                element={
                  <PrivateRoute
                    allowedrole={[RoleConstants.USER, RoleConstants.ADMIN]}
                  >
                    <JoinQuiz />{" "}
                  </PrivateRoute>
                }
              />
              <Route
                path="questionpreview"
                element={
                  <PrivateRoute
                    allowedrole={[RoleConstants.USER, RoleConstants.ADMIN]}
                  >
                    <QuestionPreview />{" "}
                  </PrivateRoute>
                }
              />
              <Route
                path="livequiz"
                element={
                  <PrivateRoute
                    allowedrole={[RoleConstants.USER, RoleConstants.ADMIN]}
                  >
                    <LiveQuiz />{" "}
                  </PrivateRoute>
                }
              />
              <Route
                path="adminlivequiz"
                element={
                  <PrivateRoute
                    allowedrole={[RoleConstants.USER, RoleConstants.ADMIN]}
                  >
                    <AdminLiveQuiz />{" "}
                  </PrivateRoute>
                }
              />
              <Route
                path="logout"
                element={
                  <PrivateRoute
                    allowedrole={[RoleConstants.USER, RoleConstants.ADMIN]}
                  >
                    <LogOut />
                  </PrivateRoute>
                }
              />
              <Route index element={<Login />} />
              <Route path="register" element={<Register />} />
              <Route
                path="updateprofile"
                element={
                  <PrivateRoute
                    allowedrole={[RoleConstants.USER, RoleConstants.ADMIN]}
                  >
                    <UpdateProfile />
                  </PrivateRoute>
                }
              />
              <Route path="*" element={<NoPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </React.Suspense>
    </ErrorBoundary>
  );
}
// setup fake backend

configureFakeBackend();
ReactDOM.hydrate(
  <Provider store={store}>
    <React.StrictMode>
      <Index />
    </React.StrictMode>
  </Provider>,

  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
