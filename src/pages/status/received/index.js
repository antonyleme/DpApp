import React, { useEffect, useState, useRef } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { ActivityIndicator, View, SafeAreaView, StyleSheet, Text, TouchableOpacity, Modal, Image } from 'react-native';

import Button from '../../../components/button';
import globalStyles from '../../../styles';
import styles from '../styles';
import ReceivedPNG from '../../../../assets/img/status/received.png';

export default function Page(){
    const navigation = useNavigation();

    useEffect(() => {
    }, []);

    function init(){
        navigation.navigate('Home');
    }

    return(
        <SafeAreaView style={[globalStyles.container, styles.wrapper]}>
            <Image source={ReceivedPNG} style={styles.image}/>
            
            <View style={styles.header}>
                <Text style={styles.h1}>Nós recebemos</Text>
                <Text style={styles.h1}>o seu pedido.</Text>
            </View>

            <Text style={styles.p}>Aguarde a confirmação do pedido. Caso já tenha pago e não possamos te atender, o seu dinheiro será devolvido.</Text>

            <View style={styles.button}>
                <Button onPress={init}>Vou aguardar</Button>
            </View>
        </SafeAreaView>
    )
}