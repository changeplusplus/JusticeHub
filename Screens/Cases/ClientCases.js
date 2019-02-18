import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';
import {ModalProps} from "react-native-modal";
import * as firebase from 'firebase';
import {InputBlock} from "../../Components/InputBlock";


export default class ClientCases extends Component {
    state = {
        caseType: '',
        caseDetails: ''
    };

    render() {
        return (
            <View>
                <Text>Submit Case</Text>
                <InputBlock item='Type of case'
                            state='caseType'
                            onChangeText={(caseType) => this.state.caseType = caseType}/>
                <InputBlock item='Case Details'
                            state='caseDetails'
                            onChangeText={(caseDetails) => this.state.caseDetails = caseDetails}/>

                <Button onPress={this._submitCase} title='Submit Case' />
            </View>
        )
    }

    _submitCase = () => {
        const { caseType, caseDetails } = this.state;

        let user = firebase.auth().currentUser;
        alert(user.email);
        firebase.auth().signOut();
        // firebase.database().ref('Cases/' + userId).update({
        //     caseType: caseType,
        //     caseDetails: caseDetails
        // });

    };
}