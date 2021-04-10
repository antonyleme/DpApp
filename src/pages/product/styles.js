import { StyleSheet } from 'react-native';

import { primary } from '../../theme/colors';

export default StyleSheet.create({
    name: {
        color: '#707070',
    },

    priceMenu: {
        marginVertical: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },

    price: {
        fontWeight: 'bold',
        fontSize: 25,
    },

    image: {
        marginBottom: 30,
        height: 300,
        width: 300,
    },

    button: {
        width: '100%',
        height: 67,
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        paddingHorizontal: 15,
        backgroundColor: primary,
    },

    buttonText: {
        fontWeight: 'bold',
        color: 'black',
        fontSize: 18
    },

    counter: {
        flexDirection: 'row',
        width: 180,
        paddingVertical: 5,
        justifyContent: 'space-between',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#D8D8D8',
        borderRadius: 4,
    },

    counterIcon: {
        marginHorizontal: 5,
        color: primary,
    },

    counterText: {
        fontWeight: 'bold',
        fontSize: 25,
    },
    
    cold: {
        flexDirection: 'row',
        marginVertical: 10,
        padding: 5,
        alignItems: 'center',
    },
})