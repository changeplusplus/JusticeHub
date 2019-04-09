import React, { Component } from 'react';
import {
    View, Text, Button, TextInput, TouchableOpacity,
    Image, Dimensions, Alert, FlatList, Keyboard, TouchableWithoutFeedback, Linking, Clipboard
} from 'react-native';
import Modal from "react-native-modal";
import * as firebase from 'firebase';
import { SearchBar } from 'react-native-elements';

const { width, height } = Dimensions.get('window');
export default class CaseSearch extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isModalVisible: false,
            caseName: '',
            caseDetails: '',
            caseId: '',
            casesLoaded: false,
            search: '',
            cases: [],
            clientName: '',
            clientPhone: '',
            clientEmail: '',
            lawyerName:"",
            contactInfo: '',
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

        this.lawyerName = '';

        this.fetchCases();
    }

        // FIXME - Connor - need these parameters from the client case
    _communicate = () => {
        const {clientName, clientPhone, clientEmail, prefersEmail} = this.state;

        let greeting = "Hello " + clientName + ", my name is " + this.lawyerName + ". I saw your case and would like to help.";
        console.log(greeting);

        if (prefersEmail) {
            let contact = 'Contact ' + clientName + ' by email at: ' + clientEmail;
            this.setState({
                contactInfo: contact
            });

            /*return(
                <Text> Contact {clientName} by email at: {clientEmail} </Text>
            )*/

        } else { // prefers phone contact -- to WhatsApp with default message
            if (!Linking.canOpenURL('whatsapp://app')) {
                alert('Please install WhatsApp to continue')
            } else {
                if (clientPhone !== null) {
                    Linking.openURL('whatsapp://send?text=' + greeting + '&phone=' + clientPhone)
                }
            }
        }
    };

    _toggleModal = () => {
        this.setState({isModalVisible: !this.state.isModalVisible, caseName: '', caseDetails: '', caseId: ''});
    };

    updateSearch = search => {
        this.setState({ search });
    };

    render() {
        const {search, clientName, clientPhone, clientEmail,  reportingOther, name,
        occupation, address, DOB, gender, arrName, arrPhone, arrEmail, prefersEmail, offense, details,date, contacts,
        resolved, detentionCenter, locationArrest, arrestingOfficer, torture, specialNotes, lawyer} = this.state;

        if (this.state.casesLoaded)
            return (
                <View style={{
                    flex: 1,
                    flexDirection: 'column',
                    alignItems: 'stretch',
                }}>
                    <SearchBar
                        placeholder="Type Here..."
                        onChangeText={this.updateSearch}
                        value={search}
                    />
                    <View>
                        <TouchableOpacity onPress={this._toggleModal}
                                          style={{
                                              marginRight: 20,
                                              marginBottom: 10,
                                              flex: 1,
                                              alignSelf: 'flex-end',
                                              justifyContent: 'flex-end'
                                          }}>

                        </TouchableOpacity>
                    </View>
                    <View style={{
                        flex: 1,
                        flexDirection: 'column',
                        justifyContent: 'center',
                        marginVertical: 50,
                        alignItems: 'center'

                    }}>
                        {this.mainScreen()}
                    </View>
                    <Modal isVisible={this.state.isModalVisible}
                           animationIn='bounceIn'
                           animationInTiming={700}
                           hasBackdrop={false}
                           backdropColor='blue'
                           backdropOpacity={.4}
                           onBackdropPress={this._toggleModal}>
                        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                            <View style={{
                                flex: .75,
                                flexDirection: 'column',
                                justifyContent: 'center',
                                alignItems: 'center',
                                backgroundColor: 'white',
                                borderRadius: 70,
                                borderWidth: 0,
                            }}>

                                <Text style={Jtheme.Text}>Client Name:
                                    <Text h6 style={Jtheme.InputText}>{clientName}</Text>
                                </Text>
                                <Text style={Jtheme.Text}>Occupation:
                                    <Text h6 style={Jtheme.InputText}>{occupation}</Text>
                                </Text>
                                <Text style={Jtheme.Text}>Date of Birth:
                                    <Text h6 style={Jtheme.InputText}>{DOB}</Text>
                                </Text>
                                <Text style={Jtheme.Text}>Address
                                    <Text h6 style={Jtheme.InputText}>{address}</Text>
                                </Text>
                                <Text style={Jtheme.Text}>Gender:
                                    <Text h6 style={Jtheme.InputText}>{gender}</Text>
                                </Text>


                               <Text style={Jtheme.Text}>Case Name:
                                    <Text h6 style={Jtheme.InputText}>{offense}</Text>
                                </Text>
                                <Text style={Jtheme.Text}>Case Details:
                                    <Text h6 style={Jtheme.InputText}>{details}</Text>
                                </Text>
                                <Text style={Jtheme.Text}>Date:
                                    <Text h6 style={Jtheme.InputText}>{date}</Text>
                                </Text>
                                <Text style={Jtheme.Text}>Location of Arrest:
                                    <Text h6 style={Jtheme.InputText}>{locationArrest}</Text>
                                </Text>
                                <Text style={Jtheme.Text}>Arresting Officer:
                                    <Text h6 style={Jtheme.InputText}>{arrestingOfficer}</Text>
                                </Text>
                                <Text style={Jtheme.Text}>Detention Center:
                                    <Text h6 style={Jtheme.InputText}>{detentionCenter}</Text>
                                </Text>
                                <Text style={Jtheme.Text}>Torture:
                                    <Text h6 style={Jtheme.InputText}>{torture}</Text>
                                </Text>
                                <Text style={Jtheme.Text}>Special Notes:
                                    <Text h6 style={Jtheme.InputText}>{specialNotes}</Text>
                                </Text>



                                {this._renderContactInfo()}

                                <Button style={Jtheme.Button}
                                        title='Connect'
                                        onPress={this._communicate} />
                            </View>
                        </TouchableWithoutFeedback>
                    </Modal>
                </View>);
        else
            return (
                <View style={{
                    flex: 1,
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center'

                }}>
                    {this.loadingScreen()}
                </View>
            );

        /*{this._communicate(clientName, clientPhone, clientEmail, prefersEmail)}*/
    }

    renderListItem(item) {
        // Check to see if there's even a case to render
        // This is an issue because with new database setup accounts and case data are stored in same area
        if (item.offense) {
            // If it contains the search term in the title or description
            if (item.offense.includes(this.state.search) || item.details.includes(this.state.search)) {
                return (
                    <TouchableOpacity
                        style={{
                            backgroundColor: 'white',
                            borderRadius: 3,
                            borderWidth: 1,
                            borderColor: '#CED0CE',
                            width: width,
                            height: 50
                        }}
                        onPress={() => {
                            console.log('Pressed case w/ following info: ' + item.email + ' ' + item.phoneNumber + ' ' + item.prefersEmail);
                            this.setState({

                                caseId: item.caseId,
                                clientPhone: item.phoneNumber,
                                clientEmail: item.email,
                                clientName: item.name,
                                reportingOther: false,
                                name: item.name,
                                occupation: item.occupation,
                                address: item.address,
                                DOB: item.DOB,
                                gender: item.gender,
                                arrName: item.arrName,
                                arrPhone: item.arrPhone,
                                arrEmail: item.arrEmail,
                                prefersEmail: item.prefersEmail,
                                offense: item.offense,
                                details: item.details,
                                date: item.date,
                                contacts: item.contacts,
                                resolved: item.resolved,
                                detentionCenter: item.detentionCenter,
                                locationArrest: item.locationArrest,
                                arrestingOfficer: item.arrestingOfficer,
                                torture: item.torture,
                                specialNotes: item.specialNotes,
                                lawyer: item.lawyer

                            });
                            this._toggleModal();
                        }}>
                        <Text style={{
                            color: 'black',
                            textAlign: 'center',
                            textAlignVertical: 'center'
                        }}>{item.offense}</Text>
                    </TouchableOpacity>
                );
            }
        }
   }

    _renderContactInfo = () => {
        if (this.state.contactInfo !== '') {
            return (
                <View style={Jtheme.ContactContainer}>
                    <Text style={Jtheme.Text}>{this.state.contactInfo}</Text>
                    <Button style={[Jtheme.Button, { marginBottom: 10 }]}
                            title='Copy'
                            onPress={() => Clipboard.setString(this.state.clientEmail)}/>
                </View>
            )
        }

        return null;
    }

    fetchCases = () => {
        let caseIds = firebase.database().ref("cases/");
        let stateVar = this;
        let caseArr = [];
        caseIds.once('value', function (snapshot) {
            let obj = snapshot.val();
            for (let caseId in obj) {
                        caseArr.push(obj[caseId]);
                        caseArr[caseArr.length - 1].caseId = caseId;
                    }

                    stateVar.setState({cases: caseArr});
                }).then(()=>{
                    // indicate a single case loaded
                    this.setState({casesLoaded: true})
                }).catch((error) => {
                    Alert.alert("Case Fetch Failed", error);
                });

        // Also grab lawyer name for use later
        const uid = firebase.auth().currentUser.uid;
        firebase.database().ref('lawyerProfiles/' + uid).once('value', (snapshot) => {
            this.lawyerName = snapshot.val().fullName;

            console.log('Lawyer name ' + this.lawyerName);
        })
    };

    mainScreen = () => {
        // console.log('Cases:', this.state.cases);
        return (
            <View
                style={{flex: 1, justifyContent: 'space-evenly'}}>
                <FlatList
                    data={this.state.cases}
                    keyExtractor={(item) => item.offense}
                    renderItem={({item}) => this.renderListItem(item)}
                    ItemSeparatorComponent={() => {
                        return (<View style={{height: 5}}/>)
                    }}
                />
                <Button onPress={() => {this.props.navigation.navigate('LawyerProfile')}} title='Profile'/>
            </View>
        )

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

    backgroundColor: '#112853',

    BackButton: {
        color: '#cc7832',
        paddingHorizontal: 0,
        paddingTop: 0,
        paddingBottom: 100,
        marginTop: -5,
        position: 'absolute', // add if dont work with above
    },

    Button: {
        color: '#cc7832',
        paddingHorizontal: 70,
        paddingTop: 10,
        paddingBottom: 10,
    },

    ContactContainer: {
        marginVertical: 10
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
        fontWeight: 'bold',
        flexDirection: 'column',
        color: '#112853',
        justifyContent: 'center',
        fontSize: 15,
        paddingTop: 5,
        paddingHorizontal: 10,
        borderTopWidth: 7,
        borderBottomWidth: 3
    },

    InputText: {
        fontWeight: 'normal',
        flexDirection: 'column',
        flex: .5,
        color: '#112853',
        justifyContent: 'center',
        fontSize: 10,
        paddingBottom: 5,
        paddingLeft: 10,
        paddingRight: 50,
    },

};