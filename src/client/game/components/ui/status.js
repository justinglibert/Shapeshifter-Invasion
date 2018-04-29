import React from 'react';
import Card from './card';
import { ProgressBar } from "@blueprintjs/core";

class Status extends React.Component {

    render() {
        return (
            <Card style={{display:'flex', flexDirection:'row', alignItems: 'center'}}>
                <span style={{margin: '10px'}}>
                    {this.props.resource.name}:
                </span>

                    <ProgressBar animate={false} stripes={false} value={(this.props.resource.value)/ 10}/>
                
                <span style={{margin: '10px'}}>
                    -{this.props.decrease} /turn
                </span>
            </Card>
        );
    };
}

export default Status;