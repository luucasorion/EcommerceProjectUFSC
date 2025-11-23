const API_URL = "https://ecommerceprojectufsc-cfh3hqf0brgthrd9.eastus2-01.azurewebsites.net";

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