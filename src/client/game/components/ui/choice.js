import React from 'react';
import Card from './card';

import Select from 'react-select';
//var TextSelect = require('react-textselect')
//<TextSelect options={['text select', 'react component', 'dropdown']} active={this.state.selectedOption} onChange={this.onTextSelectChange} />
import Modal from 'react-responsive-modal/lib/css';
import 'react-select/dist/react-select.css';

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
                            <Select
                                style={{ minWidth: '200px' }}
                                name="sendWho"
                                value={sendWho}
                                onChange={o => {
                                    this.setState({
                                        sendWho: o.value
                                    });
                                }}
                                options={this.props.players
                                    .filter(p => p.alive)
                                    .map((p, i) => {
                                        return {
                                            value: p.id,
                                            label: p.name
                                        };
                                    })}
                            />{' '}
                            to{' '}
                            <Select
                                name="sendWhere"
                                style={{ minWidth: '200px' }}
                                value={sendWhere}
                                onChange={o => {
                                    this.setState({
                                        sendWhere: o.value
                                    });
                                }}
                                options={this.props.rooms.map((r, i) => {
                                    return {
                                        value: i,
                                        label: r.name
                                    };
                                })}
                            />
                            <button disabled={(sendWho === undefined && sendWhere === undefined)} onClick={() => {
                                this.props.submit({
                                    type: 'SEND',
                                    player: sendWho,
                                    room: sendWhere
                                })
                            }}>Submit</button>
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
                            <Select
                                style={{ minWidth: '200px' }}
                                name="throwWho"
                                value={throwWho}
                                onChange={o => {
                                    this.setState({
                                        throwWho: o.value
                                    });
                                }}
                                options={this.props.players
                                    .filter(p => p.alive)
                                    .map((p, i) => {
                                        return {
                                            value: p.id,
                                            label: p.name
                                        };
                                    })}
                            />{' '}
                            in Space
                            <button disabled={throwWho === undefined} onClick={() => {
                                this.props.submit({
                                    type: 'THROW',
                                    player: throwWho,
                                })
                            }}>Submit</button>
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
                            <Select
                                name="fixWhat"
                                style={{ minWidth: '200px' }}
                                value={fixWhat}
                                onChange={o => {
                                    this.setState({
                                        fixWhat: o.value
                                    });
                                }}
                                options={this.props.problems.map((p, i) => {
                                    return {
                                        value: i,
                                        label: p.name
                                    };
                                })}
                            />
                             <button disabled={(fixWhat) === undefined} onClick={() => {
                                this.props.submit({
                                    type: 'FIX',
                                    problemId: fixWhat,
                                })
                            }}>Submit</button>
                        </div>
                    </Card>
                </div>
            </Modal>
        );
    }
}

export default Choice;
