export async function getUser(token) {
    const response = await fetch('https://localhost:7273/user', {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return response.json();
}

export async function updateUser(token, data) {
    await fetch('https://localhost:7273/user', {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(data)
    });
}


export async function loginUser(email, password) {
    const response = await fetch(
        'https://localhost:7273/login',
        {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
        }
    );

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
        const errorMessage = data.errors?.[0] || 'Erro ao fazer login';
        throw new Error(errorMessage);
    }

    return data;
}

export async function registerUser(name, email, password) {
    const response = await fetch('https://localhost:7273/user', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
    });

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
        const errorMessage = data.errors?.[0] || 'Erro ao registrar usuário';
        throw new Error(errorMessage);
    }

    return data;
}
