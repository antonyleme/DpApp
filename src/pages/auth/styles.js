import { StyleSheet } from 'react-native';

import { primary } from '../../theme/colors';

export default StyleSheet.create({
    wrapper: {
        flex: 1,
        justifyContent: 'space-between',
        paddingHorizontal: 15,
        paddingTop: 30,
        paddingBottom: 30,
    },

    chooseWrapper: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 15,
        paddingTop: 30,
        paddingBottom: 30,
    },

    h1: {
        fontSize: 35,
        fontWeight: 'bold',
    },

    h2: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: primary,
        height: 50,
        width: '100%',
        borderRadius: 4,
        marginBottom: 15,
    },

    textBlack: {
        fontWeight: 'bold',
        color: 'black'
    },

    fbButton: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#4267B2',
        height: 50,
        width: '100%',
        borderRadius: 4,
        marginBottom: 15,
    },

    textWhite: {
        fontWeight: 'bold',
        color: 'white',
    },

    altButton: {
        width: '100%',
        alignItems: 'center'
    },

    altText: {
        fontWeight: 'bold',
        color: '#707070',
        marginTop: 10,
    },

    register: {
        marginTop: 20,
        alignItems: 'center'
    },

    registerText: {
        fontWeight: 'bold',
        color: 'black',
    },

    input: {
        backgroundColor: 'white',
        height: 50,
        color: '#929292',
        marginBottom: 15,
        paddingHorizontal: 15,
        borderRadius: 4,
        elevation: 3,
    },

    loginButton: {
        width: '100%',
        alignItems: 'center',
    },

    pageTitle: {
    },

    chooseTitle: {
        marginBottom: 50
    }
})