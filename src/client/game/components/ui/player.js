import React from "react";
import colours from './colours';
import { Card, Elevation, Icon, Tag, Intent } from "@blueprintjs/core";



class Player extends React.Component {
  renderMe() {
    if (!this.props.isMe) {
      return null;
    }

    return <Tag intent={Intent.PRIMARY}>You!</Tag>
  }

  render() {

    const isAlive = ({G, myID}) => {
        return G.players[myID].alive
    }

    return (
      <Card style={{ display: "flex", flexDirection: "row", justifyContent: 'space-between', alignItems: 'center', marginBottom: '1em'}} className={this.props.isDoingItsTurn && "dropshadow"}>
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
          <Icon icon="user" color={colours[this.props.player.id % 30]} />
          <p> {isAlive({Game: this.props.G, myID: this.props.myID}) ? this.props.player.name : "dead " + this.props.player.name} }</p>
          {/* <p style={{margin:'10px'}}> {this.props.player.name} </p> */}
        </div>
        { this.renderMe() }
      </Card>
    );
  }
}

export default Player;
