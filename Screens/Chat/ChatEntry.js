import React, { Component } from 'react';
import {StyleSheet, View, Text, TextInput, TouchableOpacity, Button, Linking} from 'react-native';

class ChatEntry extends Component {
    state = {
        name: ''
    };

    onPress = () => {
        this.props.navigation.navigate('Chat', { name: this.state.name });
    };

    onChangeText = name => this.setState({name});

    render() {

        return (
            <View>

                <Button onPress={() => {Linking.openURL('https://web.telegram.org/#/login')}} title='Go to Telegram'/>

            </View>
        );
    }
}

const offset = 24;
const styles = StyleSheet.create({
    nameInput: {
        height: offset * 2,
        margin: offset,
        paddingHorizontal: offset,
        paddingTop: 50,
        borderColor: '#111111',
        borderWidth: 1,
    },
    title: {
        marginTop: offset,
        marginLeft: offset,
        fontSize: offset,
    },
    buttonText: {
        marginLeft: offset,
        fontSize: offset,
    },
});

export default ChatEntry;