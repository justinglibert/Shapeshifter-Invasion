import React from "react";
import Card from "./card";

class Proposition extends React.Component {
  render() {
    return (
      <div>
        <Card>
          {this.props.proposition.player}: {this.props.proposition.description}{" "}
          -> {this.props.proposition.percentage}%
        </Card>
      </div>
    );
  }
}

export default Proposition;
