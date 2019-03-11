import React, {Component} from 'react';
import {View, Text, Button, Picker} from 'react-native';
import * as firebase from 'firebase';
import {InputBlock} from "../../Components/InputBlock";

class SetupClientProfile extends Component {
    state = {
        location: '',
        caseType: '',
        prefEmail: false
    };

    render() {
        return (
            <View>
                <Text>Edit your information</Text>
                <InputBlock item='Location'
                            state='location'
                            onChangeText={this._onChangeText}
                            value={this.state.location}/>
                <InputBlock item='Type of case'
                            state='caseType'
                            onChangeText={this._onChangeText}
                            value={this.state.caseType}/>
                <Text>How should lawyers contact you?</Text>
                <Picker
                    selectedValue={this.state.prefEmail}
                    onValueChange={(itemValue) => this.setState({prefEmail: itemValue})}>

                    <Picker.Item label='Email' value={true} />
                    <Picker.Item label='Phone' value={false} />
                </Picker>

                <Button onPress={this._submitChanges} title='Submit Changes'/>
            </View>
        )
    }

    _submitChanges = () => {
        const {location, caseType, prefEmail} = this.state;

        let userId = firebase.auth().currentUser.uid;

        firebase.database().ref('profiles/clients/' + userId).update({
            location: location,
            caseType: caseType,
            prefEmail: prefEmail
        });

        const {navigate} = this.props.navigation;
        navigate('ClientTabNav');
    };

    _onChangeText = (state, update) => {
        this.setState({
            [state]: update
        });
    };
}

export default SetupClientProfile;