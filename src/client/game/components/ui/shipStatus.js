import React from 'react';
import Card from './card';
import Status from './status';

class ShipStatus extends React.Component {
    render() {
        return (
            <div>
                <Card>
                    <p>Ship Status</p>
                    {this.props.ship.resources.map((resource) => {
                        let relevantProblems = this.props.problems.filter(p => p.affected === resource.id)
                        console.log(relevantProblems)
                        let sum = relevantProblems.reduce(((acc, cur) => acc + cur.decreaseRate),0)
                        console.log(sum)
                        return (<Status resource={resource} decrease={sum}/>)}
                    )}
                </Card>
            </div>
        );
    }
}

export default ShipStatus;