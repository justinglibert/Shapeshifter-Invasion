import React from "react";
import Card from "./card";
import { Button, ProgressBar } from "@blueprintjs/core";


class Proposition extends React.Component {
  render() {
    return (
        <Card style={{display:'flex', flexDirection:'row', justifyContent: 'space-around', alignItems: 'center', padding: '30px'}}>
          <h4 style={{minWidth: '400px'}}>{this.props.proposition.player}: {this.props.proposition.description}</h4>
          {this.props.proposition.percentage > 0 ? 
          <div style={{minWidth: '400px', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around'}}>
          <ProgressBar animate={false} 
                       stripes={false} 
                       value={(this.props.proposition.percentage) / 100}
                       >
          </ProgressBar>
          {this.props.proposition.voters.map((v) => {
            return (
              <span class="dot" style={{color: red}}></span>
            )
          })} 
          
          </div>
          : undefined}
          {this.props.canVote && (
                            <button onClick={()=>{
                              this.props.vote(this.props.id)
                            }}>Vote!</button>
                        )}
        </Card>
    );
  }
}

export default Proposition;
