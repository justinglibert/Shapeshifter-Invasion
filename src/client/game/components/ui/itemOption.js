import React from 'react';
import { Card, Elevation, Checkbox} from "@blueprintjs/core";

class ItemOption extends React.Component {
    render() {
        return (
            <div>
                <Card style={{display:'flex', flexDirection:'row'}}>
                        <Checkbox type="checkbox" id={this.props.item.name}/>
                        <div>{this.props.item.name}</div> 
                </Card>
            </div>
        );
    }
}

export default ItemOption;