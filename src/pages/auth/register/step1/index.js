import React, { useEffect, useState, useRef } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { ActivityIndicator, View, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, TextInput, Alert } from 'react-native';
import Button from '../../../../components/button';

import styles from '../styles';

export default function Page(){
    const navigation = useNavigation();

    const [name, setName] = useState();
    const [tel, setTel] = useState();
    const [email, setEmail] = useState();

    useEffect(() => {
    }, []);

    function next(){
        if(!name) return Alert.alert('Oops', 'Faltou você nos falar seu nome!');
        if(!tel) return Alert.alert('Oops', 'Faltou você nos falar seu telefone!');
        if(!email) return Alert.alert('Oops', 'Faltou você nos falar seu email!');

        navigation.navigate('RegisterStep2', { name, tel, email })
    }

    return(
        <ScrollView>
            <View style={styles.wrapper}>
                <View style={styles.pageTitle}>
                    <Text style={styles.h1}>Precisamos dos</Text>
                    <Text style={styles.h1}>seus dados pessoais.</Text>
                </View>

                <View>
                    <TextInput style={styles.input} placeholder="Nome" onChangeText={text => setName(text)}/>
                    <TextInput style={styles.input} placeholder="Telefone" onChangeText={text => setTel(text)}/>
                    <TextInput style={styles.input} placeholder="Email" onChangeText={text => setEmail(text)}/>
                </View>

                <View style={styles.loginButton}>
                    <Button onPress={next}>Continuar</Button>
                </View>
            </View>
        </ScrollView>
    )
}