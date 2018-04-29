import React from 'react';
import Card from './card';

import Select from 'react-select';
//var TextSelect = require('react-textselect')
//<TextSelect options={['text select', 'react component', 'dropdown']} active={this.state.selectedOption} onChange={this.onTextSelectChange} />

import 'react-select/dist/react-select.css';
import { Button, Dialog } from "@blueprintjs/core";

const BPSelect = props => {
    let { children, onChange, ...rest} = props;

    return (
        <div className="pt-select">
            <select {...rest}  onChange={(e) => {
                onChange(e.target)
            }}>
                { children }
            </select>
        </div>
    )
}

class Choice extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sendWho: props.players[0].id,
            sendWhere: 0,
            throwWho: props.players[0].id,
            fixWhat: props.problems.findIndex(p => p.active),
        };
    }
    render() {
        const { sendWho, sendWhere, throwWho, fixWhat } = this.state;
        return (
            <Dialog isOpen={true} title="Select an action">
                <div className="pt-dialog-body" >
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                            paddingBottom: '1em',
                            justifyContent: 'space-between'
                        }}
                    >
                        <div>
                        Send{' '}
                        <BPSelect
                            name="sendWho"
                            value={sendWho}
                            onChange={o => {
                                this.setState({
                                    sendWho: o.value
                                });
                            }}
                        >
                            {
                                this.props.players
                                .filter(p => p.alive)
                                .map((p, i) => {
                                    return (<option value={p.id}>
                                        {p.name}
                                    </option>);
                                })
                            }
                        </BPSelect>{' '}
                        to{' '}
                        <BPSelect
                            name="sendWhere"
                            value={sendWhere}
                            onChange={o => {
                                this.setState({
                                    sendWhere: o.value
                                });
                            }}
                        >{this.props.rooms.map((r, i) => {
                                return (<option value={i}>
                                    {r.name}
                                </option>);
                            })}
                        </BPSelect>
                        </div>

                        <Button onClick={() => {
                            console.log(this.state)
                            this.props.submit({
                                type: 'SEND',
                                player: sendWho,
                                room: sendWhere
                            })
                        }}>Submit</Button>
                    </div>

                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                            paddingBottom: '1em',
                            justifyContent: 'space-between'
                        }}
                    >
                        <div>
                        Throw{' '}
                        <BPSelect
                            name="throwWho"
                            value={throwWho}
                            onChange={o => {
                                this.setState({
                                    throwWho: o.value
                                });
                            }}
                        >{this.props.players
                                .filter(p => p.alive)
                                .map((p, i) => {
                                    return (<option value={p.id}>
                                        {p.name}
                                    </option>);
                                })}</BPSelect>{' '}
                        in Space
                        </div>

                        <Button onClick={() => {
                            this.props.submit({
                                type: 'THROW',
                                player: throwWho,
                            })
                        }}>Submit</Button>
                    </div>
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                            paddingBottom: '1em',
                            justifyContent: 'space-between'
                        }}
                        className="pt-form-group pt-inline"
                    >
                        <div>
                        Fix{' '}
                        <BPSelect
                            name="fixWhat"
                            value={fixWhat}
                            onChange={o => {
                                this.setState({
                                    fixWhat: o.value
                                });
                            }}

                        >{this.props.problems.filter((p) => p.active).map((p, i) => {
                                return (<option value={i}>{p.name}</option>)
                            })}</BPSelect>
                        </div>

                            <Button onClick={() => {
                            this.props.submit({
                                type: 'FIX',
                                problemId: fixWhat,
                            })
                        }}>Submit</Button>
                    </div>
                </div>
            </Dialog>
        );
    }
}

export default Choice;
