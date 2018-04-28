/*
 * Copyright 2018 The boardgame.io Authors.
 *
 * Use of this source code is governed by a MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 */

import Multiplayer from './components/multiplayer';

const routes = [
  {
    path: '/game/:id',
    text: 'Multiplayer',
    component: Multiplayer,
  },
];

export default routes;
