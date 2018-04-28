/*
 * Copyright 2018 The boardgame.io Authors
 *
 * Use of this source code is governed by a MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 */

import { Game } from 'boardgame.io/core';

/*
 * Copyright 2018 The boardgame.io Authors
 *
 * Use of this source code is governed by a MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 */


 //Proposals
//  let a = {
//      type: 'SEND',
//      who: 0,
//      where: 
//  }
const TurnExample = Game({
    name: 'turnorder',

    setup: () => ({
        rooms: [
            {
                name: 'Kitchen',
                deadly
            }
        ],
        proposals: [],
        players: [
            {
                name: 'Player 1',
                actions: 0
            },
            {
                name: 'Player 2',
                actions: 0
            },
            {
                name: 'Player 3',
                actions: 0
            }
        ]
    }),

    moves: {
        propose(G, ctx, proposal) {
            let newG = {
                ...G
            };
            newG.proposals.push({
                proposal,
                player: ctx.currentPlayer,
                voters: []
            });
            return newG;
        },
        vote(G, ctx, proposalId) {
            let newG = {
                ...G
            };
            newG.proposals[proposalId].voters.push(ctx.currentPlayer);
            return newG;
        }
    },
    flow: {
        phases: [
            {
                name: 'propose',
                allowedMoves: ['propose', 'endTurn', 'endPhase'],
                endTurnIf: (G, ctx) => {
                    return (
                        G.proposals.filter(p => {
                            return p.player == ctx.currentPlayer;
                        }).length != 0
                    );
                },
                endPhaseIf: (G, ctx) => {
                    return G.proposals.length === ctx.numPlayers;
                }
            },
            {
                name: 'vote',
                allowedMoves: ['vote', 'endTurn', 'endPhase'],
                endTurnIf: (G, ctx) => {
                      let t = G.proposals.filter(p => {
                          console.log(p)
                          return p.voters.filter((v)=>v === ctx.currentPlayer).length !== 0
                      })
                    return t.length != 0;
                },
                endPhaseIf: (G, ctx) => {
                    let numberOfPlayersWhoVoted = 0;
                    G.proposals.forEach((p)=>{
                        numberOfPlayersWhoVoted += p.voters.length
                    })
                    if(numberOfPlayersWhoVoted === ctx.numPlayers){
                      return true
                    }
                      return false
                }
            },
            {
                name: 'resolve',
                allowedMoves: ['endTurn', 'endPhase'],
                onPhaseBegin: (G,ctx) => {
                console.log(0)
                  let mostVotedProposal = G.proposals.sort((p)=>{
                      return p.voters.length
                  })[0]
                  console.log(mostVotedProposal.proposal);
                  if(mostVotedProposal.proposal === 0){
                    //Put in the array the people who have to do something to resolve the action. He has too call endPhase to go back to propose
                    ctx.events.changeActionPlayers(['1']);
                    return G
                  } else if (mostVotedProposal.proposal === 1){
                    ctx.events.endPhase('propose');
                    return G
                  } else {
                    return G
                  }
                },
                onPhaseEnd: (G,ctx) => {
                  let newG = {
                    ...G
                  }
                  newG.proposals = []
                  return newG
                },
                onTurnEnd: (G,ctx) => {
                  ctx.events.endPhase('propose')
                }
            }
        ]
    }
});

export { TurnExample };
