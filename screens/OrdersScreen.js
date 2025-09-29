import React, { useEffect, useState } from 'react';
import { View, Button, FlatList, Text, TouchableOpacity } from 'react-native';
import { fetchOrders, planRoute } from '../api/ApiClient'; 
import { useIsFocused } from '@react-navigation/native'; 

export default function OrdersScreen({ navigation }) {
    const [orders, setOrders] = useState([]);
    const isFocused = useIsFocused(); 

    const refresh = () => fetchOrders().then(setOrders);

    useEffect(() => {
        if (isFocused) {
            refresh();
        }
    }, [isFocused]);

    return (
        <View style={{ flex: 1, padding: 10 }}>
            <Button title="Novo Pedido"
                onPress={() => navigation.navigate('OrderForm')} />
            <FlatList data={orders} keyExtractor={i => i._id} renderItem={({ item }) =>
            (
                <TouchableOpacity onPress={() => navigation.navigate('OrderDetail', {
                    orderId: item._id
                })}>
                    <View style={{ padding: 10, borderBottomWidth: 1 }}>
                        <Text>{item.client?.name} - {item.status}</Text>
                        <Text>{item.items?.map(it => it.description).join(', ')}</Text>
                    </View>
                </TouchableOpacity>
            )} />
            <Button title="Calcular Rota p/ todos" onPress={async () => {
                const orderIds = orders.map(o => o._id);
                const result = await planRoute({
                    orderIds, start: [-46.633,
                    -23.55]
                });
                navigation.navigate('RouteMap', { plan: result });
            }} />
        </View>
    );

}
