// Product class representing any item in eCommerce.
class Product {
    // Constructor to initialize product with name and price
    constructor(name, price) {
        this.name = name;   // Product name (e.g., "Laptop")
        this.price = price; // Product price (e.g., 50000)
    }
}

// 1. ShoppingCart: Only responsible for Cart related business logic.
// This class follows SRP - it only manages the cart and calculates totals
class ShoppingCart {
    // Initialize empty shopping cart
    constructor() {
        this.products = []; // Array to store all products in cart
    }

    // Add a product to the shopping cart
    addProduct(p) {
        this.products.push(p); // Append product to products array
    }

    // Get all products currently in the cart
    getProducts() {
        return this.products; // Return the products array
    }

    // Calculates total price in cart.
    calculateTotal() {
        let total = 0; // Initialize total to 0
        // Loop through each product and sum up the prices
        for (let p of this.products) {
            total += p.price; // Add each product's price to total
        }
        return total; // Return the final total amount
    }
}

// 2. ShoppingCartPrinter: Only responsible for printing invoices
// This class follows SRP - it only handles invoice printing/presentation
class ShoppingCartPrinter {
    // Constructor accepts a shopping cart instance to print
    constructor(cart) {
        this.cart = cart; // Store reference to the cart
    }

    // Print invoice with all products and total
    printInvoice() {
        console.log("Shopping Cart Invoice:");
        // Loop through all products in the cart and print details
        for (let p of this.cart.getProducts()) {
            console.log(`${p.name} - Rs ${p.price}`); // Print product name and price
        }
        // Print the total amount at the end
        console.log(`Total: Rs ${this.cart.calculateTotal()}`);
    }
}

// 3. ShoppingCartStorage: Only responsible for saving cart to DB
// This class follows SRP - it only handles data persistence
class ShoppingCartStorage {
    // Constructor accepts a shopping cart instance to save
    constructor(cart) {
        this.cart = cart; // Store reference to the cart
    }

    // Save the shopping cart to database
    saveToDatabase() {
        console.log("Saving shopping cart to database...");
        // In real scenario: Database operations would go here
        // Example: await db.insert('carts', this.cart.getProducts());
    }
}

// Main execution
// Create a new shopping cart instance
const cart = new ShoppingCart();

// Add products to the cart
cart.addProduct(new Product("Laptop", 50000)); // Add laptop worth Rs 50000
cart.addProduct(new Product("Mouse", 2000));   // Add mouse worth Rs 2000

// Create printer instance and print the invoice
const printer = new ShoppingCartPrinter(cart);
printer.printInvoice(); // Display invoice with all items and total

// Create storage instance and save to database
const db = new ShoppingCartStorage(cart);
db.saveToDatabase(); // Persist cart data to database