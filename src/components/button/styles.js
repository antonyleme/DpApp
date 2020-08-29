import { StyleSheet } from 'react-native';

import { primary } from '../../theme/colors';

export default StyleSheet.create({
    button: {
        width: 222,
        height: 67,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: primary,
    },

    text: {
        color: 'black',
        fontWeight: 'bold',
        fontSize: 20
    }
})