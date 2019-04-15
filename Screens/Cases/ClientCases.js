/**
 * Change++ (changeplusplus.org)
 * File Name: ClientCase.js
 * Authors: Jake Laderman
 * Description: Implements the feature to allow a client to submit a case
 * Last Edited: 5.15.19
 */


import React, { Component } from 'react';
import {
    View, Text, Button, TextInput, TouchableOpacity,
    Image, Dimensions, Alert, FlatList, Keyboard, TouchableWithoutFeedback, ScrollView, Picker
} from 'react-native';
import * as firebase from 'firebase';
import {CheckBox} from "react-native-elements";
import I18n from '../../Utils/i18n';

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
                        title={I18n.curLang.client_cases.reporting}
                        checked={this.state.reportingOther}
                        onIconPress={() => this.setState({reportingOther: !this.state.reportingOther})}
                    />
                    <Text style={Jtheme.InputText}>{I18n.curLang.client_cases.name}</Text>
                    <TextInput style={Jtheme.Input}
                               value={this.state.name}
                               onChangeText={(text) => this.setState({name: text})}
                               placeholder={I18n.curLang.client_cases.name_place}
                               width={100}/>
                    <Text style={Jtheme.InputText}>{I18n.curLang.client_cases.name_arrested}</Text>
                    <TextInput style={Jtheme.Input}
                               value={this.state.arrName}
                               onChangeText={(text) => this.setState({arrName: text})}
                               placeholder={I18n.curLang.client_cases.name_place}
                               width={100}/>
                    <Text style={Jtheme.InputText}>{I18n.curLang.client_cases.occupation}</Text>
                    <TextInput style={Jtheme.Input}
                               value={this.state.occupation}
                               onChangeText={(text) => this.setState({occupation: text})}
                               placeholder={I18n.curLang.client_cases.occupation_place}
                               width={100}/>
                    <Text style={Jtheme.InputText}>{I18n.curLang.client_cases.address}</Text>
                    <TextInput style={Jtheme.Input}
                               value={this.state.address}
                               onChangeText={(text) => this.setState({address: text})}
                               placeholder={I18n.curLang.client_cases.address_place}
                               width={100}/>
                    <Text style={Jtheme.InputText}>{I18n.curLang.client_cases.DOB}</Text>
                    <TextInput style={Jtheme.Input}
                               value={this.state.DOB}
                               onChangeText={(text) => this.setState({DOB: text})}
                               placeholder={I18n.curLang.client_cases.DOB_place}
                               width={100}/>
                    <Text style={Jtheme.InputText}>{I18n.curLang.client_cases.gender}</Text>
                    <TextInput style={Jtheme.Input}
                               value={this.state.gender}
                               onChangeText={(text) => this.setState({gender: text})}
                               placeholder={I18n.curLang.client_cases.gender_place}
                               width={100}/>
                    <Text style={Jtheme.InputText}>{I18n.curLang.client_cases.phone_arrested}</Text>
                    <TextInput style={Jtheme.Input}
                               value={this.state.arrPhone}
                               onChangeText={(text) => this.setState({arrPhone: text})}
                               placeholder={I18n.curLang.client_cases.phone_place}
                               width={100}/>
                    <Text style={Jtheme.InputText}>{I18n.curLang.client_cases.email_arrested}</Text>
                    <TextInput style={Jtheme.Input}
                               value={this.state.arrEmail}
                               onChangeText={(text) => this.setState({arrEmail: text})}
                               placeholder={I18n.curLang.client_cases.email_place}
                               width={100}/>
                    <Text style={Jtheme.InputText}>{I18n.curLang.client_cases.offense}</Text>
                    <TextInput style={Jtheme.Input}
                               value={this.state.offense}
                               onChangeText={(text) => this.setState({offense: text})}
                               placeholder={I18n.curLang.client_cases.offense_place}
                               width={100}/>
                    <Text style={Jtheme.InputText}>{I18n.curLang.client_cases.details}</Text>
                    <TextInput style={Jtheme.Input}
                               value={this.state.details}
                               onChangeText={(text) => this.setState({details: text})}
                               placeholder={I18n.curLang.client_cases.details_place}
                               width={100}/>
                    <Text style={Jtheme.InputText}>{I18n.curLang.client_cases.date_arrest}</Text>
                    <TextInput style={Jtheme.Input}
                               value={this.state.date}
                               onChangeText={(text) => this.setState({date: text})}
                               placeholder={I18n.curLang.client_cases.date_arrest_place}
                               width={100}/>
                    <Text style={Jtheme.InputText}>{I18n.curLang.client_cases.contacts}</Text>
                    <TextInput style={Jtheme.Input}
                               value={this.state.contacts}
                               onChangeText={(text) => this.setState({contacts: text})}
                               placeholder={I18n.curLang.client_cases.contacts_place}
                               width={100}/>
                    <CheckBox
                        title={I18n.curLang.client_cases.resolved}
                        checked={this.state.resolved}
                        onIconPress={() => this.setState({resolved: !this.state.resolved})}
                    />
                    <Text style={Jtheme.InputText}>{I18n.curLang.client_cases.detention_center}</Text>
                    <TextInput style={Jtheme.Input}
                               value={this.state.detentionCenter}
                               onChangeText={(text) => this.setState({detentionCenter: text})}
                               placeholder={I18n.curLang.client_cases.detention_center_place}
                               width={100}/>
                    <Text style={Jtheme.InputText}>{I18n.curLang.client_cases.arrest_location}</Text>
                    <TextInput style={Jtheme.Input}
                               value={this.state.locationArrest}
                               onChangeText={(text) => this.setState({locationArrest: text})}
                               placeholder={I18n.curLang.client_cases.arrest_location_place}
                               width={100}/>
                    <Text style={Jtheme.InputText}>{I18n.curLang.client_cases.torture}</Text>
                    <TextInput style={Jtheme.Input}
                               value={this.state.torture}
                               onChangeText={(text) => this.setState({torture: text})}
                               placeholder={I18n.curLang.client_cases.torture_place}
                               width={100}/>
                    <Text style={Jtheme.InputText}>{I18n.curLang.client_cases.additional}</Text>
                    <TextInput style={Jtheme.Input}
                               value={this.state.specialNotes}
                               onChangeText={(text) => this.setState({specialNotes: text})}
                               placeholder={I18n.curLang.client_cases.additional_place}
                               width={100}/>
                    <Text style={Jtheme.InputText}>{I18n.curLang.client_cases.lawyer}</Text>
                    <TextInput style={Jtheme.Input}
                               value={this.state.lawyer}
                               onChangeText={(text) => this.setState({lawyer: text})}
                               placeholder={I18n.curLang.client_cases.lawyer_place}
                               width={100}/>
                    <Picker
                        selectedValue={this.state.prefersEmail}
                        onValueChange={(itemValue) => this.setState({prefersEmail: itemValue})}>
                        <Picker.Item label={I18n.curLang.client_cases.picker_email} value={true} />
                        <Picker.Item label={I18n.curLang.client_cases.picker_phone} value={false} />
                    </Picker>

                    <Button style={Jtheme.Button} onPress={this.submitCase}
                            title={I18n.curLang.client_cases.submit}/>
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