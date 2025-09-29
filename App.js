import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import ClientsScreen from './screens/ClientsScreen';
import ClientForm from './screens/ClientForm';
import DriversScreen from './screens/DriversScreen';
import DriverForm from './screens/DriverForm';
import OrdersScreen from './screens/OrdersScreen';
import OrderForm from './screens/OrderForm';
import OrderDetail from './screens/OrderDetail';
import RouteMapScreen from './screens/RouteMapScreen';
const Stack = createNativeStackNavigator();
export default function App(){
return (
<NavigationContainer>
<Stack.Navigator initialRouteName="Home">
<Stack.Screen name="Home" component={HomeScreen} />
<Stack.Screen name="Clients" component={ClientsScreen} />
<Stack.Screen name="ClientForm" component={ClientForm} />
<Stack.Screen name="Drivers" component={DriversScreen} />
<Stack.Screen name="DriverForm" component={DriverForm} />
<Stack.Screen name="Orders" component={OrdersScreen} />
<Stack.Screen name="OrderForm" component={OrderForm} />
<Stack.Screen name="OrderDetail" component={OrderDetail} />
<Stack.Screen name="RouteMap" component={RouteMapScreen} />
</Stack.Navigator>
</NavigationContainer>
);
}
