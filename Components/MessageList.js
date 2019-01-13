/*
Example usage:
  <MessageList chat={this.state.chat}/>

Required Props:
  chat : chat object to know what messages to render


*/

import React, { Component } from "react";
import { Header,Text, Avatar } from "react-native-elements";
import { StyleSheet, View, ScrollView, FlatList, ActivityIndicator } from "react-native";

import ChatEngineGravatar from "chat-engine-gravatar";

import HTMLView from "react-native-htmlview";

// uri: "https:" + props.message.sender.state().gravatar

class Message extends React.PureComponent {
  //TODO: Refactor this component

  //if the user is "me" render right, if not render left
  render() {
    if (this.props.message.sender.name === "Me") {
      //return users own messages with different styling
      return (
        <View style={styles.myMessageContainer}>
          <View style={styles.myMessages}>
            <HTMLView value={`<p> ${this.props.message.data.text} </p>`} stylesheet={styles} />
          </View>
        </View>
      );
    }

  //messages that aren't from me
    return (
      <View style={styles.messageContainer}>
        <View style={styles.avatar}>
          <Avatar
            small
            rounded
            source={{
              uri:
                "http://busybridgeng.com/wp-content/uploads/2017/05/generic-avatar.png"
            }}
            activeOpacity={0.7}
          />
        </View>
        <View style={{ flexDirection: "column"}}>
          <Text style={styles.messageUID}>{this.props.message.sender.uuid} </Text>
          <View style={styles.recievedMessages}>
            <HTMLView value={this.props.message.data.text} stylesheet={styles} />
          </View>
        </View>
      </View>
    );
  }
};

class MessageList extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      messages: [],
      loading: true,
    };
  }

  _keyExtractor = (item, index) => index;

  componentDidMount() {
    let searchy = this.props.chat.search({
      event: 'message',
      limit: 50
    });

    searchy.on('message', (data) => {
      this.setState({ messages: [...this.state.messages, data] });
    });
    
    searchy.on('$.search.finish', () => {
      this.setState({loading:false, messages: this.state.messages.reverse()});

      this.props.chat.on("message", payload => {
        this.setState({ messages: [...this.state.messages, payload] });
      });
    });
  }

  componentWillUpdate(newProps){
    if(this.props.chat !== newProps.chat){
      this.setState({messages: [], loading:true});
  
      let searchy = newProps.chat.search({
        event: 'message',
        limit: 50
      });
  
      searchy.on('message', (data) => {
        this.setState({ messages: [...this.state.messages, data] });
      });
      
      searchy.on('$.search.finish', () => {
        this.setState({loading:false, messages: this.state.messages.reverse()});

        newProps.chat.on("message", payload => {
          this.setState({ messages: [...this.state.messages, payload] });
        });
      });
    }
  }

  render() {
    if(this.state.loading){
      return (
        <View style={{flex:1, justifyContent:"center", alignItems:"center"}}>
          <ActivityIndicator size="large"/>
        </View>
      )
    }
    return (
      <FlatList
        ref={el => (this.flatList = el)}
        data={this.state.messages}
        extraData={this.state}
        keyExtractor={this._keyExtractor}
        renderItem={({ item }) => <Message message={item} />}
      />
    );
  }
}

const styles = StyleSheet.create({
  messageList: {
    flex: 1,
  },
  recievedMessages: {
    borderRadius: 15,
    backgroundColor: "#f0f0f0",
    marginRight: 60,
    minHeight: 30,
    justifyContent: "center",
    padding: 5,
    alignItems:'flex-start',
  },
  myMessages: {
    borderRadius: 15,
    backgroundColor: "#D02129",
    marginLeft: 60,
    minHeight: 30,
    justifyContent: "center",
    padding: 5,
    alignItems:'flex-end',
  },
  myMessageContainer: {
    flex: 1,
    flexDirection: "row",
    alignSelf: 'flex-end',
    margin: 3,
  },
  messageContainer: {
    flex: 1,
    flexDirection: "row",
    alignSelf: 'flex-start',
    margin: 3,
  },
  avatar: {
    flexDirection: "column",
    justifyContent: "flex-end",
    marginRight: 3
  },
  messageUID: {
    color: "#C5C0B1"
  },

  //this is for styling HTMLview
  p: {
    color:'#FFFFFF'
  }
});

export default MessageList;
