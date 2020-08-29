import React from 'react';
import { Text, View } from 'react-native';
import { useFonts, Raleway_900Black } from '@expo-google-fonts/inter';

export default function Component(props){
    let [fontsLoaded] = useFonts({
        Raleway_900Black,
    });
    
    if (!fontsLoaded) {
        return <Text>carre</Text>;
      } else {
        return (
            <Text style={[...props.style, {fontFamily: 'Raleway_900Black'}]}>{props.children}</Text>
        )
    }
}