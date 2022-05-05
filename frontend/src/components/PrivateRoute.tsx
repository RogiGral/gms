import React from 'react';
// import AuthService from './Services/AuthService'
import { Redirect, Route } from 'react-router-dom';
import { useAppSelector } from '../reduxHooks';

interface Props {
  component: React.ComponentClass;
}

const PrivateRoute = ({ component: Component, ...rest }: Props) => {
  const user = useAppSelector(state => state.auth.user);
  const isLoggedIn = Boolean(user);

  return (
    <Route
      {...rest}
      render={props =>
        isLoggedIn ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{ pathname: '/login', state: { from: props.location } }}
          />
        )
      }
    />
  );
};

export default PrivateRoute;
