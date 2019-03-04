import React, { Component } from 'react';
import {View, Text, Button, TextInput, TouchableOpacity, Image, Dimensions, Alert} from 'react-native';
import Modal from "react-native-modal";
import SignUp  from  "../Auth/SignUp";
import * as firebase from 'firebase';
import Video from "expo/build/av/Video";

//TODO Implement Modal to make add case pop up from the case list
const { width, height } = Dimensions.get('window');
export default class ClientCases extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isModalVisible: false,
            caseName: '',
            caseDetails: '',
            numCases: 0,
            casesLoaded: false
        };
        this.setNumCases();
    }

    _toggleModal = () => {
        this.setState({ isModalVisible: !this.state.isModalVisible });
    };

    render() {
        if (this.state.casesLoaded)
            return (
                <View style={{
                    flex: 1,
                    flexDirection: 'column',
                    alignItems: 'stretch',
                }}>
                    <View style={{
                        flex: .2,
                        backgroundColor: 'blue'
                    }}>
                        <TouchableOpacity onPress={this._toggleModal}
                                          style={{
                                              marginTop: 50,
                                              marginRight: 25,
                                              marginBottom: 15,
                                              alignSelf: 'flex-end'
                                          }}>
                            <Image
                                source={require('./addCaseButton.png')}
                                style={{
                                    width:40,
                                    height: 40}}/>
                        </TouchableOpacity>
                    </View>
                    <View style={{
                        flex: 1,
                        flexDirection: 'column',
                        justifyContent: 'center',
                        marginVertical: 50,
                        marginHorizontal: 20,
                        alignItems: 'center'

                    }}>
                        {this.mainScreen()}
                    </View>
                    <Modal isVisible={this.state.isModalVisible}
                           animationIn='bounceIn'
                           animationInTiming={700}
                           hasBackdrop={false}
                           backdropColor='blue'
                           backdropOpacity={.4}
                           onBackdropPress={this._toggleModal}>

                        <View style={{
                            flex: .75,
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                            backgroundColor: 'white',
                            borderRadius: 70,
                            borderWidth: 0,
                        }}>
                            <Text>Name of Case</Text>
                            <TextInput
                                placeholder="title"
                                onChangeText={(text) => this.setState({caseName: text})}
                            />
                            <Text style={{borderTopWidth:7, borderBottomWidth: 3}}>Case Details</Text>
                            <TextInput
                                style={{flex: .5}}
                                multiline={true}
                                placeholder="description"
                                width={250}
                                maxLength={400}
                                borderWidth={1}
                                textAlign={'center'}
                                onChangeText={(text) => this.setState({caseDetails: text})}
                            />
                            <Button onPress={this.submitCase} title='Submit Case' />
                        </View>
                    </Modal>
                </View>
            );
        else
            return null;
        }

    mainScreen = () => {
        if (this.state.numCases === 0){
            return (
                <View>
                    <Text style={{
                        fontSize:32,
                        fontWeight:'bold',
                        textAlign: 'center'
                    }}>
                        Click + sign to add a case
                    </Text>
                    <Button onPress={this.clearCases} title='Clear Cases' />
                </View>
        );
        } else{
            return (
                <View>
                    <Text>It Worked!</Text>
                    <Text>{this.state.numCases}</Text>
                    <Button onPress={this.clearCases} title='Clear Cases' />
                </View>
            )
        }
        // caseTest.once('value', function(snapshot){
        //     let test = snapshot.val()['-LZakK1a8-T3LcrxL2uV']['caseName'];
        //     alert(test);
        // });
    };

    setNumCases = () => {
        let user = firebase.auth().currentUser;
        let caseTest = firebase.database().ref("users/" + user.uid + "/cases/");
        let stateVar = this;
        caseTest.once('value', function(snapshot){})
            .then((snapshot) => {
                stateVar.setState({numCases: snapshot.numChildren(), casesLoaded: true});
            });
    };

    submitCase = () => {
        const { caseName, caseDetails } = this.state;
        let user = firebase.auth().currentUser;
        let caseList = firebase.database().ref("users/" + user.uid + "/cases/");
        let stateVar = this;
        caseList.push({
            caseName : caseName,
            caseDetails : caseDetails
        })
            .then(() =>{
                Alert.alert(
                    'Alert',
                    'Case added successfully!',
                    [{text: 'OK', onPress: () => {
                        caseList.once('value', function(snapshot){
                            stateVar.setState({numCases: snapshot.numChildren()});
                        });
                        stateVar._toggleModal();
                    }}]
                );

            })
            .catch((error) =>{
                Alert.alert(
                    'Error',
                    error,
                    [{text: 'OK', onPress: () => this._toggleModal()}]
                );
            });
    };

    clearCases = () => {
        let user = firebase.auth().currentUser;
        let caseList = firebase.database().ref("users/" + user.uid + "/cases/");
        let stateVar = this;
        caseList.set({})
            .then(() =>{
                Alert.alert(
                    'Alert',
                    'Cases Cleared',
                    [{text: 'OK', onPress: () => {
                        caseList.once('value', function(snapshot){
                            stateVar.setState({numCases: snapshot.numChildren()});
                        });
                    }}]
                );
            })
            .catch((error) =>{
                alert(error);
            });
    };
}