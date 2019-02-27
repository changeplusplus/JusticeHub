import React from 'react';
import { createStackNavigator, TabNavigator ,createBottomTabNavigator } from 'react-navigation';
import SignUp from './Screens/Auth/SignUp';
import config from './firebase-config';
import * as firebase from 'firebase';
import LoadApp from './Screens/LoadApp';
import Login from "./Screens/Auth/Login";
import ClientProfile from "./Screens/Profile/ClientProfile";
import LawyerProfile from "./Screens/Profile/LawyerProfile";
import SetupLawyerProfile from "./Screens/Profile/SetupLawyerProfile";
import SetupClientProfile from "./Screens/Profile/SetupClientProfile";
import ChatEntry from "./Screens/Chat/ChatEntry";
import ChatImpl from "./Screens/Chat/ChatImpl";
import Fire from './Fire';
import CaseNav from "./Screens/Cases/CaseNavigation";

//import CaseList from "./Screens/Cases/CaseList";

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
  }
}, {
  tabBarPosition: 'bottom'
});

const LawyerTabNav = TabNavigator({
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
    SetupClientProfile: {
        screen: SetupClientProfile
    },
    ClientTabNav: {
        screen: ClientTabNav
    },
    LawyerTabNav: {
        screen: LawyerTabNav
    },
    CaseTabNav: {
        screen: CaseNav
    }

},{

  /*EditLawyerProfile: {
    screen: EditLawyerProfile
  }*/
  /*EditClientProfile: {
    screen: EditClientProfile
  }*/

   // After login
   // Main: { screen: Main },

  navigationOptions: { header: null }

});

class App extends React.Component {
  // SignUp component is a placeholder before we use react-navigation
  render() {
    return (
      <CaseNav/>
    );
  }
}

export default MainStack;

