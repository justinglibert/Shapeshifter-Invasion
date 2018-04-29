import React from "react";
import colours from './colours';
import { Card, Elevation, Icon } from "@blueprintjs/core";


class Player extends React.Component {
  render() {
    return (
      <Card style={{ display: "flex", flexDirection: "row" }}>
      <Icon icon="user" color={colours[this.props.player.id % 30]} />
        <p> &nbsp; {this.props.player.name}</p>
      </Card>
    );
  }
}

export default Player;
