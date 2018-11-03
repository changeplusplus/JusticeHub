import { Text, TextInput, View } from "react-native";
import React from "react";

export const InputBlock = (props) => (
  <View>
    <Text>{props.item}</Text>
    <TextInput
      autoCorrect={false}
      autoCapitalize='none'
      underlineColorAndroid='rgb(0, 0, 0)'
      onChangeText={(text) => props.onChangeText(props.state, text)}
    />
  </View>
);