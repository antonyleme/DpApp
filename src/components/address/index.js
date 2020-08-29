import React, { useState } from 'react';
import { Text, View, TextInput, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import Dialog from "react-native-dialog";

import styles from './styles.js';
import globalStyles from '../../styles';
import { useSelector, useDispatch } from 'react-redux';
import api from '../../services/api';
import cepPromise from 'cep-promise';
import { updateUser } from '../../store/modules/auth/actions';

export default function Component(props){

    const user = useSelector(state => state.auth.user);
    const token = useSelector(state => state.auth.token);

    const dispatch = useDispatch();

    const [cep, setCep] = useState(user.cep);
    const [city, setCity] = useState(user.city);
    const [state, setState] = useState(user.state);
    const [neighborhood, setNeighborhood] = useState(user.neighborhood);
    const [street, setStreet] = useState(user.street);
    const [number, setNumber] = useState(user.number);
    const [complement, setComplement] = useState(user.complement);

    const [loading, setLoading] = useState(false);

    function changeCep(text){

        if(text.length == 5)
            text += '-';
        
        setCep(text);

        if(text.length == 9)
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

    function submit(){
        if(!cep) return Alert.alert('Oops', 'Faltou você nos falar seu CEP!');
        if(!neighborhood) return Alert.alert('Oops', 'Faltou você nos falar seu bairro!');
        if(!street) return Alert.alert('Oops', 'Faltou você nos falar sua rua!');
        if(!number) return Alert.alert('Oops', 'Faltou você nos falar seu número!');

        setLoading(true);

        console.log(token);

        api.put('users', {
            cep,
            city,
            state,
            neighborhood,
            street,
            number,
            complement,
        }).then(res => {
            setLoading(false);
            props.setModalVisible(false);
            dispatch(updateUser(res.data.user));
        }).catch(err => {
            props.setModalVisible(false);
            setLoading(false);
        })
    }

    return (
        <View>
            <Dialog.Container visible={props.modalVisible}>
                <Dialog.Title style={{fontWeight: 'bold', fontSize: 20}}>Entrega</Dialog.Title>
                    <View>
                        <View style={globalStyles.formGroup}>
                            <TextInput style={globalStyles.input} placeholder="CEP" keyboardType="numeric" value={cep} onChangeText={text => changeCep(text)}/>
                        </View>
                        <View style={globalStyles.formGroup}>
                            <TextInput style={globalStyles.input} placeholder="Bairro" value={neighborhood} onChangeText={text => setNeighborhood(text)}/>
                        </View>
                        <View style={globalStyles.formGroup}>
                            <TextInput style={globalStyles.input} placeholder="Rua" value={street} onChangeText={text => setStreet(text)}/>
                        </View>
                        <View style={globalStyles.row}>
                            <View style={[globalStyles.formGroup, globalStyles.col6]}>
                                <TextInput style={globalStyles.input} placeholder="Número" keyboardType="numeric" value={number} onChangeText={text => setNumber(text)}/>
                            </View>
                            <View style={[globalStyles.formGroup, globalStyles.col6]}>
                                <TextInput style={globalStyles.input} placeholder="Complemento" value={complement} onChangeText={text => setComplement(text)}/>
                            </View>
                        </View>
                    </View>

                <View style={{alignItems: 'center', marginTop: 30}}>
                    {
                        loading ?
                        <ActivityIndicator size="large" color="black"/>
                        :
                        <>
                            <TouchableOpacity onPress={submit} style={styles.modalButton}>
                                <Text style={styles.modalButtonText}>Confirmar</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => props.setModalVisible(false)} style={{marginVertical: 15}}>
                                    <Text style={{color: '#707070', fontSize: 15}}>Cancelar</Text>
                            </TouchableOpacity>
                        </>
                    }
                </View>
            </Dialog.Container>
        </View>
    )
}