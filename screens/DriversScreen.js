import React, { useEffect, useState } from 'react';
import { View, Button, FlatList, Text } from 'react-native';
import { fetchDrivers } from '../api/ApiClient';
import { useIsFocused } from '@react-navigation/native'; 

export default function DriversScreen({ navigation }) {
    const [drivers, setDrivers] = useState([]);
    const isFocused = useIsFocused(); 

    const refresh = () => fetchDrivers().then(setDrivers);

    useEffect(() => {
        if (isFocused) {
            refresh(); 
        }
    }, [isFocused]); 

    return (
        <View style={{ flex: 1, padding: 10 }}>
            <Button title="Novo Motorista"
                onPress={() => navigation.navigate('DriverForm')} />
            <FlatList data={drivers} keyExtractor={i => i._id}
                renderItem={({ item }) => (
                    <View style={{ padding: 10, borderBottomWidth: 1 }}>
                        <Text>{item.name} - {item.vehicle}</Text>
                    </View>
                )} />
        </View>
    );
}