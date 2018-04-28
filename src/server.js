/*
 * Copyright 2017 The boardgame.io Authors
 *
 * Use of this source code is governed by a MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 */

import path from 'path';
import KoaStatic from 'koa-static';
import KoaHelmet from 'koa-helmet';
import KoaWebpack from 'koa-webpack';
import WebpackConfig from './webpack.dev.js';
import { Server } from 'boardgame.io/server';
import {TurnExample} from './client/game/game';

const Game = TurnExample;

const PORT = process.env.PORT || 8000;
const DEV = process.env.NODE_ENV === 'development';
const PROD = !DEV;

const server = Server({ games: [Game] });

if (DEV) {
  server.app.use(
    KoaWebpack({
      config: WebpackConfig,
    })
  );
}

if (PROD) {
  server.app.use(KoaStatic(path.join(__dirname, 'dist')));
  server.app.use(KoaHelmet());
}
console.log(server.app.silent)
server.app.expose = true;
server.run(PORT, () => {
  console.log(`Serving at: http://localhost:${PORT}/`);
});

process.on("uncaughtException", exception => {
  console.log(exception)
})
process.on("unhandledRejection", err => {
  console.log(err.stack)
})