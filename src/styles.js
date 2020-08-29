import { StyleSheet } from 'react-native';

import Constants from 'expo-constants';

export default StyleSheet.create({
    container: {
        paddingHorizontal: 15,
    },

    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        flexWrap: 'wrap'
    },

    col6: {
        width: '48%',
    },

    col4: {
        width: '32%',
    },

    section: {
        marginBottom: 30,
    },

    input: {
        borderWidth: 1,
        borderColor: '#EBEBEB',
        borderRadius: 4,
        paddingHorizontal: 10,
        paddingVertical: 15,
    },

    label: {
        marginBottom: 5,
    },

    radioGroup: {
        flexDirection: 'row',
        alignItems: 'center'
    },

    formGroup: {
        marginBottom: 10,
    },
})