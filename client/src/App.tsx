import React, { useEffect } from 'react';
import { Switch, Route, BrowserRouter, Redirect } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import LoginPage from 'src/pages/LoginPage';
import RegisterPage from 'src/pages/RegisterPage';
import { useAppDispatch, useAppSelector } from './reduxHooks';
import Session from './api/Session';
import jwtDecode from 'jwt-decode';
import { useMutation } from 'react-query';
import Api from './api/Api';
import { loadUser } from './reducers/authReducer';
import ForgotPasswordPage from './pages/ForgotPasswordPage';

function App() {
  const user = useAppSelector(state => state.auth.user);
  const dispatch = useAppDispatch();

  const fetchUserMutation = useMutation(
    ({ username }: { username: string }) => {
      return Api.Auth.fetchUser(username);
    },
    {
      onSuccess: data => {
        dispatch(loadUser(data));
      },
    },
  );

  useEffect(() => {
    const token = Session.getSessionToken();

    if (token) {
      const hasExpired = Session.checkIfTokenExpired();

      if (hasExpired) {
        Session.clearSession();
        toast.error('Session has expired.');
      } else {
        const decoded = jwtDecode(token);

        // @ts-ignore // decoded.sub contains username (at least for now)
        fetchUserMutation.mutate({ username: decoded.sub });
      }
    }
  }, []);

  const renderUnauthorizedRoutes = () => {
    return (
      <>
        <Route exact path="/login" component={LoginPage} />
        <Route exact path="/register" component={RegisterPage} />
        <Route exact path="/forgot-password" component={ForgotPasswordPage} />
        <Redirect from="*" to="/login" />
      </>
    );
  };

  const renderAuthorizedRoutes = () => {
    return (
      <>
        <Redirect exact from="/login" to="/" />
        <Redirect exact from="/register" to="/" />
        <Route exact path="/" component={() => <div>Authorized!</div>} />
      </>
    );
  };

  return (
    <>
      <BrowserRouter>
        <Switch>
          {user ? renderAuthorizedRoutes() : renderUnauthorizedRoutes()}
        </Switch>
      </BrowserRouter>
      <ToastContainer position="top-center" />
    </>
  );
}

export default App;
