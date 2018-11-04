import React, { Component } from "react";
import { View, Text, Flatlist } from "react-native";


// Button: compose new message
// Button: search bar --> to search conversations
// Button: each conversation titled person Name
// Screen: Conversation messages after button press on conversation
        // button tied to uid

// 1. Conversation screen
// 2. Compose message
// 3. Scroll bar
// 4. Search bar

class Conversations extends React.Component {

    // FIXME
        static navigationOptions = ({ navigation }) => ({
            title: (navigation.state.params || {}).name || 'Chat!',
        });

    render() {
        const {navigate} = this.props.navigation;
        return (
            <Button
                // FIXME -
                title='Name'
                onPress={() =>
                    navigate('Name')}
            />
        );
    };








}






// List of conversations
//class FlatList extends React.Component {
