import { StyleSheet } from 'react-native';

import { primary } from '../../theme/colors';

export default StyleSheet.create({
    wrapper: {
        flex: 1,
    },

    h1: {
        fontSize: 35,
        fontWeight: 'bold',
    },

    h2: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },

    scroll: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    scrollItem: {
        marginRight: 10,
        width: 130,
    },

    scrollMore: {
        alignItems: 'center',
        marginHorizontal: 20,
    },

    scrollMoreButton: {
        width: 50,
        height: 50,
        backgroundColor: primary,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 50,
        marginBottom: 10,
    }
})