import React from 'react';
import {Grid, Segment} from 'semantic-ui-react';
import VisArea from "./components/VisArea";
import ControlPanel from "./components/ControlPanel";

export default class Main extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return <div className="App">
            <Segment attached>
                <Grid stretched>
                    <Grid.Row>
                        <Grid.Column stretched className='controlPanelWrapper' width={4}>
                            <ControlPanel className='controlPanel'/>
                        </Grid.Column>
                        <Grid.Column stretched className='visAreaWrapper' width={12}>
                            <VisArea className='visArea'/>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Segment>
        </div>
    }
}