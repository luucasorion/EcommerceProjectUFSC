const API_URL = "http://localhost:5056";

export async function getUser(token) {
    const response = await fetch(API_URL + '/user', {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return response.json();
}

export async function updateUser(token, userData) {
    await fetch(API_URL + '/user', {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(userData)
    });
}


export async function loginUser(userData) {
    const response = await fetch(
        API_URL + '/login',
        {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userData)
        }
    );

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
        const errorMessage = data.errors?.[0] || 'Erro ao fazer login';
        throw new Error(errorMessage);
    }

    return data;
}

export async function registerUser(userData) {
    const response = await fetch(API_URL + '/user', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
    });

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
        const errorMessage = data.errors?.[0] || 'Erro ao registrar usuário';
        throw new Error(errorMessage);
    }

    return data;
}
