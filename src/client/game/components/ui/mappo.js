import React from 'react';
import { Card, Table} from "@blueprintjs/core";

class Mappo extends React.Component {
    render() {
        return (
            <div>
                <Card>
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
                                    <td> {room.item} </td>
                                    <td> {room.danger} </td>
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