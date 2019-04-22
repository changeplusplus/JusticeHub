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
            pageIndex: 0,
            numPages: 5,
            dataLoaded: false,
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
            lawyer: '',
        };
    }

    toggleModal = () => {
        this.setState({isModalVisible: !this.state.isModalVisible});
    };

    transitionFunc = () => {
        this.setState({test:!this.state.test});
        this.swiper.scrollBy(1);
    };

    render() {
            return  (
                <View style={{
                    flex: 1, flexDirection: 'column', justifyContent: 'center',
                    alignItems: 'stretch'
                }}>
                    <Button title={'Modal'} onPress={this.toggleModal}/>
                    <Picker onValueChange={(language) => this.setState({currentLanguage:language})}>
                        <Picker.Item label={"Myself"} value="Arabic"/>
                        <Picker.Item label={"Someone Else"} value="English"/>
                    </Picker>
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
                                        loop={false} bounces={true}
                                        showsPagination={false} scrollEnabled={false}>
                                        <View style={Jtheme.Page}>
                                            <Text style={{
                                                flex:1,
                                                marginTop: 70,
                                                fontWeight:'bold',
                                                color: 'black',
                                                fontSize: 35,
                                            }}>Are you reporting an arrest of yourself or someone else?</Text>
                                            <Picker style={{flex:1, marginTop: -200, width: 300}} selectedValue={this.state.reportingOther}
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
                                            <View>
                                                {this.renderPreviousButton()}
                                                {this.renderNextButton()}
                                            </View>
                                        </View>
                                        <View style={Jtheme.Page}>
                                            <View>
                                                {this.renderPreviousButton()}
                                                {this.renderNextButton()}
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
        if (this.state.previousButton && this.state.pageIndex > 0){
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
};