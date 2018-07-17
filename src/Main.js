import React from 'react';
import {Button, Container, Grid, Icon} from 'semantic-ui-react';

<script src="//cdnjs.cloudflare.com/ajax/libs/annyang/2.6.1/annyang.min.js"/>
var annyang = require('annyang');
var stringSimilarity = require('string-similarity');

export default class Main extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            currentPlayer: 'cross',
            grid: {
                upperLeft: undefined,
                upperCenter: undefined,
                upperRight: undefined,
                centerLeft: undefined,
                center: undefined,
                centerRight: undefined,
                lowerLeft: undefined,
                lowerCenter: undefined,
                lowerRight: undefined
            }
        };


        this.targetCell = this.targetCell.bind(this)
        this.concat = this.concat.bind(this)
        this.oneword = this.oneword.bind(this);
    }


    targetCell(cell) {
        console.log(cell);

        //change state
        let newState = {};
        newState.grid = this.state.grid;
        newState.grid[cell] = this.state.currentPlayer;

        this.setState(
           newState
        );

        //switch player
        this.switchPlayer();
    }

    switchPlayer(){
        let otherPlayer = 'circle';
        if(this.state.currentPlayer === 'circle'){
            otherPlayer = 'cross'
        }

        this.setState({
            currentPlayer: otherPlayer
        })
    }

    concat(prefix, cell){
        console.log(prefix + ' ' + cell);

        let prefixMatches = stringSimilarity.findBestMatch(prefix, ['upper', 'center', 'lower']);
        let cellMatches = stringSimilarity.findBestMatch(cell, ['left', 'center', 'right']);

        if(prefixMatches.bestMatch.rating > 0.40 && cellMatches.bestMatch.rating > 0.40){
            this.targetCell(prefixMatches.bestMatch.target+cellMatches.bestMatch.target);
        }
    }


    oneword(cell){
        console.log(cell);

        let matches = stringSimilarity.findBestMatch(cell, ['center', 'reset']);

        if(matches.bestMatch.rating >= 0.40){
            console.log('I am doing it with ' + cell + ' disguised as ' + matches.bestMatch.target)
            if(matches.bestMatch.target === 'reset'){
                this.setState({
                    grid:{}
                })
            }else{
                this.targetCell(matches.bestMatch.target);
            }
        }else {
            console.log('I am ignoring ' + cell + ' with rating ' + matches.bestMatch.rating);
        }
    }

    componentDidMount() {
        if (annyang) {
            // Let's define a command.
            var commands = {
                ':cell': this.oneword,
                ':prefix :cell': this.concat,
            }
        }

        // Add our commands to annyang
        annyang.addCommands(commands);
        // Start listening.
        annyang.start();
    }

    checkCell(cellPosition){
        if(this.state.grid[cellPosition]) {
            let symbol = 'circle outline';
            if(this.state.grid[cellPosition] === 'cross'){
                symbol = 'close';
            }

            return <Icon size='massive' name={symbol}/>;
        }
    }

    render() {
        return <div className="App">
            <Button content={this.state.buttonName}/>
            <Container>
                <Grid celled centered columns={3} className={'gridje'}>
                    <Grid.Row className={'tttrow'}>

                        <Grid.Column verticalAlign={'middle'} className={'tttcell'}>
                            {this.checkCell('upperleft')}
                        </Grid.Column>

                        <Grid.Column verticalAlign={'middle'} className={'tttcell '}>
                            {this.checkCell('uppercenter')}
                        </Grid.Column>

                        <Grid.Column verticalAlign={'middle'} className={'tttcell '}>
                            {this.checkCell('upperright')}
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row className={'tttrow'}>
                        <Grid.Column verticalAlign={'middle'} className={'tttcell '}>
                            {this.checkCell('centerleft')}
                        </Grid.Column>
                        <Grid.Column verticalAlign={'middle'}className={'tttcell '}>
                            {this.checkCell('center')}
                        </Grid.Column>
                        <Grid.Column verticalAlign={'middle'} className={'tttcell '}>
                            {this.checkCell('centerright')}
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row className={'tttrow'}>
                        <Grid.Column verticalAlign={'middle'} className={'tttcell '}>
                            {this.checkCell('lowerleft')}
                        </Grid.Column>
                        <Grid.Column verticalAlign={'middle'} className={'tttcell '}>
                            {this.checkCell('lowercenter')}
                        </Grid.Column>
                        <Grid.Column verticalAlign={'middle'} className={'tttcell '}>
                            {this.checkCell('lowerright')}
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Container>
        </div>
    }
}