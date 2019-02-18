import firebase from 'firebase';
import config from './firebase-config';

class Fire {
    constructor() {
        // this.init();

        // this.observeAuth();
    }

    observeAuth = () =>
        firebase.auth().onAuthStateChanged(this.onAuthStateChanged);

    onAuthStateChanged = user => {
        if (!user) {
            try {
                console.log('Signing in anon');
                firebase.auth().signInAnonymously();
                console.log('UID:', firebase.auth().currentUser.uid);
            } catch ({message}) {
                alert(message);
            }
        }
    };

    get ref() {
        return firebase.database().ref('messages');
    }

    on = callback =>
        this.ref
            .limitToLast(20)
            .on('child_added',
                    snapshot => callback(this.parse(snapshot)));

    parse = snapshot => {
        const { timestamp: numberStamp, text, user } = snapshot.val();
        const { key: _id } = snapshot;
        // 2.
        const timestamp = new Date(numberStamp);
        // 3.
        const message = {
            _id,
            timestamp,
            text,
            user,
        };
        return message;
    };

    off() {
        this.ref.off();
    }

    get uid(){
        return(firebase.auth().currentUser || {}).uid;
    }

    get timestamp(){
        return firebase.database.ServerValue.TIMESTAMP;
    }

    send = messages => {
        for (let i = 0; i < messages.length; i++) {
            const { text, user } = messages[i];
            // 4.
            const message = {
                text,
                user,
                timestamp: this.timestamp,
            };
            this.append(message);
        }
    };

    append = message => this.ref.push(message);

    init = () =>
        firebase.initializeApp(config);
}


Fire.shared = new Fire();
export default Fire;