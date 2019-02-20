import React, { Component } from 'react';
import {View, Text, Button, TextInput} from 'react-native';
import {ModalProps} from "react-native-modal";
import * as firebase from 'firebase';

//TODO Implement Modal to make add case pop up from the case list
export default class ClientCases extends Component {
    constructor(props){
        super(props);
        this.state = {
            caseName: '',
            caseDetails: ''
        };
    }


    render() {
        return (
            <View style={{
                flex: 1,
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <Text>Name of Case</Text>
                <TextInput
                    placeholder="title"
                    onChangeText={(text) => this.state.caseName = text}
                />
                <Text>Case Details</Text>
                <TextInput
                    placeholder="description"
                    onChangeText={(text) => this.state.caseDetails = text}
                />
                <Button onPress={this.submitCase} title='Submit Case' />
                <Button onPress={this.clearCases} title='Clear Cases' />
            </View>
        )
    }

    submitCase = () => {
        const { caseName, caseDetails } = this.state;
        let user = firebase.auth().currentUser;
        let caseTest = firebase.database().ref("users/" + user.uid + "/cases/");
        caseTest.push({
            caseName : caseName,
            caseDetails : caseDetails
        })
            .then(() =>{
                alert("Case added successfully!");
            })
            .catch((error) =>{
                alert(error);
            })
    };

    clearCases = () => {
        let user = firebase.auth().currentUser;
        let caseTest = firebase.database().ref("users/" + user.uid + "/cases/");
        caseTest.set({})
            .then(() =>{
                alert("Cases Cleared");
            })
            .catch((error) =>{
                alert(error);
            })
    };
}