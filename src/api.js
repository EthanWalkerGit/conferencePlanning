const BASE_URL = 'http://localhost:3001';

export async function registerUser(user) {
    const response = await fetch(`${BASE_URL}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user),
    });
    return response.json();
}

export async function loginUser(user) {
    const response = await fetch(`${BASE_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user),
    });
    return response.json();
}

export async function getAppData(token) {
    const response = await fetch(`${BASE_URL}/appData`, {
        method: 'GET',
        headers: { Authorization: token },
    });
    if (response.ok) {
        return response.json();
    } else {
        return { msg: 'Unauthorized' };
    }
}
