import React from "react";
import Card from "./card";
import { Button, ProgressBar } from "@blueprintjs/core";


class Proposition extends React.Component {
  render() {
    return (
        <Card style={{display:'stretch', flexDirection:'row'}}>
          {this.props.proposition.player}: {this.props.proposition.description}{" "}-> {this.props.proposition.percentage > 0 ? 
          <ProgressBar animate={false} 
                       stripes={false} 
                       value={(this.props.proposition.percentage) / 100}
                       style={{}}>
          </ProgressBar> 
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
