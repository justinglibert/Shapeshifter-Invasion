import React from 'react';
import Card from './card';
import ItemOption from './itemOption';

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
                        <button type="button">Pick</button>
                    </div>
                </Card>
            </div>
        );
    }
}

export default ItemOptions;