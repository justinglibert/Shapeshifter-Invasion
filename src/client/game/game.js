/*
 * Copyright 2018 The boardgame.io Authors
 *
 * Use of this source code is governed by a MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 */

import { Game } from 'boardgame.io/core';


const SpaceGame = Game({
  name: 'space',

  setup: () => ({
    proposals: []
  }),

  moves: {
    propose(G, ctx, proposal) {
      let newG = {
        ...G
      }
      newG.proposals.push({
        proposal,
        player: ctx.currentPlayer
      })
      return newG
    },
  },

  flow: {
    phases: [
      {
        name: 'propose',
        allowedMoves: ['propose'],
        endPhaseIf: (G, ctx) => {
          console.log(ctx.currentPlayer)
          console.log(JSON.stringify(G))
          console.log(
            G.proposals.filter((p)=>{
              p.player == ctx.currentPlayer
            }).length
          )
          return G.proposals.filter((p)=>{
            p.player == ctx.currentPlayer
          }).length != 0
        }
      }
    ],
    endGameIf: G => {
    },
  },
});

export default SpaceGame;
