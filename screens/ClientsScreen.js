import React, { useState } from 'react';
import { View, Text, FlatList, Button } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { fetchClients } from '../api/ApiClient';

export default function ClientsScreen({ navigation }) {
    const [clients, setClients] = useState([]);

    const refresh = () => {
        fetchClients()
            .then(setClients)
            .catch(error => {
                
                console.error("Erro ao buscar clientes:", error);
            });
    };

    useFocusEffect(
        React.useCallback(() => {
            refresh();
            
            return () => {}; 
        }, [])
    );

    return (
        <View style={{ flex: 1, padding: 10 }}>
            <Button title="Novo Cliente"
                onPress={() => navigation.navigate('ClientForm')} />
            <FlatList data={clients} keyExtractor={i => i._id}
                renderItem={({ item }) => (
                    <View style={{ padding: 10, borderBottomWidth: 1 }}>
                        <Text>{item.name}</Text>
                        <Text>{item.address}</Text>
                    </View>
                )} />
        </View>
    );
}