import React from 'react';
import {Redirect, Route, Switch} from 'react-router-dom';
import Loadable from 'react-loadable';
import TopBarProgress from 'react-topbar-progress-indicator';

const Menu = Loadable({
  loader: () => import('./views/menu'),
  loading: TopBarProgress,
});

const Auth = Loadable({
  loader: () => import('./views/auth'),
  loading: TopBarProgress,
});

const Checkout = Loadable({
  loader: () => import('./views/checkout'),
  loading: TopBarProgress,
});

const Distributors = Loadable({
  loader: () => import('./views/distributors'),
  loading: TopBarProgress,
});

const Productos = Loadable({
  loader: () => import('./views/products'),
  loading: TopBarProgress,
});

const Ordenes = Loadable({
  loader: () => import('./views/orders'),
  loading: TopBarProgress,
});

const App = () => {
  return (
    <Switch>
      <Route exact path="/" component={Menu} />
      <Route path="/auth" component={Auth} />
      <Route exact path="/checkout" component={Checkout} />
      <Route exact path="/productos" component={Productos} />
      <Route exact path="/ordenes" component={Ordenes} />
      <Route exact path="/distribuidores" component={Distributors} />
      <Redirect to="/" />
    </Switch>
  );
};

export default App;
