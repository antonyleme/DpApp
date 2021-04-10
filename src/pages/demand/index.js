import React, { useEffect, useState, useLayoutEffect } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { ActivityIndicator, View, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, Modal, Image } from 'react-native';
import globalStyles from '../../styles';
import styles from './styles';
import { Feather } from '@expo/vector-icons';
import { ListItem } from 'react-native-elements'
import Badge from '../../components/badge'

export default function Page({route, navigation}){

    useEffect(() => {
    }, []);

    function sum(products){
        let total = 0;

        products.map(product => {
            total += product.pivot.price * product.pivot.qtd;
        })

        return total.toFixed(2).toString().replace('.', ',');
    }

    useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: `#${route.params.demand.id} às 20:57`,
            headerRight: () => (
                <Text style={{fontSize: 20, fontWeight: 'bold', marginRight: 15}}>R${sum(route.params.demand.products)}</Text>
            )
        });
    }, [navigation]);

    return(

        <View style={styles.wrapper}>
            <ScrollView>
                {
                    route.params.demand.products.map((product, index) => (
                        <ListItem
                            key={index}
                            title={product.name}
                            subtitle={`R$${product.price.toFixed(2).toString().replace('.', ',')}`}
                            bottomDivider
                            rightTitle={
                                <Badge qtd={product.pivot.qtd}/>
                            }
                        />
                    ))
                }
            </ScrollView>
        </View>
    )
}