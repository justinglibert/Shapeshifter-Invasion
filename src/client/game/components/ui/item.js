import React from 'react';
import Card from './card';

class Item extends React.Component {
    render() {
        return (
            <Card>
                <div>
                    <img src={this.props.item.image} /> 
                    
                        {this.props.item.name}
                   
                </div>
            </Card>
        );
    }
}

export default Item;