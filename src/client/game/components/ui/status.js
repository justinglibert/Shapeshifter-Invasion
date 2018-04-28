import React from 'react';
import Card from './card'

const numberToBar = function (n) {
    const dark = '▓';
    const light = '░';
    let output = '░░░░░░░░░░';
    let darkBar = ''

    output = output.slice(0, 10-n);

    for (let i = 0; i < n; i++){
        darkBar += '▓';
    };

    return darkBar + output;
};

class Status extends React.Component {

    render() {
        return (
            <Card>
                <p>
                    {this.props.resource.name}: {numberToBar(this.props.resource.amount)} -{this.props.decrease} /turn
                </p>
            </Card>
        );
    }
}

export default Status;