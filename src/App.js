import React from 'react';
import {Redirect, Route, Switch} from 'react-router-dom';
import Loadable from 'react-loadable';
import {useSelector} from 'react-redux';
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

const Products = Loadable({
  loader: () => import('./views/products'),
  loading: TopBarProgress,
});

const Orders = Loadable({
  loader: () => import('./views/orders'),
  loading: TopBarProgress,
});

const Turns = Loadable({
  loader: () => import('./views/turns'),
  loading: TopBarProgress,
});

function AuthIsLoaded() {
  const auth = useSelector((state) => state.firebase.auth);
  if (auth.isEmpty) return true;
  return false;
}

const App = () => {
  if (AuthIsLoaded()) {
    return (
      <Switch>
        <Route path="/auth" component={Auth} />
        <Redirect to="/auth" />
      </Switch>
    );
  }
  return (
    <Switch>
      <Route exact path="/" component={Menu} />
      <Route exact path="/checkout" component={Checkout} />
      <Route exact path="/productos" component={Products} />
      <Route exact path="/ordenes" component={Orders} />
      <Route exact path="/distribuidores" component={Distributors} />
      <Route exact path="/turnos" component={Turns} />
      <Redirect to="/" />
    </Switch>
  );
};

export default App;
