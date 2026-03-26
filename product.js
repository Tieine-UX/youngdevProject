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
                <td>
                    <img src="icon/edit.svg" class="icon btn_update"
                        data-productId="${item.ProductID}" data-action="update">
                    <img src="icon/delete.svg" class="icon btn_delete"
                        data-productId="${item.ProductID}" data-action="delete">
                </td>
           </tr> 
            `).join('\n');
            attachEventListeners();
    } catch (error) {
        console.error('Error:', error);
        alert('Failed to fetch product list');
    }
}
if (productLists) {
   // Intitial load 
    getProductList();
}

const addProductform = document.getElementById('addProductform');
if (addProductform) {
    addProductform.addEventListener('submit', async (e) => {
        e.preventDefault();
        const Product_Name = document.getElementById('product_Name').value;
        const Product_price = document.getElementById('product_price').value;
        const Product_quantity = document.getElementById('product_quantity').value;

        const data = {
            ProductName: Product_Name,
            price: parseFloat(Product_price),
            qty: parseInt(Product_quantity, 10)
        };
        const body = document.querySelector('body');

        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: {'Content-type': 'application/json'},
                body: JSON.stringify(data)
            });
            if(response.ok) {
                body.innerHTML += `<h2 class="msg_success">Successfully added the new product </h2>
                <a href="products.html">Go back to display all products </a>`
            } else {
                body.innerHTML += `<h2 class="msg_falled">Falled to added the new product</h2>
                <a href="products.html">Go back to display all products </a>`
            }
        } catch (error) {
            console.error('Error', error);
            alert('Falled to create item');
        }  
    });
}
const updateForm = document.getElementById('updateProductForm');
if (updateForm) {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('productId');
    
    if (productId) {
        getProductForUpdate(productId);
    }

    updateForm.addEventListener(`submit`,  async (e) => {
        e.preventDefault();
            const Product_Name = document.getElementById('product_Name').value;
            const Product_price = document.getElementById('product_price').value;
            const Product_quantity = document.getElementById('product_quantity').value;

        const data = {
            ProductName: Product_Name,
            price: parseFloat(Product_price),
            qty: parseInt(Product_quantity, 10)
        };

        try {
            const response = await fetch(`${API_URL}/${productID}`, {
                method: 'PUT',
                headers: {'Content-type': 'application/json'},
                body: JSON.stringify(data)           
         });

         const body = document.querySelector('body');

         if (response.ok) {
            body.innerHTML +=`<h2 class="msg_success">Successfully updated the product </h2>
            <a href="products.html">Go back to display all products </a>`
         } else {
            body.innerHTML +=`<h2 class="msg_falled">Falled to update the product</h2>
                <a href="products.html">Go back to display all products </a>`
         }
      } catch (error) {
          console.error('Error:', error);
          alert('Failed to update product');
     } 
   });
}  
async function getProductForUpdate(productID){
    try {
     const response = await fetch(`${API_URL}/${productID}`);
     if(!response.ok) {
        throw new Error(`Item not found`);
     }
     const item = await response.json();
     document.getElementById(`product_Name`).value = item[0].ProductName;
     document.getElementById(`product_price`).value = item[0].price;
     document.getElementById(`product_quantity`).value = item[0].qty;
    } catch (error) {
        console.error('Error', error);
        alert('Failed to fetch item');
    }
}
function attachEventListeners() {
    const btnAction = document.querySelectorAll('.btn_update, .btn_delete');
    if (btnAction) {
          btnAction.forEach(button => {
              button.addEventListener('click', event => {
            const productId = event.target.getAttribute(`data-productId`);
            const action = event.target.getAttribute(`data-action`);
            if (action === 'update') {
                window.location.href = `updateProduct.html?productId=${productId}`;
            } else if (action === 'delete') {
                deleteProduct(productId);
            }
        });
    });
  }
}