import { StyleSheet } from 'react-native';

import { primary } from '../../theme/colors';

export default StyleSheet.create({
    modalButton: {
        backgroundColor: primary,
        height: 67,
        width: 222,
        alignItems: 'center',
        justifyContent: 'center'
    },

    modalButtonText: {
        color: 'black', 
        fontWeight: 'bold',
        fontSize: 20,
    }
})