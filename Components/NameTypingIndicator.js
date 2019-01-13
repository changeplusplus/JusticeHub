import React, { Component } from "react";
import { StyleSheet, View, ScrollView, FlatList, Text, Animated } from "react-native";

class NameTypingIndicator extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isTyping: false,
      userTyping: "",
    };
  }

  componentDidMount(){
    this.props.chat.on('$typingIndicator.startTyping', (payload) => {
      this.setState({isTyping:true, userTyping: payload.sender.uuid })
    });

    this.props.chat.on('$typingIndicator.stopTyping', (payload) => {
      this.setState({isTyping:false});
    });
  }

  renderTypingIndicator(){
    if(this.state.isTyping){
      return (<View><Text> {this.state.userTyping} is typing... </Text></View>);
    } 
  }

  render() {
    return (
      <View style={styles.background}>
        {this.renderTypingIndicator()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  background: {
    backgroundColor: "#eee"
  },
});

export default NameTypingIndicator;