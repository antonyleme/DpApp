import { StyleSheet } from 'react-native';

import { primary } from '../../theme/colors';

export default StyleSheet.create({
    badge: {
        paddingHorizontal: 13,
        paddingVertical: 4,
        borderRadius: 50,
    },

    refused: {
        backgroundColor: '#9B1611',
    },

    accepted: {
        backgroundColor: '#00B92B',
    },

    delivered: {
        backgroundColor: '#959595',
    },

    received: {
        backgroundColor: '#FFC700',
    },

    textWhite: {
        fontWeight: '700',
        color: 'white',
        fontSize: 11,
    },

    textBlack: {
        fontWeight: '700',
        color: 'black',
        fontSize: 11,
    }
})