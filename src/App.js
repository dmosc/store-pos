import React from 'react';
import {Redirect, Route, Switch} from 'react-router-dom';
import Loadable from 'react-loadable';
import TopBarProgress from 'react-topbar-progress-indicator';
// import Layout from 'components/layout'

/* webpackChunkName: "Checkout" */
const Checkout = Loadable({
  loader: () => import('./views/checkout'),
  loading: TopBarProgress,
});

const Distribuidores = Loadable({
  loader: () => import('./views/distribuidores'),
  loading: TopBarProgress,
});

const App = () => {
  return (
    <Switch>
      <Route exact path="/checkout" component={Checkout} />
      <Route exact path="/distribuidores" component={Distribuidores} />
      <Redirect to="/checkout" />
    </Switch>
  );
};

export default App;
