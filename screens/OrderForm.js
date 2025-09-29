import React, { useEffect, useState } from 'react';
import { View, TextInput, Button, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker'; 
import { fetchClients, createOrder } from '../api/ApiClient';

export default function OrderForm({ navigation }) {
    const [clients, setClients] = useState([]);
    const [clientId, setClientId] = useState('');
    
    useEffect(() => { 
        fetchClients().then(setClients).catch(error => console.error("Erro ao carregar clientes:", error)); 
    }, []);

    const submit = async () => {
        
        if (!clientId) {
            Alert.alert('Erro', 'Por favor, selecione um cliente válido antes de criar o pedido.');
            return;
        }
        
        const client = clients.find(c => c._id === clientId);

        
        if (!client || !client.location || !client.location.coordinates) {
             Alert.alert('Erro', 'Dados de cliente incompletos ou não encontrados. Não é possível criar o pedido.');
             return;
        }

        try {
            await createOrder({
                client: clientId, 
                items: [{
                    description: 'Pedido exemplo', qty: 1
                }], 
                
                deliveryLocation: client.location.coordinates
            });
            navigation.goBack();
        } catch (error) {
            Alert.alert('Erro de API', 'Não foi possível criar o pedido. Verifique a conexão e o IP da API.');
            console.error("Erro ao criar pedido:", error);
        }
    };

    return (
        <View style={{ padding: 10 }} >
            
            <Picker selectedValue={clientId} onValueChange={setClientId}>
                <Picker.Item label="-- selecione --" value="" />
                {clients.map(c => 
                    <Picker.Item key={c._id} label={c.name} value={c._id} />
                )}
            </Picker>
            
            <Button title="Criar Pedido" onPress={submit} disabled={!clientId} />
        </View >
    );
}