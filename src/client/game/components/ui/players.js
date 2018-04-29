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
                        <p>Me: {this.props.me} {typeof this.props.me}</p>
                        {this.props.players.map( (player) => (
                            <Player player = {player} isMe={player.id == this.props.me} isDoingItsTurn={player.id == this.props.currentPlayer}/>
                        ))}
                    </div>
                </Card>
            </div>
        );
    }
}

export default Players;