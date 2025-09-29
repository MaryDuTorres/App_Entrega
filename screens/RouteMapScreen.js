import React from 'react';
import { View, Text, Dimensions, StyleSheet } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';

export default function RouteMapScreen({ route }) {
    const { plan } = route.params || {};

    const coords = plan?.route?.map(r => ({
        latitude: r.loc[1], 
        longitude: r.loc[0],
        name: r.name,     
        type: r.type || 'delivery'
    })) || [];
    
    const initial = coords[0] || { latitude: -23.55, longitude: -46.633 };

    const initialRegion = {
        latitude: initial.latitude,
        longitude: initial.longitude, 
        latitudeDelta: 0.05, 
        longitudeDelta: 0.05
    };

    return (
        <View style={styles.container}>
            <MapView 
                style={styles.map} 
                initialRegion={initialRegion}
            >
                {coords.map((c, i) => (
                    <Marker 
                        key={i} 
                        coordinate={c} 
                        title={c.name} 
                        pinColor={c.type === 'start' ? 'green' : 'red'} 
                    />
                ))}
                
                {coords.length > 1 && 
                    <Polyline 
                        coordinates={coords} 
                        strokeColor="#0000FF" 
                        strokeWidth={4} 
                    />}
                
            </MapView>
            
            <View style={styles.summaryContainer}>
                <Text>Total (km): {plan?.totalKm}</Text>
                <Text>Tempo estimado (min): {plan?.estMinutes}</Text>
                <Text style={styles.disclaimer}>Rota calculada via heurística (Vizinho Mais Próximo).</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    map: {
        flex: 1
    },
    summaryContainer: {
        position: 'absolute', 
        bottom: 10, 
        left: 10, 
        right: 10, 
        backgroundColor: 'white', 
        padding: 10,
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    disclaimer: {
        fontSize: 10,
        marginTop: 5,
        color: '#666'
    }
});