import React from 'react';
import { Text, View } from 'react-native';

import styles from './styles.js';

export default function Component(props){
    switch(props.type){
        case 'refused':
            return(
                <View style={[styles.badge, styles.refused]}>
                    <Text style={styles.textWhite}>Cancelado</Text>
                </View>
            )
        case 'received':
            return(
                <View style={[styles.badge, styles.received]}>
                    <Text style={styles.textBlack}>Aguardando</Text>
                </View>
            )
        case 'accepted':
            return(
                <View style={[styles.badge, styles.accepted]}>
                    <Text style={styles.textWhite}>Confirmado</Text>
                </View>
            )
        case 'delivered':
            return(
                <View style={[styles.badge, styles.delivered]}>
                    <Text style={styles.textWhite}>Entregue</Text>
                </View>
            )
        default:
            return(
                <View style={[styles.badge, styles.received]}>
                    <Text style={styles.textBlack}>{props.qtd}</Text>
                </View>
            )  
    }
}