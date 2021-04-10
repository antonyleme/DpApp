import React, { useEffect, useState, useLayoutEffect } from "react";
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
} from "react-native";
import FinishButton from "../../components/finishButton";
import globalStyles from "../../styles";
import styles from "./styles";
import Carousel from "../../components/carousel";
import Category from "../../components/category";
import Product from "../../components/product";
import { Feather } from "@expo/vector-icons";
import api from "../../services/api";
import { useSelector } from "react-redux";
import Loading from "../../components/loading";
import outOfTime from "../../services/outOfTime";

export default function Page({ route, navigation }) {
    const [products, setProducts] = useState([]);

    const cart = useSelector((state) => state.cart);
    const [cartPrice, setCartPrice] = useState(0);

    const [loading, setLoading] = useState(true);

    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        let total = 0;
        for (let i = 0; i < cart.items.length; i++) {
            if (cart.items[i].qtd >= 10)
                total += cart.items[i].product.promo_price * cart.items[i].qtd;
            else total += cart.items[i].product.price * cart.items[i].qtd;
        }
        setCartPrice(total.toFixed(2));
    }, [cart]);

    useEffect(() => {
        if (outOfTime())
            return navigation.navigate('Out')

        api.get(`categories/${route.params.category.id}`).then((res) => {
            setProducts(res.data.products);
            setLoading(false);
        });
    }, []);

    useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: route.params.category.name,
        });
    }, [navigation]);

    return loading ? (
        <Loading />
    ) : (
        <View style={styles.wrapper}>
            <ScrollView>
                <View style={[globalStyles.container]}>
                    <TextInput
                        style={styles.searchInput}
                        onChangeText={(text) => setSearchTerm(text)}
                        placeholder="O que você vai beber hoje?"
                    />

                    <View style={globalStyles.section}>
                        <View style={globalStyles.row}>
                            {products.map(
                                (product) =>
                                    product.name
                                        .toUpperCase()
                                        .includes(searchTerm.toUpperCase()) && (
                                        <View
                                            style={[
                                                globalStyles.col6,
                                                styles.product,
                                            ]}
                                            key={product.id}
                                        >
                                            <Product product={product} />
                                        </View>
                                    )
                            )}
                        </View>
                    </View>
                </View>

                <View style={{ marginBottom: 100 }}></View>
            </ScrollView>

            <FinishButton total={cartPrice} />
        </View>
    );
}
