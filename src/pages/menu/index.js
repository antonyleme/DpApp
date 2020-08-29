import React, { useEffect, useState, useRef, useLayoutEffect } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { ActivityIndicator, View, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, Modal, Image } from 'react-native';
import globalStyles from '../../styles';
import styles from './styles';
import { Feather } from '@expo/vector-icons';
import { ListItem } from 'react-native-elements'
import { useDispatch, useSelector } from 'react-redux';
import { logoutAction } from '../../store/modules/auth/actions';
import { clearCart } from '../../store/modules/cart/actions';

export default function Page(){
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const user = useSelector(state => state.auth.user);

    useEffect(() => {

    }, []);

    function logout(){
        dispatch(logoutAction());
        dispatch(clearCart());
        navigation.navigate('Home');
    }

    useLayoutEffect(() => {
        navigation.setOptions({
            headerLeft: () => (
                user &&
                <View style={{marginHorizontal: 15, flexDirection: 'row'}}>
                    <Feather name="user" size={43}/>
                    <View style={{marginLeft: 5}}>
                        <Text style={{fontWeight: 'bold', fontSize: 18}}>{user.name}</Text>
                        <Text style={{color: '#7B7B7B', fontSize: 13}}>{user.email}</Text>
                    </View>
                </View>
            ),
            headerRight: () => (
                <TouchableOpacity style={{marginRight: 15}} onPress={() => navigation.goBack()}>
                    <Feather name="x" size={43}/>
                </TouchableOpacity>
            )
        });
    }, [navigation, user]);

    return(

        <View style={styles.wrapper}>
            <ScrollView>
                {
                    user ?
                    <ListItem
                        leftIcon={<Feather name="list" size={25}/>}
                        title={"Meus pedidos"}
                        bottomDivider
                        onPress={() => navigation.navigate('Demands')}
                    />
                    :
                    <ListItem
                        leftIcon={<Feather name="log-in" size={25}/>}
                        title={"Fazer login"}
                        bottomDivider
                        onPress={() => navigation.navigate('Auth')}
                    />
                }
                <ListItem
                    leftIcon={<Feather name="help-circle" size={25}/>}
                    title={"Preciso de ajuda"}
                    bottomDivider
                />
                <ListItem
                    leftIcon={<Feather name="log-out" size={25}/>}
                    title={"Sair"}
                    bottomDivider
                    onPress={logout}
                />
            </ScrollView>
        </View>
    )
}