import React from 'react';
import {createStackNavigator, createBottomTabNavigator} from 'react-navigation';
import SignUp from './Screens/Auth/SignUp';
import config from './firebase-config';
import * as firebase from 'firebase';
import LoadApp from './Screens/LoadApp';
import Login from "./Screens/Auth/Login";
import ClientProfile from "./Screens/Profile/ClientProfile";
import LawyerProfile from "./Screens/Profile/LawyerProfile";
import SetupLawyerProfile from "./Screens/Profile/SetupLawyerProfile";
import ChatEntry from "./Screens/Chat/ChatEntry";
import ChatImpl from "./Screens/Chat/ChatImpl";
import Fire from './Fire';
import CaseSearch from "./Screens/Cases/CaseSearch";
//import CaseList from "./Screens/Cases/CaseList";
import ClientCases from "./Screens/Cases/ClientCases";
import EditClientProfile from "./Screens/Profile/EditClientProfile";

// API information in firebase-config.js
// firebase.initializeApp(config);
let fire = new Fire();
fire.init();

console.disableYellowBox = true;

const ClientTabNav = createBottomTabNavigator({
    /*CreateCase: {

  },*/
    ViewProfile: {
        screen: ClientProfile
    },
    Cases: {
        screen: ClientCases
    }
}, {
    tabBarPosition: 'bottom'
});

const LawyerTabNav = createBottomTabNavigator({
    /*CurrentCases: {

    },
    AllCases: {

    },*/
    ViewProfile: {
        screen: LawyerProfile
    }
}, {
    tabBarPosition: 'bottom'
});

const MainStack = createStackNavigator({

    // CaseList: {
    //     screen: CaseList
    // },

    LoadApp: {
        screen: LoadApp
    },
    ChatEntry: {
        screen: ChatEntry
    },
    Chat: {
        screen: ChatImpl
    },
    Login: {
        screen: Login
    },
    SignUp: {
        screen: SignUp
    },
    SetupLawyerProfile: {
        screen: SetupLawyerProfile
    },
    EditClientProfile: {
        screen: EditClientProfile
    },
    ClientTabNav: {
        screen: ClientTabNav
    },
    LawyerTabNav: {
        screen: LawyerTabNav
    },
    ClientCases: {
        screen: ClientCases
    },
    ClientProfile: {
        screen: ClientProfile
    },
    CaseSearch: {
        screen: CaseSearch
    }
}, {

    // After login
    // Main: { screen: Main },

    navigationOptions: {header: null}

});

class App extends React.Component {
    // SignUp component is a placeholder before we use react-navigation
    render() {
        return (
            <MainStack/>
        );
    }
}

export default App;
