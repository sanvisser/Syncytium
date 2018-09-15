import React from "react";
import {Container} from "semantic-ui-react";


export default class ControlPanel extends React.Component{

    constructor(props){
        super(props);

        this.state = {};

    }

    render(){
        return<Container>
            This is the actually control panel
        </Container>
    }
}