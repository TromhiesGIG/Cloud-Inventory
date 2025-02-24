// Reference to Firestore
const db = firebase.firestore();
const productList = document.getElementById("product-list");

// Fetch and Display Products in Real-Time
function fetchProducts() {
    db.collection("products").onSnapshot((snapshot) => {
        productList.innerHTML = ""; // Clear existing data
        snapshot.forEach((doc) => {
            const product = doc.data();
            productList.innerHTML += `
                <div>
                    <h3>${product.name}</h3>
                    <p>Quantity: ${product.quantity}</p>
                    <p>Price: $${product.price}</p>
                    <button onclick="sellProduct('${doc.id}', ${product.quantity})">Sell</button>
                </div>
                <hr>
            `;
        });
    });
}

// Sell Product (Reduce Quantity)
function sellProduct(id, currentQty) {
    if (currentQty > 0) {
        db.collection("products").doc(id).update({
            quantity: currentQty - 1
        });
    } else {
        alert("Out of stock!");
    }
}

//  Add New Product
document.getElementById("add-product-btn").addEventListener("click", () => {
    const name = document.getElementById("product-name").value;
    const quantity = parseInt(document.getElementById("product-quantity").value);
    const price = parseFloat(document.getElementById("product-price").value);

    if (name && quantity && price) {
        db.collection("products").add({ name, quantity, price });
        alert("Product Added!");
    } else {
        alert("Please fill all fields!");
    }
});

// Initialize Real-Time Fetch
fetchProducts();
