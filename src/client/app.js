/*
 * Copyright 2017 The boardgame.io Authors.
 *
 * Use of this source code is governed by a MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 */

import React from 'react';
import './index.scss';
import { HashRouter as Router, Route } from 'react-router-dom';
import _ from 'lodash';

import routes from './routes';
import './app.css';

const App = () => (
  <Router>
    <div>
        {_.flattenDeep(routes.map(route => route.routes)).map((route, idx) => (
          <Route
            key={idx}
            exact
            path={route.path}
            component={route.component}
          />
        ))}
        </div>
  </Router>
);

export default App;
