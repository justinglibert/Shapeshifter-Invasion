import React from 'react';
import { Card, Table} from "@blueprintjs/core";

class Mappo extends React.Component {
    render() {
        return (
            <div>
                <Card>
                <h4 style={{marginBottom: '10px'}}>Ḁ̕L͔͇͕͞I̩͖̟̞̘ͅE̡̖̫̜̰N K̹̦͓͕̕N͓̩͚̤̘̬͕O̗͖̼̯̕ͅW̧͈͇͈̜ͅL̥̝͞E̜͖̭͍̲͔ͅDGE̪͈̠͕̩̞̪</h4>
                    <table className="pt-html-table .striped">
                    
                        <thead>
                            <tr>
                                <th>Room</th>
                                <th>Item</th>
                                <th>Danger</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.props.rooms.map( (room) => (
                                <tr>
                                    <td> {room.name} </td>
                                    <td><div style={{display: 'flex', flexDirection: 'column'}}> {room.items && room.items.map(i=> (<p>{i.name}</p>))} </div></td>
                                    <td> {room.deadly ? 'YES' : 'NO'} </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </Card>
            </div>
        );
    }
}

export default Mappo;