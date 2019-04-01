import React, { Component } from 'react';
import {
    View, Text, Button, TextInput, TouchableOpacity,
    Image, Dimensions, Alert, FlatList, Keyboard, TouchableWithoutFeedback, Linking
} from 'react-native';
import Modal from "react-native-modal";
import * as firebase from 'firebase';
import { SearchBar } from 'react-native-elements';

const { width, height } = Dimensions.get('window');
export default class LawyerAuth extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isModalVisible: false,
            lawyerName: '',
            lawyerId: '',
            lawyersLoaded: false,
            lawyers: [],
        };
        this.fetchLawyers();
    }


    _toggleModal = () => {
        this.setState({isModalVisible: !this.state.isModalVisible, lawyerName: '', , lawyerId: ''});
    };


    render() {
        const {search} = this.state;
        if (this.state.lawyersLoaded)
            return (
                <View style={{
                    flex: 1,
                    flexDirection: 'column',
                    alignItems: 'stretch',
                }}>
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
                                <Text h6 style={Jtheme.Text}>Lawyer Name</Text>
                                <Text style={Jtheme.InputText}>{this.state.lawyerName}</Text>
                                    // FIXME - get parameters
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
    }

    fetchLawyers = () => {
        let user = firebase.auth().currentUser;
        let lawyers = firebase.database().ref("lawyers/");
        let stateVar = this;
        let lawyerArr = [];
        lawyers.once('value', function (snapshot) {
            let obj = snapshot.val();
            for (let lawyer in obj) {
                lawyerArr.push(lawyers[lawyer]);
                lawyerArr[lawyerArr.length - 1].lawyerId = lawyer;
                console.log(lawyer);
                console.log()
                console.log(lawyerArr.length+"\n");
                stateVar.setState({lawyers: lawyerArr});
          }
        })
        .then(() => {
            this.setState({lawyersLoaded: true})
        })
        .catch((error) => {
            Alert.alert("Lawyer Fetch Failed", error);
        });


    };



    mainScreen = () => {

        return (

            <View
                style={{flex: 1, justifyContent: 'space-evenly'}}>

                <FlatList
                    data={this.state.lawyers}
                    keyExtractor={(item) => item.lawyerName}
                    renderItem={({item}) => item.lawyerName}
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
                }}>Fetching Lawyers </Text>
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
        paddingTop: 10,
        paddingBottom: 10,
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
        fontSize: 20,
        paddingTop: 5,
        paddingLeft: 10,
        paddingRight: 10,
        borderTopWidth: 7,
        borderBottomWidth: 3
    },

    InputText: {
        fontWeight: 'bold',
        flexDirection: 'column',
        flex: .5,
        color: '#112853',
        justifyContent: 'center',
        fontSize: 15,
        paddingBottom: 5,
        paddingLeft: 10,
        paddingRight: 50,
    },

};
