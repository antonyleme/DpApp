import { StyleSheet } from 'react-native';

import { primary } from '../../theme/colors';

export default StyleSheet.create({
    wrapper: {
        flex: 1,
    },

    h1: {
        fontSize: 20,
        fontWeight: '700',
        marginBottom: 10,
    },

    h2: {
        fontSize: 18,
        fontWeight: '700',
        marginBottom: 10,
    },

    product: {
        marginBottom: 10,
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
    }
})