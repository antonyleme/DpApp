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
} from "react-native";
import FinishButton from "../../components/finishButton";
import globalStyles from "../../styles";
import styles from "./styles";
import Carousel from "../../components/carousel";
import Category from "../../components/category";
import Product from "../../components/product";
import { Feather } from "@expo/vector-icons";
import RalewayText from "../../components/raleway";
import AdressModal from "../../components/address";
import api from "../../services/api";
import outOfTime from "../../services/outOfTime";
import { useSelector } from "react-redux";
import Loading from "../../components/loading";

export default function Page() {
    const navigation = useNavigation();
    const [modalVisible, setModalVisible] = useState(false);
    const [categories, setCategories] = useState([]);

    const cart = useSelector((state) => state.cart);
    const [cartPrice, setCartPrice] = useState(0);

    const user = useSelector((state) => state.auth.user);

    const [loading, setLoading] = useState(true);

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

        api.get("categories").then((res) => {
            setCategories(res.data.categories);
            setLoading(false);
        });
    }, []);

    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () =>
                user ? (
                    <TouchableOpacity
                        style={{
                            flexDirection: "row",
                            justifyContent: "flex-end",
                            alignItems: "center",
                        }}
                        onPress={() => setModalVisible(true)}
                    >
                        <Text
                            style={{
                                fontSize: 12,
                                width: 250,
                                textAlign: "right",
                            }}
                        >
                            {user.street}, {user.number},{" "}
                            {user.complement && `${user.complement},`}{" "}
                            {user.neighborhood}
                        </Text>
                        <Feather
                            style={{ marginLeft: 5, marginRight: 15 }}
                            name="map-pin"
                            size={25}
                        />
                    </TouchableOpacity>
                ) : (
                    <TouchableOpacity
                        style={{
                            flexDirection: "row",
                            justifyContent: "flex-end",
                            alignItems: "center",
                        }}
                        onPress={() => navigation.navigate("Auth")}
                    >
                        <Text
                            style={{
                                fontSize: 12,
                                width: 250,
                                textAlign: "right",
                            }}
                        >
                            Fazer login
                        </Text>
                        <Feather
                            style={{ marginLeft: 5, marginRight: 15 }}
                            name="log-in"
                            size={25}
                        />
                    </TouchableOpacity>
                ),
        });
    }, [navigation, user]);

    return (
        loading ? (
            <Loading />
        ) : (
            <View style={styles.wrapper}>
                <ScrollView>
                    <Carousel />

                    <View style={[globalStyles.container]}>
                        <View style={globalStyles.section}>
                            <Text style={[styles.h1]}>O que vc</Text>
                            <Text style={[styles.h1]}>vai beber hoje?</Text>
                        </View>

                        <View style={globalStyles.section}>
                            <Text style={styles.h2}>Categorias</Text>
                            <View style={globalStyles.row}>
                                {categories.map((category) => (
                                    <View
                                        style={globalStyles.col6}
                                        key={`navcategories${category.id}`}
                                    >
                                        <Category category={category} />
                                    </View>
                                ))}
                            </View>
                        </View>

                        {categories.map(
                            (category) =>
                                category.products.length > 0 && (
                                    <View
                                        style={globalStyles.section}
                                        key={`categories${category.id}`}
                                    >
                                        <Text style={styles.h2}>
                                            {category.name}
                                        </Text>

                                        <ScrollView
                                            horizontal
                                            showsVerticalScrollIndicator={false}
                                        >
                                            <View style={styles.scroll}>
                                                {category.products.map(
                                                    (product) => (
                                                        <View
                                                            style={
                                                                styles.scrollItem
                                                            }
                                                            key={`product${product.id}`}
                                                        >
                                                            <Product
                                                                product={product}
                                                            />
                                                        </View>
                                                    )
                                                )}

                                                <TouchableOpacity
                                                    style={styles.scrollMore}
                                                    onPress={() =>
                                                        navigation.navigate(
                                                            "Category",
                                                            { category: category }
                                                        )
                                                    }
                                                >
                                                    <View
                                                        style={
                                                            styles.scrollMoreButton
                                                        }
                                                    >
                                                        <Feather
                                                            name="arrow-right"
                                                            size={25}
                                                        />
                                                    </View>
                                                    <Text>Ver mais</Text>
                                                </TouchableOpacity>
                                            </View>
                                        </ScrollView>
                                    </View>
                                )
                        )}
                    </View>

                    <View style={{ marginBottom: 100 }}></View>
                </ScrollView>

                <FinishButton total={cartPrice} />

                {user && (
                    <AdressModal
                        modalVisible={modalVisible}
                        setModalVisible={setModalVisible}
                    />
                )}
            </View>
        )
    )
}
