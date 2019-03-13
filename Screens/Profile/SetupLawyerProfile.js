import React, { Component } from 'react';
import * as firebase from 'firebase';
import {
    CheckBox, View,  TextInput
} from 'react-native';
import {InputBlock} from "../../Components/InputBlock";
import {Button, Text} from "react-native-elements";


export default class SetupLawyerProfile extends Component {
  static navigationOptions = {
    header: null
  };

    state = {
        exp: '',
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
        }
    };

  render() {
    return (
      <View>
        <Text>Edit your information</Text>
      <InputBlock item='Years of Practice'
                    state='exp'
                    onChangeText={this._onChangeText}
                    value={this.state.exp}/>
      <InputBlock item='Bar Association Membership'
                  state='bar'
                  onChangeText={this._onChangeText}
                  value={this.state.bar}/>
        <InputBlock item='Firm'
                    state='firm'
                    onChangeText={this._onChangeText}
                    value={this.state.firm}/>
        <InputBlock item='Location'
                    state='location'
                    onChangeText={this._onChangeText}
                    value={this.state.location}/>
        <InputBlock item='Radius of Practice'
                    state='radius'
                    onChangeText={this._onChangeText}
                    value={this.state.radius}/>
        <InputBlock item='Availability'
                  state='avail'
                  onChangeText={this._onChangeText}
                  value={this.state.avail}/>
            <Button onPress={this._submitChanges} title='Submit Changes'/>
            </View>
        )
    }

    _submitChanges = () => {
        const {exp, bar, firm, location, radius, avail} = this.state;

        let userId = firebase.auth().currentUser.uid;

        firebase.database().ref('users/' + userId).update({
            experience: exp,
            bar: bar,
            firm: firm,
            location: location,
            radius: radius,
            avail: avail
        });

        const {navigate} = this.props.navigation;
        navigate('LawyerTabNav');
    };

    _onChangeText = (state, update) => {
        this.setState({
            [state]: update
        });
    };
}
