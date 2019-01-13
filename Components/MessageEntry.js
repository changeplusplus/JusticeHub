import React, { Component } from "react";

/*
Example: 
  <MessageEntry chat={this.state.chat} typingIndicator keyboardVerticalOffset={80}/>

Required Props: 
  chat : chat object to specify which chat to send message

Optional Props:
  typingIndicator : use this if you want the typing indicator to appear on a user typing. You must set typing indicator plugin on the chat object
  keyboardVerticalOffset : used to format how high your entry component should rise with keyboard




*/

import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView
} from "react-native";

import NameTypingIndicator from "./NameTypingIndicator";

import { Icon } from "react-native-elements";

class MessageEntry extends Component {
  constructor(props) {
    super(props);

    this.state = {
      chatInput: "",
    };

    this.setChatInput = this.setChatInput.bind(this);
  }

  sendChat() {
    if (this.state.chatInput) {
      this.props.chat.emit("message", {
        text: this.state.chatInput
      });
      this.setState({ chatInput: "" });
    }
  }

  setChatInput(value) {
    this.setState({ chatInput: value });

    if (this.props.typingIndicator) {
      if (value !== "") {
        this.props.chat.typingIndicator.startTyping();
      } else {
        this.props.chat.typingIndicator.stopTyping();
      }
    }
  }

  onTypingIndicator() {
    if (this.props.typingIndicator) {
      return <NameTypingIndicator chat={this.props.chat} />;
    }
  }

  render() {
    return (
      <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={this.props.keyboardVerticalOffset || 0}>
        {this.onTypingIndicator()}
        <View style={styles.footer}>
          <TextInput
            value={this.state.chatInput}
            style={styles.input}
            underlineColorAndroid="transparent"
            placeholder="Send Message"
            onChangeText={this.setChatInput}
            onSubmitEditing={() => {
              this.sendChat();
            }}
          />
          <TouchableOpacity
            style={{ backgroundColor: "#D02129" }}
            onPress={() => {
              this.sendChat();
            }}
          >
            <Icon
              reverse
              name="send"
              size={26}
              color="#D02129"
              style={styles.send}
            />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  footer: {
    flexDirection: "row",
    backgroundColor: "#eee"
  },
  input: {
    paddingHorizontal: 20,
    fontSize: 18,
    flex: 1
  },
  send: {
    alignSelf: "center",
    padding: 10
  }
});

export default MessageEntry;
