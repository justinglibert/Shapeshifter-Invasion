import React from "react";
import Card from "./card";
import { Button, ProgressBar } from "@blueprintjs/core";
import colours from './colours'


class Proposition extends React.Component {
  render() {
    return (
        <Card style={{display:'flex', flexDirection:'row', justifyContent: this.props.proposition.percentage > 0 ? 'space-between' : 'start', alignItems: 'center', padding: '30px'}}>
          <h4 style={{minWidth: '400px'}}>{this.props.proposition.player}: {this.props.proposition.description}</h4>
          {this.props.proposition.percentage > 0 ? 
          <div style={{minWidth: '400px', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'start'}}>
          <ProgressBar animate={false} 
                       stripes={false} 
                       className={'medium-bar'}
                       value={(this.props.proposition.percentage) / 100}
                       >
          </ProgressBar>
          {this.props.proposition.voters.map((v) => {
            return (
              <span class="dot" style={{backgroundColor: colours[v]}}></span>
            )
          })} 
          
          </div>
          : undefined}
          {this.props.canVote && (
            <Button onClick={()=>{
              this.props.vote(this.props.id)
            }} text="Vote!" icon="plus" />)}
        </Card>
    );
  }
}

export default Proposition;
