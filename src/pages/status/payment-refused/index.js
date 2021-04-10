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

    function checkout(){
        navigation.navigate('Checkout');
    }

    return(
        <SafeAreaView style={[globalStyles.container, styles.wrapper]}>
            <Image source={RefusedPNG} style={styles.image}/>
            
            <View style={styles.header}>
                <Text style={styles.h1}>O seu pagamento</Text>
                <Text style={styles.h1}>foi recusado.</Text>
            </View>

            <Text style={styles.p}>Houve algum problema durante o processo de pagamento através do seu cartão. Verifique os dados do seu cartão.</Text>

            <View style={styles.button}>
                <Button onPress={checkout}>Voltar</Button>
            </View>
        </SafeAreaView>
    )
}