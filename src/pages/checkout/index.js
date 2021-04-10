import React, { useEffect, useState, useRef } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import {
     ActivityIndicator,
     View,
     SafeAreaView,
     ScrollView,
     StyleSheet,
     Text,
     TouchableOpacity,
     Modal,
     Image,
     TextInput,
     Alert,
} from "react-native";
import globalStyles from "../../styles";
import styles from "./styles";
import { Feather } from "@expo/vector-icons";
import { ListItem } from "react-native-elements";
import { RadioButton } from "react-native-paper";
import { primary } from "../../theme/colors";
import AdressModal from "../../components/address";
import { useSelector, useDispatch } from "react-redux";
import { removeItem } from "../../store/modules/cart/actions";
import api from "../../services/api";
import { clearCart, saveCreditCard } from "../../store/modules/cart/actions";
import CheckoutConfirmation from "../../components/checkoutConfirmation";
//import MercadoPagoCheckout from '@blackbox-vision/react-native-mercadopago-px';
//import StripeCheckout from 'expo-stripe-checkout';
import axios from "axios";
import qs from "querystring";
import outOfTime from "../../services/outOfTime";

export default function Page() {
     const navigation = useNavigation();
     const stripe = require("stripe-client")(
          "pk_live_51HoWhPDpsw7v0A1eqxZlape804H818fphogbzexkheq7dXlUjKmyZEmvZbbiPrNDIsP1qPF7FKG6vnKvk6CnREyc001tYY6zwl"
     );

     const [observations, setObservations] = useState();
     const [payType, setPayType] = useState("delivery");
     const [chargeFor, setChargeFor] = useState();
     const [modalVisible, setModalVisible] = useState(false);
     const [cardnumber, setCardnumber] = useState();
     const [cardname, setCardname] = useState();
     const [cardcpf, setCardcpf] = useState();
     const [cardvalid, setCardvalid] = useState();
     const [cardcvv, setCardcvv] = useState();

     const [cartPrice, setCartPrice] = useState(0);

     const cart = useSelector((state) => state.cart);
     const user = useSelector((state) => state.auth.user);
     const savedCard = useSelector((state) => state.cart.number);
     const savedCardValid = useSelector((state) => state.cart.valid);
     const dispatch = useDispatch();

     const [deliveryTax, setDeliveryTax] = useState(0);

     const [loading, setLoading] = useState(false);

     const [confirmationVisible, setConfirmationVisible] = useState(false);

     useEffect(() => {
          if (outOfTime())
               return navigation.navigate('Out')

          if (savedCard) {
               setCardnumber(savedCard);
          }
          if (savedCardValid) {
               setCardvalid(savedCardValid);
          }

          api.get("delivery-tax").then((res) => {
               setDeliveryTax(res.data.tax);
          });
     }, []);

     useEffect(() => {
          if (cart.items.length == 0) navigation.navigate("Home");
     }, [cart]);

     useEffect(() => {
          let total = 0;
          for (let i = 0; i < cart.items.length; i++) {
               if (cart.items[i].qtd >= 10)
                    total +=
                         cart.items[i].product.promo_price * cart.items[i].qtd;
               else total += cart.items[i].product.price * cart.items[i].qtd;
          }
          total += parseFloat(deliveryTax);
          setCartPrice(total.toFixed(2));
          //setCartPrice(0.5);
     }, [cart, deliveryTax]);

     function removeFromCart(item) {
          dispatch(removeItem(item));
     }

     function submitConfirmation() {
          setConfirmationVisible(true);
     }

     function submit(token) {
          setLoading(true);
          api.post("demands", {
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
               token,
               amount: cartPrice,
          })
               .then((res) => {
                    dispatch(clearCart());
                    setLoading(false);
                    navigation.navigate("Received");
               })
               .catch((err) => {
                    console.log(err.response.data.message);
                    if (err.response.data.message == "Out of qtd") {
                         Alert.alert(
                              "Produto fora de estoque",
                              err.response.data.message
                         );
                    } else if (err.response.data.message == "Out of time") {
                         setConfirmationVisible(false);
                         navigation.navigate('Out')
                    } else {
                         Alert.alert(
                              "Problema no pagamento",
                              "Algo não deu certo no pagamento. Verifique seu cartão ou opte por pagar na entrega."
                         );
                    }
                    setLoading(false);
               });
     }

     const startCheckout = async () => {
          if (payType == "app") {
               dispatch(saveCreditCard(cardnumber, cardvalid));

               const card = await stripe.createToken({
                    card: {
                         name: cardname,
                         number: cardnumber,
                         exp_month: cardvalid.split("/")[0],
                         exp_year: cardvalid.split("/")[1],
                         cvc: cardcvv,
                         address_line1: user.street + ", " + user.number,
                         address_city: user.city,
                         address_state: user.state,
                         address_zip: user.cep,
                         address_country: "BR",
                    },
               });

               if (!card.id) {
                    setConfirmationVisible(false);
                    return Alert.alert(
                         "Cartão de crédito inválido!",
                         "Verifique os dados do seu cartão. Talvez tenha digitado algo errado."
                    );
               }

               const token = card.id;

               return submit(token);
          }

          submit(null);
     };

     return (
          <View style={styles.wrapper}>
               <ScrollView>
                    <View style={globalStyles.section}>
                         {cart.items.map((item, index) => (
                              <ListItem
                                   key={`items${index}`}
                                   title={item.product.name}
                                   subtitle={`${item.qtd} ${item.qtd > 1 ? "unidades" : "unidade"
                                        }`}
                                   bottomDivider
                                   rightTitle={
                                        <TouchableOpacity
                                             onPress={() =>
                                                  removeFromCart(item)
                                             }
                                        >
                                             <Feather
                                                  name="trash"
                                                  size={25}
                                                  color="#959595"
                                             />
                                        </TouchableOpacity>
                                   }
                              />
                         ))}
                         <ListItem
                              title={"Taxa de entrega"}
                              bottomDivider
                              rightTitle={
                                   <Text style={{ fontWeight: "bold" }}>
                                        R$
                                        {parseFloat(deliveryTax)
                                             .toFixed(2)
                                             .toString()
                                             .replace(".", ",")}
                                   </Text>
                              }
                         />
                    </View>

                    <View style={globalStyles.container}>
                         <View style={globalStyles.section}>
                              <Text style={styles.h1}>Entrega</Text>

                              <TouchableOpacity
                                   style={{
                                        flexDirection: "row",
                                        alignItems: "center",
                                   }}
                                   onPress={() => setModalVisible(true)}
                              >
                                   <View style={{ marginRight: 10 }}>
                                        <Feather name="map-pin" size={25} />
                                   </View>

                                   <Text>
                                        {user.street}, {user.number},{" "}
                                        {user.complement &&
                                             `${user.complement},`}{" "}
                                        {user.neighborhood}
                                   </Text>
                              </TouchableOpacity>
                         </View>

                         <View style={globalStyles.section}>
                              <Text style={globalStyles.label}>
                                   Alguma observação?
                              </Text>
                              <TextInput
                                   style={globalStyles.input}
                                   multiline={true}
                                   numberOfLines={6}
                                   onChangeText={(text) =>
                                        setObservations(text)
                                   }
                              />
                         </View>

                         <View style={globalStyles.section}>
                              <Text style={styles.h1}>Pagamento</Text>

                              <View style={globalStyles.radioGroup}>
                                   <RadioButton
                                        value="delivery"
                                        status={
                                             payType === "delivery"
                                                  ? "checked"
                                                  : "unchecked"
                                        }
                                        onPress={() => setPayType("delivery")}
                                        color={primary}
                                   />
                                   <Text onPress={() => setPayType("delivery")}>
                                        Na entrega (dinheiro)
                                   </Text>
                              </View>

                              <View style={globalStyles.radioGroup}>
                                   <RadioButton
                                        value="delivery"
                                        status={
                                             payType === "delivery-card"
                                                  ? "checked"
                                                  : "unchecked"
                                        }
                                        onPress={() =>
                                             setPayType("delivery-card")
                                        }
                                        color={primary}
                                   />
                                   <Text
                                        onPress={() =>
                                             setPayType("delivery-card")
                                        }
                                   >
                                        Na entrega (cartão)
                                   </Text>
                              </View>

                              {/*
                            <View style={globalStyles.radioGroup}>
                                <RadioButton
                                    value="app"
                                    status={ payType === 'app' ? 'checked' : 'unchecked' }
                                    onPress={() => setPayType('app')}
                                    color={primary}
                                />
                                <Text onPress={() => setPayType('app')}>No aplicativo (cartão)</Text>
                            </View>
                            */}

                              <View style={{ marginTop: 20 }}>
                                   {
                                        {
                                             delivery: (
                                                  <View
                                                       style={
                                                            globalStyles.formGroup
                                                       }
                                                  >
                                                       <TextInput
                                                            style={
                                                                 globalStyles.input
                                                            }
                                                            placeholder="Troco para"
                                                            onChangeText={(
                                                                 text
                                                            ) =>
                                                                 setChargeFor(
                                                                      text
                                                                 )
                                                            }
                                                       />
                                                  </View>
                                             ),
                                             app: (
                                                  <>
                                                       <View
                                                            style={
                                                                 globalStyles.formGroup
                                                            }
                                                       >
                                                            <TextInput
                                                                 style={
                                                                      globalStyles.input
                                                                 }
                                                                 placeholder="Número do cartão"
                                                                 defaultValue={
                                                                      cardnumber
                                                                 }
                                                                 onChangeText={(
                                                                      text
                                                                 ) =>
                                                                      setCardnumber(
                                                                           text
                                                                      )
                                                                 }
                                                            />
                                                       </View>
                                                       {/*
                                                <View style={globalStyles.formGroup}>
                                                    <TextInput style={globalStyles.input} placeholder="CPF do dono do cartão" onChangeText={(text) => setCardcpf(text)}/>
                                                </View>
                                                */}
                                                       <View
                                                            style={
                                                                 globalStyles.formGroup
                                                            }
                                                       >
                                                            <TextInput
                                                                 style={
                                                                      globalStyles.input
                                                                 }
                                                                 placeholder="Nome igual no cartão"
                                                                 onChangeText={(
                                                                      text
                                                                 ) =>
                                                                      setCardname(
                                                                           text
                                                                      )
                                                                 }
                                                            />
                                                       </View>
                                                       <View
                                                            style={
                                                                 globalStyles.row
                                                            }
                                                       >
                                                            <View
                                                                 style={[
                                                                      globalStyles.formGroup,
                                                                      globalStyles.col6,
                                                                 ]}
                                                            >
                                                                 <TextInput
                                                                      style={
                                                                           globalStyles.input
                                                                      }
                                                                      placeholder="Validade"
                                                                      defaultValue={
                                                                           cardvalid
                                                                      }
                                                                      onChangeText={(
                                                                           text
                                                                      ) =>
                                                                           setCardvalid(
                                                                                text
                                                                           )
                                                                      }
                                                                 />
                                                            </View>
                                                            <View
                                                                 style={[
                                                                      globalStyles.formGroup,
                                                                      globalStyles.col6,
                                                                 ]}
                                                            >
                                                                 <TextInput
                                                                      style={
                                                                           globalStyles.input
                                                                      }
                                                                      placeholder="CVV"
                                                                      onChangeText={(
                                                                           text
                                                                      ) =>
                                                                           setCardcvv(
                                                                                text
                                                                           )
                                                                      }
                                                                 />
                                                            </View>
                                                       </View>
                                                  </>
                                             ),
                                        }[payType]
                                   }
                              </View>
                         </View>

                         <View style={globalStyles.section}>
                              <TouchableOpacity
                                   style={styles.button}
                                   onPress={submitConfirmation}
                              >
                                   <Text style={styles.buttonText}>
                                        Confirmar pedido
                                   </Text>
                                   <Text style={styles.buttonText}>
                                        R$
                                        {cartPrice.toString().replace(".", ",")}
                                   </Text>
                              </TouchableOpacity>
                         </View>
                    </View>
               </ScrollView>

               <AdressModal
                    modalVisible={modalVisible}
                    setModalVisible={setModalVisible}
               />

               <CheckoutConfirmation
                    confirmationVisible={confirmationVisible}
                    setConfirmationVisible={setConfirmationVisible}
                    loading={loading}
                    submit={startCheckout}
                    observations={observations}
                    payType={payType}
                    chargeFor={chargeFor}
               />
          </View>
     );
}
