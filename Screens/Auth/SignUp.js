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
                <Text h3 style={Jtheme.Text}>Create an Account:</Text>
                <KeyboardAvoidingView behavior='padding'>

                    <TextInput style={Jtheme.InputText}
                               placeholder="Full Name"
                               state='fullName'
                               onChangeText={(fullName) => this.setState({fullName})}/>

                    <TextInput style={Jtheme.InputText}
                               placeholder="Password"
                               state='password'
                               onChangeText={(password) => this.setState({password})}/>

                    <TextInput style={Jtheme.InputText}
                               placeholder="Phone Number"
                               state='phone'
                               keyboardType='number-pad'
                               onChangeText={(phone) => this.setState({phone})}/>

                    <TextInput style={Jtheme.InputText}
                               placeholder="Email"
                               state='email'
                               onChangeText={(email) => this.setState({email})}/>

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
                if (isLawyer){
                    // Set lawyer data gets put in a lawyer user section in database
                    firebase.database().ref('lawyerProfiles/' + userId).set({
                        fullName: fullName,
                        email: email,
                        phoneNumber: phone,
                        isLawyer: isLawyer,
                        experience: '',
                        bar: 'test',
                        firm: '',
                        location: '',
                        radius: '',
                        avail: '',
                        expertise: {
                            theft: false,
                            drug: false,
                            violent: false,
                            other: ''
                        }
                    });
                } else{
                    //for clients it begins their case profile
                    firebase.database().ref('cases/' + userId).set({
                        fullName: fullName,
                        email: email,
                        phoneNumber: phone,
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
                    navigate('ClientTabNav');
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
