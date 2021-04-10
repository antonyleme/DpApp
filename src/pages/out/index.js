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
import { useSelector } from "react-redux";
import Loading from "../../components/loading";
import outOfTime from '../../services/outOfTime'

export default function Page() {
  const navigation = useNavigation();

  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    if (!outOfTime())
      return navigation.navigate('Home')
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
    <View
      style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
    >
      <Text
        style={{
          fontSize: 25,
          fontWeight: "bold",
          textAlign: "center",
          marginBottom: 30,
        }}
      >
        Estamos fora do horário de delivery
            </Text>

      <View
        style={{
          marginTop: 10,
          textAlign: "center",
          alignItems: "center",
        }}
      >
        <Text style={{ fontWeight: "bold" }}>Segunda a terça</Text>
        <Text style={{ marginBottom: 5 }}>15:00 às 22:00</Text>

        <Text style={{ fontWeight: "bold" }}>Quarta a sexta</Text>
        <Text style={{ marginBottom: 5 }}>15:00 às 23:00</Text>

        <Text style={{ fontWeight: "bold" }}>Sábado</Text>
        <Text style={{ marginBottom: 5 }}>11:00 às 23:00</Text>

        <Text style={{ fontWeight: "bold" }}>Domingo</Text>
        <Text>11:00 às 19:00</Text>
      </View>
    </View>
  )
}
