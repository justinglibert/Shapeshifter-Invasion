import React from 'react'
import Card from './card'
import Proposition from './proposition'

class Propositions extends React.Component {
    render() {
        return (
            <div>
                <Card>
                    <p> propositions </p>
                    <div>
                        {this.props.propositions.map( (proposition) => (
                            <Proposition proposition = {proposition}/>
                        ))}
                    </div>
                </Card>
            </div>
        )
    }
}

export default Propositions