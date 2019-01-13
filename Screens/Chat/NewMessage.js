import React from "react";
import Chat from "./Chat";

class NewMessage extends React.Component {

    static navigationOptions = ({ navigation }) => ({
        title: (navigation.state.params || {}).name || 'New Message',
    });

    render(){
        // call back to chat to send a new message
        return Chat;
    }




}