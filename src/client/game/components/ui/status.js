import React from 'react';
import Card from './card';
import { ProgressBar } from "@blueprintjs/core";

class Status extends React.Component {

    render() {
        return (
            <Card style={{display:'flex', flexDirection:'row'}}>
                <div>
                    {this.props.resource.name}:
                </div>
                <div>
                    <ProgressBar animate={false} stripes={false} value={(this.props.resource.amount)/ 10}/>
                </div>
                <div>
                    -{this.props.decrease} /turn
                </div>
            </Card>
        );
    };
}

export default Status;