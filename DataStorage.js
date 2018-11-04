import * as firebase from 'firebase';
import Expo from 'expo';

class DataStorage {
  static EMAIL;
  static FULL_NAME;
  static PHONE_NUM;
  static IS_LAWYER;

  static async saveLogin(email, password) {
    console.log('Trying to save login....');
    let savableEmail = email.substring(0, email.indexOf('@')) + '-at_' + email.substring(email.indexOf('@') + 1, email.length);
    // Save email for login
    Expo.SecureStore.setItemAsync('lastUser', savableEmail)
      .then(() => {

        // Save password
        Expo.SecureStore.setItemAsync('password', password)
          .then(() => {

            console.log('Successfully saved email and pass');
          })
          .catch((error) => {
            alert('Expo Error: ' + error.message);
          })
      })
      .catch((error) => {
        alert('Expo Error: ' + error.message);
      })
  }

  static loadBasicData() {
    let uid = firebase.auth().currentUser.uid;

    firebase.database().ref('users/' + uid).once('value')
      .then((snap) => {
        this.EMAIL = snap.val().email;
        this.IS_LAWYER = snap.val().isLawyer;
        this.FULL_NAME = snap.val().fullName;
        this.PHONE_NUM = snap.val().phoneNumber;

        console.log(this.EMAIL, this.IS_LAWYER, this.FULL_NAME, this.PHONE_NUM);
      })
      .catch((error) => {
        alert('ERROR loading user data: ' + error.message);
      })
  }
}

export default DataStorage;