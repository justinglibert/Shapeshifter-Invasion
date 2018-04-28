import React from 'react';
import Card from './card';
import Checkbox from './Checkbox';

import Select from 'react-select';
//var TextSelect = require('react-textselect')
//<TextSelect options={['text select', 'react component', 'dropdown']} active={this.state.selectedOption} onChange={this.onTextSelectChange} />
import Modal from 'react-responsive-modal/lib/css';

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
                handleCheckboxChange={onChange}
                key={label}
            />
      )
    
      createCheckboxes = () => (
        this.props.room.items.map((item, i) => this.createCheckbox(item.name, (isChecked) => {
            let oldItems = this.state.items
            oldItems[i].selected = isChecked
            this.setState({
                items: oldItems
            })
        }))
      )



    render() {
        return (
            <Modal open={true} little>
                <div style={{ minWidth: '700px' }}>
                    <h2>Select the Items you want to bring back</h2>
                    {this.createCheckboxes()}
                    <button onClick={() => {
                        console.log(this.state.items)
                        this.props.submit(this.state.items.filter((i)=>{
                            return i.selected
                        }).map(i => i.id))
                    }}>Submit</button>
                </div>
            </Modal>
        );
    }
}

export default ChooseItems;


