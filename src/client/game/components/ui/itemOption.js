import React from 'react';
import { Card, Elevation, Checkbox} from "@blueprintjs/core";

class ItemOption extends React.Component {
    render() {
        return (
            <div>
                <Card>
                    <div>{this.props.item.name}</div>
                    <div>
                        <Checkbox type="checkbox" id={this.props.item.name}/>
                        <img src={this.props.item.image}/>
                        {this.props.item.description}
                    </div>
                </Card>
            </div>
        );
    }
}

export default ItemOption;