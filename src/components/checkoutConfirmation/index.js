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
    const cart = useSelector(state => state.cart);

    return (
        <Dialog.Container visible={props.confirmationVisible}>
            <Dialog.Title style={{fontWeight: 'bold', fontSize: 20, marginLeft: -12}}>Confirmar pedido</Dialog.Title>

            <View style={styles.group}>
                <Text style={styles.subtitle}>Itens</Text>
                {
                    cart.items.map((item,index) => (
                        <View style={styles.item} key={`checkout${index}`}>
                            <Text>{item.product.name}</Text>
                            <Text>{item.qtd}</Text>
                        </View>
                    ))
                }
            </View>

            <View style={styles.group}>
                <Text style={styles.subtitle}>Entrega</Text>
                <Text>{user.street}, {user.number}, {user.complement && `${user.complement}, `}{user.neighborhood}</Text>
            </View>
            
            {
                props.observations &&
                <View style={styles.group}>
                    <Text style={styles.subtitle}>Observações</Text>
                    <Text>{props.observations}</Text>
                </View>
            }

            <View style={styles.group}>
                <Text style={styles.subtitle}>Pagamento</Text>
                <Text>
                    {
                        {
                            'delivery': 'Dinheiro na entrega',
                            'app': 'Cartão no aplicativo',
                            'delivery-card': 'Cartão na entrega'
                        }[props.payType]
                    }
                </Text>
            </View>

            {
                (props.payType == 'delivery' && props.chargeFor) &&
                <View style={styles.group}>
                    <Text style={styles.subtitle}>Troco para</Text>
                    <Text>R${parseFloat(props.chargeFor).toFixed(2).toString().replace('.', ',')}</Text>
                </View>
            }

            <View style={{alignItems: 'center', marginTop: 30}}>
                {
                    props.loading ?
                    <ActivityIndicator size="large" color="black"/>
                    :
                    <>
                        <TouchableOpacity onPress={props.submit} style={styles.modalButton}>
                            <Text style={styles.modalButtonText}>Confirmar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => props.setConfirmationVisible(false)} style={{marginVertical: 15}}>
                                <Text style={{color: '#707070', fontSize: 15}}>Cancelar</Text>
                        </TouchableOpacity>
                    </>
                }
            </View>
        </Dialog.Container>
    )
}