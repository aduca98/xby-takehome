import { useCallback, useEffect } from "react";
import { Route, Router, Switch } from "react-router-dom";
import { createBrowserHistory } from "history";
import { compose } from "lodash/fp";

import { FirebaseAuth } from "../utils";
import { useDispatch } from "react-redux";
import { fetchMe, logoutUser, setUserAuthStatus } from "redux/user";

// Screens
import Profile from "../screens/Profile";
import Signup from "../screens/Signup";
import Questions from "../screens/Questions";

const history = createBrowserHistory();

const Navigation = () => {
    const dispatch = useDispatch();

    const _logout = useCallback(async () => {
        await FirebaseAuth.signOut();
        dispatch(logoutUser());
    }, []);

    const _setUserAuthStatus = useCallback(
        compose(dispatch, setUserAuthStatus),
        []
    );

    const _fetchMe = useCallback(compose(dispatch, fetchMe), []);

    useEffect(() => {
        _setUserAuthStatus("NOT_LOADED");

        FirebaseAuth.onAuthStateChanged(async (u) => {
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
                    <Route exact component={Signup} path="/sign-up" />
                    <Route exact component={Questions} path="/questions" />
                    <Route exact component={Profile} path="/p/:username" />
                </Switch>
            </div>
        </Router>
    );
};

export { Navigation };
