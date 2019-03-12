/**
 * Copyright 2018 Change++
 * Description: The screen which allows the user to login
 * Last Edited: January 9, 2019
 */

import React, {Component} from 'react';
import * as firebase from 'firebase';
import {TextInput, StyleSheet} from 'react-native';
import {InputBlock} from "../../Components/InputBlock";
import DataStorage from "../../DataStorage";
//import Icon from 'react-native-vector-icons/FontAwesome';
import {Button, Text, ThemeConsumer, ThemeProvider} from "react-native-elements";

class Login extends Component {
    static navigationOptions = {
        header: null
    };

    state = {
        email: '',
        password: ''
    };

    render() {
        return (
            <ThemeProvider style={Jtheme.backgroundColor}>

                <Text h1 style={Jtheme.Text}>Justice Hub</Text>
                <Text h4 style={Jtheme.Text}>A digital platform for accessing and enabling justice</Text>

                <TextInput style={Jtheme.InputText}
                    placeholder="Email"
                    state='email'
                    onChangeText={(text) => this.setState({text})}
                />

                <TextInput style={Jtheme.InputText}
                    placeholder="Password"
                    state='password'
                    onChangeText={(text) => this.setState({text})}
                    secureTextEntry={true}
                />

                <Button style={Jtheme.Button} onPress={this._login} title='Log In'/>
                <Button style={Jtheme.Button} onPress={this._navToSignup} title='Sign Up'/>
                <Button style={Jtheme.Button} onPress={() => this.props.navigation.navigate('ChatEntry')} title='Demo Chat'/>
            </ThemeProvider>
        )
    }

    _login = () => {
        const {email, password} = this.state;

        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(() => {
                // Get userId
                let userId = firebase.auth().currentUser.uid;

                // Get basic data
                console.log('Logged in');
                DataStorage.saveLogin(email, password);
                DataStorage.loadBasicData();

                // Reset input so that it doesn't persist on logout
                this.setState({
                    email: '',
                    password: ''
                });

                alert('Logged in!\n' + userId);

                const {navigate} = this.props.navigation;

                if (DataStorage.IS_LAWYER) {
                    navigate('LawyerTabNav');
                } else {
                    navigate('ClientTabNav');
                }
            })
            .catch((error) => {
                alert('That email/password combo doesn\'t exist');
            })
    };

    _navToSignup = () => {
        const {navigate} = this.props.navigation;

        navigate('SignUp');
    };

    _onChangeText = (state, update) => {
        this.setState({
            [state]: update
        });
    };
}

/*** StyleSheet ****/

const Jtheme = {

    backgroundColor: '#112853',

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
        alignment: true,
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
        alignment: true,
        fontWeight: 'bold',
        flexDirection: 'column',
        color: '#112853',
        justifyContent: 'center',
        fontSize: 15,
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