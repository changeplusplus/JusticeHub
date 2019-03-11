import React, { Component } from 'react';
import {View, Text, Button, TextInput, TouchableOpacity,
    Image, Dimensions, Alert, FlatList, Keyboard, TouchableWithoutFeedback} from 'react-native';
import Modal from "react-native-modal";
import * as firebase from 'firebase';

const { width, height } = Dimensions.get('window');
export default class ClientCases extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isModalVisible: false,
            caseName: '',
            caseDetails: '',
            caseId: '',
            casesLoaded: false,
            cases:[]
        };
        this.fetchCases();
    }

    _toggleModal = () => {
        this.setState({ isModalVisible: !this.state.isModalVisible, caseName:'', caseDetails:'', caseId:''});
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
                        flex: .15,
                        backgroundColor: 'blue'
                    }}>
                        <TouchableOpacity onPress={this._toggleModal}
                                          style={{
                                              marginRight: 20,
                                              marginBottom: 10,
                                              flex:1,
                                              alignSelf: 'flex-end',
                                              justifyContent: 'flex-end'
                                          }}>
                            <Image
                                source={require('./addCaseButton.png')}
                                style={{width:40, height:40}}
                            />
                        </TouchableOpacity>
                    </View>
                    <View style={{
                        flex: 1,
                        flexDirection: 'column',
                        justifyContent: 'center',
                        marginVertical: 50,
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
                        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                            <View style={{
                                flex: .75,
                                flexDirection: 'column',
                                justifyContent: 'center',
                                alignItems: 'center',
                                backgroundColor: 'white',
                                borderRadius: 70,
                                borderWidth: 0,
                            }}>
                                <Text>Case Name</Text>
                                <TextInput
                                    placeholder="title"
                                    defaultValue={this.state.caseName}
                                    onChangeText={(text) => this.setState({caseName: text})}
                                />
                                <Text style={{borderTopWidth:7, borderBottomWidth: 3}}>Case Details</Text>
                                <TextInput
                                    style={{flex: .5}}
                                    multiline={true}
                                    placeholder="description"
                                    defaultValue={this.state.caseDetails}
                                    width={250}
                                    maxLength={400}
                                    borderWidth={1}
                                    textAlign={'center'}
                                    onChangeText={(text) => this.setState({caseDetails: text})}
                                />
                                <Button onPress={this.submitCase} title='Submit Case' />
                            </View>
                        </TouchableWithoutFeedback>
                    </Modal>
                </View>
            );
        else
            return (
                <View style={{
                    flex: 1,
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center'

                }}>
                    {this.loadingScreen()}
                </View>
            );
        }

    renderListItem(item){
        return (
            <TouchableOpacity
                style={{
                    backgroundColor: 'white',
                    borderRadius: 3,
                    borderWidth: 1,
                    borderColor: '#CED0CE',
                    width: width,
                    height: 50
                }}
                onPress={() => {
                    this._toggleModal();
                    this.setState({caseName: item.caseName, caseDetails: item.caseDetails, caseId: item.caseId});
                }}>
                <Text style={{color:'black', textAlign:'center', textAlignVertical:'center'}}>{item.caseName}</Text>
            </TouchableOpacity>
        );
    }

    fetchCases = () => {
        let user = firebase.auth().currentUser;
        let caseList = firebase.database().ref("users/" + user.uid + "/cases/");
        let stateVar = this;
        caseList.once('value', function(snapshot){
            let caseArr = [];
            let obj = snapshot.val();
            for (let caseId in obj){
                caseArr.push(obj[caseId]);
                caseArr[caseArr.length-1].caseId = caseId;
            }
            stateVar.setState({cases: caseArr});
        })
            .then(() => {this.setState({casesLoaded:true})})
            .catch((error) => {
                Alert.alert("Case Fetch Failed", error);
            });
    };

    submitCase = () => {
        const { caseName, caseDetails, caseId} = this.state;
        let user = firebase.auth().currentUser;
        let caseList = firebase.database().ref("users/" + user.uid + "/cases/");
        let stateVar = this;
        if  (caseId === ''){
            caseList.push({caseName : caseName, caseDetails : caseDetails})
                .then(() =>{
                    Alert.alert(
                        'Alert',
                        'Case added successfully!',
                        [{text: 'OK', onPress: () => {stateVar._toggleModal()}}]
                    );
                })
                .catch((error) =>{
                    Alert.alert('Error', error, [{text: 'OK', onPress: () => stateVar._toggleModal()}]);
                });
        } else{
            caseList.child(caseId).set({caseName : caseName, caseDetails : caseDetails})
                .then(() =>{
                    Alert.alert(
                        'Alert',
                        'Case edited successfully!',
                        [{text: 'OK', onPress: () => {stateVar._toggleModal()}}]
                    );
                })
                .catch((error) =>{
                    Alert.alert('Error', error, [{text: 'OK', onPress: () => stateVar._toggleModal()}]);
                });
        }

        this.fetchCases();
    };

    clearCases = () => {
        let user = firebase.auth().currentUser;
        let caseList = firebase.database().ref("users/" + user.uid + "/cases/");
        caseList.set({})
            .then(() =>{
                Alert.alert(
                    'Alert',
                    'Cases Cleared',
                    [{text: 'OK', onPress: this.fetchCases}]
                );
            })
            .catch((error) =>{
                alert(error);
            });
    };

    mainScreen = () => {
        if (this.state.cases.length === 0){
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
                <View
                    style={{flex:1, justifyContent: 'space-evenly'}}>
                    <FlatList
                        data={this.state.cases}
                        keyExtractor={(item) => item.caseName}
                        renderItem={({item}) => this.renderListItem(item)}
                        ItemSeparatorComponent={() => {return (<View style={{height:5}}/>)}}
                    />
                    <Button onPress={this.clearCases} title='Clear Cases' />
                </View>
            )
        }
    };

    loadingScreen = () => {
        return(
            <View style={{flexDirection:'row'}}>
                <Text style={{
                    fontSize:32,
                    fontWeight:'bold',
                    textAlign: 'center'
                }}>Fetching Cases  </Text>
                <Image
                    source={require('./loadingGif.gif')}
                    style={{
                        width:50,
                        height: 50,
                    }}/>
            </View>
        )
    };
}