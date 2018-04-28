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
            description: JSON.stringify(p.proposal),
            percentage: Math.ceil(p.voters.length / totalVote * 100)
          }
        })
        
        let disconnected = <p>Connected!</p>;
        if (this.props.isMultiplayer && !this.props.isConnected) {
            disconnected = <p>Disconnected!</p>;
        }
        return (
            <div>
                {disconnected}
                <p>Current player: {this.props.playerID}</p>
                {amIPlaying ? "It's your turn" : "Please wait..."}
                {amIPlaying && this.props.ctx.phase === 'propose' ? <Choice submit={(p) => {
                  this.props.moves.propose(p)
                }} players={players} rooms={rooms} problems={problems}/> : undefined}
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
                        <Players players={this.props.G.players} />
                        <ShipStatus ship={this.props.G.spaceship} />
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
                        <AlienInfo rooms={rooms}/>
                    </div>
                </div>
            </div>
        );
    }
}

export default Board;
