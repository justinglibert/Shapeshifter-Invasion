import React from 'react';
import Card from './card';
import Item from './item';

class Items extends React.Component {
    render() {
        return (
            <div>
                <Card>
                    <p>items</p>
                    <div>
                    {this.props.items.map( (item) => (
                        <Item item={item}/>
                    ))}
                    </div>
                </Card>
            </div>
        );
    }
}

export default Items;