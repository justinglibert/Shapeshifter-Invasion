import React from 'react';
import Card from './card'

class AlienInfo extends React.Component {
    render() {
        return (
            <Card>
                <p>{JSON.stringify(this.props.rooms, null,4)}</p>
            </Card>
        );
    }
}

export default AlienInfo;