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

export default class CaseSearch extends Component {
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
