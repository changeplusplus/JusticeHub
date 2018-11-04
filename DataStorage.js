import * as firebase from 'firebase';
import { SecureStore } from 'expo';

class DataStorage {
  static EMAIL;
  static FULL_NAME;
  static PHONE_NUM;
  static IS_LAWYER;

  // Laywer specific information
  static EXP;
  static DEGREE;
  static SPECIALTY;

  // Client specific information
  static LOCATION;

  static async saveLogin(email, password) {
    console.log('Trying to save login....');
    let savableEmail = email.substring(0, email.indexOf('@')) + '-at_' + email.substring(email.indexOf('@') + 1, email.length);
    // Save email for login
    SecureStore.setItemAsync('lastUser', savableEmail)
      .then(() => {

        // Save password
        SecureStore.setItemAsync('password', password)
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
    const uid = firebase.auth().currentUser.uid;

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

  static loadProfileData() {
    const uid = firebase.auth().currentUser.uid;

    // Load lawyer data
    if (this.IS_LAWYER) {
      firebase.database().ref('Profiles/Lawyers/' + uid).once('value')
        .then((snap) => {
          this.EXP = snap.val().experience;
          this.DEGREE = snap.val().degree;
          this.SPECIALTY = snap.val().specialty;

          console.log(this.EXP, this.DEGREE, this.SPECIALTY);
        })
        .catch((error) => {
          alert('Cannot get lawyer data ' + error.message);
        })
    } else {
      // Load client data
      firebase.database().ref('Profiles/Clients/' + uid).once('value')
        .then((snap) => {
          this.LOCATION = snap.val().location;

          console.log(this.LOCATION);
        })
        .catch((error) => {
          alert('Cannot get lawyer data ' + error.message);
        })
    }
  }

  static clearData() {
    this.EMAIL = '';
    this.FULL_NAME = '';
    this.PHONE_NUM = '';
    this.IS_LAWYER = '';

    this.EXP = '';
    this.DEGREE = '';
    this.SPECIALTY = '';

    this.LOCATION = '';
  }
}

export default DataStorage;