import React from 'react';
import { Switch, Route } from 'react-router-dom';

import UserLogin from '../pages/UserLogin';

export const routes = [
  {
    name: 'UserLogin',
    path: '/',
    component: UserLogin,
  },
];

const Routes = () => {
  return (
    <Switch>
      {routes.map(({ component, path }) => {
        return <Route path={path} component={component} />;
      })}
    </Switch>
  );
};

export default Routes;
