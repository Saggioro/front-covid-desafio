import React from 'react';
import { Switch, Route } from 'react-router-dom';

import UserAppointment from '../pages/UserAppointment';
import UserLogin from '../pages/UserLogin';

export const routes = [
  {
    name: 'Login',
    path: '/',
    component: UserLogin,
  },
  {
    name: 'Agendamento',
    path: '/userAppointment',
    component: UserAppointment,
  },
];

const Routes = () => {
  return (
    <Switch>
      {routes.map(({ component, path }) => {
        return <Route exact key={path} path={path} component={component} />;
      })}
    </Switch>
  );
};

export default Routes;
