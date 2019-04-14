import React, {Component} from 'react';
import {Alert, Checkbox, ScrollView, TextInput, View} from 'react-native';
import * as firebase from 'firebase';
import {Button, CheckBox, Text, ThemeConsumer, ThemeProvider} from "react-native-elements";
import {InputBlock} from "../../Components/InputBlock";


class SetupLawyerProfile extends Component {

    constructor(props) {
        super(props);
        this.state = {
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
            },
            dataLoaded: false
        };
    }

    render() {
        if (!this.state.dataLoaded){
            this._loadData();
            return null;
        }
        return (
            <ScrollView contentContainerStyle={{justifyContent:'center', marginTop: 55, paddingBottom: 55}}>
                <View style={Jtheme.InputsContainer}>
                    <Text style={Jtheme.InputText}>Years of Practice</Text>
                    <TextInput style={Jtheme.Input}
                               value={this.state.exp}
                               onChangeText={(text) => this.setState({exp: text})}
                               placeholder={"years"}
                               width={100}/>

                    <Text style={Jtheme.InputText}>Bar Association Membership</Text>
                    <TextInput style={Jtheme.Input}
                               value={this.state.bar}
                               onChangeText={(text) => this.setState({bar: text})}
                               placeholder={"membership"}
                               width={100}/>

                    <Text style={Jtheme.InputText}>Law Firm</Text>
                    <TextInput style={Jtheme.Input}
                               value={this.state.firm}
                               onChangeText={(text) => this.setState({firm: text})}
                               placeholder={"firm"}
                               width={100}/>

                    <Text style={Jtheme.InputText}>Location</Text>
                    <TextInput style={Jtheme.Input}
                               value={this.state.location}
                               onChangeText={(text) => this.setState({location: text})}
                               placeholder={"location"}
                               width={100}/>

                    <Text style={Jtheme.InputText}>Radius of Practice</Text>
                    <TextInput style={Jtheme.Input}
                               value={this.state.radius}
                               onChangeText={(text) => this.setState({radius: text})}
                               placeholder={"kilometers"}
                               width={100}/>

                    <Text style={Jtheme.InputText}>Availability</Text>
                    <TextInput style={Jtheme.Input}
                               value={this.state.avail}
                               onChangeText={(text) => this.setState({avail: text})}
                               placeholder={"days and times"}
                               width={100}/>
                </View>
                <Text style={Jtheme.Text}>Expertise</Text>
                <CheckBox
                    title='Theft'
                    checked={this.state.expertise.theft}
                    onPress={() => this.setState({expertise: {
                            ...this.state.expertise, theft: !this.state.expertise.theft}})}
                />
                <CheckBox
                    title='Drug Offenses'
                    checked={this.state.expertise.drug}
                    onPress={() => this.setState({expertise: {
                        ...this.state.expertise, drug: !this.state.expertise.drug}})}
                />
                <CheckBox
                    title='Violent Crime'
                    checked={this.state.expertise.violent}
                    onPress={() => this.setState({expertise: {
                            ...this.state.expertise, violent: !this.state.expertise.violent}})}
                />
                <Text style={Jtheme.InputText}>Other (please specify)</Text>
                <TextInput style={Jtheme.Input}
                    onChangeText={(text) =>
                        this.setState({expertise: {...this.state.expertise, other: text}})}
                        value={this.state.expertise.other}
                    placeholder={"other"}
                    width={100}/>
                <View style={{marginTop: 10}}>
                    <Button style={Jtheme.Button} onPress={this._submitChanges}
                            title='Submit Changes'/>
                </View>
            </ScrollView>
        )
    }

    _submitChanges = () => {
        const {exp, bar, firm, location, radius, avail, expertise} = this.state;

        let userId = firebase.auth().currentUser.uid;

        firebase.database().ref('lawyerProfiles/' + userId).update({
            experience: exp,
            bar: bar,
            firm: firm,
            location: location,
            radius: radius,
            avail: avail,
            expertise: expertise
        });
        this.setState({dataLoaded:false});
        const {navigate} = this.props.navigation;
        navigate('LawyerTabNav');
    };

    _loadData = () => {
        let {exp, bar, firm, location, radius, avail, expertise, dataLoaded} = '';
        let userId = firebase.auth().currentUser.uid;
        firebase.database().ref('lawyerProfiles/' + userId).once('value',(snapshot) => {
            let data = snapshot.val();
            exp = data.experience;
            bar = data.bar;
            firm = data.firm;
            location = data.location;
            radius = data.radius;
            avail = data.avail;
            expertise = data.expertise;
            dataLoaded = true;
        })
            .then(() => {
            this.setState({exp, bar, firm, location, radius, avail, expertise, dataLoaded});
        })
            .catch((error) => {
                Alert.alert("Data load Failed", error);
            });
    };
}

export default SetupLawyerProfile;

const Jtheme = {

    backgroundColor: '#112853',

    InputsContainer: {
        justifyContent: 'center',
        alignItems: 'center'
    },

    BackButton: {
        flex:1,
        color: '#cc7832',
        paddingLeft: 0,
        paddingRight: 0,
        paddingTop: 0,
        paddingBottom: 100,
        marginTop: -5,
        position: 'absolute', // add if dont work with above
    },

    Button: {
        flex:1,
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
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#CED0CE',
        borderWidth: 1,
        paddingHorizontal: 5,
    },

    Text: {
        flex:1,
        fontWeight: 'bold',
        flexDirection: 'column',
        color: '#112853',
        justifyContent: 'center',
        fontSize: 40,
        paddingTop: 50,
        paddingHorizontal: 50
    },

    InputText: {
        flex:1,
        alignItems: 'center',
        textAlign: 'center',
        fontWeight: 'bold',
        flexDirection: 'column',
        color: '#112853',
        justifyContent: 'center',
        fontSize: 15,
        marginTop: 20,
        paddingBottom: 10
    }
};
