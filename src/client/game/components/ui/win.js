import { Button, Dialog, Icon, Intent , TextArea} from "@blueprintjs/core";
import React from 'react';
class Win extends React.Component {

    renderText() {
        if(this.props.isAlien){
            return (
                <div className="pt-dialog-body" style={{display: 'flex', flexDirection: 'column', alignItems:'center', justifyContent: 'space-between'}}>
                <Icon icon={"predictive-analysis"} iconSize={100} intent={Intent.WARNING} />
                <h3>We won</h3>
                    <h3>Mission ... accomplished. You've successfully outsmarted the ... humans. We're now returning to Xhwathura.</h3>
                </div>
            )
        } else {
            return (
                <div className="pt-dialog-body" style={{display: 'flex', flexDirection: 'column', alignItems:'center', justifyContent: 'space-between'}}>
                <Icon icon={"delta"} iconSize={100} intent={Intent.PRIMARY} />
                <h3 style={{marginTop: '20px'}}>You've done it!, I am pleased to anounce that I no longer sense any Xhwathu presence. We're now heading back to Earth.</h3>
            </div>
            )
        }
    }

    render() {
        return (
            <Dialog isOpen={true}  style={{minWidth: '600px'}}isCloseButtonShown={false} title={!this.props.isAlien ? "Message From DELTA" : "Message from the Q̻̖̘͚͙U͈̰̟̥͓͎EḚ̢̙͉N̶͉̦"}>
                {this.renderText()}
            </Dialog>
        );
    }
}

export default Win;


