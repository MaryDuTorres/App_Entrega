const API_BASE = 'http://192.168.15.13:4000/api';
export const fetchClients = () => {
    return fetch(`${API_BASE}/clients`)
        .then(r => r.json());
};

export const createClient = (body) => {
    return fetch(`${API_BASE}/clients`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
    })
        .then(r => r.json());
}

export const fetchDrivers = () => {
    return fetch(`${API_BASE}/drivers`)
        .then(r => r.json());
}

export const createDriver = (body) => fetch(`${API_BASE}/drivers`, {
    method: 'POST', headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
}).then(r => r.json());

export const fetchOrders = () => {
    return fetch(`${API_BASE}/orders`)
        .then(r => r.json());
}

export const createOrder = (body) => fetch(`${API_BASE}/orders`, {
    method: 'POST', headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
}).then(r => r.json());

export const updateOrder = (orderId, body) => fetch(`${API_BASE}/orders/${orderId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
}).then(r => r.json());

export const fetchOrdersByDriver = (driverId) => {
    return fetch(`${API_BASE}/orders?driverId=${driverId}`)
        .then(r => r.json());
};

export const planRoute = (body) => fetch(`${API_BASE}/routes/plan`, {
    method: 'POST', headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
}).then(r => r.json());