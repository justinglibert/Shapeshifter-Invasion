import React from 'react';
import Card from './card';

import Select from 'react-select';
//var TextSelect = require('react-textselect')
//<TextSelect options={['text select', 'react component', 'dropdown']} active={this.state.selectedOption} onChange={this.onTextSelectChange} />
import Modal from 'react-responsive-modal/lib/css';
import 'react-select/dist/react-select.css';
import { Button } from "@blueprintjs/core";

const BPSelect = props => {
    let { children, ...rest} = props;

    return (
        <div className="pt-select">
            <select {...rest}>
                { children }
            </select>
        </div>
    )
}

class Choice extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sendWho: undefined,
            sendWhere: undefined,
            throwWho: undefined,
            fixWhat: undefined
        };
    }
    render() {
        const { sendWho, sendWhere, throwWho, fixWhat } = this.state;
        return (
            <Modal open={true} little>
                <div style={{ minWidth: '700px' }}>
                    <h2>Select an Action</h2>
                    <Card>
                        <div
                            style={{
                                marginTop: '10px',
                                minHeight: '40px',
                                display: 'flex',
                                flexDirection: 'row',
                                alignItems: 'center',
                                margin: '20px',
                                justifyContent: 'space-between'
                            }}
                        >
                            Send{' '}
                            <BPSelect
                                style={{ minWidth: '200px' }}
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
                                style={{ minWidth: '200px' }}
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
                            <Button disabled={(sendWho === undefined && sendWhere === undefined)} onClick={() => {
                                this.props.submit({
                                    type: 'SEND',
                                    player: sendWho,
                                    room: sendWhere
                                })
                            }}>Submit</Button>
                        </div>
                        <div
                            style={{
                                minHeight: '40px',
                                display: 'flex',
                                flexDirection: 'row',
                                alignItems: 'center',
                                margin: '20px',
                                justifyContent: 'space-between'
                            }}
                        >
                            Throw{' '}
                            <BPSelect
                                style={{ minWidth: '200px' }}
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
                            <Button disabled={throwWho === undefined} onClick={() => {
                                this.props.submit({
                                    type: 'THROW',
                                    player: throwWho,
                                })
                            }}>Submit</Button>
                        </div>
                        <div
                            style={{
                                marginBottom: '10px',
                                minHeight: '40px',
                                display: 'flex',
                                flexDirection: 'row',
                                alignItems: 'center',
                                margin: '20px',
                                justifyContent: 'space-between'
                            }}
                        >
                            Fix{' '}
                            <BPSelect
                                name="fixWhat"
                                style={{ minWidth: '200px' }}
                                value={fixWhat}
                                onChange={o => {
                                    this.setState({
                                        fixWhat: o.value
                                    });
                                }}

                            >{this.props.problems.map((p, i) => {
                                    return (<option value={i}>{p.name}</option>)
                                })}</BPSelect>
                             <Button disabled={(fixWhat) === undefined} onClick={() => {
                                this.props.submit({
                                    type: 'FIX',
                                    problemId: fixWhat,
                                })
                            }}>Submit</Button>
                        </div>
                    </Card>
                </div>
            </Modal>
        );
    }
}

export default Choice;
