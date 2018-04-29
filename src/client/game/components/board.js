/*
 * Copyright 2018 The boardgame.io Authors.
 *
 * Use of this source code is governed by a MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 */

import React from 'react';
import PropTypes from 'prop-types';

import Player from './ui/player';
import Item from './ui/item';
import Items from './ui/items';
import Players from './ui/players';
import Status from './ui/status';
import ShipStatus from './ui/shipStatus';
import Problem from './ui/problem';
import Problems from './ui/problems';
import Proposition from './ui/proposition';
import Propositions from './ui/propositions';
import Choice from './ui/choice';
import ChooseItems from './ui/chooseItems';
import AlienInfo from './ui/alienInfo';
import Mappo from './ui/mappo';
import Tutorial from './ui/tutorial';
import Win from './ui/win';


import { Toast, Toaster, Button } from "@blueprintjs/core";

class Board extends React.Component {
    static propTypes = {
        G: PropTypes.any.isRequired,
        ctx: PropTypes.any.isRequired,
        moves: PropTypes.any.isRequired,
        playerID: PropTypes.string,
        isActive: PropTypes.bool,
        isMultiplayer: PropTypes.bool,
        isConnected: PropTypes.bool
    };

    constructor(props) {
        super(props);
    }

    state = {
        selected: ''
    };

    compareMessage = (a,b) =>{
      if(!a && !b){
        return false
      } else if(!a){
        return true
      } else if(!b){
        return true
      } else if(a.message !== b.message){
        return true
      } else {
        return false
      }
    }

    UNSAFE_componentWillReceiveProps(nextProps){
      if((this.compareMessage(this.props.G.announcement, nextProps.G.announcement)) && nextProps.G.announcement.message){
        console.log(this.props.G.announcement, nextProps.G.announcement)
        let toast = {
          message: nextProps.G.announcement.message,
          intent: nextProps.G.announcement.intent,
          icon: nextProps.G.announcement.icon,
          timeout: 5000
        }
        this.toaster.show(toast)
      }
    }

    makeSentence(proposal, players, rooms, problems) {
        console.log(proposal)
      switch(proposal.type) {
        case 'SEND':
          return `Send ${players[proposal.player].name} to ${rooms[proposal.room].name}`
        case 'THROW':
        return `Throw ${players[proposal.player].name} in Space`
        case 'FIX':
          return `Fix ${problems[proposal.problemId].name}`
        case 'PROBE':
        return `Probe ${rooms[proposal.room].name}`
        default:
          return 'Error'
      }
    }
    render() {
        let propositions;
        let players = this.props.G.players
        let rooms = this.props.G.rooms
        let problems = this.props.G.problems
        let amIPlaying = this.props.ctx.currentPlayer == this.props.playerID
        let totalVote = 0;

        if(this.props.G.proposals.length > 0)
          this.props.G.proposals.forEach((p) => {
            totalVote += p.voters.length
        })
        propositions = this.props.G.proposals.length > 0 && this.props.G.proposals.map((p) => {
          return {
            player: players[p.player].name,
            description: this.makeSentence(p.proposal, players, rooms, problems),
            percentage: Math.ceil(p.voters.length / totalVote * 100),
            voters: p.voters
          }
        })
        
        let disconnected = <Button large intent="success" icon='tick' disabled>Connected!</Button>;
        if (this.props.isMultiplayer && !this.props.isConnected) {
            disconnected = <Button large intent="danger" icon='issue' disabled>Disconnected!</Button>;
        }
        console.log("Gameover", this.props.ctx.gameover)
        return (
            <div>
                {(this.props.ctx.gameover !== undefined) ?
                    <Win isAlien={this.props.ctx.gameover === 'aliens'} />: undefined
                }
                {!players[this.props.playerID].hasDoneTutorial && <Tutorial isAlien={players[this.props.playerID].aliens} completeTutorial={(name) => this.props.moves.completeTutorial(name)} amIPlaying={amIPlaying}/>}
                <Toaster ref={ref => this.toaster = ref}></Toaster>
                <div style={{ marginBottom: '1em' }}>
                    {disconnected}
                    <span style={{ marginLeft: '1em' }}>
                        {amIPlaying ? "It's your turn" : "Please wait for your turn..."}
                    </span>
                </div>

                {amIPlaying && this.props.ctx.phase === 'propose' && players[this.props.playerID].hasDoneTutorial ? <Choice submit={(p) => {
                  this.props.moves.propose(p)
                }} players={players} rooms={rooms} problems={problems} proposals={this.props.G.proposals} hasProbes={this.props.G.items.findIndex(i => i.id === 'drone') !== -1}/> : undefined}
                {amIPlaying && this.props.ctx.phase === 'resolve' && this.props.G.roomBeingVisited ? <ChooseItems submit={(i) => {
                  this.props.moves.pickUpItems(i)
                  //console.log(i)
                }} room={this.props.G.roomBeingVisited}/> : undefined}
                <div
                    style={{
                        height: '90vh',
                        width: '100%d',
                        display: 'flex'
                    }}
                >
                    <div
                        style={{
                            width: '20%'
                        }}
                    >
                        <Players players={this.props.G.players} G={this.props.G} currentPlayer={this.props.ctx.currentPlayer} me={this.props.playerID} />
                        <ShipStatus ship={this.props.G.spaceship} problems={this.props.G.problems.filter(p => p.active)} />
                    </div>
                    <div
                        style={{
                            marginLeft: '20px',
                            marginRight: '20px',
                            flex: '1'
                        }}
                    >
                        <Propositions vote={(id)=>{
                          this.props.moves.vote(id)
                        }}propositions={propositions} canVote={this.props.ctx.phase === 'vote' && this.props.ctx.currentPlayer == this.props.playerID} />
                    </div>
                    <div
                        style={{
                            width: '20%'
                        }}
                    >
                        <Items items={this.props.G.items} />
                        <Problems problems={this.props.G.problems} />
                        {players[this.props.playerID].aliens && <Mappo rooms={rooms}/>}
                    </div>
                </div>
            </div>
        );
    }
}

export default Board;
