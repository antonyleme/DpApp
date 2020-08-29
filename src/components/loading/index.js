import React, { useState } from 'react';
import { Text, View, TextInput, ActivityIndicator } from 'react-native';

import styles from './styles.js';

export default function Component(props){

    return (
        <View style={styles.wrapper}>
            <ActivityIndicator size="large" color="black" />
        </View>
    )
}