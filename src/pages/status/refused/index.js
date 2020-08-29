import React, { useEffect, useState, useRef } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { ActivityIndicator, View, SafeAreaView, StyleSheet, Text, TouchableOpacity, Modal, Image } from 'react-native';

import Button from '../../../components/button';
import globalStyles from '../../../styles';
import styles from '../styles';
import RefusedPNG from '../../../../assets/img/status/refused.png';

export default function Page(){
    const navigation = useNavigation();

    useEffect(() => {
    }, []);

    function init(){
        navigation.navigate('Home');
    }

    return(
        <SafeAreaView style={[globalStyles.container, styles.wrapper]}>
            <Image source={RefusedPNG} style={styles.image}/>
            
            <View style={styles.header}>
                <Text style={styles.h1}>Não podemos te</Text>
                <Text style={styles.h1}>atender agora.</Text>
            </View>

            <Text style={styles.p}>Se você já pagou pelo aplicativo, em alguns minutos o seu dinheiro será estornado para o seu cartão.</Text>

            <View style={styles.button}>
                <Button onPress={init}>Está bem</Button>
            </View>
        </SafeAreaView>
    )
}