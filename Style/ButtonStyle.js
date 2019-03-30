import { StyleSheet } from "react-native"

const Jtheme = {

    backgroundColor: '#112853',

    BackButton: {
        color: '#cc7832',
        paddingLeft: 0,
        paddingRight: 0,
        paddingTop: 0,
        paddingBottom: 100,
        marginTop: -5,
        position: 'absolute', // add if dont work with above
    },

    Button: {
        color: '#cc7832',
        paddingLeft: 70,
        paddingRight: 70,
        paddingTop: 10,
        paddingBottom: 10,
    },

    Container: {
        flex: 1,
        color: '#cc7832',
        backgroundColor: '#112853',
        flexDirection: 'column',
        justifyContent: 'center',
        borderColor: '#111111',
        borderWidth: 1,
    },

    Input: {
        flex: 1,
        backgroundColor: '#111111',
        flexDirection: 'column',
        justifyContent: 'center',
        borderColor: '#111111',
        borderWidth: 3,
        paddingLeft: 50,
    },

    Text: {
        alignment: true,
        fontWeight: 'bold',
        flexDirection: 'column',
        color: '#112853',
        justifyContent: 'center',
        fontSize: 20,
        paddingTop: 5,
        paddingLeft: 10,
        paddingRight: 10,
        borderTopWidth: 7,
        borderBottomWidth: 3
    },

    InputText: {
        alignment: true,
        fontWeight: 'bold',
        flexDirection: 'column',
        flex: .5,
        color: '#112853',
        justifyContent: 'center',
        fontSize: 15,
        paddingBottom: 5,
        paddingLeft: 10,
        paddingRight: 50,
    },

};