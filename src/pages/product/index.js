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

import api from '../../services/api';
import outOfTime from "../../services/outOfTime";

export default function Page({ navigation, route }) {
    const [qtd, setQtd] = useState(1);
    const [price, setPrice] = useState(route.params.product.price);

    const [loadingQtd, setLoadingQtd] = useState(true);
    const [maxQtd, setMaxQtd] = useState(1);

    const dispatch = useDispatch();

    useEffect(() => {
        if (outOfTime())
            return navigation.navigate('Out')

        api.get(`products/${route.params.product.id}`).then(res => {
            setLoadingQtd(false);
            setMaxQtd(res.data.product.qtd);
        });
    }, []);

    useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: route.params.product.name,
        });
    }, [navigation]);

    function init() {
        navigation.navigate('Home');
    }

    function addToCart() {
        dispatch(addItem(route.params.product, qtd));
        navigation.navigate('Home');
    }


    function incrementQtd() {
        if (qtd < maxQtd) {
            setQtd(qtd + 1);
        }
    }

    function decrementQtd() {
        if (qtd > 1) {
            setQtd(qtd - 1);
        }
    }

    return (
        <SafeAreaView style={[globalStyles.container, styles.wrapper]}>
            <View style={{ alignItems: 'center' }}>
                <Image source={{ uri: img + route.params.product.imgPath }} style={styles.image} />
            </View>

            <Text style={styles.name}>{route.params.product.name}</Text>

            <View style={styles.cold}>
                <Feather name="wind" size={25} color={'blue'} style={{ marginRight: 10 }} />
                <Text style={{ fontSize: 20, color: 'blue' }}>Gelada</Text>
            </View>

            {
                route.params.product.qtd > 0 &&
                <View style={styles.priceMenu}>
                    <Text style={styles.price}>R$
                        {
                            qtd >= 10 ?
                                route.params.product.promo_price.toString().replace('.', ',')
                                :
                                route.params.product.price.toFixed(2).toString().replace('.', ',')
                        }
                    </Text>

                    {
                        loadingQtd ?
                            <ActivityIndicator />
                            :
                            <View style={styles.counter}>
                                <TouchableOpacity onPress={decrementQtd}>
                                    <Feather name="minus" size={35} style={styles.counterIcon} />
                                </TouchableOpacity>
                                <Text style={styles.counterText}>{qtd}</Text>
                                <TouchableOpacity onPress={incrementQtd}>
                                    <Feather name="plus" size={35} style={styles.counterIcon} />
                                </TouchableOpacity>

                            </View>
                    }
                </View>
            }

            {
                !loadingQtd && (
                    route.params.product.qtd > 0 ?
                        <TouchableOpacity style={styles.button} onPress={addToCart}>
                            <Text style={styles.buttonText}>Adicionar no carrinho</Text>
                            <Text style={styles.buttonText}>
                                R$
                        {
                                    qtd >= 10 ?
                                        (route.params.product.promo_price * qtd).toFixed(2).toString().replace('.', ',')
                                        :
                                        (route.params.product.price * qtd).toFixed(2).toString().replace('.', ',')
                                }
                            </Text>
                        </TouchableOpacity>
                        :
                        <Text style={{ fontWeight: 'bold', textAlign: 'center', fontSize: 20, marginTop: 20 }}>
                            Produto sem estoque.
                </Text>
                )
            }
        </SafeAreaView>
    )
}