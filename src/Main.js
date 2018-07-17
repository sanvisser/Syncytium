import React from 'react';
import {Button, Icon} from 'semantic-ui-react';
<script src="//cdnjs.cloudflare.com/ajax/libs/annyang/2.6.1/annyang.min.js"/>

export default class Main extends React.Component {


    componentDidMount(){
        if (annyang) {
            // Let's define a command.
            var commands = {
                'hello': function() { alert('Hello world!'); }
            };

            // Add our commands to annyang
            annyang.addCommands(commands);

            // Start listening.
            annyang.start();
        }
    }

    render() {
        return <div className="App">
            <Button>hoi</Button>
            <Icon size="massive" loading name='houzz'/>
        </div>
    }
}