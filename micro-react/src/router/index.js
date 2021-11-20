import React from 'react'
import { BrowserRouter as Router, Route, Switch, NavLink } from 'react-router-dom'
import App from '../App'
import Home from '../views/Home'
import About from '../views/About'

import './index.css'


const RouterConfig = ({ info }) => {
  return <div className="App">
    <App>
      <Router>
        <div className="menu">
          <NavLink to="/dnhyxc/react" exact className="link">to Home</NavLink>
          <NavLink to="/dnhyxc/react/about" className="link">to About</NavLink>
        </div>
        <Switch>
          <Route path="/dnhyxc/react" exact render={() => {
            return <Home info={info} />
          }}></Route>
          <Route path="/dnhyxc/react/about" component={About}></Route>
        </Switch>
      </Router>
    </App>
  </div>;
}

export default RouterConfig;
