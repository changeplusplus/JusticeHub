import React, { Component } from 'react';
import {
    View, Text, Button, TextInput, TouchableOpacity,
    Image, Dimensions, Alert, FlatList, Keyboard, TouchableWithoutFeedback, ScrollView, Picker
} from 'react-native';
import Modal from "react-native-modal";
import Swiper from 'react-native-swiper'
import * as firebase from 'firebase';
import {CheckBox, Slider} from "react-native-elements";
const { width, height } = Dimensions.get('window');
export default class CreateCase extends Component {

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

    transitionFunc = () => {
        this.swiper.scrollBy(1);
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
            return  (
                <View style={{
                    flex: 1, flexDirection: 'column', justifyContent: 'center',
                    alignItems: 'stretch'
                }}>
                    <Button title={'Modal'} onPress={this.toggleModal}/>
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
                            <Swiper ref={swiper => {this.swiper = swiper}} loop={false} bounces={true} showsButtons={true}>
                                <View style={{flex:1, backgroundColor: '#47ddff',borderRadius: 70}}>
                                    <Button title={'text'} onPress={this.transitionFunc}/>
                                </View>
                                    <View style={{flex:1, backgroundColor: 'yellow',borderRadius: 70}}/>
                                <View style={{flex:1, backgroundColor: 'blue',borderRadius: 70}}/>
                            </Swiper>
                        </View>
                    </Modal>
                </View>
            )
        }
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