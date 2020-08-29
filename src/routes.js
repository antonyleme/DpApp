import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Feather } from '@expo/vector-icons';
import { Text, View } from 'react-native';

const AppStack = createStackNavigator();

import Init from './pages/init';
import Home from './pages/home';
import Accepted from './pages/status/accepted';
import Refused from './pages/status/refused';
import Received from './pages/status/received';
import Auth from './pages/auth';
import Product from './pages/product';
import Category from './pages/category';
import Menu from './pages/menu';
import Demands from './pages/demands';
import Demand from './pages/demand';
import Checkout from './pages/checkout';
import RegisterStep1 from './pages/auth/register/step1';
import RegisterStep2 from './pages/auth/register/step2';
import RegisterStep3 from './pages/auth/register/step3';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useSelector } from 'react-redux';

export default function Routes() {

    const user = useSelector(state => state.auth.user);

    return (
        <NavigationContainer>
            {
                
            <AppStack.Navigator screenOptions={{
                headerStyle: {
                    backgroundColor: 'white',
                    elevation: 0,
                },
                headerTintColor: 'black',
                headerTitleStyle: {
                    width: 250
                },
                cardStyle: { 
                    backgroundColor: '#FFFFFF' 
                },
                initialRouteName: user ? 'Home' : 'Init',
            }}>
                <AppStack.Screen name="Init" component={Init} options={() => ({ 
                    headerShown: false,
                })}/>
                <AppStack.Screen name="Home" component={Home} options={({navigation}) => ({ 
                    headerTitle: "",
                    headerLeft: () => (
                        <TouchableOpacity onPress={() => navigation.navigate('Menu')}>
                            <Feather style={{marginLeft: 15}} name="menu" size={35}/>
                        </TouchableOpacity>
                    )
                })}/>
                <AppStack.Screen name="Accepted" component={Accepted} options={() => ({ 
                    headerShown: false,
                })}/>
                <AppStack.Screen name="Refused" component={Refused} options={() => ({ 
                    headerShown: false,
                })}/>
                <AppStack.Screen name="Received" component={Received} options={() => ({ 
                    headerShown: false,
                })}/>


                <AppStack.Screen name="Auth" component={Auth} options={() => ({ 
                    headerTitle: "",
                })}/>
                <AppStack.Screen name="RegisterStep1" component={RegisterStep1} options={() => ({ 
                    headerTitle: "",
                })}/>
                <AppStack.Screen name="RegisterStep2" component={RegisterStep2} options={() => ({ 
                    headerTitle: "",
                })}/>
                <AppStack.Screen name="RegisterStep3" component={RegisterStep3} options={() => ({ 
                    headerTitle: "",
                })}/>


                <AppStack.Screen name="Product" component={Product}/>
                <AppStack.Screen name="Category" component={Category} options={() => ({ 
                    headerTitle: 'Categoria'
                })}/>
                <AppStack.Screen name="Menu" component={Menu} options={({navigation}) => ({ 
                    headerTitle: "",
                })}/>
                <AppStack.Screen name="Demands" component={Demands} options={() => ({ 
                    headerTitle: "Meus pedidos",
                })}/>
                <AppStack.Screen name="Checkout" component={Checkout} options={() => ({ 
                    headerTitle: "Finalizar pedido",
                })}/>
                <AppStack.Screen name="Demand" component={Demand}/>
            </AppStack.Navigator>
            }
        </NavigationContainer>
    );
}