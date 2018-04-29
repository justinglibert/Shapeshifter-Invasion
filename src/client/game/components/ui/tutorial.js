import { Button, Dialog, Icon, Intent } from "@blueprintjs/core";
import React from 'react';
class Tutorial extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    renderText() {
        if(this.props.isAlien){
            return (
                <div className="pt-dialog-body" style={{display: 'flex', flexDirection: 'column', alignItems:'center', justifyContent: 'space-between'}}>
                <Icon icon={"predictive-analysis"} iconSize={100} intent={Intent.WARNING} />
                    <h3>We have successfully infiltrated a ... human ... spaceship. Our Shapeshifting was successful and we now appear ... exactly ...like them.</h3>

<h3>The ... humans ... do not know of the danger and the traps on the ship. But we know, and we will lead them towards them...</h3>

<h3>Our objective here is gain their trust, deceive them, manipulate them, and lead them all to their deaths... without raising suspicion</h3>

<h3>Eliminate them all.</h3>
                </div>
            )
        } else {
            return (
                <div className="pt-dialog-body" style={{display: 'flex', flexDirection: 'column', alignItems:'center', justifyContent: 'space-between'}}>
                <Icon icon={"delta"} iconSize={100} intent={Intent.PRIMARY} />
                <h3 style={{marginTop: '20px'}}>I am glad you are finally awake. I am your on-board AI -- Delta. 2 hours ago, our vessel was breached by Xhwathu Shapeshifters, who have now disguised themselves as humans.</h3>


<h3>During the breach, our vessel was damaged. Moreover, there are now various dangers and traps scattered across the ship.
The Xhwathu Shapeshifters are outnumbered by us, but their nine senses allow them to know the exact locations for dangers and traps. They won't directly attack you, but they will lead you towards these dangers</h3>

<h3>Stay safe.</h3>
            </div>
            )
        }
    }

    render() {
        return (
            <Dialog isOpen={true}  style={{minWidth: '600px'}}isCloseButtonShown={false} title={!this.props.isAlien ? "Message From DELTA" : "Message from the Q̻̖̘͚͙U͈̰̟̥͓͎EḚ̢̙͉N̶͉̦"}>
                {this.renderText()}
                <div className="pt-dialog-footer">
                {this.props.amIPlaying ?  <Button onClick={() => {
                        this.props.completeTutorial()
                    }}>Understood</Button> : <Button disabled onClick={() => {
                        this.props.completeTutorial()
                    }}>Waiting for your turn...</Button>}
                   
                </div>
            </Dialog>
        );
    }
}

export default Tutorial;


