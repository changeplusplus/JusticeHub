import React, { Component } from "react";
import {
    View,
    Text,
    FlatList,
    ActivityIndicator,
    SafeAreaView,
} from "react-native";
import {  ListItem, SearchBar } from "react-native-elements";
import { cases } from "./data/cases";
import _ from "lodash";
import config from "./config";
import firebase from "firebase";
import { createStackNavigator, createAppContainer } from 'react-navigation';

class CaseSearch extends Component {
    constructor(props) {
        super(props);
        firebase.initializeApp(config);
        this.readUserData();
        this.state = {
            loading: false,
            data: [],
            error: null
        };
    }

    readUserData() {
        firebase.database().ref('cases/').on('value', function (snapshot) {
            console.log(snapshot.val());
            console.log("\n\n\ntest");
        });
    }

    componentDidMount() {
        this.makeRemoteRequest();
    }

    makeRemoteRequest = () => {
        this.setState({ loading: true });

        getCases()
            .then(users => {
                this.setState({
                    loading: false,
                    data: users
                });
            })
            .catch(error => {
                this.setState({ error, loading: false });
            });
    };

    renderSeparator = () => {
        return (
            <View
                style={{
                    height: 1,
                    width: "86%",
                    backgroundColor: "#CED0CE",
                    marginLeft: "14%"
                }}
            />
        );
    };

    renderHeader = () => {
        return <SearchBar placeholder="Type Here..."
                          lightTheme round />;
    };

    renderFooter = () => {
        if (!this.state.loading) return null;

        return (
            <View
                style={{
                    paddingVertical: 20,
                    borderTopWidth: 1,
                    borderColor: "#CED0CE"
                }}
            >
                <ActivityIndicator animating size="large" />
            </View>
        );
    };



    render() {
        return (
            <SafeAreaView containerStyle={{ borderTopWidth: 0, borderBottomWidth: 0 }}>

                <FlatList
                    data={this.state.data}
                    renderItem={({ item }) => (
                        <ListItem
                            title={item.name}
                            subtitle={item.description}
                            containerStyle={{ borderBottomWidth: 0 }}
                            onPress={() => {
                                /* 1. Navigate to the Details route with params */
                                this.props.navigation.navigate('Details', {
                                    itemId: 1,
                                    otherParam: 'Case Title',
                                });
                            }}
                        />
                    )}
                    keyExtractor={item => item.email}
                    ItemSeparatorComponent={this.renderSeparator}
                    ListHeaderComponent={this.renderHeader}
                    ListFooterComponent={this.renderFooter}
                />
            </SafeAreaView>
        );
    }
}

const contains = ({ name, email }, query) => {
    const { first, last } = name;
    return first.includes(query) || last.includes(query) || email.includes(query);

};

const getCases = (limit = 20, query = "") => {
    return new Promise((resolve, reject) => {
        if (query.length === 0) {
            resolve(_.take(cases, limit));
        } else {
            const formattedQuery = query.toLowerCase();
            const results = _.filter(cases, cases => {
                return contains(user, formattedQuery);
            });
            resolve(_.take(results, limit));
        }
    });
};


class DetailsScreen extends React.Component {
    render() {
        /* 2. Get the param, provide a fallback value if not available */
        const { navigation } = this.props;
        const itemId = navigation.getParam('itemId', 'NO-ID');
        const otherParam = navigation.getParam('otherParam', 'some default value');

        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text>Details Screen</Text>
                <Text>itemId: {JSON.stringify(itemId)}</Text>
                <Text>otherParam: {JSON.stringify(otherParam)}</Text>
                <Button
                    title="Go to Details... again"
                    onPress={() =>
                        this.props.navigation.push('Details', {
                            itemId: Math.floor(Math.random() * 100),
                        })}
                />
                <Button
                    title="Go to Home"
                    onPress={() => this.props.navigation.navigate('Home')}
                />

            </View>
        );
    }
}

const RootStack = createStackNavigator(
    {
        Home: CaseSearch,
        Details: DetailsScreen,
    },
    {
        initialRouteName: 'Home',
    }
);
const CaseNavigation = createAppContainer(RootStack);
export default CaseNavigation;
