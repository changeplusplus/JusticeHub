import React, { Component } from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';
import * as firebase from 'firebase';
import ChatMain from "./ChatMain";

class ChatEntry extends Component {

    render() {
        const {navigate} = this.props.navigation;
        return (
            <View>
                <View style={styles.button}>
                    <Text style={styles.buttonText}>Chat</Text>
                </View>

                <Button
                    onPress={() => navigate('ChatMain')}
                    title="to Chat"
                    color="#841584"
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({

    button: {
        marginBottom: 30,
        width: 260,
        alignItems: 'center',
        backgroundColor: '#b66040'
    },
    buttonText: {
        padding: 20,
        color: 'white'
    }
});

export default ChatEntry;