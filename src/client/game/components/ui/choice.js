import React from 'react'
import Card from './card'

//var TextSelect = require('react-textselect')
//<TextSelect options={['text select', 'react component', 'dropdown']} active={this.state.selectedOption} onChange={this.onTextSelectChange} />    

class Choice extends React.Component {

    render() {
        return (
            <Card>
                <div>
                    Send {this.props.choice.dropSendWho} to {this.props.choice.dropSendDestination}
                </div>
                <div>
                    Throw {this.props.choice.throwWho} in Space
                </div>
                <div>
                    Fix {this.props.choice.dropFix}
                </div>
            </Card>
        )
    }
}

export default Choice

