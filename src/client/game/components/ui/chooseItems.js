import React from 'react';
import Card from './card';

import Select from 'react-select';
//var TextSelect = require('react-textselect')
//<TextSelect options={['text select', 'react component', 'dropdown']} active={this.state.selectedOption} onChange={this.onTextSelectChange} />

import { Button, Checkbox, Dialog } from "@blueprintjs/core";

class ChooseItems extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            items: this.props.room.items.map((i)=>{
                return {
                    ...i,
                    selected: false
                }
            })
        }
    }


    createCheckbox = (label, onChange) => (
        <Checkbox
            label={label}
            onChange={onChange}
            key={label}
        />
    )
    
    createCheckboxes = () => (
        this.props.room.items.map(
            (item, i) => this.createCheckbox(item.name, (isChecked) => {
                let oldItems = this.state.items
                oldItems[i].selected = isChecked
                this.setState({
                    items: oldItems
                })
            })
        )
    )

    render() {
        return (
            <Dialog isOpen={true}  isCloseButtonShown={false} title="Select the items you'd like to bring back">
                <div className="pt-dialog-body">
                    { this.props.room.items.length > 0 ? this.createCheckboxes() : 'No items...'}
                </div>
                <div className="pt-dialog-footer">
                    <Button onClick={() => {
                        console.log(this.state.items)
                        this.props.submit(this.state.items.filter((i)=>{
                            return i.selected
                        }).map(i => i.id))
                    }}>Submit</Button>
                </div>
            </Dialog>
        );
    }
}

export default ChooseItems;


