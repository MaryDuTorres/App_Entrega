import React, { useState } from 'react';
import { View, TextInput, Button, Alert, StyleSheet } from 'react-native';
import { createClient } from '../api/ApiClient';


const BASE_LNG = -46.633;
const BASE_LAT = -23.55;


const generateFictitiousCoordinates = () => {
    const randomLng = BASE_LNG + (Math.random() - 0.5) * 0.02; 
    const randomLat = BASE_LAT + (Math.random() - 0.5) * 0.02;
    
    return [randomLng, randomLat];
};


export default function ClientForm({ navigation }) {
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    
    const submit = async () => {
        if (!name.trim() || !address.trim()) {
            Alert.alert('Erro', 'Por favor, preencha o nome e o endereço.');
            return;
        }

        const coordinates = generateFictitiousCoordinates();
        
        try {
            await createClient({ 
                name, 
                address, 
                location: { 
                    coordinates: coordinates 
                } 
            });
            

            console.log("Coordenada gerada:", coordinates);
            Alert.alert('Sucesso', `Cliente salvo com coordenada [${coordinates[0].toFixed(4)}, ${coordinates[1].toFixed(4)}]`);
            
            navigation.goBack();
        } catch (error) {
            console.error("Erro ao criar cliente:", error);
            Alert.alert('Erro', 'Não foi possível salvar o cliente. Verifique a API.');
        }
    };

    return (
        <View style={styles.container}>
            <TextInput 
                placeholder="Nome" 
                value={name} 
                onChangeText={setName} 
                style={styles.input}
            />
            <TextInput 
                placeholder="Endereço" 
                value={address}
                onChangeText={setAddress} 
                style={styles.input}
            />
            <Button title="Salvar Cliente com Localização Fictícia" onPress={submit} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 10
    },
    input: {
        borderWidth: 1, 
        borderColor: '#ccc', 
        padding: 10, 
        marginBottom: 15,
        borderRadius: 5
    }

});
