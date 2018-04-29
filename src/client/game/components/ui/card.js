import React from 'react';
import { Card, Elevation } from "@blueprintjs/core";

class SpaceCard extends React.Component {
    render() {
        return (
            <Card elevation={Elevation.TWO}>
                { this.props.children }
            </Card>
        );
    }
}
export default SpaceCard