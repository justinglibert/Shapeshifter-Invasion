import React from 'react'
import Card from './card'
import Proposition from './proposition'

class Propositions extends React.Component {
    render() {
        return (
            <div>
                <Card style = {{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                    <h2 style={{marginBottom: '50px'}}> Propositions </h2>
                    <div style={{width: '100%'}}>
                        {this.props.propositions ? this.props.propositions.map( (proposition, i) => (
                            <Proposition id={i} vote={(id)=>{
                                this.props.vote(id)
                            }}proposition = {proposition} canVote={this.props.canVote}/>
                        )) : 'No proposition'}
                    </div>
                </Card>
            </div>
        )
    }
}

export default Propositions