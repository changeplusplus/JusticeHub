/**
 * Copyright 2018 Change++
 * Description: The screen which allows the user to login
 * Last Edited: January 9, 2019
 */


import React, {Component} from 'react';
import * as firebase from 'firebase';
import {
    View,
    TextInput,
    Button,
    KeyboardAvoidingView,
    Text,
    StyleSheet
} from 'react-native';
import {InputBlock} from "../../Components/InputBlock";
import DataStorage from "../../DataStorage";

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
            <View style={styles.container}>
                <InputBlock item='Email'
                            state='email'
                            onChangeText={this._onChangeText}
                            value={this.state.email}/>
                <InputBlock item='Password'
                            state='password'
                            onChangeText={this._onChangeText}
                            value={this.state.password}/>

                <Button onPress={this._login} title='Log In' color='blue'/>

                <Button onPress={this._navToSignup} title='Sign Up' color='green'/>

                <Button onPress={() => this.props.navigation.navigate('ChatEntry')} title='Demo Chat' color='purple'/>
            </View>
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
    }

    _onChangeText = (state, update) => {
        this.setState({
            [state]: update
        });
    };
}

/*** StyleSheet ****/
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'stretch'
    }
});


export default Login;