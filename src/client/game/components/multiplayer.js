/*
 * Copyright 2018 The boardgame.io Authors.
 *
 * Use of this source code is governed by a MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 */

import React from 'react';
import { Client } from 'boardgame.io/react';
import SpaceGame from '../game';
import SpaceBoard from './board';
import { Button, Intent, Spinner } from "@blueprintjs/core";
const MySpinner = <Spinner intent={Intent.PRIMARY} />;
const App = Client({
  game: SpaceGame,
  board: SpaceBoard,
  multiplayer: true,
  debug: true,
});

const Multiplayer = () => (
  <div style={{ padding: 50 }}>
    <App playerID="0" />
  </div>
);

export default Multiplayer;
