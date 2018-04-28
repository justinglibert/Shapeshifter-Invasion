import React from 'react';
import Card from './card';

class Item extends React.Component {
    render() {
        return (
            <Card>
                <div>
                    <p>
                        <img src={this.props.item.image} /> 
                        
                            {this.props.item.name}
                    </p>
                </div>
            </Card>
        );
    }
}

export default Item;