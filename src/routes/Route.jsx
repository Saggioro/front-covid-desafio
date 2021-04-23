import React from 'react';
import { Route as ReactDOMRoute, Redirect } from 'react-router-dom';

import { useAuth } from '../hooks/auth';

const Route = ({ isPrivate = false, component: Component, ...rest }) => {
  const { name } = useAuth();

  return (
    <ReactDOMRoute
      {...rest}
      render={({ location }) => {
        return isPrivate === !!name ? (
          <Component />
        ) : (
          <Redirect
            to={{
              pathname: isPrivate ? '/' : '/userDashboard',
              state: { from: location },
            }}
          />
        );
      }}
    />
  );
};
export default Route;
