import { StyleSheet } from 'react-native';

import { primary } from '../../theme/colors';

export default StyleSheet.create({
    modalButton: {
        backgroundColor: primary,
        height: 67,
        width: 222,
        alignItems: 'center',
        justifyContent: 'center',
    },

    modalButtonText: {
        color: 'black', 
        fontWeight: 'bold',
        fontSize: 20,
    },

    subtitle: {
        fontWeight: 'bold',
        fontSize: 18,
        marginBottom: 5,
    },

    group: {
        marginBottom: 15,
        marginTop: 15,
    },

    item: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    }
})