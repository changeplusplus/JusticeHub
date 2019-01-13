import React from "react";
import {View, Text, ScrollView, Button, StyleSheet} from "react-native";


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

    // Firebase Admin SDK

    // FIXME need to list all conversations and include a button to send new message
        static navigationOptions = ({ navigation }) => ({
            title: (navigation.state.params || {}).name || 'Conversations',
        });

    render() {
        const {navigate} = this.props.navigation;
        return (
            <ScrollView>
            <View style={styles.container}>
                /*<Button
                title='Conversations'
                //color= ""
                onPress={() =>
                    navigate('Conversations')}

                />*/

                //FIXME how to display all conversations in the server?
                //FIXME how to specify sender in new message
                //FIXME


                <Button
                title='New Message'
                onPress={() =>
                    navigate('Chat')}
                style={styles.buttonStyle}
                />

            </View>
            </ScrollView>
        )
    }

    const styles = this.Stylesheet.create({
        buttonStyle: {
            //color:
            marginTop: 20,
            padding: 20,
            //background color:
        }
    });

}







// List of conversations
//class FlatList extends React.Component {
