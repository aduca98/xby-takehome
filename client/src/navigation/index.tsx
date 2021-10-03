import { useCallback, useEffect } from "react";
import { Route, Router, Switch, Redirect } from "react-router-dom";
import { createBrowserHistory } from "history";
import { compose } from "lodash/fp";

import { auth, FirebaseAuth } from "src/utils";
import { useDispatch } from "react-redux";
import { fetchMe, logoutUser, setUserAuthStatus } from "src/redux/user";

// Screens
import Profile from "src/screens/Profile";
import Signup from "src/screens/Signup";
import Questions from "src/screens/Questions";

const history = createBrowserHistory();

const Navigation = () => {
    const dispatch = useDispatch();

    const _logout = useCallback(async () => {
        await auth.signOut(FirebaseAuth);
        dispatch(logoutUser());
    }, []);

    const _setUserAuthStatus = useCallback(
        compose(dispatch, setUserAuthStatus),
        []
    );

    const _fetchMe = useCallback(compose(dispatch, fetchMe), []);

    useEffect(() => {
        _setUserAuthStatus("NOT_LOADED");

        auth.onAuthStateChanged(FirebaseAuth, async (u) => {
            if (u) {
                _setUserAuthStatus("LOGGED_IN");
                _fetchMe();
            } else {
                _setUserAuthStatus("NOT_LOGGED_IN");
            }
        });
    }, []);

    return (
        <Router history={history}>
            <div style={{ height: "100%", width: "100%" }} id="go__container">
                <Switch>
                    <Route
                        exact
                        path="/logout"
                        component={() => {
                            void _logout();
                            return <div> Logging Out... </div>;
                        }}
                    />
                    <Redirect exact path="/" to="/sign-up" />
                    <Route exact component={Signup} path="/sign-up" />
                    <Route exact component={Questions} path="/questions" />
                    <Route exact component={Profile} path="/p/:username" />
                </Switch>
            </div>
        </Router>
    );
};

export { Navigation };
