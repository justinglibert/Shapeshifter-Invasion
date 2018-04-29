import React from "react";
import colours from './colours';
import { Card, Elevation, Icon } from "@blueprintjs/core";


class Player extends React.Component {
  render() {
    console.log(this.props.me)
    return (
      <Card style={{ display: "flex", flexDirection: "row", alignItems: 'center', marginTop: '10px', marginBottom: '10px'  }} className={this.props.isDoingItsTurn && "dropshadow"}>
      <Icon icon="user" color={colours[this.props.player.id % 30]} />
        <p style={{margin: '0px'}}> &nbsp; {this.props.player.name}</p>
      </Card>
    );
  }
}

export default Player;
