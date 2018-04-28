import React from 'react';
import Card from './card'

class Status extends React.Component {

    numberToBar(n) {
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

    render() {
        return (
            <Card>
                <p>
                    {this.props.resource.name}: {this.numberToBar(this.props.resource.amount)} -{this.props.decrease} /turn
                </p>
            </Card>
        );
    };
}

export default Status;