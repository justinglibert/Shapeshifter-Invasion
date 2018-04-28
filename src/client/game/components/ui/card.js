import React from 'react';

class Card extends React.Component {
    render() {
        return (
            <div
                style={{
                    borderStyle: 'solid',
                    borderWidth: '2px'
                }}
            >
                {this.props.children}
            </div>
        );
    }
}
export default Card