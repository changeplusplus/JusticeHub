import React, { Component } from 'react';
import {
    View, Text, Button, TextInput, TouchableOpacity,
    Image, Dimensions, Alert, FlatList, Keyboard, TouchableWithoutFeedback, ScrollView, Picker
} from 'react-native';
import Modal from "react-native-modal";
import * as firebase from 'firebase';
import {CheckBox} from "react-native-elements";
import I18n from '../../Utils/i18n';
const { width, height } = Dimensions.get('window');
export default class ClientCases extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isModalVisible: false,
            existingCase: false,
            dataLoaded: false,
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
        this.loadData();
    }

    toggleModal = () => {
        this.setState({isModalVisible: !this.state.isModalVisible});
    };

    render() {
        if (!this.state.dataLoaded){
            return (
                <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    {this.loadingScreen()}
                </View>
            );}
        else{
            if (!this.state.existingCase){
                this.props.navigation.navigate('createCase');
            } else {
                return  (
                    <View style={{
                        flex: 1, flexDirection: 'column', justifyContent: 'center',
                        alignItems: 'stretch'
                    }}>

                    </View>
                )
            }
        }
            // return (

                {/*<ScrollView style={{*/}
                {/*    marginTop: 75,*/}
                {/*}}>*/}
                {/*    <CheckBox*/}
                {/*        style={{marginTop: 100}}*/}
                {/*        title='Reporting someone else'*/}
                {/*        checked={this.state.reportingOther}*/}
                {/*        onIconPress={() => this.setState({reportingOther: !this.state.reportingOther})}*/}
                {/*    />*/}
                {/*    <Text style={Jtheme.InputText}>Name</Text>*/}
                {/*    <TextInput style={Jtheme.Input}*/}
                {/*               value={this.state.name}*/}
                {/*               onChangeText={(text) => this.setState({name: text})}*/}
                {/*               placeholder={"name"}*/}
                {/*               width={100}/>*/}
                {/*    <Text style={Jtheme.InputText}>Arrested persons name</Text>*/}
                {/*    <TextInput style={Jtheme.Input}*/}
                {/*               value={this.state.arrName}*/}
                {/*               onChangeText={(text) => this.setState({arrName: text})}*/}
                {/*               placeholder={"name"}*/}
                {/*               width={100}/>*/}
                {/*    <Text style={Jtheme.InputText}>Occupation</Text>*/}
                {/*    <TextInput style={Jtheme.Input}*/}
                {/*               value={this.state.occupation}*/}
                {/*               onChangeText={(text) => this.setState({occupation: text})}*/}
                {/*               placeholder={"name"}*/}
                {/*               width={100}/>*/}
                {/*    <Text style={Jtheme.InputText}>Address</Text>*/}
                {/*    <TextInput style={Jtheme.Input}*/}
                {/*               value={this.state.address}*/}
                {/*               onChangeText={(text) => this.setState({address: text})}*/}
                {/*               placeholder={"name"}*/}
                {/*               width={100}/>*/}
                {/*    <Text style={Jtheme.InputText}>Date of Birth</Text>*/}
                {/*    <TextInput style={Jtheme.Input}*/}
                {/*               value={this.state.DOB}*/}
                {/*               onChangeText={(text) => this.setState({DOB: text})}*/}
                {/*               placeholder={"name"}*/}
                {/*               width={100}/>*/}
                {/*    <Text style={Jtheme.InputText}>Gender</Text>*/}
                {/*    <TextInput style={Jtheme.Input}*/}
                {/*               value={this.state.gender}*/}
                {/*               onChangeText={(text) => this.setState({gender: text})}*/}
                {/*               placeholder={"name"}*/}
                {/*               width={100}/>*/}
                {/*    <Text style={Jtheme.InputText}>Arrested person phone number</Text>*/}
                {/*    <TextInput style={Jtheme.Input}*/}
                {/*               value={this.state.arrPhone}*/}
                {/*               onChangeText={(text) => this.setState({arrPhone: text})}*/}
                {/*               placeholder={"name"}*/}
                {/*               width={100}/>*/}
                {/*    <Text style={Jtheme.InputText}>Arrested person email</Text>*/}
                {/*    <TextInput style={Jtheme.Input}*/}
                {/*               value={this.state.arrEmail}*/}
                {/*               onChangeText={(text) => this.setState({arrEmail: text})}*/}
                {/*               placeholder={"name"}*/}
                {/*               width={100}/>*/}
                {/*    <Text style={Jtheme.InputText}>Offense</Text>*/}
                {/*    <TextInput style={Jtheme.Input}*/}
                {/*               value={this.state.offense}*/}
                {/*               onChangeText={(text) => this.setState({offense: text})}*/}
                {/*               placeholder={"name"}*/}
                {/*               width={100}/>*/}
                {/*    <Text style={Jtheme.InputText}>Details</Text>*/}
                {/*    <TextInput style={Jtheme.Input}*/}
                {/*               value={this.state.details}*/}
                {/*               onChangeText={(text) => this.setState({details: text})}*/}
                {/*               placeholder={"name"}*/}
                {/*               width={100}/>*/}
                {/*    <Text style={Jtheme.InputText}>Date of Arrest</Text>*/}
                {/*    <TextInput style={Jtheme.Input}*/}
                {/*               value={this.state.date}*/}
                {/*               onChangeText={(text) => this.setState({date: text})}*/}
                {/*               placeholder={"name"}*/}
                {/*               width={100}/>*/}
                {/*    <Text style={Jtheme.InputText}>Contacts</Text>*/}
                {/*    <TextInput style={Jtheme.Input}*/}
                {/*               value={this.state.contacts}*/}
                {/*               onChangeText={(text) => this.setState({contacts: text})}*/}
                {/*               placeholder={"name"}*/}
                {/*               width={100}/>*/}
                {/*    <CheckBox*/}
                {/*        title='Resolved'*/}
                {/*        checked={this.state.resolved}*/}
                {/*        onIconPress={() => this.setState({resolved: !this.state.resolved})}*/}
                {/*    />*/}
                {/*    <Text style={Jtheme.InputText}>Detention Center</Text>*/}
                {/*    <TextInput style={Jtheme.Input}*/}
                {/*               value={this.state.detentionCenter}*/}
                {/*               onChangeText={(text) => this.setState({detentionCenter: text})}*/}
                {/*               placeholder={"name"}*/}
                {/*               width={100}/>*/}
                {/*    <Text style={Jtheme.InputText}>Location of arrest</Text>*/}
                {/*    <TextInput style={Jtheme.Input}*/}
                {/*               value={this.state.locationArrest}*/}
                {/*               onChangeText={(text) => this.setState({locationArrest: text})}*/}
                {/*               placeholder={"name"}*/}
                {/*               width={100}/>*/}
                {/*    <Text style={Jtheme.InputText}>Torture used?</Text>*/}
                {/*    <TextInput style={Jtheme.Input}*/}
                {/*               value={this.state.torture}*/}
                {/*               onChangeText={(text) => this.setState({torture: text})}*/}
                {/*               placeholder={"name"}*/}
                {/*               width={100}/>*/}
                {/*    <Text style={Jtheme.InputText}>Special Notes</Text>*/}
                {/*    <TextInput style={Jtheme.Input}*/}
                {/*               value={this.state.specialNotes}*/}
                {/*               onChangeText={(text) => this.setState({specialNotes: text})}*/}
                {/*               placeholder={"name"}*/}
                {/*               width={100}/>*/}
                {/*    <Text style={Jtheme.InputText}>Lawyer</Text>*/}
                {/*    <TextInput style={Jtheme.Input}*/}
                {/*               value={this.state.lawyer}*/}
                {/*               onChangeText={(text) => this.setState({lawyer: text})}*/}
                {/*               placeholder={"name"}*/}
                {/*               width={100}/>*/}
                {/*    <Picker*/}
                {/*        selectedValue={this.state.prefersEmail}*/}
                {/*        onValueChange={(itemValue) => this.setState({prefersEmail: itemValue})}>*/}
                {/*        <Picker.Item label='Email' value={true} />*/}
                {/*        <Picker.Item label='Phone' value={false} />*/}
                {/*    </Picker>*/}

                {/*    <Button style={Jtheme.Button} onPress={this.submitCase}*/}
                {/*            title='Submit Case'/>*/}
                {/*</ScrollView>*/}
            // );
    }

    submitCase = () => {
        const {reportingOther, name, occupation, address, DOB, gender,
            arrName, arrPhone, arrEmail, prefersEmail, offense, details, date,
            contacts, resolved, detentionCenter, locationArrest,
            arrestingOfficer, torture, specialNotes, lawyer} = this.state;
        let user = firebase.auth().currentUser;
        let userCase = firebase.database().ref("cases/" + user.uid);
        userCase.update({
            existingCase: true,
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

    loadData = () => {
        let user = firebase.auth().currentUser;
        let userCase = firebase.database().ref("cases/" + user.uid);
        let stateVar = this;
        userCase.once('value', function(snapshot){
            let obj = snapshot.val();
            if (obj.existingCase === null)
                obj.existingCase = false;
            stateVar.setState({
                existingCase: obj.existingCase,
                reportingOther: obj.reportingOther,
                name: obj.name,
                occupation: obj.occupation,
                address: obj.address,
                DOB: obj.DOB,
                gender: obj.gender,
                arrName: obj.arrName,
                arrPhone: obj.arrPhone,
                arrEmail: obj.arrEmail,
                prefersEmail: obj.prefersEmail,
                offense: obj.offense,
                details: obj.details,
                date: obj.date,
                contacts: obj.contacts,
                resolved: obj.resolved,
                detentionCenter: obj.detentionCenter,
                locationArrest: obj.locationArrest,
                arrestingOfficer: obj.arrestingOfficer,
                torture: obj.torture,
                specialNotes: obj.specialNotes,
                lawyer: obj.lawyer});
        })
            .then(() => {
                this.setState({dataLoaded: true});
            })
            .catch((error) => {
                Alert.alert("Error loading profile", error);
            });
    };

    loadingScreen = () => {
        return (
            <View style={{flexDirection: 'row'}}>
                <Text style={{
                    fontSize: 32,
                    fontWeight: 'bold',
                    textAlign: 'center'
                }}>Fetching Cases </Text>
                <Image
                    source={require('./loadingGif.gif')}
                    style={{
                        width: 50,
                        height: 50,
                    }}/>
            </View>
        )
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