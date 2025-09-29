import React, { useEffect, useState } from 'react';
import { View, Text, Button, Alert, StyleSheet } from 'react-native';
import { fetchDrivers, updateOrder, planRoute, fetchOrdersByDriver } from '../api/ApiClient';
import { Picker } from '@react-native-picker/picker';

export default function OrderDetail({ route, navigation }) {
    const { orderId } = route.params;
    const [order, setOrder] = useState(null);
    const [drivers, setDrivers] = useState([]);
    const [selectedDriver, setSelectedDriver] = useState('');

    const refreshOrder = () => {
        fetch(`http://192.168.15.13:4000/api/orders/${orderId}`)
            .then(r => r.json())
            .then(data => {
                setOrder(data);
                if (data.assignedDriver) {
                    setSelectedDriver(data.assignedDriver._id);
                }
            })
            .catch(error => console.error("Erro ao buscar pedido:", error));
    };

    useEffect(() => {
        refreshOrder();
        fetchDrivers().then(setDrivers).catch(error => console.error("Erro ao carregar motoristas:", error));
    }, [orderId]);

    const assignDriver = async () => {
        if (!selectedDriver) {
            Alert.alert('Erro', 'Selecione um motorista para atribuir.');
            return;
        }

        try {
            const updatedOrder = await updateOrder(orderId, {
                assignedDriver: selectedDriver,
                status: 'assigned'
            });
            Alert.alert('Sucesso', `Pedido atribuído a ${updatedOrder.assignedDriver.name}!`);
            setOrder(updatedOrder);
        } catch (error) {
            console.error("Erro ao atribuir motorista:", error);
            Alert.alert('Erro', 'Não foi possível atribuir o motorista. Verifique a API.');
        }
    };

    const viewDriverRoute = async () => {
        if (!order || !order.assignedDriver || !order.assignedDriver.location || !order.assignedDriver.location.coordinates) {
            Alert.alert('Erro de Rota', 'Motorista não atribuído ou dados de localização ausentes. Tente cadastrar o motorista novamente.');
            return;
        }

        const driverId = order.assignedDriver._id;
        const driverLocation = order.assignedDriver.location.coordinates; // [lng, lat]

        try {
            const driverOrders = await fetchOrdersByDriver(driverId);

            if (driverOrders.length === 0) {
                Alert.alert('Erro', 'Nenhum pedido encontrado para este motorista.');
                return;
            }
            const combinedOrderIds = driverOrders.map(o => o._id);

            const result = await planRoute({
                orderIds: combinedOrderIds, 
                start: driverLocation
            });

            navigation.navigate('RouteMap', { plan: result });
        } catch (error) {
            console.error("Erro ao calcular rota combinada:", error);
            Alert.alert('Erro de Rota', 'Não foi possível calcular a rota combinada. Verifique a API.');
        }
    };


    if (!order) return <View style={styles.container}><Text>Carregando...</Text></View>;

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Cliente: {order.client?.name}</Text>
            <Text style={styles.info}>Status: {order.status}</Text>
            <Text style={styles.info}>Motorista: {order.assignedDriver?.name || 'Nenhum'}</Text>
            <Text style={styles.info}>Itens: {order.items.map(i => i.description).join(', ')}</Text>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Atribuir Motorista</Text>
                <Picker
                    selectedValue={selectedDriver}
                    onValueChange={(itemValue) => setSelectedDriver(itemValue)}
                    style={styles.picker}
                >
                    <Picker.Item label="-- Selecione um Motorista --" value="" />
                    {drivers.map(d =>
                        <Picker.Item key={d._id} label={`${d.name} (${d.vehicle})`} value={d._id} />
                    )}
                </Picker>
                <Button title="Atribuir" onPress={assignDriver} disabled={!selectedDriver} />
            </View>

            {order.assignedDriver && (
                <View style={styles.section}>
                    <Button
                        title={`Ver Rota de ${order.assignedDriver.name}`}
                        onPress={viewDriverRoute}
                    />
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: { padding: 15 },
    title: { fontSize: 18, fontWeight: 'bold', marginBottom: 5 },
    info: { fontSize: 16, marginBottom: 5 },
    section: { marginTop: 20, paddingTop: 10, borderTopWidth: 1, borderTopColor: '#eee' },
    sectionTitle: { fontSize: 16, fontWeight: 'bold', marginBottom: 10 },
    picker: { height: 50, width: '100%', marginBottom: 10 },

});
