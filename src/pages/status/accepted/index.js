import React, { useEffect, useState, useRef } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { ActivityIndicator, View, SafeAreaView, StyleSheet, Text, TouchableOpacity, Modal, Image } from 'react-native';

import Button from '../../../components/button';
import globalStyles from '../../../styles';
import styles from '../styles';
import AcceptedPNG from '../../../../assets/img/status/accepted.png';

export default function Page(){
    const navigation = useNavigation();

    useEffect(() => {
    }, []);

    function init(){
        navigation.navigate('Home');
    }

    return(
        <SafeAreaView style={[globalStyles.container, styles.wrapper]}>
            <Image source={AcceptedPNG} style={styles.image}/>
            
            <View style={styles.header}>
                <Text style={styles.h1}>O seu pedido</Text>
                <Text style={styles.h1}>foi confirmado!</Text>
            </View>

            <Text style={styles.p}>Em breve nosso entregador vai te chamar aí!</Text>

            <View style={styles.button}>
                <Button onPress={init}>Show de bola!</Button>
            </View>
        </SafeAreaView>
    )
}