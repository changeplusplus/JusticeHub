/**
 * Copyright 2019 Change++ (changeplusplus.org)
 * File Name: Signup.js
 * Authors: Jarrett Perkins
 * Description: Implements the sign up feature to authenticate users
 * Last Edited: 5.15.19
 */


import React, {Component} from 'react';
import * as firebase from 'firebase';
import {
    View, KeyboardAvoidingView, TextInput, Picker
} from 'react-native';
import I18n from '../../Utils/i18n';
import {Button, Text} from "react-native-elements";

export default class SignUp extends Component {
    constructor(props) {
        super(props);

        console.log('Signup:', I18n.curLang);
    }

    state = {
        fullName: '',
        password: '',
        phone: '',
        email: '',
        isLawyer: false
    };

    render() {
        return (
            <View style={{flex: 1, alignItems: "center", justifyContent: "center"}}>
                <Text h3 style={Jtheme.Text}>{I18n.curLang.signup_page.title}</Text>
                <KeyboardAvoidingView behavior='padding'>

                    <TextInput style={Jtheme.InputText}
                               placeholder={I18n.curLang.signup_page.name_place}
                               state='fullName'
                               onChangeText={(fullName) => this.setState({fullName})}/>

                    <TextInput style={Jtheme.InputText}
                               placeholder={I18n.curLang.signup_page.pass_place}
                               state='password'
                               onChangeText={(password) => this.setState({password})}/>

                    <TextInput style={Jtheme.InputText}
                               placeholder={I18n.curLang.signup_page.phone_place}
                               state='phone'
                               keyboardType='number-pad'
                               onChangeText={(phone) => this.setState({phone})}/>

                    <TextInput style={Jtheme.InputText}
                               placeholder={I18n.curLang.signup_page.email_place}
                               state='email'
                               onChangeText={(email) => this.setState({email})}/>

                    <Text h5 style={Jtheme.Text}>{I18n.curLang.signup_page.user_type}</Text>

                    <Picker selectedValue={this.state.isLawyer}
                            onValueChange={(itemValue) => this.setState({isLawyer: itemValue})}>

                        <Picker.Item label={I18n.curLang.signup_page.lawyer} value={true}/>
                        <Picker.Item label={I18n.curLang.signup_page.client} value={false}/>
                    </Picker>

                    <Button style={Jtheme.Button} onPress={this._signUp} title={I18n.curLang.signup_page.signup}/>
                </KeyboardAvoidingView>
            </View>
        )
    }

    _signUp = () => {
        const {fullName, password, phone, email, isLawyer} = this.state;

        if (fullName.trim() === '' || password.trim() === '' ||
            phone.trim() === '') {
            alert(I18n.curLang.signup_page.fail_alert);
            return;
        }

        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(() => {
                // Get userId
                let userId = firebase.auth().currentUser.uid;
                if (isLawyer) {
                    // Set lawyer data gets put in a lawyer user section in database
                    firebase.database().ref('lawyerProfiles/' + userId).set({
                        fullName: fullName,
                        email: email,
                        phoneNumber: phone,
                        isLawyer: isLawyer,
                        experience: '',
                        bar: '',
                        firm: '',
                        location: '',
                        radius: '',
                        avail: '',
                        expertise: {
                            theft: false,
                            drug: false,
                            violent: false,
                            other: ''
                        },
                        language: I18n.getLangKey()
                    });
                }
                else {
                    //for clients it begins their case profile
                    firebase.database().ref('cases/' + userId).set({
                        fullName: fullName,
                        email: email,
                        phoneNumber: phone,
                        language: I18n.getLangKey()
                    });
                }

                alert('Account successfully created!');

                // DataStorage.saveLogin(email, password);
                //
                // // Store basic data
                // DataStorage.FULL_NAME = fullName;
                // DataStorage.EMAIL = email;
                // DataStorage.PHONE_NUM = phone;
                // DataStorage.IS_LAWYER = isLawyer;

                const {navigate} = this.props.navigation;

                if (isLawyer) {
                    navigate('SetupLawyerProfile');
                } else {
                    navigate('ClientProfile');
                }
            })
            .catch((error) => {
                alert('Error: ' + error.message);
            })
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
        paddingTop: 0,
        paddingBottom: 5,
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
        paddingBottom: 20,
        paddingLeft: 10,
        paddingRight: 10,
    },

    InputText: {
        fontWeight: 'bold',
        flexDirection: 'column',
        color: '#112853',
        justifyContent: 'center',
        fontSize: 20,
        paddingBottom: 30,
        paddingLeft: 10,
        paddingRight: 50,
    },

};
