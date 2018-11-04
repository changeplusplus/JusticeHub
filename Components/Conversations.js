import React from "react";
import {View, Text, ScrollView,} from "react-native";


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
            title: (navigation.state.params || {}).name || 'Conversations',
        });

    render() {
        const {navigate} = this.props.navigation;
        return (
            <ScrollView>
            <View style={styles.container}>
                <Button
                title='Conversations'
                //color= ""
                onPress={() =>
                    navigate('Conversations')}
                />

                <Button
                title='New Message'
                // color= ""
                onPress={() =>
                    navigate('New Message')}
                />

            </View>
            </ScrollView>






        );
    };








}






// List of conversations
//class FlatList extends React.Component {
