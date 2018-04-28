import React from 'react';
import Card from './card'

class Player extends React.Component {
    render() {
        return (
            <Card>
                <p>{this.props.player.id} {this.props.player.name}</p>
            </Card>
        );
    }
}

export default Player;