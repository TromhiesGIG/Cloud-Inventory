// dashboard.js

// Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, collection, onSnapshot, addDoc, updateDoc, doc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
//Adding import for images upload
import { getStorage, ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-storage.js"; 

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBspSRXy4TDTnaoJGXcjwGoUa0Ywj1GmaU",
  authDomain: "cloud-inventory-c65bb.firebaseapp.com",
  databaseURL: "https://cloud-inventory-c65bb-default-rtdb.firebaseio.com",
  projectId: "cloud-inventory-c65bb",
  storageBucket: "cloud-inventory-c65bb.appspot.com",
  messagingSenderId: "389676809805",
  appId: "1:389676809805:web:28e6bd24f5c3b81f3e2604",
  measurementId: "G-2WG7YWCSJ6"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);
// Reference to the product list container
const productList = document.getElementById("product-list");

// Fetch and Display Products in Real-Time
function fetchProducts() {
    productList.innerHTML = "<p>Loading products...</p>"; // Show loading message
    onSnapshot(collection(db, "products"), (snapshot) => {
        productList.innerHTML = ""; // Clear existing data
        snapshot.forEach((doc) => {
            const product = doc.data();
            //adding effect for low stocks products
            const isLowStock = product.quantity <= 5;
            //warning message for low stock products
            const lowStockWarning = isLowStock ? `<strong class="low-stock">Low Stock! Only ${product.quantity} left.</strong>` : "";

            productList.innerHTML += `
                <div class="product-item">
                    <h3>${product.name}</h3>
                    ${product.imageUrl ? `<img src="${product.imageUrl}" alt="${product.name}" width="100" />` : ""}
                    <p>Quantity: ${product.quantity}</p>
                    <p>Price: $${product.price.toFixed(2)}</p>
                    ${lowStockWarning}
                    <button  class="sell-btn" data-id="${doc.id}" data-quantity="${product.quantity}">Sell</button>
                </div>
                <hr>
            `;
        });
        // Add event listener to sell buttons
        const sellButtons = document.querySelectorAll(".sell-btn");
        sellButtons.forEach((button) => {
            button.addEventListener("click", () => {
                const productId = button.getAttribute("data-id");
                const currentQty = parseInt(button.getAttribute("data-quantity"));
                sellProduct(productId, currentQty);
            });
        })
    }, (error) => {
        console.error("Error fetching products:", error);
        productList.innerHTML = "<p>Failed to load products. Please try again.</p>";
    });
}

// Sell Product (Reduce Quantity)
function sellProduct(id, currentQty) {
    if (currentQty > 0) {
        updateDoc(doc(db, "products", id), {
            quantity: currentQty - 1
        })
        .then(() => {
            console.log("Product sold!");
        })
        .catch((error) => {
            console.error("Error selling product:", error);
            alert("Failed to sell product. Please try again.");
        });
    } else {
        alert("Out of stock!");
    }
}

// Adding New Product
document.getElementById("add-product-btn").addEventListener("click", async () => {
    const name = document.getElementById("product-name").value;
    const quantity = parseInt(document.getElementById("product-quantity").value);
    const price = parseFloat(document.getElementById("product-price").value);
    const imageFile = document.getElementById("product-image").files[0];

    if (name && quantity >= 0 && price >= 0) {

        // uploading image to Firebase Storage
        let imageUrl = "";
        if(imageFile) {
            const storageRef = ref(storage, `product-images/${Date.now()}_${imageFile.name}`);
            await uploadBytes(storageRef, imageFile)
            imageUrl = await getDownloadURL(storageRef);
        }

        // Add product to Firestore
        addDoc(collection(db, "products"), { name, quantity, price, imageUrl })
            .then(() => {
                alert("Product Added!");
                // Clear input fields
                document.getElementById("product-name").value = "";
                document.getElementById("product-quantity").value = "";
                document.getElementById("product-price").value = "";
                document.getElementById("product-image").value = "";
            })
            .catch((error) => {
                console.error("Error adding product:", error);
                alert("Failed to add product. Please try again.");
            });
    } else {
        alert("Please fill all fields with valid values!");
    }
});

// Initialize Real-Time Fetch
fetchProducts();