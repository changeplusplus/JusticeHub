import React from "react";
import {View, Text, ScrollView, Button, StyleSheet, Alert, AppRegistry} from "react-native";

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

        static navigationOptions = ({ navigation }) => ({
            title: (navigation.state.params || {}).name || 'Conversations',
        });

    render() {
        const {navigate} = this.props.navigation;
        return (

            <View>

                <View>
                    <Button
                        title='New Message'
                        onPress={() =>
                            navigate('Chat')}
                        style={styles.buttonStyle}
                    />
                </View>

            <ScrollView>

                // Conversation components go here, prop is name

            </ScrollView>


            </View>

        )
    }

    const styles = this.Stylesheet.create({
        buttonStyle: {
            //color:
            marginTop: 20,
            padding: 20,
            //background color:
        }

        inputsContainer: {
            flex: 1
        },
        fullWidthButton: {
            backgroundColor: 'blue',
            height:70,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center'
        },
        fullWidthButtonText: {
            fontSize:24,
            color: 'white'
        }
    });

}







// List of conversations
//class FlatList extends React.Component {
