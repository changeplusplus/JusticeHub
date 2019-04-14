import React, { Component } from 'react';
import {
    View, Text, Button, TextInput, TouchableOpacity,
    Image, Dimensions, Alert, FlatList, Keyboard, TouchableWithoutFeedback, ScrollView, Picker
} from 'react-native';
import * as firebase from 'firebase';
import {CheckBox} from "react-native-elements";
//  FIXME - JAKE - ADD FUNCTIONALITY TO SHARE MICROWAVE
const { width, height } = Dimensions.get('window');
export default class ClientCases extends Component {

    constructor(props) {
        super(props);
        this.state = {
            reportingOther: false,
            name: '',
            occupation: '',
            address: '',
            DOB: '',
            gender: '',
            arrName: '',
            arrPhone: '',
            arrEmail: '',
            prefersEmail: false,
            offense: '',
            details: '',
            date: '',
            contacts: '',
            resolved: false,
            detentionCenter: '',
            locationArrest: '',
            arrestingOfficer: '',
            torture: '',
            specialNotes: '',
            lawyer: ''
        };
    }

    render() {
            return (
                <ScrollView style={{
                    marginTop: 75,
                }}>
                    <CheckBox
                        style={{marginTop: 100}}
                        title='Reporting someone else'
                        checked={this.state.reportingOther}
                        onIconPress={() => this.setState({reportingOther: !this.state.reportingOther})}
                    />
                    <Text style={Jtheme.InputText}>Name</Text>
                    <TextInput style={Jtheme.Input}
                               value={this.state.name}
                               onChangeText={(text) => this.setState({name: text})}
                               placeholder={"name"}
                               width={100}/>
                    <Text style={Jtheme.InputText}>Arrested persons name</Text>
                    <TextInput style={Jtheme.Input}
                               value={this.state.arrName}
                               onChangeText={(text) => this.setState({arrName: text})}
                               placeholder={"name"}
                               width={100}/>
                    <Text style={Jtheme.InputText}>Occupation</Text>
                    <TextInput style={Jtheme.Input}
                               value={this.state.occupation}
                               onChangeText={(text) => this.setState({occupation: text})}
                               placeholder={"occupation"}
                               width={100}/>
                    <Text style={Jtheme.InputText}>Address</Text>
                    <TextInput style={Jtheme.Input}
                               value={this.state.address}
                               onChangeText={(text) => this.setState({address: text})}
                               placeholder={"address"}
                               width={100}/>
                    <Text style={Jtheme.InputText}>Date of Birth</Text>
                    <TextInput style={Jtheme.Input}
                               value={this.state.DOB}
                               onChangeText={(text) => this.setState({DOB: text})}
                               placeholder={"birth"}
                               width={100}/>
                    <Text style={Jtheme.InputText}>Gender</Text>
                    <TextInput style={Jtheme.Input}
                               value={this.state.gender}
                               onChangeText={(text) => this.setState({gender: text})}
                               placeholder={"gender"}
                               width={100}/>
                    <Text style={Jtheme.InputText}>Phone number of Arrested Person</Text>
                    <TextInput style={Jtheme.Input}
                               value={this.state.arrPhone}
                               onChangeText={(text) => this.setState({arrPhone: text})}
                               placeholder={"phone"}
                               width={100}/>
                    <Text style={Jtheme.InputText}>Email of Arrested Person</Text>
                    <TextInput style={Jtheme.Input}
                               value={this.state.arrEmail}
                               onChangeText={(text) => this.setState({arrEmail: text})}
                               placeholder={"email"}
                               width={100}/>
                    <Text style={Jtheme.InputText}>Offense</Text>
                    <TextInput style={Jtheme.Input}
                               value={this.state.offense}
                               onChangeText={(text) => this.setState({offense: text})}
                               placeholder={"offense"}
                               width={100}/>
                    <Text style={Jtheme.InputText}>Details</Text>
                    <TextInput style={Jtheme.Input}
                               value={this.state.details}
                               onChangeText={(text) => this.setState({details: text})}
                               placeholder={"details"}
                               width={100}/>
                    <Text style={Jtheme.InputText}>Date of Arrest</Text>
                    <TextInput style={Jtheme.Input}
                               value={this.state.date}
                               onChangeText={(text) => this.setState({date: text})}
                               placeholder={"date"}
                               width={100}/>
                    <Text style={Jtheme.InputText}>Contacts</Text>
                    <TextInput style={Jtheme.Input}
                               value={this.state.contacts}
                               onChangeText={(text) => this.setState({contacts: text})}
                               placeholder={"contacts"}
                               width={100}/>
                    <CheckBox
                        title='Resolved'
                        checked={this.state.resolved}
                        onIconPress={() => this.setState({resolved: !this.state.resolved})}
                    />
                    <Text style={Jtheme.InputText}>Detention Center</Text>
                    <TextInput style={Jtheme.Input}
                               value={this.state.detentionCenter}
                               onChangeText={(text) => this.setState({detentionCenter: text})}
                               placeholder={"detention center"}
                               width={100}/>
                    <Text style={Jtheme.InputText}>Location of arrest</Text>
                    <TextInput style={Jtheme.Input}
                               value={this.state.locationArrest}
                               onChangeText={(text) => this.setState({locationArrest: text})}
                               placeholder={"location"}
                               width={100}/>
                    <Text style={Jtheme.InputText}>Torture used?</Text>
                    <TextInput style={Jtheme.Input}
                               value={this.state.torture}
                               onChangeText={(text) => this.setState({torture: text})}
                               placeholder={"yes/no"}
                               width={100}/>
                    <Text style={Jtheme.InputText}>Additional Notes</Text>
                    <TextInput style={Jtheme.Input}
                               value={this.state.specialNotes}
                               onChangeText={(text) => this.setState({specialNotes: text})}
                               placeholder={"notes"}
                               width={100}/>
                    <Text style={Jtheme.InputText}>Lawyer</Text>
                    <TextInput style={Jtheme.Input}
                               value={this.state.lawyer}
                               onChangeText={(text) => this.setState({lawyer: text})}
                               placeholder={"name"}
                               width={100}/>
                    <Picker
                        selectedValue={this.state.prefersEmail}
                        onValueChange={(itemValue) => this.setState({prefersEmail: itemValue})}>
                        <Picker.Item label='Email' value={true} />
                        <Picker.Item label='Phone' value={false} />
                    </Picker>

                    <Button style={Jtheme.Button} onPress={this.submitCase}
                            title='Submit Case'/>
                </ScrollView>
            );
    }

    submitCase = () => {
        const {reportingOther, name, occupation, address, DOB, gender,
            arrName, arrPhone, arrEmail, prefersEmail, offense, details, date,
            contacts, resolved, detentionCenter, locationArrest,
            arrestingOfficer, torture, specialNotes, lawyer} = this.state;
        let user = firebase.auth().currentUser;
        let userCase = firebase.database().ref("cases/" + user.uid);
        userCase.update({
            reportingOther: reportingOther,
            name: name,
            occupation: occupation,
            address: address,
            DOB: DOB,
            gender: gender,
            arrName: arrName,
            arrPhone: arrPhone,
            arrEmail: arrEmail,
            prefersEmail: prefersEmail,
            offense: offense,
            details: details,
            date: date,
            contacts: contacts,
            resolved: resolved,
            detentionCenter: detentionCenter,
            locationArrest: locationArrest,
            arrestingOfficer: arrestingOfficer,
            torture: torture,
            specialNotes: specialNotes,
            lawyer: lawyer})
            .then(() => {
                alert("Case submitted successfully");
            })
            .catch((error) => {
                alert(error);
            });
    };
}

const Jtheme = {
    Button: {
        flex: 1,
        color: '#cc7832',
        paddingLeft: 70,
        paddingRight: 70,
        paddingTop: 30,
        paddingBottom: 30,
    },

    Input: {
        flex: .5,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#CED0CE',
        borderWidth: 1,
        paddingLeft: 35,
    },

    InputText: {
        flex: 1,
        alignItems: 'center',
        fontWeight: 'bold',
        flexDirection: 'column',
        color: '#112853',
        justifyContent: 'center',
        fontSize: 15,
        paddingBottom: 10,
        paddingLeft: 10,
        paddingRight: 50,
    }
}