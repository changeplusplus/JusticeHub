import React, { Component } from 'react';
import {View, Text, Button, TextInput, TouchableOpacity, Image, Dimensions} from 'react-native';
import Modal from "react-native-modal";
import * as firebase from 'firebase';

//TODO Implement Modal to make add case pop up from the case list
const { width, height } = Dimensions.get('window');
export default class ClientCases extends Component {
    state = {
        isModalVisible: false,
        caseName: '',
        caseDetails: ''
    };
    _toggleModal = () => {
        this.setState({ isModalVisible: !this.state.isModalVisible });
        // alert(height-50);
    }
    render() {
        return (
            <View style={{
                flex: 1,
                flexDirection: 'column',
                justifyContent: 'flex-start',
                // marginBottom: (height-100),
                alignItems: 'center',
                // backgroundColor: 'blue'
            }}>
                <View style={{
                    width: width,
                    height: 100,
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
                    <Text style={{
                        fontSize:32,
                        fontWeight:'bold',
                        textAlign: 'center'
                    }}>
                        Click + sign to add a case
                    </Text>
                    <Button onPress={this.clearCases} title='Clear Cases' />
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
        this._toggleModal();
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