import React, { useEffect, useState, useRef } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { ActivityIndicator, View, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, TextInput, Alert } from 'react-native';
import Button from '../../components/button';

import styles from './styles';
import { loginAction } from '../../store/modules/auth/actions';
import { useDispatch } from 'react-redux';
import api from '../../services/api';
import jwtDecode from 'jwt-decode';

export default function Page(){
    const navigation = useNavigation();

    const [type, setType] = useState(false);

    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    const [loading, setLoading] = useState(false);

    const dispatch = useDispatch();

    useEffect(() => {
    }, []);

    function login(){
        if(!email) return Alert.alert('Oops', 'Faltou o email.');
        if(!password) return Alert.alert('Oops', 'Faltou a senha.');

        setLoading(true);
        api.post('auth/login', {
            email,
            password,
        }).then(res => {
            dispatch(loginAction(jwtDecode(res.data.access_token).user, res.data.access_token));
            navigation.navigate('Home');
            setLoading(false);
        }).catch(err => {
            Alert.alert('Oops', 'Email ou senha incorretos.');
            setLoading(false);
        });
    }

    return(
        <>
        <View style={styles.pageTitle}>
            <Text style={styles.h1}>Faça login para</Text>
            <Text style={styles.h1}>finalizar o seu pedido.</Text>
        </View>

        <View style={styles.wrapper}>
            {
                type ?
                (
                    <>
                    {
                        type == 'email' &&
                        <>
                            <TextInput style={styles.input} placeholder="Email" onChangeText={text => setEmail(text)}/>
                            <TextInput secureTextEntry={true} style={styles.input} placeholder="Senha" onChangeText={text => setPassword(text)}/>

                            <View style={styles.loginButton}>
                                {
                                    loading ?
                                    <ActivityIndicator size="large" color="black" />
                                    :
                                    <Button onPress={login}>Fazer login</Button>
                                }
                            </View>

                            <TouchableOpacity style={styles.register} onPress={() => navigation.navigate('RegisterStep1')}>
                                <Text style={styles.registerText}>Ainda não tem uma conta? Registre-se!</Text>
                            </TouchableOpacity>
                        </>
                    }
                    </>
                )
                :
                (
                    <>
                        <TouchableOpacity style={styles.button} onPress={() => setType('email')}>
                            <Text style={styles.textBlack}>Entrar com email e senha</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.fbButton} onPress={() => setType('fb')}>
                            <Text style={styles.textWhite}>Entrar com facebook</Text>
                        </TouchableOpacity>
                    </>
                )
            }
        </View>
        </>
    )
}