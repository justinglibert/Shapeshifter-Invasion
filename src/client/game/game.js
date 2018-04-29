/*
 * Copyright 2018 The boardgame.io Authors
 *
 * Use of this source code is governed by a MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 */

import { Game } from 'boardgame.io/core';
import {
    Intent,
} from "@blueprintjs/core";

import _ from 'lodash';
import {ProblemData, ItemData, StatusData, Rooms} from './texts'
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
    });
};

const announce = (G, message, intent) => {
    G.announcement.message = message
    G.announcement.intent = intent
    G.announcement.icon = 'delta'
    return  G 
}  

const generateNewGameEnvironment = () => {
    console.log("Generating the env")
    const numberOfProblems = 4
    const numberOfDangerousRoom = 4
    let problems = _.sampleSize(ProblemData, numberOfProblems)
    console.log(problems)
    problems = problems.map((p) => {
        return {
            ...p,
            active: true
        }
    })
    console.log(problems)
    let solutions = problems.map(p => p.solutions)
    solutions = _.flatten(solutions)
    console.log(solutions)
    let items = solutions.map(s => ItemData.find(i => i.id === s))
    console.log(items)
    let roomsUnpopulated = _.sampleSize(Rooms, items.length + numberOfDangerousRoom)
    console.log(roomsUnpopulated)
    //Populate rooms
    let rooms = items.map((item, i) => {return {
        name: roomsUnpopulated[i],
        items: [item]
    }})
    let i = rooms.length
    while(rooms.length < roomsUnpopulated.length) {
        rooms.push({
            name: roomsUnpopulated[i],
            items: [],
            deadly: true
        })
        i++
    }
    return {
        problems: problems,
        spaceship: {
            resources: StatusData
        },
        rooms: rooms
    }

}

const inflictDamageToSpaceship = (spaceship, problems)=> {
    console.log("Damaging the spaceship")
    let newResources = spaceship.resources
    spaceship.resources.forEach((r, i)=>{
        let malus = 0
        problems.filter(p => p.active).filter(p => p.affected === r.id).forEach((p)=>{
            malus += p.decreaseRate
        })
        console.log("Malus: ", malus)
        newResources[i].value = newResources[i].value - malus
    })
    return newResources 
}

const data = generateNewGameEnvironment()
const numberOfAliens = 1;
let players = [
    {
        id: 0,
        name: 'Player 1',
        alive: true,
        hasDoneTutorial: false
    },
    {
        id: 1,
        name: 'Player 2',
        alive: true,
        hasDoneTutorial: false
    },
    {
        id: 2,
        name: 'Player 3',
        alive: true,
        hasDoneTutorial: false
    },
    {
        id: 3,
        name: 'Player 4',
        alive: true,
        hasDoneTutorial: false
    },
]

let nmbrAliens = 0
while(nmbrAliens < numberOfAliens){
    console.log("loop")
    let id= Math.floor(Math.random()*(players.length - 1))
    if(!players[id].aliens) {
        console.log("increment")
        players[id].aliens = true
        nmbrAliens++
        continue
    } else {
        continue
    }
}
const TurnExample = Game({
    name: 'turnorder', 
    setup: () => ({
        shouldHarmShip: false,
        announcement: {}, 
        ...data,
        roomBeingVisited: undefined,
        proposals: [],
        items: [{
            id: 'drone',
            name: 'RECON Drone X7'
        }],
        players: [...players]
    }),

    moves: {
        completeTutorial(G, ctx) {
            let newG = { ...G}
            newG.players[ctx.currentPlayer].hasDoneTutorial = true
            return newG
        },
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
            let roomId = newG.rooms.findIndex((r) => r.name === newG.roomBeingVisited.name)
            console.log(roomId)
            let newItemsForRoom = newG.rooms[roomId].items.filter(i => {
                return !items.includes(i.id);
            });
            console.log(newItemsForRoom)
            newG.rooms[roomId].items = newItemsForRoom;
            console.log('NewItems: ' + JSON.stringify(newItems));
            newG.items = [...newG.items, ...newItems];
            console.log('FinalItems: ' + JSON.stringify(newG.items));
            newG.roomBeingVisited = undefined;
            return newG;
        }
    },
    flow: {
        turnOrder: {
            first: (G) => {
                return findNextAlivePlayer(G)
            },
            next: (G, ctx) => {
                let index = ctx.playOrderPos + 1;
                let alive = G.players[index % ctx.numPlayers].alive;
                while (!alive) {
                    index++;
                    alive = G.players[index % ctx.numPlayers].alive;
                }
                console.log(
                    alive,
                    index % ctx.numPlayers,
                    G.players[index % ctx.numPlayers].name
                );
                return index % ctx.numPlayers;
            }
        },
        phases: [
            {
                name: 'propose',
                allowedMoves: ['propose', 'endTurn', 'endPhase', 'completeTutorial'],
                onTurnBegin: (G, ctx) => {
                    let newG = {
                        ...G
                    }
                    console.log("Should we infect damage? : " + (newG.shouldHarmShip))
                    if(newG.shouldHarmShip){
                        newG.spaceship.resources = inflictDamageToSpaceship(newG.spaceship, newG.problems)
                        newG.shouldHarmShip = false
                        newG = announce(newG, `The spaceship has been damaged`, Intent.DANGER)
                        console.log("Inflected damage: " + JSON.stringify(newG.spaceship.resources))
                    }
                    return newG
                },
                endTurnIf: (G, ctx) => {
                    G.proposals.filter(p => {
                        return p.player == ctx.currentPlayer;
                    }).length != 0
                        ? console.log('Ending Turn Propose')
                        : undefined;
                    return (
                        G.proposals.filter(p => {
                            return p.player == ctx.currentPlayer;
                        }).length != 0
                    );
                },
                endPhaseIf: (G, ctx) => {
                    G.proposals.length === getNumberOfAlivePlayers(G)
                        ? console.log('Ending Phase Propose')
                        : undefined;
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
                    t.length != 0 ? console.log('Ending Turn Vote') : undefined;
                    return t.length != 0;
                }, 
                endPhaseIf: (G, ctx) => {
                    let numberOfPlayersWhoVoted = 0;
                    G.proposals.forEach(p => {
                        numberOfPlayersWhoVoted += p.voters.length;
                    });
                    if (numberOfPlayersWhoVoted >= getNumberOfAlivePlayers(G)) {
                        console.log('Ending Phase Vote');
                        return true;
                    }
                    return false;
                }
            },
            {
                name: 'resolve',
                allowedMoves: ['endTurn', 'endPhase', 'pickUpItems'],
                onPhaseBegin: (G, ctx) => {
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
                                announce(newG, `${newG.players[player].name} dissapeared`, Intent.DANGER)
                                ctx.events.endPhase('propose');
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
                            newG = announce(newG, `${newG.players[deadPlayer].name} has been thrown in Space`, Intent.DANGER)
                            ctx.events.endPhase('propose');
                            return newG;
                        case 'PROBE':
                            let roomToProbe = mostVotedProposal.proposal.room
                            if (G.rooms[roomToProbe].deadly) {
                                newG = announce(newG, `${G.rooms[roomToProbe].name} is dangerous! Unfortunately, the probe has been destroyed in the process`, Intent.WARNING)
                                let indexOfFirstProbe = newG.items.findIndex((i)=> i.id ='drone')
                                console.log("indexOfFirstProbe ", indexOfFirstProbe)
                                newG.items = newG.items.filter((item, i) => i !== indexOfFirstProbe)
                                console.log(newG.items)
                                ctx.events.endPhase('propose');
                                return newG;
                            } else {
                                newG = announce(newG, `${newG.rooms[roomToProbe].name} is Safe !`, Intent.SUCCESS)
                                ctx.events.endPhase('propose');
                                return newG;
                            }
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
                                newG = announce(newG, `${newG.problems[problemId].name} has been fixed!`, Intent.SUCCESS)
                                newG.problems[problemId].active = false;
                            } else {
                                newG = announce(newG, `You didn't succeed to fix ${newG.problems[problemId].name}`, Intent.WARNING)
                            }
                            ctx.events.endPhase('propose');
                            return newG;
                        default:
                            console.error('This action does not exist');
                            ctx.events.endPhase('propose');
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
                    console.log("Setting should harm ship")
                    newG.shouldHarmShip = true;
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
