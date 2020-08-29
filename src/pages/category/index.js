import React, { useEffect, useState, useLayoutEffect } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { ActivityIndicator, View, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, Modal, Image } from 'react-native';
import FinishButton from '../../components/finishButton';
import globalStyles from '../../styles';
import styles from './styles';
import Carousel from '../../components/carousel';
import Category from '../../components/category';
import Product from '../../components/product';
import { Feather } from '@expo/vector-icons';
import api from '../../services/api';
import { useSelector } from 'react-redux';
import Loading from '../../components/loading';

export default function Page({ route, navigation }){

    const [products, setProducts] = useState([]);

    const cart = useSelector(state => state.cart);
    const [cartPrice, setCartPrice] = useState(0);

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let total = 0;
        for(let i = 0; i < cart.items.length; i++){
            total += cart.items[i].product.price * cart.items[i].qtd;
        }
        setCartPrice(total.toFixed(2));
    }, [cart])

    useEffect(() => {
        api.get(`categories/${route.params.category.id}`).then(res => {
            setProducts(res.data.products);
            setLoading(false);
        })
    }, []);

    useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: route.params.category.name
        });
    }, [navigation]);

    return(

        loading ?
        <Loading/>
        :
        <View style={styles.wrapper}>
            
            <ScrollView>
                <View style={[globalStyles.container]}>

                    <View style={globalStyles.section}>
                        <View style={globalStyles.row}>
                            {
                                products.map(product => (
                                    <View style={[globalStyles.col6, styles.product]} key={product.id}>
                                        <Product product={product}/>
                                    </View>
                                ))
                            }
                        </View>
                    </View>
                    
                </View>

                <View style={{marginBottom: 100}}></View>
            </ScrollView>

            <FinishButton total={cartPrice}/>
        </View>
    )
}