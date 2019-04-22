import React, { Component } from 'react';
import {
    View, Text, TextInput, TouchableOpacity,
    Image, Dimensions, Alert, FlatList, Keyboard, TouchableWithoutFeedback, ScrollView, Picker
} from 'react-native';
import Modal from "react-native-modal";
import Swiper from 'react-native-swiper'
import * as firebase from 'firebase';
import {Button} from "react-native-elements";
import DatePicker from "react-native-datepicker";
import I18n from "../../Utils/i18n";
const { width, height } = Dimensions.get('window');
export default class CreateCase extends Component {

    constructor(props) {
        super(props);
        this.state = {
            //just for component use
            isModalVisible: false,
            pageIndex: 1, //1-based indexing
            numPages: 6,
            previousButton: true,
            nextButton:  true,
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
            preferedContact: '',
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
    }

    toggleModal = () => {
        this.setState({isModalVisible: !this.state.isModalVisible});
    };

    render() {
            return  (
                <View style={{
                    flex: 1, flexDirection: 'column', justifyContent: 'center',
                    alignItems: 'stretch'
                }}>
                    <Button title={'Modal'} onPress={this.toggleModal}/>
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
                                                <TextInput
                                                    onChangeText={(text) => this.setState({arrName: text})}
                                                    width={250} height={30} maxLength={35}
                                                    borderWidth={1} borderColor={'blue'} textAlign={'center'}
                                                />
                                                <Text style={Jtheme.InputText}>Address</Text>
                                                <TextInput
                                                    multiline={true} placeholder="Street, City"
                                                    onChangeText={(text) => this.setState({address: text})}
                                                    width={250} height={30} maxLength={45}
                                                    borderWidth={1} borderColor={'blue'} textAlign={'center'}
                                                />
                                                <Text style={Jtheme.InputText}>Occupation</Text>
                                                <TextInput
                                                    onChangeText={(text) => this.setState({occupation: text})}
                                                    width={250} height={30} maxLength={35}
                                                    borderWidth={1} borderColor={'blue'} textAlign={'center'}
                                                />
                                                <Text style={Jtheme.InputText}>Gender</Text>
                                                <TextInput
                                                    onChangeText={(text) => this.setState({gender: text})}
                                                    width={250} height={30} maxLength={35}
                                                    borderWidth={1} borderColor={'blue'} textAlign={'center'}
                                                />
                                                <Text style={Jtheme.InputText}>Phone</Text>
                                                <TextInput
                                                    onChangeText={(text) => this.setState({arrPhone: text})}
                                                    width={250} height={30} maxLength={35}
                                                    borderWidth={1} borderColor={'blue'} textAlign={'center'}
                                                />
                                                <Text style={Jtheme.InputText}>Email</Text>
                                                <TextInput
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
                                                <Text style={Jtheme.InputText}>Prefered Method of Contact</Text>
                                                <TextInput
                                                    placeholder="Phone/Email"
                                                    onChangeText={(text) => this.setState({preferedContact: text})}
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
                                                <TextInput
                                                    onChangeText={(text) => this.setState({locationArrest: text})}
                                                    width={250} height={30} maxLength={75}
                                                    borderWidth={1} borderColor={'blue'} textAlign={'center'}
                                                />
                                                <Text style={Jtheme.InputText}>Detention Center</Text>
                                                <TextInput
                                                    onChangeText={(text) => this.setState({detentionCenter: text})}
                                                    width={250} height={30} maxLength={75}
                                                    borderWidth={1} borderColor={'blue'} textAlign={'center'}
                                                />
                                                <Text style={Jtheme.InputText}>Arresting Officer's Name</Text>
                                                <TextInput
                                                    onChangeText={(text) => this.setState({arrestingOfficer: text})}
                                                    width={250} height={30} maxLength={35}
                                                    borderWidth={1} borderColor={'blue'} textAlign={'center'}
                                                />
                                                <Text style={Jtheme.InputText}>Any Methods of Torture Used</Text>
                                                <TextInput
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
                                                <TextInput
                                                    placeholder="Brief description"
                                                    onChangeText={(text) => this.setState({offense: text})}
                                                    width={250} height={30} maxLength={35}
                                                    borderWidth={1} borderColor={'blue'} textAlign={'center'}
                                                />
                                                <Text style={Jtheme.InputText}>Details</Text>
                                                <TextInput multiline={true}
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
                                                <TextInput multiline={true}
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
            )
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
            arrName, arrPhone, arrEmail, preferedContact, offense, details, date,
            contacts, detentionCenter, locationArrest,
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
            preferedContact: preferedContact,
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
    }
};