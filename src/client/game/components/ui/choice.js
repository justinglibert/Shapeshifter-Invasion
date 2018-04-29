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



const checkSimilitude = (type, proposals, state) =>  {
    let {sendWho, sendWhere, throwWho, fixWhat, probeWhere} = state
    switch(type){
        case 'SEND':
            return proposals.filter(p => p.proposal.type === 'SEND').some((p) => {
                return p.proposal.player == sendWho && p.proposal.room == sendWhere
            })
        case 'THROW':
            return proposals.filter(p => p.proposal.type === 'THROW').some((p) => {
                return p.proposal.player == throwWho
            })
        case 'FIX':
            return proposals.filter(p => p.proposal.type === 'FIX').some((p) => {
              return p.proposal.problemId == fixWhat
            })
        case 'PROBE':
            return proposals.filter(p => p.proposal.type === 'PROBE').some((p) => {
               return p.proposal.room == probeWhere
            })
        default:
            return false
    }
}
class Choice extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sendWho: props.players.filter(p => p.alive)[0].id,
            sendWhere: 0,
            throwWho: props.players.filter(p => p.alive)[0].id,
            fixWhat: props.problems.findIndex(p => p.active),
            probeWhere: 0
        };
    }
    render() {
        const { sendWho, sendWhere, throwWho, fixWhat, probeWhere } = this.state;
        return (
            <Dialog isOpen={true} title="Make a proposal to the other crew members" isCloseButtonShown={false}>
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

                        <Button disabled={checkSimilitude('SEND', this.props.proposals, this.state)} onClick={() => {
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

                        <Button disabled={checkSimilitude('THROW', this.props.proposals, this.state)} onClick={() => {
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

                            <Button disabled={checkSimilitude('FIX', this.props.proposals, this.state)} onClick={() => {
                            this.props.submit({
                                type: 'FIX',
                                problemId: fixWhat,
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
                        Probe{' '}
                        <BPSelect
                            name="probeWhere"
                            value={probeWhere}
                            onChange={o => {
                                this.setState({
                                    probeWhere: o.value
                                });
                            }}

                        >{this.props.rooms.map((r, i) => {
                            return (<option value={i}>
                                {r.name}
                            </option>);
                        })}</BPSelect>
                        </div>

                            <Button disabled={!this.props.hasProbes || checkSimilitude('PROBE', this.props.proposals, this.state)} onClick={() => {
                            this.props.submit({
                                type: 'PROBE',
                                room: probeWhere,
                            })
                        }}>Submit</Button>
                    </div>
                </div>
            </Dialog>
        );
    }
}

export default Choice;
