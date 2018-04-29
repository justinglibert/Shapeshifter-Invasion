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
        return G.players[this.props.player.id].alive
    }

    return (
      <Card style={{ display: "flex", flexDirection: "row", justifyContent: 'space-between', alignItems: 'center', marginBottom: '1em'}} className={this.props.isDoingItsTurn && "dropshadow"}>
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
          <Icon icon="user" color={colours[this.props.player.id % 30]} />
          <p style={{marginBottom: 0, marginLeft: '10px'}}> {isAlive({G: this.props.G, myID: this.props.myID}) ? this.props.player.name : 'NO SIGN OF LIFE:  ' + this.props.player.name }</p>
          {/* <p style={{margin:'10px'}}> {this.props.player.name} </p> */}
        </div>
        { this.renderMe() }
      </Card>
    );
  }
}

export default Player;
