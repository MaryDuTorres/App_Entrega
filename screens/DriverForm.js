import React, { useState } from 'react';
import { View, TextInput, Button, Alert } from 'react-native';
import { createDriver } from '../api/ApiClient';

const BASE_LNG = -46.650;
const BASE_LAT = -23.500;

const generateFictitiousCoordinates = () => {
    const randomLng = BASE_LNG + (Math.random() - 0.5) * 0.04; 
    const randomLat = BASE_LAT + (Math.random() - 0.5) * 0.04;
    return [randomLng, randomLat];
};

export default function DriverForm({ navigation }) {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    
    const submit = async () => {
        if (!name.trim() || !phone.trim()) {
            Alert.alert('Erro', 'Por favor, preencha o nome e o telefone.');
            return;
        }
        
        const coordinates = generateFictitiousCoordinates();
        
        try {
            await createDriver({ 
                name, 
                phone,
                vehicle: 'Van',
                location: {
                    coordinates: coordinates 
                }
            }); 
            Alert.alert('Sucesso', 'Motorista cadastrado com localização fictícia.');
            navigation.goBack();
        } catch (error) {
            console.error("Erro ao criar motorista:", error);
            Alert.alert('Erro', 'Não foi possível salvar o motorista. Verifique a API.');
        }
    };
    
    return (
        <View style={{ padding: 10 }}>
            <TextInput 
                placeholder="Nome" 
                value={name} 
                onChangeText={setName} 
                style={{ borderWidth: 1, borderColor: '#ccc', padding: 8, marginBottom: 10 }}
            />
            <TextInput 
                placeholder="Telefone" 
                value={phone}
                onChangeText={setPhone} 
                style={{ borderWidth: 1, borderColor: '#ccc', padding: 8, marginBottom: 20 }}
            />
            <Button title="Salvar Motorista" onPress={submit} />
        </View>
    );
}