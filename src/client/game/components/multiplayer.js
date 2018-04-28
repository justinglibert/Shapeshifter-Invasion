/*
 * Copyright 2018 The boardgame.io Authors.
 *
 * Use of this source code is governed by a MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 */

import React from 'react';
import { Client } from 'boardgame.io/react';
import {SpaceGame, TurnExample} from '../game';
import SpaceBoard from './board';
import { Button, Intent, Spinner } from "@blueprintjs/core";
const MySpinner = <Spinner intent={Intent.PRIMARY} />;
const Game = TurnExample
const App = Client({
  game: Game,
  board: SpaceBoard,
  multiplayer: true,
  debug: true,
  numPlayers: 2
});

const Multiplayer = ({match}) => (
    <App playerID={match.params.id} />
);

export default Multiplayer;
