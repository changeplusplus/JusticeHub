import React, { Component } from 'react';
import {
    View, Text, Button, TextInput, TouchableOpacity,
    Image, Dimensions, Alert, FlatList, Keyboard, TouchableWithoutFeedback, Linking
} from 'react-native';
import Modal from "react-native-modal";
import * as firebase from 'firebase';
import { SearchBar } from 'react-native-elements';

const { width, height } = Dimensions.get('window');
export default class CaseSearch extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isModalVisible: false,
            caseName: '',
            caseDetails: '',
            caseId: '',
            casesLoaded: false,
            cases: [],
            // FIXME - new states
            search: ''
        };
        this.fetchCases();
    }

    _communicate = (name, phone, email, pref) => {

        //let clientName = get client userName
        let lawyerName = firebase.auth().currentUser.displayName;
        let clientName = "Client :)";
        let greeting = "Hello " + clientName + ", my name is " + lawyerName + ". I saw your case and would like to help.";
        let phoneNumber = +16026514181;

        // FIXME Modal popup - "this client prefers to be contacted by email and can be reached at

        if (!Linking.canOpenURL('whatsapp://app')) {
            alert('Please install WhatsApp to continue')
        } else {
            Linking.openURL('whatsapp://send?text=' + greeting + '&phone=' + phoneNumber)
        }
    };

    _toggleModal = () => {
        this.setState({isModalVisible: !this.state.isModalVisible, caseName: '', caseDetails: '', caseId: ''});
    };


    updateSearch = search => {
        this.setState({ search });
    };

    _communicate = () => {

        let name = firebase.auth().currentUser.displayName;
        let greeting = 'Hello, my name is ' + name + '. I saw your case and would like to help.';
        let phoneNumber = +18132407013;

        if (this.state.commPref === 'Email') {

            // FIXME Modal popup - "this client prefers to be contacted by email and can be reached at
        }

        if (0 === 1) {
            if (!Linking.canOpenURL('whatsapp://app')) {
                alert('Please install WhatsApp to continue')
            } else {
                Linking.openURL(Linking.openURL('whatsapp://send?text=' + greeting + '&phone=' + phoneNumber))
                // FIXME "Hello, my name is <name>. I saw your case and would like to help."
            }
        }
    };


    render() {
        const {search} = this.state;
        if (this.state.casesLoaded)
            return (
                <View style={{
                    flex: 1,
                    flexDirection: 'column',
                    alignItems: 'stretch',
                }}>
                    <SearchBar
                        placeholder="Type Here..."
                        onChangeText={this.updateSearch}
                        value={search}
                    />
                    <View>
                        <TouchableOpacity onPress={this._toggleModal}
                                          style={{
                                              marginRight: 20,
                                              marginBottom: 10,
                                              flex: 1,
                                              alignSelf: 'flex-end',
                                              justifyContent: 'flex-end'
                                          }}>

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
                                <Text h6 style={Jtheme.Text}>Case Name</Text>
                                <Text style={Jtheme.InputText}>{this.state.caseName}</Text>
                                <Text h6 style={Jtheme.Text}>Case Details</Text>
                                <Text style={Jtheme.InputText}>{this.state.caseDetails}</Text>
                                <Button style={Jtheme.Button} title='Connect' onPress={this._communicate}/>
                            </View>
                        </TouchableWithoutFeedback>
                    </Modal>
                </View>);
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

    renderListItem(item) {
        //if it contains the search term

        if(item.caseName.includes(this.state.search)||item.caseDetails.includes(this.state.search)) {
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
                    <Text style={{
                        color: 'black',
                        textAlign: 'center',
                        textAlignVertical: 'center'
                    }}>{item.caseName}</Text>
                </TouchableOpacity>
            );
        }
    }

    fetchCases = () => {
        let user = firebase.auth().currentUser;
        let caseList = firebase.database().ref("users/" + user.uid + "/cases/");
        let userIds = firebase.database().ref("users/");
        let stateVar = this;
        let caseArr = [];
        userIds.once('value', function (snapshot) {
            let obj = snapshot.val();
            for (let userId in obj) {
                console.log(userId);
                let caseList = firebase.database().ref("users/" + userId+ "/cases/");
                caseList.once('value', function (snapshot) {
                    let cases = snapshot.val();
                    for(let caseId in cases){
                        caseArr.push(cases[caseId]);
                        caseArr[caseArr.length - 1].caseId = caseId;
                        console.log(caseId);
                        console.log()
                        console.log(caseArr.length+"\n");
                    }
                    stateVar.setState({cases: caseArr});
                }).then(()=>{
                    // indicate a single case loaded
                }).catch((error) => {
                    Alert.alert("Case Fetch Failed", error);
                });
            }

        })
            .then(() => {
                this.setState({casesLoaded: true})
            })
            .catch((error) => {
                Alert.alert("Case Fetch Failed", error);
            });


    };



    mainScreen = () => {

        return (

            <View
                style={{flex: 1, justifyContent: 'space-evenly'}}>

                <FlatList
                    data={this.state.cases}
                    keyExtractor={(item) => item.caseName}
                    renderItem={({item}) => this.renderListItem(item)}
                    ItemSeparatorComponent={() => {
                        return (<View style={{height: 5}}/>)
                    }}
                />
                <Button onPress={() => {this.props.navigation.navigate('LawyerProfile')}} title='Profile'/>
            </View>
        )

    };

    loadingScreen = () => {
        return (
            <View style={{flexDirection: 'row'}}>
                <Text style={{
                    fontSize: 32,
                    fontWeight: 'bold',
                    textAlign: 'center'
                }}>Fetching Cases </Text>
                <Image
                    source={require('./loadingGif.gif')}
                    style={{
                        width: 50,
                        height: 50,
                    }}/>
            </View>
        )
    };

}

const Jtheme = {

    backgroundColor: '#112853',

    BackButton: {
        color: '#cc7832',
        paddingLeft: 0,
        paddingRight: 0,
        paddingTop: 0,
        paddingBottom: 100,
        marginTop: -5,
        position: 'absolute', // add if dont work with above
    },

    Button: {
        color: '#cc7832',
        paddingLeft: 70,
        paddingRight: 70,
        paddingTop: 10,
        paddingBottom: 10,
    },

    Container: {
        flex: 1,
        color: '#cc7832',
        backgroundColor: '#112853',
        flexDirection: 'column',
        justifyContent: 'center',
        borderColor: '#111111',
        borderWidth: 1,
    },

    Input: {
        flex: 1,
        backgroundColor: '#111111',
        flexDirection: 'column',
        justifyContent: 'center',
        borderColor: '#111111',
        borderWidth: 3,
        paddingLeft: 50,
    },

    Text: {
        fontWeight: 'bold',
        flexDirection: 'column',
        color: '#112853',
        justifyContent: 'center',
        fontSize: 20,
        paddingTop: 5,
        paddingLeft: 10,
        paddingRight: 10,
        borderTopWidth: 7,
        borderBottomWidth: 3
    },

    InputText: {
        fontWeight: 'bold',
        flexDirection: 'column',
        flex: .5,
        color: '#112853',
        justifyContent: 'center',
        fontSize: 15,
        paddingBottom: 5,
        paddingLeft: 10,
        paddingRight: 50,
    },

};