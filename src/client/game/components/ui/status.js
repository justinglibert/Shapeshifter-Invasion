import React from 'react';
import Card from './card';
import { ProgressBar, Intent } from "@blueprintjs/core";

class Status extends React.Component {

    render() {
        return (
            <Card style={{display:'flex', flexDirection:'column', alignItems: 'center'}}>
            <div style={{width: '100%', display:'flex', flexDirection:'row', justifyContent: 'space-between', alignItems: 'center'}} >
                <span style={{margin: '10px'}}>
                    {this.props.resource.name}:
                </span>
                <span style={{margin: '10px'}}>
                    -{this.props.decrease} /turn
                </span>
            </div>
                    <ProgressBar animate={false} stripes={false} intent={this.props.resource.value > 50 ? Intent.SUCCESS : Intent.WARNING} value={(this.props.resource.value)}/>
                
               
            </Card>
        );
    };
}

export default Status;