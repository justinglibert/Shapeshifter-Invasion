import React from 'react'
import Card from './card'
import Problem from './problem'

class Problems extends React.Component {
    render() {
        return (
            <div>
                <Card>
                    <p>Problems</p>
                    <div>
                        {this.props.problems.filter(p => p.active).map( (problem) => (
                            <Problem problem = {problem}/>
                        ))}
                    </div>
                </Card>
            </div>
        )
    }
}

export default Problems