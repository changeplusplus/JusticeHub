import React, { Component } from 'react';
import { Checkbox, View, Text, Button } from 'react-native';
import * as firebase from 'firebase';
import {InputBlock} from "../../Components/InputBlock";


class SetupLawyerProfile extends Component {
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
        <Text> Expertise </Text>
        <CheckBox
                  title='Theft'
                  checked={this.state.expertise.theft}
                  onIconPress={(checked) => this.setState({theft: checked})}

        />
        <CheckBox
                  title='Drug Offenses'
                  checked={this.state.expertise.drug}
                  onIconPress={(checked) => this.setState({drug: checked})}

        />
        <CheckBox
                  title='Violent Crime'
                  checked={this.state.expertise.violent}
                  onIconPress={(checked) => this.setState({violent: checked})}

        />
        <InputBlock item='Other (please specify)'
                  state='expertise'
                  onChangeText={this._onChangeText}
                  value={this.state.expertise.other}/>


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

// export default SetupLawyerProfile;
