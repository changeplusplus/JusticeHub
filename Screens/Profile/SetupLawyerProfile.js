import React, {Component} from 'react';
import {Checkbox, ScrollView, TextInput, View} from 'react-native';
import * as firebase from 'firebase';
import {Button, CheckBox, Text, ThemeConsumer, ThemeProvider} from "react-native-elements";
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
            <ScrollView>
                <Text>Edit your information</Text>
                <TextInput style={Jtheme.InputText}
                            item='Years of Practice'
                            state='exp'
                            onChangeText={this._onChangeText}
                            value={this.state.exp}/>
                <TextInput style={Jtheme.InputText}
                            item='Bar Association Membership'
                            state='bar'
                            onChangeText={this._onChangeText}
                            value={this.state.bar}/>
                <TextInput style={Jtheme.InputText}
                            item='Firm'
                            state='firm'
                            onChangeText={this._onChangeText}
                            value={this.state.firm}/>
                <TextInput style={Jtheme.InputText}
                            item='Location'
                            state='location'
                            onChangeText={this._onChangeText}
                            value={this.state.location}/>
                <TextInput style={Jtheme.InputText}
                            item='Radius of Practice'
                            state='radius'
                            onChangeText={this._onChangeText}
                            value={this.state.radius}/>
                <InputText style={Jtheme.InputText}
                            item='Availability'
                            state='avail'
                            onChangeText={this._onChangeText}
                            value={this.state.avail}/>
                <Text> style={Jtheme.Text} Expertise </Text>
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
                <TextInput style={Jtheme.InputText}
                            item='Other (please specify)'
                            state='expertise'
                            onChangeText={this._onChangeText}
                            value={this.state.expertise.other}/>


                <Button style={Jtheme.Button} onPress={this._submitChanges} title='Submit Changes'/>
            </ScrollView>
        )
    }

    _submitChanges = () => {
        const {exp, degree, specialty} = this.state;

        let userId = firebase.auth().currentUser.uid;

        firebase.database().ref('profiles/lawyers/' + userId).update({
            experience: exp,
            degree: degree,
            specialty: specialty
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

export default SetupLawyerProfile;

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
        paddingTop: 30,
        paddingBottom: 30,
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
        fontSize: 40,
        paddingTop: 50,
        paddingLeft: 50,
        paddingRight: 50,
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
    }
};