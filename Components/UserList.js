/* 
Example: 
  <UserList chat={chatEngine.global} onUserPress={this.onUserPress} />

Required Props: 
  chat : chat object to get user in that chat
  onUserPress : function that activates on user press


*/


import React, { Component } from 'react';
import {Text, Avatar, } from "react-native-elements";
import { StyleSheet, View, ScrollView, TouchableOpacity } from "react-native";

class UserList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userList: {},
    };
  }

  componentDidMount(){
    this.props.chat.on('$.online.*', (newUser) => {
      let newUserUuid = newUser.user.uuid;
      let user = {
        name: newUser.user.state.name,
        avatar_url : 'http://busybridgeng.com/wp-content/uploads/2017/05/generic-avatar.png',
        online: true
      }

      let userList = {...this.state.userList};
      userList[newUserUuid] = user;

      this.setState(prevState => ({
        userList: userList
      }));
    });

    this.props.chat.on('$.offline.*', (data) => {
      let offlineUserUuid = data.user.uuid;

      let userList = {...this.state.userList};
      userList[offlineUserUuid].online = false;

      this.setState(prevState => ({
        userList: userList
      }));

    });
  }

  renderOnlineList(){
    let userList = this.state.userList;

    return Object.keys(userList).map(uuid => 
      <TouchableOpacity key={uuid} onPress={() => this.props.onUserPress(userList[uuid].name)}>
        <View
          key={uuid}
          style={styles.ListItem}
        >
          <Avatar
            containerStyle={styles.avatar}
            rounded
            source={userList[uuid].avatar_url && {uri: userList[uuid].avatar_url}}
            title={"test"}
          />
          <View style={userList[uuid].online ? styles.online : styles.offline}/>
          <Text style={styles.username}>{userList[uuid].name}</Text>
        </View>
      </TouchableOpacity>
    )
  }

  render() {
    return (
      <View>
        <View style={styles.header}>
          <Text style={styles.headerText}> Users </Text>
        </View>
        <ScrollView style={styles.list}>
            { this.renderOnlineList() }
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    height:40,
    alignItems: 'center',
    backgroundColor: "#D02129"
  },
  headerText:{
    color:"#fff"
  },
  list:{
    borderBottomWidth: 1,
    borderColor: '#d6d7da',
  },
  ListItem:{
    flexDirection:"row",
    borderTopWidth: 1,
    borderColor: '#d6d7da',
    height: 50,
    alignItems:"center",
  },
  avatar:{
    marginLeft: 10,
  },
  username:{
    marginLeft: 5,
  },
  online:{
    backgroundColor:"green",
    width:10,
    height:10,
    borderRadius:5,
    position: 'absolute',
    bottom: 8,
    left: 35,
  },
  offline:{
    backgroundColor:"#95a5a6",
    width:10,
    height:10,
    borderRadius:5,
    position: 'absolute',
    bottom: 8,
    left: 35,
  }
});

export default UserList;