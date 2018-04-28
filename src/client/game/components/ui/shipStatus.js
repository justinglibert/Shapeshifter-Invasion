import React from 'react';
import Card from './card';
import Status from './status';

class ShipStatus extends React.Component {
    render() {
        return (
            <div>
                <Card>
                    <p>Ship Status</p>
                    {this.props.ship.resources.map((resource) => (
                        <Status resource={resource} decrease={1}/>
                    ))}
                </Card>
            </div>
        );
    }
}

export default ShipStatus;