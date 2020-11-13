import React from 'react';
import {Redirect, Route, Switch} from 'react-router-dom';
import Loadable from 'react-loadable';
import TopBarProgress from 'react-topbar-progress-indicator';

const Login = Loadable({
  loader: () => import('./login'),
  loading: TopBarProgress,
});

const Auth = () => {
  return (
    <Switch>
      <Route path="/auth/login" component={Login} />
      <Route path="/auth/registro" component={Login} />
      <Redirect to="/auth/login" />
    </Switch>
  );
};

export default Auth;
