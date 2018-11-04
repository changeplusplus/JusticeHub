import React from "react";

class NewMessage extends React.Component {

    static navigationOptions = ({ navigation }) => ({
        title: (navigation.state.params || {}).name || 'New Message',
    });




}