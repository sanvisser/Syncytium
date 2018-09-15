import React from "react";
import {Edge, Network, Node} from "react-vis-network";


export default class VisArea extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            token: '',
            nodes: [],
            edges: []
        };

        this.getChildList = this.getChildList.bind(this);
        this.startFromRoot = this.startFromRoot.bind(this);
    }

    componentWillMount() {
        setInterval(this.startFromRoot(), 3000);
    }

    get(url, options = {}, token) {
        options.headers = {
            Authorization: 'Bearer ' + token
        };

        return fetch(url, options)
            .then(function (response) {
                return response.json();
            })
            .catch(function (reason) {
                console.log('error: ' + reason)
            });
    }

    startFromRoot() {
        //TODO assuming here for now there are configurations build and we have the root already
        let root = 'some url';

        this.getChildList(root);
    }

    getChildList(url) {
        this.get(url, {}, this.state.token).then(function (children) {
            let childList = children || [];
            for (let child of childList) {
                this.state.nodes.push({id: child.id, label: child.original.name.displayName, color: "#b0f2dd"});
                this.state.edges.push({to: child.id, from: url});
                this.getChildList(child.id);
            }
        })
    }

    render() {
        return <Network>
            <Node id="vader" label="Darth Vader"/>
            <Node id="luke" label="Luke Skywalker"/>
            <Node id="leia" label="Leia Organa"/>
            <Edge id="1" from="vader" to="luke"/>
            <Edge id="2" from="vader" to="leia"/>
        </Network>
    }

}