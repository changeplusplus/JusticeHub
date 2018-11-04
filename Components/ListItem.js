import React, {Component} from 'react';
import {View, Text} from 'react-native';

class ListItem extends Component {
    render() {
        return (
            <View>
                <Text>{this.props.clientCase.name}</Text>
            </View>
        );
    }
}

export default ListItem;