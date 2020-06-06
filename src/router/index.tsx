import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import Loader from '../components/loader';
const Home = lazy(() => import('../pages/Home'));
const NotFound = lazy(() => import('../pages/NotFound'));

export const Routes = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<Loader />}>
        <Switch>
          <Route path="/" exact={true} component={Home} />
          <Route path="/page-not-found" exact={true} component={NotFound} />
          <Redirect path="*" to="/page-not-found" />
        </Switch>
      </Suspense>
    </BrowserRouter>
  );
};

export default Routes;
