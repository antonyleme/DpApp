import { StyleSheet } from 'react-native';

import { primary } from '../../theme/colors';

export default StyleSheet.create({
    button: {
        height: 67,
        justifyContent: 'space-between',
        flexDirection: 'row',
        paddingHorizontal: 15,
        alignItems: 'center',
        backgroundColor: primary,
        position: 'absolute',
        bottom: 25,
        left: 12,
        right: 12,
    },

    text: {
        color: 'black',
        fontWeight: 'bold',
        fontSize: 20
    }
})