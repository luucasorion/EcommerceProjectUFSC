const API_URL = "http://localhost:5056";

export async function registerProduct(productData) {
    const response = await fetch(API_URL + '/product', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(productData),
    });

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
        const errorMessage = data.errors?.[0] || 'Erro ao registrar usuário';
        throw new Error(errorMessage);
    }

    return data;
}