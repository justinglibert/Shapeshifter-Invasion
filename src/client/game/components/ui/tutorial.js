import { Button, Dialog, Icon, Intent } from "@blueprintjs/core";
import React from 'react';
class Tutorial extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render() {
        return (
            <Dialog isOpen={true}  isCloseButtonShown={false} title="Message From DELTA">
                <div className="pt-dialog-body" style={{display: 'flex', flexDirection: 'column', alignItems:'center', justifyContent: 'space-between'}}>
                    <Icon icon={"delta"} iconSize={100} intent={Intent.PRIMARY} />
                    <p style={{marginTop: '20px'}}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce malesuada urna vulputate enim vulputate egestas. Nullam nunc augue, dictum vitae vestibulum quis, vulputate at sapien. Vivamus dignissim nulla non massa commodo condimentum. In hac habitasse platea dictumst. Sed vehicula congue leo. Nulla id laoreet erat. Aliquam ac vehicula turpis, sed eleifend nulla. Vivamus interdum ante sit amet purus mattis, at iaculis eros luctus. Suspendisse placerat leo ut nulla cursus pulvinar eget quis magna.

Suspendisse semper felis eget neque volutpat vehicula. Donec diam felis, mollis non feugiat at, congue ac nisl. Aliquam vitae nibh blandit, sagittis nunc vitae, cursus odio. Integer ut eros varius, dapibus nibh eget, tempor erat. Cras nec dolor turpis. Fusce ut vehicula turpis, nec pellentesque lectus. Pellentesque commodo scelerisque dui, ac molestie mauris consectetur sit amet. In dui mi, scelerisque in tincidunt nec, convallis in augue. Pellentesque molestie velit vel vestibulum ultrices. Phasellus varius euismod arcu, ac cursus velit. Etiam at ante ac magna facilisis tincidunt. Phasellus tempus, tortor sed dignissim porttitor, est est cursus sapien, ullamcorper facilisis nisi ex ut lectus.</p>
                </div>
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


