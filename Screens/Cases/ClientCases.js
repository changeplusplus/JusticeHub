import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';
import {ModalProps} from "react-native-modal";
import * as firebase from 'firebase';
import {InputBlock} from "../../Components/InputBlock";

//TODO Implement Modal to make add case pop up from the case list
export default class ClientCases extends Component {
    state = {
        caseName: '',
        caseDetails: ''
    };

    render() {
        return (
            <View style={{
                flex: 1,
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <InputBlock item='Name of Case'
                            state='caseName'
                            onChangeText={(caseName) => this.state.caseName = caseName}/>
                <InputBlock item='Case Details'
                            state='caseDetails'
                            onChangeText={(caseDetails) => this.state.caseDetails = caseDetails}/>

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