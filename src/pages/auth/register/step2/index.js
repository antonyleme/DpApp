import React, { useEffect, useState, useRef } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { ActivityIndicator, View, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, TextInput, Alert } from 'react-native';
import Button from '../../../../components/button';

import styles from '../styles';
import cepPromise from 'cep-promise';

export default function Page({navigation, route}){

    const [cep, setCep] = useState();
    const [city, setCity] = useState();
    const [state, setState] = useState();
    const [neighborhood, setNeighborhood] = useState();
    const [street, setStreet] = useState();
    const [number, setNumber] = useState();
    const [complement, setComplement] = useState();

    useEffect(() => {
    }, []);

    function changeCep(text){
        setCep(text);

        let size;

        if(text['6'] == '-')
            size = 9;
        else
            size = 8;

        if(text.length == size)
            cepPromise(text).then(res => {
                if(res.city != 'Cataguases') return Alert.alert('Oops', 'Só atendemos a cidade de Cataguases!');
                setCity(res.city);
                setState(res.state);
                setNeighborhood(res.neighborhood);
                setStreet(res.street);
            }).catch(err => {
                Alert.alert('Oops', 'CEP inválido!');
                setNeighborhood('');
                setStreet('');
            });
    }

    function next(){
        if(!cep) return Alert.alert('Oops', 'Faltou você nos falar seu CEP!');
        if(!neighborhood) return Alert.alert('Oops', 'Faltou você nos falar seu bairro!');
        if(!street) return Alert.alert('Oops', 'Faltou você nos falar sua rua!');
        if(!number) return Alert.alert('Oops', 'Faltou você nos falar seu número!');

        navigation.navigate('RegisterStep3', {
            name: route.params.name,
            tel: route.params.tel,
            email: route.params.email,
            cep,
            state,
            city,
            neighborhood,
            street,
            number,
            complement
        })
    }

    return(
        <ScrollView>
            <View style={styles.wrapper}>
                <View style={styles.pageTitle}>
                    <Text style={styles.h1}>Onde vamos fazer</Text>
                    <Text style={styles.h1}>suas entregas?</Text>
                </View>

                <View>
                    <TextInput keyboardType={'numeric'} style={styles.input} placeholder="CEP" onChangeText={text => changeCep(text)}/>
                    <TextInput style={styles.input} placeholder="Bairro" value={neighborhood} onChangeText={text => setNeighborhood(text)}/>
                    <TextInput style={styles.input} placeholder="Rua" value={street} onChangeText={text => setStreet(text)}/>
                    <TextInput style={styles.input} placeholder="Número" onChangeText={text => setNumber(text)}/>
                    <TextInput style={styles.input} placeholder="Complemento" onChangeText={text => setComplement(text)}/>
                </View>

                <View style={styles.loginButton}>
                    <Button onPress={next}>Continuar</Button>
                </View>
            </View>
        </ScrollView>
    )
}