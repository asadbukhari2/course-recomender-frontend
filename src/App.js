import React, { useState, useEffect, useRef, Suspense } from "react";

import { Redirect, Route, Switch, withRouter } from "react-router-dom";

import { useStore } from "./hooks-store/store";
import { VerifyUser } from "./services/authService";
import { getCurrentUser } from "./services/authService";

import Layout from "./hoc/Layout/Layout";
import MainView from "./containers/MainView/MainView";
import Logout from "./containers/Auth/Logout/Logout";
import SignUp from "./containers/Auth/SignUp/SignUp";
import SignIn from "./containers/Auth/SignIn/SignIn";
import Spinner from "./components/UI/Spinner/Spinner";

const Courses = React.lazy(() => {
  return import("./components/Courses/Courses");
});
const Dashboard = React.lazy(() => {
  return import("./components/Dashboard/Dashboard");
});

const DegreeSemester = React.lazy(() => {
  return import("./containers/DegreeSemester/DegreeSemester");
});

const MyCart = React.lazy(() => {
  return import("./containers/MyCart/MyCart");
});

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const dispatch = useStore(true)[1];
  const state = useStore()[0];

  const _Mounted = useRef(true);

  useEffect(() => {
    if (_Mounted.current === true) {
      if (localStorage.getItem("user")) {
        VerifyUser().then((response) => {
          if (_Mounted.current) {
            if (response) {
              setIsAuthenticated(response);
              dispatch("AUTH_SUCCESS", getCurrentUser().token);
            } else {
              // if (localStorage.getItem("cart")) {
              // 	const oldCart = JSON.parse(localStorage.getItem("cart"));
              // 	dispatch("FETCH_CART", oldCart);
              // }
              setIsAuthenticated(false);
              localStorage.removeItem("user");
            }
          }
        });
      }
      // else if (localStorage.getItem("cart")) {
      // 	const oldCart = JSON.parse(localStorage.getItem("cart"));
      // 	dispatch("FETCH_CART", oldCart);
      // 	setIsAuthenticated(false);
      // }
      else {
        setIsAuthenticated(false);
      }

      return () => {
        _Mounted.current = false;
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [VerifyUser]);

  useEffect(() => {
    console.log(isAuthenticated);
    if (isAuthenticated) {
      if (localStorage.getItem("cart")) {
        const isLocalCart = JSON.parse(localStorage.getItem("cart"));
        dispatch("FETCH_CART", isLocalCart);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated]);

  let routes = (
    <Switch>
      <Route path={"/auth"} render={(props) => <SignIn />} />
      <Route path={"/sign_up"} render={(props) => <SignUp />} />
      <Route path={"/"} exact component={MainView} />
      <Redirect to={"/"} />
    </Switch>
  );

  if (isAuthenticated) {
    routes = (
      <Switch>
        <Route path={"/"} exact component={MainView} />
        <Route path={"/courses"} render={(props) => <Courses {...props} />} />
        <Route
          path={"/degree_semester"}
          render={(props) => <DegreeSemester {...props} />}
        />
        <Route path={"/cart"} render={(props) => <MyCart {...props} />} />
        <Route path={"/logout"} component={Logout} />
        <Route path={"/dashboard"} exact component={Dashboard} />
        <Redirect to={"/"} />
      </Switch>
    );
  }

  return (
    <div>
      <Layout isAuthenticated={isAuthenticated}>
        {console.log("global State in app.js", state)}
        <Suspense fallback={<Spinner />}>{routes}</Suspense>
      </Layout>
    </div>
  );
}

export default withRouter(App);
