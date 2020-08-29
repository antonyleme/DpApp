import React, { useEffect, useState, useRef } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { ActivityIndicator, View, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, Modal, Image } from 'react-native';
import globalStyles from '../../styles';
import styles from './styles';
import { Feather } from '@expo/vector-icons';
import { ListItem } from 'react-native-elements'
import Badge from '../../components/badge'
import Loading from '../../components/loading';
import api from '../../services/api';

export default function Page({route, navigation}){

    const [loading, setLoading] = useState(true);
    const [demands, setDemands] = useState([]);

    useEffect(() => {
        api.get('users/demands').then(res => {
            setDemands(res.data.demands);
            setLoading(false);
        });
    }, []);

    return(
        loading ?
            <Loading/>
        :
            <View style={styles.wrapper}>
                <ScrollView>
                    {
                        demands.map(demand => (
                            <ListItem
                                key={demand.id}
                                title={`#${demand.id} às ${demand.time}`}
                                subtitle={demand.date}
                                bottomDivider
                                chevron
                                rightTitle={
                                    <Badge type={demand.status}/>
                                }
                                onPress={() => navigation.navigate('Demand', { demand })}
                            />
                        ))
                    }
                </ScrollView>
            </View>
    )
}