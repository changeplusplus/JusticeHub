import React, {Component} from 'react';
import {View, Text} from 'react-native';
import * as firebase from 'firebase';
import {SecureStore} from 'expo';
import DataStorage from '../DataStorage';

class LoadApp extends Component {
    static navigationOptions = {
        header: null
    };

    componentDidMount() {
        // Try to auto login user based on what's stored async
        this._autoLogin();
    }

    async _autoLogin() {
        // navigate('Login');
    }

    render() {
        return (
            <View>
                <Text>Loading....</Text>
            </View>
        )
    }
}

export default LoadApp;