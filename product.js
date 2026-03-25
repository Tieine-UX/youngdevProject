const API_URL = "http://localhost:3000/products";

const productLists = document.getElementById('productLists');

async function getProductList() {
    try {
        const response = await fetch(API_URL);
        const items = await response.json();
        productLists.innerHTML = items.map(item => `
            <tr>
                <td>${item.ProductName}</td>
                <td>${item.price}</td>
                <td>${item.qty}</td>
            </tr>
            `).join('\n');
    } catch (error) {
        console.error('Error:', error);
        alert('Failed to fetch product list');
    }
}

if (productLists) {
   // Intitial load 
    getProductList();
}