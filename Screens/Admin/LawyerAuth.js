/**
 * Copyright 2019 Change++ (changeplusplus.org)
 * File Name: LawyerAuth.js
 * Authors: Jarrett Perkins
 * Description: Implements the admin feature to allow lawyers to verify users are lawyers
 * Last Edited: 5.15.19
 */

import React, { Component } from 'react';
import {
    View, Text, Button, TextInput, TouchableOpacity,
    Image, Dimensions, Alert, FlatList, Keyboard, TouchableWithoutFeedback, Linking
} from 'react-native';
import Modal from "react-native-modal";
import * as firebase from 'firebase';

const { width, height } = Dimensions.get('window');
export default class LawyerAuth extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isModalVisible: false,
            lawyerName: '',
            lawyerId: '',
            avail: '',
            bar: '',
            email: '',
            experience: '',
            firm: '',
            location: '',
            phoneNumber: '',
            radius: '',
            lawyersLoaded: false,
            lawyers: []
        };
        this.fetchLawyers();
    }


    _toggleModal = () => {
        this.setState({isModalVisible: !this.state.isModalVisible});
    };

    _authorize = () => {
      const {lawyerId} = this.state;
      firebase.database().ref('lawyerProfiles/' + lawyerId + '/authorized').set(true);
      this.fetchLawyers();
      this._toggleModal();
    }

    _deny = () => {
      const {lawyerId} = this.state;
      firebase.database().ref('lawyerProfiles/' + lawyerId).remove();
      this.fetchLawyers();
      this._toggleModal();
    }

    render() {
      const {isModalVisible, lawyerName, lawyerId, avail, bar, email, experience, firm, location, phoneNumber, radius, lawyersLoaded, lawyers} = this.state;
        if (lawyersLoaded)
        return (
            <View style={{
                flex: 1,
                flexDirection: 'column',
                alignItems: 'stretch',
            }}>
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
                <Modal isVisible={isModalVisible}
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

                            <Text style={Jtheme.Text}>Lawyer Name:
                                <Text h6 style={Jtheme.InputText}>{lawyerName}</Text>
                            </Text>
                            <Text style={Jtheme.Text}>Email:
                                <Text h6 style={Jtheme.InputText}>{email}</Text>
                            </Text>
                            <Text style={Jtheme.Text}>Phone Number:
                                <Text h6 style={Jtheme.InputText}>{phoneNumber}</Text>
                            </Text>
                            <Text style={Jtheme.Text}>Firm:
                                <Text h6 style={Jtheme.InputText}>{firm}</Text>
                            </Text>
                            <Text style={Jtheme.Text}>Bar:
                                <Text h6 style={Jtheme.InputText}>{bar}</Text>
                            </Text>
                            <Text style={Jtheme.Text}>Experience:
                                <Text h6 style={Jtheme.InputText}>{experience}</Text>
                            </Text>
                            <Text style={Jtheme.Text}>Location:
                                <Text h6 style={Jtheme.InputText}>{location}</Text>
                            </Text>
                            <Text style={Jtheme.Text}>Radius:
                                <Text h6 style={Jtheme.InputText}>{radius}</Text>
                            </Text>
                            <Text style={Jtheme.Text}>Availability:
                                <Text h6 style={Jtheme.InputText}>{avail}</Text>
                            </Text>


                            <Button style={Jtheme.Button}
                                    title='Authorize'
                                    onPress={this._authorize} />
                            <Button style={Jtheme.Button}
                                    title='Deny'
                                    onPress={this._deny} />
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
                            this.setState({
                                lawyerName: item.fullName,
                                lawyerId: item.lawyer,
                                avail: item.avail,
                                bar: item.bar,
                                email: item.email,
                                experience: item.experience,
                                firm: item.firm,
                                location: item.location,
                                phoneNumber: item.phoneNumber,
                                radius: item.radius
                            });
                            this._toggleModal();
                        }}>
                        <Text style={{
                            color: 'black',
                            textAlign: 'center',
                            textAlignVertical: 'center'
                        }}>{item.fullName}</Text>
                    </TouchableOpacity>
                );
            }

    fetchLawyers = () => {
        let user = firebase.auth().currentUser;
        let lawyers = firebase.database().ref("lawyerProfiles/");
        let stateVar = this;
        let lawyerArr = [];
        lawyers.once('value', function (snapshot) {
            let obj = snapshot.val();
            for (let lawyer in obj) {
                if (obj[lawyer].authorized == false) {
                  lawyerArr.push(obj[lawyer]);
                  lawyerArr[lawyerArr.length - 1].lawyer = lawyer;
                }
                console.log(lawyer);
          }
          stateVar.setState({lawyers: lawyerArr});
        })
        .then(() => {
            this.setState({lawyersLoaded: true})
        })
        .catch((error) => {
            Alert.alert("Lawyer Fetch Failed", error);
        });


    };



    mainScreen = () => {
        return (

            <View
                style={{flex: 1, justifyContent: 'space-evenly'}}>
                <FlatList
                    data={this.state.lawyers}
                    keyExtractor={(item) => item.lawyerName}
                    renderItem={({item}) => this.renderListItem(item)}
                    ItemSeparatorComponent={() => {
                        return (<View style={{height: 5}}/>)
                    }}
                />
                <Button onPress={() => {this.props.navigation.navigate('AdminProfile')}} title='Back to Profile'/>
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
                }}>Fetching Lawyers </Text>
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
