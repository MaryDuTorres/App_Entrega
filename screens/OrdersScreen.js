import React, { useEffect, useState } from 'react';
import { View, Button, FlatList, Text, TouchableOpacity } from 'react-native';
import { fetchOrders, planRoute } from '../api/ApiClient'; // Importa planRoute
import { useIsFocused } from '@react-navigation/native'; // Importa useIsFocused para refreh

export default function OrdersScreen({ navigation }) {
    const [orders, setOrders] = useState([]);
    const isFocused = useIsFocused(); // Hook para verificar se a tela está em foco

    const refresh = () => fetchOrders().then(setOrders);

    // useEffect para carregar os pedidos e recarregar sempre que a tela entrar em foco
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