import React, { Component } from "react";
import {
    View,
    Text,
    Button
} from "react-native";



export default class CaseScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            title: '',
            description: '',
            hasConnected: ''
        };
    }

    render(){
        return(
            <View>
                <Text>{this.state.title}</Text>
                <Text>{this.state.description}</Text>
                <Button title="Connect" onPress={}/>
            </View>
        );
    }
}


ls
