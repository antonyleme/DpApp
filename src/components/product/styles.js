import { StyleSheet } from 'react-native';

import { primary } from '../../theme/colors';

export default StyleSheet.create({
    container: {
        borderWidth: 1,
        borderColor: '#D8D8D8',
        borderRadius: 4,
        borderStyle: 'solid',
        padding: 10,
    },

    image: {
        alignSelf: 'center',
        marginBottom: 15,
        height: 120,
        width: 120,
    },

    price: {
        fontWeight: 'bold',
        marginTop: 5,
        fontSize: 18,
    }
})