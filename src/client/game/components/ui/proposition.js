import React from "react";
import Card from "./card";

class Proposition extends React.Component {
  render() {
    return (
      <div>
        <Card>
          {this.props.proposition.player}: {this.props.proposition.description}{" "}
          -> {this.props.proposition.percentage > 0 ? this.props.proposition.percentage + '%' : undefined}
          {this.props.canVote && (
                            <button onClick={()=>{
                              this.props.vote(this.props.id)
                            }}>Vote!</button>
                        )}
        </Card>
      </div>
    );
  }
}

export default Proposition;
