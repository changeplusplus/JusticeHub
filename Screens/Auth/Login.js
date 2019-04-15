/**
 * Copyright 2019 Change++ (changeplusplus.org)
 * File Name: Login.js
 * Authors: Jarrett Perkins
 * Description: Implements login feature to allow a user to login into their account
 * Last Edited: 5.15.19
 */

import React, {Component} from 'react';
import * as firebase from 'firebase';
import {TextInput, StyleSheet, ScrollView, Platform, NativeModules, Picker} from 'react-native';
import {InputBlock} from "../../Components/InputBlock";
import DataStorage from "../../DataStorage";
import I18n from '../../Utils/i18n';
//import Icon from 'react-native-vector-icons/FontAwesome';
import {Button, Text, ThemeConsumer, ThemeProvider} from "react-native-elements";

class Login extends Component {
    static navigationOptions = {
        header: null
    };

    state = {
        email: '',
        password: '',
        currentLanguage: 'English',
    };

    render() {
        return (
            <ThemeProvider style={[Jtheme.backgroundColor, Jtheme.MainContainer]}>
                <ScrollView>

                <Text h1 style={Jtheme.Text}>{I18n.curLang.login_page.welcome}</Text>
                <Text h4 style={Jtheme.Text}>{I18n.curLang.login_page.desc}</Text>

                <TextInput style={Jtheme.InputText}
                           placeholder={I18n.curLang.login_page.email}
                           state='email'
                           onChangeText={(email) => this.setState({email})}/>

                <TextInput style={Jtheme.InputText}
                           placeholder={I18n.curLang.login_page.password}
                           state='password'
                           onChangeText={(password) => this.setState({password})}
                           secureTextEntry={true}/>

                <Button style={Jtheme.Button} onPress={this._login} title={I18n.curLang.login_page.login}/>
                <Button style={Jtheme.Button} onPress={this._navToSignup} title={I18n.curLang.login_page.signUp}/>
                <Button style={Jtheme.Button} title={I18n.curLang.login_page.forgotPass}/>

                <Text h5 style={Jtheme.Text}> {I18n.curLang.login_page.selectLang} </Text>
                <Picker style={Jtheme.Text}
                    selectedValue={this.state.currentLanguage}
                    onValueChange={(language) => this.setState({currentLanguage:language})}>

                    <Picker.Item label={I18n.curLang.login_page.arabic} value='Arabic'/>
                    <Picker.Item label={I18n.curLang.login_page.english} value='English'/>
                    <Picker.Item label={I18n.curLang.login_page.spanish} value='Spanish'/>
                </Picker>
                <Button style={Jtheme.Button} onPress={this._changeLanguage} title={I18n.curLang.login_page.apply}/>
                </ScrollView>
            </ThemeProvider>
        );
    }

    _changeLanguage = () => {
        if (this.state.currentLanguage === 'English') {
            I18n.changeLang('Eng')
        } else if (this.state.currentLanguage === 'Arabic') {
            I18n.changeLang('Ara');
        }
        else if (this.state.currentLanguage === 'Spanish') {
            I18n.changeLang('Esp');
        }

        // Following language change, must change state to force rerender
        this.setState(this.state);
    };


    _login = () => {
        const {email, password} = this.state;

        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(() => {
                // Get userId
                let userId = firebase.auth().currentUser.uid;
                let isLawyerRef = firebase.database().ref('lawyerProfiles/' + userId);
                let thisObj = this;
                isLawyerRef.on('value', (snapshot) => {
                    let isLawyer = (snapshot.val() !== null);
                    const {navigate} = thisObj.props.navigation;

                    // Load language for lawyers
                    if (isLawyer) {
                        I18n.changeLang(snapshot.val().language);
                        console.log('Language:', I18n.curLang);
                        navigate('LawyerTabNav');
                    }
                    else {
                      let isAdminRef = firebase.database().ref('admins/' + userId);

                      isAdminRef.on('value', (snap1) => {
                          let isAdmin = (snap1.val() !== null);
                          if (isAdmin) {
                            I18n.changeLang(snap1.val().language);
                            navigate('AdminProfile');
                          }
                          else {
                            // Load client data just to grab language
                            // Todo: This loads a lot of data every time, probably excessive
                            firebase.database().ref('cases/' + userId).on('value', (snap2) => {
                                I18n.curLang = snap2.val().language;

                                navigate('ClientTabNav');
                            });
                        }
                      });
                    }
                });
                // console.log('Logged in');
                DataStorage.saveLogin(email, password);
                DataStorage.loadBasicData();

                // Reset input so that it doesn't persist on logout
                this.setState({
                    email: '',
                    password: '',
                    language: 'English'
                });
            })
            .catch((error) => {
                alert(error);
            })
    };

    _navToSignup = () => {
        const {navigate} = this.props.navigation;

        navigate('SignUp');
    };
}

/*** StyleSheet ****/

const Jtheme = {

    backgroundColor: '#112853',

    MainContainer: {
        flex: 1,
        marginVertical: 100
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
        fontSize: 25,
        paddingTop: 40,
        paddingLeft: 50,
        paddingRight: 20,
    },

    InputText: {
        fontWeight: 'bold',
        flexDirection: 'column',
        color: '#112853',
        justifyContent: 'center',
        fontSize: 20,
        paddingTop: 30,
        paddingBottom: 30,
        paddingLeft: 50,
        paddingRight: 20,
    },

};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'gray',
        flexDirection: 'column',
        justifyContent: 'center',
        borderColor: '#111111',
        borderWidth: 1,

    }


});


export default Login;
