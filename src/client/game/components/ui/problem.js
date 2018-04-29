import React from 'react'
import Card from './card'
import { Callout } from "@blueprintjs/core";

class Problem extends React.Component {
    render() {
        return (
            <Callout intent="danger" title={this.props.problem.name}>
                <ul style={{
                    listStyle: 'none',
                    paddingLeft: 0,
                }}>
                    <li>
                        <i>Description:</i> {this.props.problem.description}
                    </li>
                    <li>
                        <i>Solution:</i> {this.props.problem.solution}
                    </li>
                    <li>
                        <i>Ressource affected:</i> {this.props.problem.affected}
                    </li>
                    <li>
                        <i>Decrease rate:</i> {this.props.problem.decreaseRate}
                    </li>
                </ul>
            </Callout>
        )
    }
}
 
export default Problem