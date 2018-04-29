import React from 'react';
import ItemOption from './itemOption';
import { Card, Elevation,Button } from "@blueprintjs/core";

class ItemOptions extends React.Component {
    render() {
        return (
            <div>
                <Card>
                    <p>Pick Item</p>
                    <div>
                        {this.props.items.map( (item) => (
                            <ItemOption item={item}/>
                        ))}
                    </div>
                    <div>
                        <Button type="button">Pick</Button>
                    </div>
                </Card>
            </div>
        );
    }
}

export default ItemOptions;