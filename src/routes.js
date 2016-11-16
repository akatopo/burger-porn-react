import React from 'react';
import { Route } from 'react-router';
import Layout from './layout';

const identity = (x) => x;

const routes = (devToolsWrapper = identity) => (
  <Route path="/" component={devToolsWrapper(Layout)}>
    <Route path="burgers/:id" component={devToolsWrapper(Layout)} />
  </Route>
);
routes.displayName = 'Routes';

export default routes;
