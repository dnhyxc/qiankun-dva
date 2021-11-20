import React from 'react';
import {
  Route, Switch, routerRedux, Redirect,
} from 'dva/router';
import App from './routes/app';

const { ConnectedRouter } = routerRedux;

const RouterConfig = ({ history }: any) => {
  return (
    <ConnectedRouter history={history}>
      <Switch>
        <Route path="/dnhyxc/react" component={App} />
        <Route path="/dnhyxc" component={App} />
        <Redirect to="/dnhyxc/react" />
      </Switch>
    </ConnectedRouter>
  );
};

export default RouterConfig;
