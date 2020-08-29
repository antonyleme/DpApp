import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

import styles from './styles.js';

export default function Component(props){

    return(
        <TouchableOpacity style={styles.button} onPress={props.onPress}>
            <Text style={styles.text}>{props.children}</Text>
        </TouchableOpacity>
    )
}