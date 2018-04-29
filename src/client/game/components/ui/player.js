import React from "react";
import { Card, Elevation, Icon } from "@blueprintjs/core";

const colours = [
  "#2965CC",
  "#29A634",
  "#D99E0B",
  "#D13913",
  "#8F398F",
  "#00B3A4",
  "#DB2C6F",
  "#9BBF30",
  "#96622D",
  "#7157D9",
  "#145369",
  "#691c92",
  "#af5199",
  "#9790bd",
  "#8d6e10",
  "#01fef8",
  "#2db917",
  "#4a4a7a",
  "#b4c8ae",
  "#88d06d",
  "#c5373a",
  "#7abdbc",
  "#638e46",
  "#638e46", 
  "#b774ba",
  "#0dd6be",
  "#d2a9c3",
  "#4e2710",
  "#dd868b",
  "#974819"
];

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
