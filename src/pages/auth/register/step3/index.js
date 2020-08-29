import React, { useEffect, useState, useRef } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { ActivityIndicator, View, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, TextInput, Alert } from 'react-native';
import Button from '../../../../components/button';

import styles from '../styles';

import api from '../../../../services/api';
import { loginAction } from '../../../../store/modules/auth/actions';
import { useDispatch } from 'react-redux';
import jwtDecode from 'jwt-decode';

export default function Page({navigation, route}){

    const [password, setPassword] = useState();
    const [repeatPassword, setRepeatPassword] = useState();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
    }, []);

    const dispatch = useDispatch();

    function submit(){
        if(!password) return Alert.alert('Oops', 'Faltou a senha.');
        if(repeatPassword != password) return Alert.alert('Oops', 'As senhas não são iguais!');

        setLoading(true);
        api.post('register', {
            name: route.params.name,
            tel: route.params.tel,
            email: route.params.email,
            cep: route.params.cep,
            state: route.params.state,
            city: route.params.city,
            neighborhood: route.params.neighborhood,
            street: route.params.street,
            number: route.params.number,
            complement: route.params.complement,
            password
        }).then(res => {
            dispatch(loginAction(jwtDecode(res.data.access_token).user, res.data.access_token));
            navigation.navigate('Home');
            setLoading(false);
        });
    }

    return(
        <>
        <View style={styles.pageTitle}>
            <Text style={styles.h1}>E pra finalizar,</Text>
            <Text style={styles.h1}>escolha sua senha.</Text>
        </View>

        <View style={styles.wrapper}>    
            <TextInput style={styles.input} placeholder="Senha" onChangeText={text => setPassword(text)}/>
            <TextInput style={styles.input} placeholder="Repita sua senha" onChangeText={text => setRepeatPassword(text)}/>

            <View style={styles.loginButton}>
                {
                    loading ?
                    <ActivityIndicator size="large" color="black" />
                    :
                    <Button onPress={submit}>Finalizar</Button>
                }
            </View>
        </View>
        </>
    )
}