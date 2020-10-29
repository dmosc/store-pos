import React from 'react';
import {Redirect, Route, Switch} from 'react-router-dom';
import Loadable from 'react-loadable';
import TopBarProgress from 'react-topbar-progress-indicator';

/* webpackChunkName: "Checkout" */
const Checkout = Loadable({
  loader: () => import('./views/checkout'),
  loading: TopBarProgress,
});

const Distributors = Loadable({
  loader: () => import('./views/distributors'),
  loading: TopBarProgress,
});

const App = () => {
  return (
    <Switch>
      <Route exact path="/checkout" component={Checkout} />
      <Route exact path="/distribuidores" component={Distributors} />
      <Redirect to="/checkout" />
    </Switch>
  );
};

export default App;
