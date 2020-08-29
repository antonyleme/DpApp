import { StyleSheet } from 'react-native';

import { primary } from '../../theme/colors';

export default StyleSheet.create({
    button: {
        height: 40,
        backgroundColor: primary,
        color: 'black',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        borderRadius: 5,
        marginBottom: 7,
    }
})