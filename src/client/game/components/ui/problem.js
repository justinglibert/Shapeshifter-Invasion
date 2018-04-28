import React from 'react'
import Card from './card'

class Problem extends React.Component {
    render() {
        return (
            <Card>
                <h4> {this.props.problem.name} </h4>
                <ul>
                    <li>
                        <i>Description:</i> {this.props.problem.description}
                    </li>
                    <li>
                        <i>Solution:</i> {this.props.problem.solutions.map((s)=>{
                            return s
                        })}
                    </li>
                    <li>
                        <i>Ressource affected:</i> {this.props.problem.affected}
                    </li>
                    <li>
                        <i>Decrease rate:</i> {this.props.problem.decreaseRate}
                    </li>
                </ul>
            </Card>    
        )
    }
}
 
export default Problem