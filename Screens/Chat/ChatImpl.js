import React, { Component } from 'react';
import { KeyboardAvoidingView, StyleSheet } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import Fire from '../../Fire';

class ChatImpl extends Component {
    constructor() {
        super();

        let fire = new Fire();
        fire.observeAuth();
    }

    static navigationOptions = ({ navigation }) => ({
        title: (navigation.state.params || {}).name || 'Chat!',
    });

    state = {
        messages: [],
    };

    render() {
        return (
            <KeyboardAvoidingView behavior='padding' style={{ flex: 1 }}>
                <GiftedChat
                    messages={this.state.messages}
                    onSend={Fire.shared.send}
                    user={this.user}
                />
            </KeyboardAvoidingView>
        );
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