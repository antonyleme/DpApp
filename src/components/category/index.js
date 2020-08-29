import React, {useState} from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import styles from './styles';

export default function Component(props) {
    const navigation = useNavigation();

    return (
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Category', { category: props.category})}>
            <Text>{props.category.name}</Text>
        </TouchableOpacity>
    );
}