import React from 'react';
import Card from './card';
import Player from './player';

class Players extends React.Component {
    render() {
        return (
            <div>
                <Card>
                    <p>Players</p>
                    <div>
                        {this.props.players.map( (player) => (
                            <Player player = {player} isMe={player.id == this.props.me} myID={this.props.me} G={this.props.G} isDoingItsTurn={player.id == this.props.currentPlayer}/>
                        ))}
                    </div>
                </Card>
            </div>
        );
    }
}

export default Players;