import * as firebase from 'firebase';

class DataStorage {
  static EMAIL;
  static FULL_NAME;
  static PHONE_NUM;
  static IS_LAWYER;

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