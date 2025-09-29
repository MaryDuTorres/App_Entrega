import React from 'react';
import { View, Text, Button } from 'react-native';
export default function HomeScreen({ navigation }) {
    return (
        <View style={{ flex: 1, padding: 20 }}>
            <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 20 }}
            >Dashboard</Text>
            <Button title="Clientes" onPress={() => navigation.navigate('Clients')} /
            >
            <Button title="Motoristas"
                onPress={() => navigation.navigate('Drivers')} />
            <Button title="Pedidos" onPress={() => navigation.navigate('Orders')} />
        </View>
    );
}