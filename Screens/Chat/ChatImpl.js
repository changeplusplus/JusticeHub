import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';

class ChatImpl extends Component {

    static navigationOptions = ({ navigation }) => ({
        title: (navigation.state.params || {}).name || 'Chat!',
    });

    state = {
        messages: [],
    };

    render() {
        return <GiftedChat
            messages={this.state.messages}
            onSend={Fire.shared.send}
            user={this.user}
        />;
    }

    get user() {
        // Return our name and our UID for GiftedChat to parse
        return {
            name: this.props.navigation.state.params.name,
            _id: Fire.shared.uid,
        };
    }

    componentDidMount() {
        Fire.shared.on(message =>
            this.setState(previousState => ({
                messages: GiftedChat.append(previousState.messages, message),
            }))
        );
    }

    componentWillUnmount() {
        Fire.shared.off();
    }

}

const styles = StyleSheet.create({});


export default ChatImpl;