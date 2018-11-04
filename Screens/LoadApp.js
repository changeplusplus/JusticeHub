import React, { Component } from 'react';
import { View } from 'react-native';
import DataStorage from 'DataStorage';

class LoadApp extends Component {
  componentDidMount() {
    DataStorage.loadBasicData();
  }

  // Todo: use expo securestore to store username and password
  async _autoLogin() {

  }

  render() {
    return (
      <View>

      </View>
    )
  }
}

export default LoadApp;