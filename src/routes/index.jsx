import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';

import UserAppointment from '../pages/UserAppointment';
import UserSignUp from '../pages/UserSignUp';
import UserLogin from '../pages/UserLogin';
import UserDashboard from '../pages/UserDashboard';

export const routes = [
  {
    name: 'Login',
    path: '/',
    component: UserLogin,
    isPrivate: false,
  },
  {
    name: 'Agendamento',
    path: '/userAppointment',
    component: UserAppointment,
    isPrivate: true,
  },
  {
    name: 'Cadastro',
    path: '/userSignUp',
    component: UserSignUp,
    isPrivate: false,
  },
  {
    name: 'Dashboard',
    path: '/userDashboard',
    component: UserDashboard,
    isPrivate: true,
  },
];

const Routes = () => {
  return (
    <Switch>
      {routes.map(({ component, path, isPrivate }) => {
        return (
          <Route
            exact
            key={path}
            path={path}
            component={component}
            isPrivate={isPrivate}
          />
        );
      })}
    </Switch>
  );
};

export default Routes;
