/**
 * Change++ (changeplusplus.org)
 * File Name: ClientCase.js
 * Authors: Jake Laderman
 * Description: Implements the feature to allow a client to submit a case
 * Last Edited: 5.15.19
 */


import React, { Component } from 'react';
import {
    View, Text, TextInput, TouchableOpacity,
    Image, Dimensions, Alert, Keyboard, TouchableWithoutFeedback, ScrollView, Picker
} from 'react-native';
import {Button} from "react-native-elements";
import Modal from "react-native-modal";
import * as firebase from 'firebase';
import I18n from '../../Utils/i18n';
import Swiper from "react-native-swiper";
import DatePicker from "react-native-datepicker";

const { width, height } = Dimensions.get('window');
export default class ClientCases extends Component {

    constructor(props) {
        super(props);
        this.state = {
            //just for component use
            isModalVisible: false,
            pageIndex: 1, //1-based indexing
            numPages: 6,
            previousButton: true,
            nextButton:  true,
            dataLoaded: false,
            //stored data
            existingCase: false,
            reportingOther: false,
            name: '',
            occupation: '',
            address: '',
            DOB: '',
            gender: '',
            arrName: '',
            arrPhone: '',
            arrEmail: '',
            preferredContact: '',
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
            lawyer: '',
        };
        this.loadData();
    }

    toggleModal = () => {
        this.setState({isModalVisible: !this.state.isModalVisible, pageIndex:1});
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
                return  (
                    <View style={{
                        flex: 1, flexDirection: 'column', justifyContent: 'center',
                        alignItems: 'stretch'
                    }}>
                        <Button title={'Submit Case'} containerStyle={{alignSelf:'center', width:250}} onPress={this.toggleModal}/>
                        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                            <Modal isVisible={this.state.isModalVisible}
                                   animationIn='bounceIn'
                                   animationInTiming={700}
                                   hasBackdrop={false}
                                   backdropColor='blue'
                                   backdropOpacity={.4}
                                   onBackdropPress={this.toggleModal}>
                                <View style={{
                                    flex: .75,
                                    flexDirection: 'column',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    borderRadius: 70,
                                    opacity:100
                                }}>
                                    <Swiper ref={swiper => {this.swiper = swiper}}
                                            loop={false} scrollEnabled={false}>
                                        <View style={Jtheme.Page}>
                                            <Text style={Jtheme.HeaderText}>Are you reporting an arrest of yourself or someone else?</Text>
                                            <Picker style={{flex:2, width: 300}} selectedValue={this.state.reportingOther}
                                                    onValueChange={(selection) => this.setState({reportingOther:selection})}>
                                                <Picker.Item label={"Myself"} value={false}/>
                                                <Picker.Item label={"Someone Else"} value={true}/>
                                            </Picker>
                                            <View>
                                                {this.renderPreviousButton()}
                                                {this.renderNextButton()}
                                            </View>
                                        </View>
                                        <View style={Jtheme.Page}>
                                            <Text style={Jtheme.HeaderText}>Arrested Person's Information</Text>
                                            <ScrollView scrollEnabled={false} style={{marginTop:5}}>
                                                <Text style={Jtheme.InputText}>Full Name</Text>
                                                <TextInput defaultValue={this.state.arrName}
                                                           onChangeText={(text) => this.setState({arrName: text})}
                                                           width={250} height={30} maxLength={35}
                                                           borderWidth={1} borderColor={'blue'} textAlign={'center'}
                                                />
                                                <Text style={Jtheme.InputText}>Address</Text>
                                                <TextInput defaultValue={this.state.address}
                                                           multiline={true} placeholder="Street, City"
                                                           onChangeText={(text) => this.setState({address: text})}
                                                           width={250} height={30} maxLength={45}
                                                           borderWidth={1} borderColor={'blue'} textAlign={'center'}
                                                />
                                                <Text style={Jtheme.InputText}>Occupation</Text>
                                                <TextInput defaultValue={this.state.occupation}
                                                           defaultValue={this.state.occupation}
                                                           onChangeText={(text) => this.setState({occupation: text})}
                                                           width={250} height={30} maxLength={35}
                                                           borderWidth={1} borderColor={'blue'} textAlign={'center'}
                                                />
                                                <Text style={Jtheme.InputText}>Gender</Text>
                                                <TextInput defaultValue={this.state.gender}
                                                           onChangeText={(text) => this.setState({gender: text})}
                                                           width={250} height={30} maxLength={35}
                                                           borderWidth={1} borderColor={'blue'} textAlign={'center'}
                                                />
                                                <Text style={Jtheme.InputText}>Phone</Text>
                                                <TextInput defaultValue={this.state.arrPhone}
                                                           onChangeText={(text) => this.setState({arrPhone: text})}
                                                           width={250} height={30} maxLength={35}
                                                           borderWidth={1} borderColor={'blue'} textAlign={'center'}
                                                />
                                                <Text style={Jtheme.InputText}>Email</Text>
                                                <TextInput defaultValue={this.state.arrEmail}
                                                           onChangeText={(text) => this.setState({arrEmail: text})}
                                                           width={250} height={30} maxLength={35}
                                                           borderWidth={1} borderColor={'blue'} textAlign={'center'}
                                                />
                                            </ScrollView>
                                            <View>
                                                {this.renderPreviousButton()}
                                                {this.renderNextButton()}
                                            </View>
                                        </View>
                                        <View style={Jtheme.Page}>
                                            <Text style={Jtheme.HeaderText}>Arrested Person's Information Cont.</Text>
                                            <ScrollView scrollEnabled={false} style={{marginTop:-100}}>
                                                <Text style={Jtheme.InputText}>Date of Birth</Text>
                                                <DatePicker
                                                    style={{width: 250}} date={this.state.DOB} mode="date"
                                                    showIcon={false} placeholder="select date" format="MM-DD-YYYY"
                                                    confirmBtnText="Confirm" cancelBtnText="Cancel"
                                                    onDateChange={(date) => {this.setState({DOB: date})}}
                                                />
                                                <Text style={Jtheme.InputText}>Preferred Method of Contact</Text>
                                                <TextInput defaultValue={this.state.preferredContact}
                                                           placeholder="Phone/Email"
                                                           onChangeText={(text) => this.setState({preferredContact: text})}
                                                           width={250} height={30} maxLength={35}
                                                           borderWidth={1} borderColor={'blue'} textAlign={'center'}
                                                />
                                            </ScrollView>
                                            <View>
                                                {this.renderPreviousButton()}
                                                {this.renderNextButton()}
                                            </View>
                                        </View>
                                        <View style={Jtheme.Page}>
                                            <Text style={Jtheme.HeaderText}>Arrest Information</Text>
                                            <ScrollView scrollEnabled={false} style={{marginTop:-75}}>
                                                <Text style={Jtheme.InputText}>Date of Arrest</Text>
                                                <DatePicker
                                                    style={{width: 250}} date={this.state.date} mode="date"
                                                    showIcon={false} placeholder="select date" format="MM-DD-YYYY"
                                                    confirmBtnText="Confirm" cancelBtnText="Cancel"
                                                    onDateChange={(date) => {this.setState({date: date})}}
                                                />
                                                <Text style={Jtheme.InputText}>Location of Arrest</Text>
                                                <TextInput defaultValue={this.state.locationArrest}
                                                           onChangeText={(text) => this.setState({locationArrest: text})}
                                                           width={250} height={30} maxLength={75}
                                                           borderWidth={1} borderColor={'blue'} textAlign={'center'}
                                                />
                                                <Text style={Jtheme.InputText}>Detention Center</Text>
                                                <TextInput defaultValue={this.state.detentionCenter}
                                                           onChangeText={(text) => this.setState({detentionCenter: text})}
                                                           width={250} height={30} maxLength={75}
                                                           borderWidth={1} borderColor={'blue'} textAlign={'center'}
                                                />
                                                <Text style={Jtheme.InputText}>Arresting Officer's Name</Text>
                                                <TextInput defaultValue={this.state.arrestingOfficer}
                                                           onChangeText={(text) => this.setState({arrestingOfficer: text})}
                                                           width={250} height={30} maxLength={35}
                                                           borderWidth={1} borderColor={'blue'} textAlign={'center'}
                                                />
                                                <Text style={Jtheme.InputText}>Any Methods of Torture Used</Text>
                                                <TextInput defaultValue={this.state.torture}
                                                           onChangeText={(text) => this.setState({torture: text})}
                                                           width={250} height={30} maxLength={35}
                                                           borderWidth={1} borderColor={'blue'} textAlign={'center'}
                                                />
                                            </ScrollView>
                                            <View>
                                                {this.renderPreviousButton()}
                                                {this.renderNextButton()}
                                            </View>
                                        </View>
                                        <View style={Jtheme.Page}>
                                            <Text style={Jtheme.HeaderText}>Case Information</Text>
                                            <ScrollView scrollEnabled={false} style={{marginTop:-75}}>
                                                <Text style={Jtheme.InputText}>Offense</Text>
                                                <TextInput defaultValue={this.state.offense}
                                                           placeholder="Brief description"
                                                           onChangeText={(text) => this.setState({offense: text})}
                                                           width={250} height={30} maxLength={35}
                                                           borderWidth={1} borderColor={'blue'} textAlign={'center'}
                                                />
                                                <Text style={Jtheme.InputText}>Details</Text>
                                                <TextInput multiline={true} defaultValue={this.state.details}
                                                           placeholder="Detailed description"
                                                           onChangeText={(text) => this.setState({details: text})}
                                                           width={250} height={250} maxLength={1500}
                                                           borderWidth={1} borderColor={'blue'} textAlign={'center'}
                                                />
                                            </ScrollView>
                                            <View>
                                                {this.renderPreviousButton()}
                                                {this.renderNextButton()}
                                            </View>
                                        </View>
                                        <View style={Jtheme.Page}>
                                            <Text style={Jtheme.HeaderText}>Any Additional Notes</Text>
                                            <ScrollView scrollEnabled={false} style={{marginTop:-75}}>
                                                <TextInput multiline={true} defaultValue={this.state.specialNotes}
                                                           onChangeText={(text) => this.setState({specialNotes: text})}
                                                           width={250} height={250} maxLength={1500}
                                                           borderWidth={1} borderColor={'blue'} textAlign={'center'}
                                                />
                                            </ScrollView>
                                            <View>
                                                {this.renderPreviousButton()}
                                                <Button containerStyle={Jtheme.NextButton} onPress={this.submitCase}
                                                        title={'Submit'}/>
                                            </View>
                                        </View>
                                    </Swiper>
                                </View>
                            </Modal>
                        </TouchableWithoutFeedback>
                    </View>
                );
            } else {
                return  (
                    <View style={{flex:1, backgroundColor: '#47ddff'}}>
                        <Button title={'Edit Case'} containerStyle={{marginTop:35, marginBottom:5, alignSelf:'center', width:150}} onPress={()=>{this.setState({existingCase:false})}}/>
                        <Text style={{textAlign: 'center', color: 'white', fontWeight:'bold', fontSize: 20,}}>Name:</Text>
                        <Text style={Jtheme.InputText}>{this.state.arrName}</Text>
                        <Text style={Jtheme.LabelText}>Address:</Text>
                        <Text style={Jtheme.InputText}>{this.state.address}</Text>
                        <Text style={Jtheme.LabelText}>Occupation:</Text>
                        <Text style={Jtheme.InputText}>{this.state.occupation}</Text>
                        <Text style={Jtheme.LabelText}>Gender:</Text>
                        <Text style={Jtheme.InputText}>{this.state.gender}</Text>
                        <Text style={Jtheme.LabelText}>Phone:</Text>
                        <Text style={Jtheme.InputText}>{this.state.arrPhone}</Text>
                        <Text style={Jtheme.LabelText}>Email:</Text>
                        <Text style={Jtheme.InputText}>{this.state.arrEmail}</Text>
                        <Text style={Jtheme.LabelText}>Date of Birth:</Text>
                        <Text style={Jtheme.InputText}>{this.state.DOB}</Text>
                        <Text style={Jtheme.LabelText}>Preferred Method of Contact:</Text>
                        <Text style={Jtheme.InputText}>{this.state.preferredContact}</Text>
                        <Text style={Jtheme.LabelText}>Date of Arrest:</Text>
                        <Text style={Jtheme.InputText}>{this.state.date}</Text>
                        <Text style={Jtheme.LabelText}>Location of Arrest:</Text>
                        <Text style={Jtheme.InputText}>{this.state.locationArrest}</Text>
                        <Text style={Jtheme.LabelText}>Detention Center:</Text>
                        <Text style={Jtheme.InputText}>{this.state.detentionCenter}</Text>
                        <Text style={Jtheme.LabelText}>Name of Arresting Officer:</Text>
                        <Text style={Jtheme.InputText}>{this.state.arrestingOfficer}</Text>
                        <Text style={Jtheme.LabelText}>Any Torture Used:</Text>
                        <Text style={Jtheme.InputText}>{this.state.torture}</Text>

                    </View>
                )
            }
        }
    }

    renderNextButton = () => {
        if (this.state.nextButton && this.state.pageIndex < this.state.numPages){
            return (
                <Button containerStyle={Jtheme.NextButton} onPress={() => {
                    this.swiper.scrollBy(1);
                    this.setState({pageIndex:this.state.pageIndex+1});
                }} title={'Next'}/>
            );
        } else{
            return null;
        }
    };

    renderPreviousButton = () => {
        if (this.state.previousButton && this.state.pageIndex > 1){
            return (
                <Button containerStyle={Jtheme.PreviousButton} onPress={() => {
                    this.swiper.scrollBy(-1);
                    this.setState({pageIndex:this.state.pageIndex-1});
                }} title={'Previous'}/>
            );
        } else{
            return null;
        }
    };

    submitCase = () => {
        const {reportingOther, name, occupation, address, DOB, gender,
            arrName, arrPhone, arrEmail, preferredContact, offense, details, date,
            contacts, detentionCenter, locationArrest,
            arrestingOfficer, torture, specialNotes, lawyer} = this.state;
        let user = firebase.auth().currentUser;
        let userCase = firebase.database().ref("cases/" + user.uid);
        let stateVar = this;
        //TODO: Fix bug caused by this update call that causes component to dismount
        //      Seems to not happen when no data is actually changed
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
            preferredContact: preferredContact,
            offense: offense,
            details: details,
            date: date,
            contacts: contacts,
            resolved: false,
            detentionCenter: detentionCenter,
            locationArrest: locationArrest,
            arrestingOfficer: arrestingOfficer,
            torture: torture,
            specialNotes: specialNotes,
            lawyer: lawyer});
            // .then(() => {
            //     Alert.alert(
            //         'Success',
            //         'Case Submitted Successfully',
            //         [{text: 'OK', onPress: () => {
            //             stateVar.setState({isModalVisible:false},
            //                 () => {stateVar.setState({existingCase:true})});
            //         }}]
            //     );
            // })
            // .catch((error) => {
            //     Alert.alert('Error', error, [{text: 'OK', onPress: () => stateVar.toggleModal()}]);
            // });
            stateVar.setState({isModalVisible:false},
            () => {stateVar.setState({existingCase:true})});
    };

    loadData = () => {
        let {dataLoaded, reportingOther, name, occupation, address, DOB, gender, arrName,
            arrPhone, arrEmail, preferredContact, offense, details, date, contacts,
            resolved, detentionCenter, locationArrest, arrestingOfficer, torture, specialNotes, lawyer} = '';
        let user = firebase.auth().currentUser;
        let userCase = firebase.database().ref("cases/" + user.uid);
        let stateVar = this;
        let existingCase = false;
        userCase.once('value', (snapshot) => {
            let obj = snapshot.val();
            if (obj.existingCase === null)
                obj.existingCase = false;
            dataLoaded = true;
            existingCase = obj.existingCase;
            reportingOther = obj.reportingOther;
            name = obj.name;
            occupation = obj.occupation;
            address = obj.address;
            DOB = obj.DOB;
            gender = obj.gender;
            arrName = obj.arrName;
            arrPhone = obj.arrPhone;
            arrEmail = obj.arrEmail;
            preferredContact = obj.preferredContact;
            offense = obj.offense;
            details = obj.details;
            date = obj.date;
            contacts = obj.contacts;
            resolved = obj.false;
            detentionCenter = obj.detentionCenter;
            locationArrest = obj.locationArrest;
            arrestingOfficer = obj.arrestingOfficer;
            torture = obj.torture;
            specialNotes = obj.specialNotes;
            lawyer = obj.lawyer
        })
            .then(() => {
                stateVar.setState({
                    existingCase, dataLoaded, reportingOther, name, occupation, address, DOB, gender, arrName,
                    arrPhone, arrEmail, preferredContact, offense, details, date, contacts,
                    resolved, detentionCenter, locationArrest, arrestingOfficer, torture, specialNotes, lawyer
                });
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
    NextButton: {
        position:'absolute',
        bottom:55,
        left:25,
        width:110
    },

    PreviousButton: {
        position:'absolute',
        bottom:55,
        right:25,
        width:110
    },

    Page: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#47ddff',
        borderRadius: 70,
        borderWidth: 0,
    },

    HeaderText: {
        flex:.70,
        marginTop: 70,
        fontWeight:'bold',
        color: 'black',
        fontSize: 35,
    },

    InputText: {
        textAlign: 'center',
        color: 'black',
        fontWeight:'bold',
        fontSize: 15,
        marginBottom: 3,
        marginTop: 7
    },

    LabelText: {
        marginTop:10,
        textAlign: 'center',
        color: 'white',
        fontWeight:'bold',
        fontSize: 20,
    }
};