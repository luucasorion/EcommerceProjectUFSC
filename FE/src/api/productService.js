const API_URL = "http://localhost:5056";

export async function registerProduct(token, productData) {
    const response = await fetch(API_URL + '/products', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`},
        body: JSON.stringify(productData),
    });

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
        const errorMessage = data.errors?.[0] || 'Erro ao registrar usuário';
        throw new Error(errorMessage);
    }

    return data;
}

export async function getProducts(page, pageSize) {
    return await fetch(API_URL + `/products?page=${page}&pageSize=${pageSize}`, {
        method: "GET"
    });
}