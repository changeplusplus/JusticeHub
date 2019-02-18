import React, { Component } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity , View } from 'react-native';

class ChatMain extends Component {

    onPress = () => {
        this.props.navigation.navigate('Chat', { name: this.state.name });
    };

    onChangeText = name => this.setState({name});

    render() {

        return (
        <View>
            <Text style={styles.title}>Enter your name:</Text>
            <TextInput
                onChangeText={this.onChangeText}
                style={styles.nameInput}
                placeHolder="Your Name"
                value={this.state.name}
            />

            <TouchableOpacity onPress={this.onPress}>
                <Text style={styles.buttonText}>Next</Text>
            </TouchableOpacity>
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

export default ChatMain;