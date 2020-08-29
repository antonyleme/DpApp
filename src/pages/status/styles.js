import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    wrapper: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        backgroundColor: 'white',
        position: 'relative',
    },

    h1: {
        fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'center'
    },

    header: {
        marginBottom: 30,
    },

    p: {
        textAlign: 'center',
        color: '#A1A1A1',  
        marginBottom: 20,  
    },

    button: {
        position: 'absolute',
        bottom: 50,
    },

    image: {
        marginBottom: 30,
    }
})