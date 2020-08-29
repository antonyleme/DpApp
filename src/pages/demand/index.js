import React, { useEffect, useState, useLayoutEffect } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { ActivityIndicator, View, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, Modal, Image } from 'react-native';
import globalStyles from '../../styles';
import styles from './styles';
import { Feather } from '@expo/vector-icons';
import { ListItem } from 'react-native-elements'
import Badge from '../../components/badge'

export default function Page({demand, route, navigation}){

    useEffect(() => {
    }, []);

    useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: `#${route.params.id} às 20:57`,
            headerRight: () => (
                <Text style={{fontSize: 20, fontWeight: 'bold', marginRight: 15}}>R$5,49</Text>
            )
        });
    }, [navigation]);

    return(

        <View style={styles.wrapper}>
            <ScrollView>
                {
                    demand.products.map(product => (
                        <ListItem
                            title={product.name}
                            subtitle={`R$${product.price.toString().replace('.', ',')}`}
                            bottomDivider
                            rightTitle={
                                <Badge qtd="2"/>
                            }
                        />
                    ))
                }
            </ScrollView>
        </View>
    )
}