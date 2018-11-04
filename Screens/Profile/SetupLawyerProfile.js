import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';
import * as firebase from 'firebase';
import {InputBlock} from "../../Components/InputBlock";

class SetupLawyerProfile extends Component {
  static navigationOptions = {
    header: null
  };

  state = {
    exp: '',
    degree: '',
    specialty: ''
  };

  render() {
    return (
      <View>
        <Text>Edit your information</Text>
        <InputBlock item='Experience'
                    state='exp'
                    onChangeText={this._onChangeText}
                    value={this.state.exp}/>
        <InputBlock item='Degree'
                    state='degree'
                    onChangeText={this._onChangeText}
                    value={this.state.degree}/>
        <InputBlock item='Specialty'
                    state='specialty'
                    onChangeText={this._onChangeText}
                    value={this.state.specialty}/>

        <Button onPress={this._submitChanges} title='Submit Changes' />
      </View>
    )
  }

  _submitChanges = () => {
    const { exp, degree, specialty } = this.state;

    let userId = firebase.auth().currentUser.uid;

    firebase.database().ref('profiles/lawyers/' + userId).update({
      experience: exp,
      degree: degree,
      specialty: specialty
    });

    const { navigate } = this.props.navigation;
    navigate('LawyerTabNav');
  };

  _onChangeText = (state, update) => {
    this.setState({
      [state]: update
    });
  };
}

export default SetupLawyerProfile;