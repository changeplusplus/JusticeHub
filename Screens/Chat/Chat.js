// @flow
import React from 'react';
import {View, Text,} from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat'; // 0.3.0
import * as firebase from "firebase";

class Chat extends React.Component {

    static navigationOptions = ({ navigation }) => ({
        title: (navigation.state.params || {}).name || 'Chat!',
    });

    state = {
        messages: [],
    };

    /*user() {
        return {
            name: this.props.navigation.state.params.name,
            _id: this.uid,
        };
    }*/

    render() {
        return (
            <View>
                //FIXME choose client from list or by case?
                <Text>
                    Send a message:
                </Text>
                    <GiftedChat
                    messages={this.state.messages}
                    onSend={this.send}
                    user={this.user}
                    />
            </View>
        );
    }

    componentDidMount() {
        /*this.observeAuth();*/
        /*this.on(message =>
            this.setState(previousState => ({
                messages: GiftedChat.append(previousState.messages, message),
            }))
        );*/

        /*this.setState(previousState => ({
            messages: GiftedChat.append(previousState.messages, message),
        }))*/
    }

    /*componentWillUnmount() {
        this.off();
    }*/

    // observeAuth = () =>
    //     firebase.auth().onAuthStateChanged(this.onAuthStateChanged);

    /*onAuthStateChanged = user => {
        if (!user) {
            try {
                firebase.auth().signInAnonymously();
            } catch ({ message }) {
                alert(message);
            }
        }
    };*/

    /*uid() {
        return (firebase.auth().currentUser || {}).uid;
    }

    ref() {
       return firebase.database().ref('messages');
    }*/

    /*on = callback =>
        this.ref.limitToLast(20).on('child_added', snapshot => callback(this.parse(snapshot)));*/

    parse = snapshot => {
        const { timestamp: numberStamp, text, user } = snapshot.val();
        const { key: _id } = snapshot;
        const timestamp = new Date(numberStamp);
        const message = {
            _id,
            timestamp,
            text,
            user,
        };
        return message;
    };

    /*timestamp() {
        return firebase.database.ServerValue.TIMESTAMP;
    }*/

    // send the message to the Backend
    send = messages => {
        let newMsgs = [];
        for (let i = 0; i < messages.length; i++) {
            const { text, user } = messages[i];
            const message = {
                text,
                user,
                timestamp: /*this.timestamp*/1,
            };
            /*this.append(message);*/
            newMsgs.push(message);
        }

        this.setState({
            messages: newMsgs
        })
    };

    /*append = message => this.ref.push(message);*/

    // close the connection to the Backend
    /*off() {
        this.ref.off();
    }*/

}

export default Chat;
