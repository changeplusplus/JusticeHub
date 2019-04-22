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
import AdminProfile from "./Screens/Profile/AdminProfile";
import Fire from './Fire';
import CaseSearch from "./Screens/Cases/CaseSearch";
import LawyerAuth from "./Screens/Admin/LawyerAuth";
//import CaseList from "./Screens/Cases/CaseList";
import ClientCases from "./Screens/Cases/ClientCases";
import EditClientProfile from "./Screens/Profile/EditClientProfile";
import CreateCase from "./Screens/Cases/CreateCase";
import Video from "expo/build/av/Video";
import {Text} from "react-native-elements";

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
    ViewProfile: {
        screen: LawyerProfile
    },
    CaseSearch: {
        screen: CaseSearch
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
    Login: {
        screen: Login
    },
    SignUp: {
        screen: SignUp
    },
    AdminProfile: {
        screen: AdminProfile
    },
    LawyerAuth: {
        screen: LawyerAuth
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
    },
    CreateCase: {
        screen: CreateCase
    }
}, {

    // After login
    // Main: { screen: Main },

    navigationOptions: {header: null}

});

class App extends React.Component {
    state = {
        render : false
    };
    // SignUp component is a placeholder before we use react-navigation
    render() {
        if(this.state.render){
            return(<MainStack/>);
        } else{
            firebase.auth().signInWithEmailAndPassword("Jakeclient@1.com", "1234567")
                .then(() => {this.setState({render:true})});
            return(<Text>Waiting</Text>);
        }
    }
}

export default App;
