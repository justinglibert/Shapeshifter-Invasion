import React from 'react';
import Card from './card'

class Player extends React.Component {
    render() {
        return (
            <Card>
                {this.props.player.name}
            </Card>
        );
    }
}
export default Player