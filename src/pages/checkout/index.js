import React, { useEffect, useState, useRef } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { ActivityIndicator, View, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, Modal, Image, TextInput } from 'react-native';
import globalStyles from '../../styles';
import styles from './styles';
import { Feather } from '@expo/vector-icons';
import { ListItem } from 'react-native-elements'
import { RadioButton } from 'react-native-paper';
import { primary } from '../../theme/colors';
import AdressModal from '../../components/address';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem } from '../../store/modules/cart/actions';
import api from '../../services/api';
import { clearCart } from '../../store/modules/cart/actions';

export default function Page(){
    const navigation = useNavigation();

    const [observations, setObservations] = useState();
    const [payType, setPayType] = useState('app');
    const [chargeFor, setChargeFor] = useState();
    const [modalVisible, setModalVisible] = useState(false);
    const [cardnumber, setCardnumber] = useState();
    const [cardname, setCardname] = useState();
    const [cardcpf, setCardcpf] = useState();
    const [cardvalid, setCardvalid] = useState();
    const [cardcvv, setCardcvv] = useState();

    const [cartPrice, setCartPrice] = useState(0);

    const cart = useSelector(state => state.cart);
    const user = useSelector(state => state.auth.user);
    const dispatch = useDispatch();

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if(cart.items.length == 0) navigation.navigate('Home');
    }, [cart]);

    useEffect(() => {
        let total = 0;
        for(let i = 0; i < cart.items.length; i++){
            total += cart.items[i].product.price * cart.items[i].qtd;
        }
        setCartPrice(total.toFixed(2));
    }, [cart]);

    function removeFromCart(item){
        dispatch(removeItem(item));
    }

    function submit(){
        setLoading(true);
        if(payType == 'app'){
            api.post('demands', {
                items: cart.items,
                observations,
                cep: user.cep,
                state: user.state,
                city: user.city,
                neighborhood: user.neighborhood,
                street: user.street,
                number: user.number,
                complement: user.complement,
                payType,
                chargeFor,
            }).then(res => {
                dispatch(clearCart());
                setLoading(false);
                navigation.navigate('Received');
            }).catch(err => {
                console.log(err.response);
                setLoading(false);
            });
        }
    }

    return(

        <View style={styles.wrapper}>
            <ScrollView>
                <View style={globalStyles.section}>
                    {
                        cart.items.map((item, index) => (
                            <ListItem
                                key={`items${index}`}
                                title={item.product.name}
                                subtitle={`${item.qtd} ${item.qtd > 1 ? 'unidades' : 'unidade'}`}
                                bottomDivider
                                rightTitle={
                                    <TouchableOpacity onPress={() => removeFromCart(item)}>
                                        <Feather name="trash" size={25} color="#959595"/>
                                    </TouchableOpacity>
                                }
                            />
                        ))
                    }
                </View>

                <View style={globalStyles.container}>

                    <View style={globalStyles.section}>
                        <Text style={styles.h1}>
                            Entrega
                        </Text>

                        <TouchableOpacity style={{flexDirection: 'row', alignItems: 'center'}} onPress={() => setModalVisible(true)}>

                            <View style={{marginRight: 10}}>
                                <Feather name="map-pin" size={25}/>
                            </View>

                            <Text>
                                {user.street}, {user.number}, {user.complement && `${user.complement},`} {user.neighborhood}
                            </Text>

                        </TouchableOpacity>
                    </View>

                    <View style={globalStyles.section}>
                        <Text style={globalStyles.label}>Alguma observação?</Text>
                        <TextInput style={globalStyles.input} multiline={true} numberOfLines={6}/>
                    </View>

                    <View style={globalStyles.section}>
                        <Text style={styles.h1}>Pagamento</Text>

                        <View style={globalStyles.radioGroup}>
                            <RadioButton
                                value="app"
                                status={ payType === 'app' ? 'checked' : 'unchecked' }
                                onPress={() => setPayType('app')}
                                color={primary}
                            />
                            <Text onPress={() => setPayType('app')}>Na entrega (dinheiro)</Text>
                        </View>

                        <View style={globalStyles.radioGroup}>
                            <RadioButton
                                value="credit"
                                status={ payType === 'credit' ? 'checked' : 'unchecked' }
                                onPress={() => setPayType('credit')}
                                color={primary}
                            />
                            <Text onPress={() => setPayType('credit')}>No aplicativo (cartão)</Text>
                        </View>

                        <View style={{marginTop: 20}}>
                            {
                                payType == 'app' ?
                                <View style={globalStyles.formGroup}>
                                    <TextInput style={globalStyles.input} placeholder="Troco para" onChangeText={(text) => setChargeFor(text)}/>
                                </View>
                                :
                                <>
                                    <View style={globalStyles.formGroup}>
                                        <TextInput style={globalStyles.input} placeholder="Número do cartão" onChangeText={(text) => setCardnumber(text)}/>
                                    </View>
                                    <View style={globalStyles.formGroup}>
                                        <TextInput style={globalStyles.input} placeholder="Nome igual no cartão" onChangeText={(text) => setCardname(text)}/>
                                    </View>
                                    <View style={globalStyles.formGroup}>
                                        <TextInput style={globalStyles.input} placeholder="CPF do dono do cartão" onChangeText={(text) => setCardcpf(text)}/>
                                    </View>
                                    <View style={globalStyles.row}>
                                        <View style={[globalStyles.formGroup, globalStyles.col6]}>
                                            <TextInput style={globalStyles.input} placeholder="Validade" onChangeText={(text) => setCardvalid(text)}/>
                                        </View>
                                        <View style={[globalStyles.formGroup, globalStyles.col6]}>
                                            <TextInput style={globalStyles.input} placeholder="CVV" onChangeText={(text) => setCardcvv(text)}/>
                                        </View>
                                    </View>
                                </>    
                            }
                        </View>

                    </View>

                    {
                        loading ?
                        <ActivityIndicator size="large" color="black"/>
                        :
                        <View style={globalStyles.section}>
                            <TouchableOpacity style={styles.button} onPress={submit}>
                                <Text style={styles.buttonText}>Confirmar pedido</Text>
                                <Text style={styles.buttonText}>R${cartPrice.toString().replace('.', ',')}</Text>
                            </TouchableOpacity>
                        </View>
                    }

                </View>
            </ScrollView>

            <AdressModal modalVisible={modalVisible} setModalVisible={setModalVisible}/>

        </View>
    )
}