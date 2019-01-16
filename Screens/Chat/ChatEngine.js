import React from "react";
import { StyleSheet, Text, View, Platform, StatusBar } from "react-native";

import ChatEngineCore from "chat-engine";
import typingIndicator from "chat-engine-typing-indicator";

import {MessageEntry} from "chat-engine-react-native";
import {MessageList} from "chat-engine-react-native";

const ChatEngine = ChatEngineCore.create({
    publishKey: "pub-c-4b578376-7035-4a22-b4ef-adb0d6937fd5",
    subscribeKey: "sub-c-247ec842-1511-11e9-a971-425ad67106f3"
});

const now = new Date().getTime();
const username = ['user', now].join('-');

export default class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            chat: null,
            renderChat: false,
            me: null,
        };
    }

    componentDidMount() {
        console.disableYellowBox = true;

        ChatEngine.connect(username, {
            signedOnTime: now
        }, 'auth-key');

        ChatEngine.on("$.ready", data => {
            const me = data.me;
            let chat = new ChatEngine.chat('MyChat');

            // typing indicator timeout - shows other user typing
            chat.plugin(typingIndicator({timeout: 5000}));

            this.setState({chat: chat, renderChat: true, me: data.me});
        });
    }

    render() {
        return (
            <View style={styles.container}>
                {!this.state.renderChat ? (
                    <Text> Loading </Text>
                ) : (
                    <View style={{flex: 1}}>
                        {Platform.OS === 'ios' && <StatusBar barStyle="default"/>}
                        {Platform.OS === 'android' && <View style={styles.statusBarUnderlay}/>}
                        <MessageList chat={this.state.chat}/>
                        <MessageEntry chat={this.state.chat} typingIndicator/>
                    </View>
                )}
            </View>
        );
    }
}

/** Stylesheet **/
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
});
