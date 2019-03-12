import React, {Component} from 'react';
import * as firebase from 'firebase';
import {
    View, KeyboardAvoidingView, TextInput, Picker
} from 'react-native';
import {InputBlock} from "../../Components/InputBlock";
import DataStorage from '../../DataStorage';
import {Button, Text, ThemeConsumer, ThemeProvider} from "react-native-elements";

export default class SignUp extends Component {
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
                <KeyboardAvoidingView behavior='padding'>

                    <TextInput style={Jtheme.InputText}
                               placeholder="Full Name"
                               state='fullName'
                               onChangeText={(text) => this.setState({text})}/>

                    <TextInput style={Jtheme.InputText}
                               placeholder="Password"
                               state='password'
                               onChangeText={(text) => this.setState({text})}/>

                    <TextInput style={Jtheme.InputText}
                               placeholder="Phone Number"
                               state='phone'
                               onChangeText={(text) => this.setState({text})}/>

                    <TextInput style={Jtheme.InputText}
                               placeholder="Email"
                               state='email'
                               onChangeText={(text) => this.setState({text})}/>

                    <Text h5 style={Jtheme.Text}> I am a:</Text>

                    <Picker style={Jtheme.Text}
                        selectedValue={this.state.isLawyer}
                        onValueChange={(itemValue) => this.setState({isLawyer: itemValue})}>

                        <Picker.Item label='Lawyer' value={true}/>
                        <Picker.Item label='Client' value={false}/>
                    </Picker>

                    <Button style={Jtheme.Button} onPress={this._signUp} title='Sign Up'/>
                </KeyboardAvoidingView>
            </View>
        )
    }

    _signUp = () => {
        const {fullName, password, phone, email, isLawyer} = this.state;

        if (fullName.trim() === '' || password.trim() === '' ||
            phone.trim() === '') {
            alert('Must fill out required fields');
            return;
        }

        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(() => {
                // Get userId
                let userId = firebase.auth().currentUser.uid;

                // Set basic data in database
                firebase.database().ref('users/' + userId).set({
                    fullName: fullName,
                    email: email,
                    phoneNumber: phone,
                    isLawyer: isLawyer
                });

                alert('Account successfully created!');

                DataStorage.saveLogin(email, password);

                // Store basic data
                DataStorage.FULL_NAME = fullName;
                DataStorage.EMAIL = email;
                DataStorage.PHONE_NUM = phone;
                DataStorage.IS_LAWYER = isLawyer;

                const {navigate} = this.props.navigation;

                if (isLawyer) {
                    navigate('SetupLawyerProfile');
                } else {
                    navigate('SetupClientProfile');
                }
            })
            .catch((error) => {
                alert('Error: ' + error.message);
            })
    };

    _onChangeText = (state, update) => {
        this.setState({
            [state]: update
        });
    };
}

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
        fontSize: 20,
        paddingTop: 5,
        paddingLeft: 10,
        paddingRight: 10,
    },

    InputText: {
        alignment: true,
        fontWeight: 'bold',
        flexDirection: 'column',
        color: '#112853',
        justifyContent: 'center',
        fontSize: 15,
        paddingBottom: 30,
        paddingLeft: 10,
        paddingRight: 50,
    },

};