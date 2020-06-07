import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Loader from '../components/loader';
import ContextProvider from '../context';
const Home = lazy(() => import('../pages/Home'));
const User = lazy(() => import('../pages/User'));
const Repo = lazy(() => import('../pages/Repo'));
const NotFound = lazy(() => import('../pages/NotFound'));

export const Routes = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<Loader fullPage />}>
        <ContextProvider>
          <Switch>
            <Route path="/" exact={true} component={Home} />
            <Route path="/user/:userName" exact={true} component={User} />
            <Route path="/user/:userName/repo/:repoName" exact={true} component={Repo} />
            <Route path="/page-not-found" exact={true} component={NotFound} />
            {/* <Redirect path="*" to="/page-not-found" /> */}
          </Switch>
        </ContextProvider>
      </Suspense>
    </BrowserRouter>
  );
};

export default Routes;
