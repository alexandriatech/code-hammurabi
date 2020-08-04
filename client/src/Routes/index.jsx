import React, { useContext, useRef } from "react";
import { Switch, Route, useLocation, matchPath } from "react-router-dom";
import { SwitchTransition, CSSTransition } from "react-transition-group";
import { UserContext } from "components-app/UserContextProvider";
import { ThemeContext } from "components-shared/ThemeContextProvider";
// josue: might use later so leaving it here
// import AuthenticatedRoute from "components-app/AuthenticatedRoute";
import About from "./About";
import Home from "./Home";
import Login from "./Login";
import Share from "./Share";
import Tag from "./Tag";
import UserWords from "./UserWords";
import Word from "./Word";
// import ProtectedRoute from "./ProtectedRoute";
// import PublicRoute from "./PublicRoute";
import NoMatch from "./NoMatch";
import Navbar from "components-shared/Navbar";
import { useEffect } from "react";

const ROUTES = (isAuthenticated) => [
  {
    exact: true,
    path: "/",
    Component: Home,
    title: "Home",
  },
  {
    exact: true,
    path: "/word/:word",
    Component: Word,
    title: "Word Id",
  },
  {
    exact: true,
    path: "/tag/:tag",
    Component: Tag,
    title: "Tag",
  },
  {
    exact: true,
    path: "/share/:id",
    Component: Share,
    title: "Share",
  },
  {
    exact: true,
    path: "/user/:id",
    Component: UserWords,
    title: "User",
  },
  {
    exact: true,
    path: "/about",
    Component: About,
    title: "About",
  },
  {
    exact: true,
    path: "/login",
    Component: Login,
    title: "Login",
  },
  {
    exact: true,
    path: "/*",
    Component: NoMatch,
    title: "404",
  },
];

// a list of all routes that use alt themes
const altThemeRoutes = ["/login", "/share/:id", "/about"];

const Routes = () => {
  const { user } = useContext(UserContext);
  const { setTheme } = useContext(ThemeContext);
  const location = useLocation();
  const routes = ROUTES(true);
  const nodeRef = useRef(null);

  useEffect(() => {
    const isMatchAltTheme = matchPath(location.pathname, {
      path: altThemeRoutes,
    });
    if (isMatchAltTheme) setTheme("alt");
    else setTheme("default");
  }, [location, setTheme]);

  return (
    <>
      <Navbar />
      <SwitchTransition>
        {/* josue: page transitions should only be scoped for each page 
        because we are using css modules. although the transitions are similar the components may not be
        (plus css moduldes).
        using this everything page has a timeout so that means every page must have a transition
        */}
        <CSSTransition
          key={location.pathname}
          timeout={300}
          classNames="page"
          nodeRef={nodeRef}
          appear
        >
          <Switch location={location}>
            {routes.map(({ Component, ...routeProps }, i) => (
              <Route key={routeProps.path} {...routeProps}>
                <div ref={nodeRef}>
                  <Component />
                </div>
              </Route>
            ))}
          </Switch>
        </CSSTransition>
      </SwitchTransition>
    </>
  );
};

export default Routes;
