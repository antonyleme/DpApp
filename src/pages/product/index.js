import React, { useEffect, useState, useLayoutEffect } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { ActivityIndicator, View, SafeAreaView, StyleSheet, Text, TouchableOpacity, Modal, Image } from 'react-native';

import Button from '../../components/button';
import globalStyles from '../../styles';
import styles from './styles';
import skol from '../../../assets/img/skol.png';
import { Feather } from '@expo/vector-icons';
import img from '../../services/img';

import { useDispatch } from 'react-redux';
import { addItem } from '../../store/modules/cart/actions';

export default function Page({ navigation, route }){
    const [qtd, setQtd] = useState(1);
    const [price, setPrice] = useState(route.params.product.price);

    const dispatch = useDispatch();

    useEffect(() => {
    }, []);

    useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: route.params.product.name
        });
    }, [navigation]);

    function init(){
        navigation.navigate('Home');
    }

    function addToCart(){
        dispatch(addItem(route.params.product, qtd));
        navigation.navigate('Home');
    }

    return(
        <SafeAreaView style={[globalStyles.container, styles.wrapper]}>
            <View style={{alignItems: 'center'}}>
                <Image source={{ uri: img + route.params.product.imgPath }} style={styles.image}/>
            </View>

            <Text style={styles.name}>{route.params.product.name}</Text>

            <View style={styles.priceMenu}>
                <Text style={styles.price}>R${route.params.product.price.toString().replace('.', ',')}</Text>

                <View style={styles.counter}>
                    <TouchableOpacity onPress={() => setQtd(qtd-1)}>
                        <Feather name="minus" size={35} style={styles.counterIcon}/>
                    </TouchableOpacity>
                    <Text style={styles.counterText}>{qtd}</Text>
                    <TouchableOpacity onPress={() => setQtd(qtd+1)}>
                        <Feather name="plus" size={35} style={styles.counterIcon}/>
                    </TouchableOpacity>
                    
                </View>
            </View>

            <TouchableOpacity style={styles.button} onPress={addToCart}>
                <Text style={styles.buttonText}>Adicionar no carrinho</Text>
                <Text style={styles.buttonText}>R${(route.params.product.price * qtd).toFixed(2).toString().replace('.', ',')}</Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}