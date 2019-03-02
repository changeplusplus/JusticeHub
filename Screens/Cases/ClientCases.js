import React, { Component } from 'react';
import {View, Text, Button, TextInput, TouchableOpacity, Image} from 'react-native';
import Modal from "react-native-modal";
import * as firebase from 'firebase';

//TODO Implement Modal to make add case pop up from the case list
export default class ClientCases extends Component {
    // constructor(props){
    //     super(props);
    //     this.state = {
    //         caseName: '',
    //         caseDetails: ''
    //     };
    // }
    state = {
        isModalVisible: false,
        caseName: '',
        caseDetails: ''
    };

    _toggleModal = () =>
        this.setState({ isModalVisible: !this.state.isModalVisible });
    render() {
        return (
            <View style={{
                flex: 1,
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <TouchableOpacity onPress={this._toggleModal}>
                    <Image style={{width:50, height: 50}}
                        source={require('./addCaseButton.png')}/>
                </TouchableOpacity>
                <Modal isVisible={this.state.isModalVisible}
                        animationIn='bounceInUp'
                        animationInTiming={2000}
                        hasBackdrop={false}
                        backdropColor='blue'>
                    <View style={{
                        flex: .75,
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: 'white'
                    }}>
                        <Text>Name of Case</Text>
                        <TextInput
                            placeholder="title"
                            onChangeText={(text) => this.setState({caseName: text})}
                        />
                        <Text>Case Details</Text>
                        <TextInput
                            placeholder="description"
                            onChangeText={(text) => this.setState({caseDetails: text})}
                        />
                        <Button onPress={this.submitCase} title='Submit Case' />
                        <Button onPress={this.clearCases} title='Clear Cases' />
                        <TouchableOpacity onPress={this._toggleModal}>
                            <Text>Hide me!</Text>
                        </TouchableOpacity>
                    </View>
                </Modal>
            </View>
        )
    }

    submitCase = () => {
        const { caseName, caseDetails } = this.state;
        let user = firebase.auth().currentUser;
        let caseTest = firebase.database().ref("users/" + user.uid + "/cases/");
        // caseTest.once('value', function(snapshot){
        //     let test = snapshot.val()['-LZakK1a8-T3LcrxL2uV']['caseName'];
        //     alert(test);
        // });
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