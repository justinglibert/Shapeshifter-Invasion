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
//      player: 0,
//      room: 0
//  }
const getNumberOfAlivePlayers = G => {
    return G.players.filter(p => {
        return p.alive;
    }).length;
};

const findNextAlivePlayer = G => {
    return G.players.findIndex(p => {
        return p.alive;
    })
};
const TurnExample = Game({
    name: 'turnorder',
    setup: () => ({
        spaceship: {
            resources: [
                {
                    name: 'water',
                    amount: '7'
                },
                {
                    name: 'oxygen',
                    amount: '5'
                }
            ]
        },
        rooms: [
            {
                name: 'Kitchen',
                deadly: true,
                items: [
                    {
                        id: 'screwdriver',
                        name: 'Screwdriver'
                    }
                ]
            },
            {
                name: 'Engine',
                deadly: false,
                items: [
                    {
                        id: 'screwdriver',
                        name: 'Screwdriver'
                    }
                ]
            }
        ],
        roomBeingVisited: undefined,
        problems: [
            {
                active: true,
                name: 'oxygen leak',
                description: 'oxygen leaks every turn',
                solutions: ['screwdriver'],
                affected: 'oxygen',
                decreaseRate: 10
            }
        ],
        proposals: [],
        items: [
            {
                id: 'screwdriver2',
                name: 'Screwdriver2'
            }
        ],
        players: [
            {
                name: 'Player 1',
                alive: true
            },
            {
                name: 'Player 2',
                alive: true
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
        },
        pickUpItems(G, ctx, items) {
            //Items is an array of id
            console.log('ItemsPicked');
            ctx.events.endPhase('propose');
            let newG = { ...G };
            let newItems = newG.roomBeingVisited.items.filter(i => {
                console.log('ItemInRoom: ' + JSON.stringify(i));
                console.log('SelectionOfItems: ' + items);
                console.log('HasBeenSelected: ' + items.includes(i.id));
                return items.includes(i.id);
            });
            console.log('NewItems: ' + JSON.stringify(newItems));
            newG.items = [...newG.items, ...newItems];
            console.log('FinalItems: ' + JSON.stringify(newG.items));
            newG.roomBeingVisited = undefined;
            return newG;
        }
    },
    flow: {
        turnOrder: {
            first: () => 0, 
            next: (G, ctx) => {
                let index = ctx.playOrderPos + 1;
                let alive = G.players[index % ctx.numPlayers].alive;
                while (!alive) {
                    index++;
                    alive = G.players[index % ctx.numPlayers].alive;
                }
                console.log(alive, index % ctx.numPlayers, G.players[index % ctx.numPlayers].name)
                return index % ctx.numPlayers;
            } 
        },
        onTurnBegin: (G, ctx) =>{
                if(G.players[ctx.currentPlayer].alive === false){
                    ctx.event.endTurn()
                }
                return G
            },
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
                    return G.proposals.length === getNumberOfAlivePlayers(G);
                }
            },
            {
                name: 'vote',
                allowedMoves: ['vote', 'endTurn', 'endPhase'],
                endTurnIf: (G, ctx) => {
                    let t = G.proposals.filter(p => {
                        //console.log(p)
                        return (
                            p.voters.filter(v => v === ctx.currentPlayer)
                                .length !== 0
                        );
                    });
                    return t.length != 0;
                },
                endPhaseIf: (G, ctx) => {
                    let numberOfPlayersWhoVoted = 0;
                    G.proposals.forEach(p => {
                        numberOfPlayersWhoVoted += p.voters.length;
                    });
                    if (
                        numberOfPlayersWhoVoted >= getNumberOfAlivePlayers(G)
                    ) {
                        return true;
                    }
                    return false;
                }
            },
            {
                name: 'resolve',
                allowedMoves: ['endTurn', 'endPhase', 'pickUpItems'],
                onPhaseBegin: (G, ctx) => {
                    console.log(0);
                    let mostVotedProposal = G.proposals.sort((a, b) => {
                        return a.voters.length < b.voters.length;
                    })[0];
                    console.log(
                        'Chosen Proposal:\n' +
                            JSON.stringify(mostVotedProposal.proposal)
                    );
                    let newG = {
                        ...G
                    };
                    switch (mostVotedProposal.proposal.type) {
                        case 'SEND':
                            let { player, room } = mostVotedProposal.proposal;
                            if (G.rooms[room].deadly) {
                                newG.players[player].alive = false;
                                ctx.events.endPhase('propose');
                                ctx.events.endTurn(findNextAlivePlayer(newG))
                                return newG;
                            } else {
                                console.log('Visiting a Room');
                                ctx.events.endTurn(player);
                                newG.roomBeingVisited = {
                                    ...G.rooms[room]
                                };
                                return newG;
                            }
                        case 'THROW':
                            let deadPlayer = mostVotedProposal.proposal.player;
                            newG.players[deadPlayer].alive = false;
                            ctx.events.endPhase('propose');
                            ctx.events.endTurn(findNextAlivePlayer(newG))
                            return newG;
                        case 'FIX':
                            let { problemId } = mostVotedProposal.proposal;
                            let problem = newG.problems[problemId];
                            let canFix = true;
                            problem.solutions.forEach(s => {
                                console.log('s: ' + s);
                                if (
                                    newG.items.filter(i => {
                                        //console.log("items: " + JSON.stringify(i))
                                        return i.id === s;
                                    }).length < 1
                                ) {
                                    canFix = false;
                                }
                            });
                            console.log('CanFix: ' + canFix);
                            if (canFix) {
                                newG.problems[problemId].active = false;
                            }
                            ctx.events.endPhase('propose');
                            ctx.events.endTurn(findNextAlivePlayer(newG))
                            return newG;
                        default:
                            console.error('This action does not exist');
                            ctx.events.endPhase('propose');
                            ctx.events.endTurn(findNextAlivePlayer(newG))
                            return newG;
                    }
                },
                endPhaseIf: (G, ctx) => {
                    return G.roomBeingVisited === undefined;
                },
                onPhaseEnd: (G, ctx) => {
                    let newG = {
                        ...G
                    };
                    newG.proposals = [];
                    newG.roomBeingVisited = undefined;
                    return newG;
                }
                //Use that when multiple people will be travelling
                // onTurnEnd: (G,ctx) => {
                //   let newG = {
                //         ...G
                //   }
                //   ctx.events.endPhase('propose')
                //   return newG
                // }
            }
        ]
    }
});

export { TurnExample };
