// Product class representing any item of any ECommerce.
class Product {
    // Constructor to initialize product with name and price
    constructor(name, price) {
        this.name = name;   // Product name (e.g., "Laptop")
        this.price = price; // Product price (e.g., 50000)
    }
}

// Violating SRP: ShoppingCart is handling multiple responsibilities
// (cart management, printing, database operations)
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

    // 1. Calculates total price in cart.
    calculateTotal() {
        let total = 0; // Initialize total to 0
        // Loop through each product and sum up the prices
        for (let p of this.products) {
            total += p.price; // Add each product's price to total
        }
        return total; // Return the final total amount
    }

    // 2. Violating SRP - Prints invoice (Should be in a separate class)
    // This method handles presentation logic, which violates Single Responsibility Principle
    printInvoice() {
        console.log("Shopping Cart Invoice:");
        // Loop through and print each product's details
        for (let p of this.products) {
            console.log(`${p.name} - Rs ${p.price}`); // Print product name and price
        }
        // Print the total amount at the end
        console.log(`Total: Rs ${this.calculateTotal()}`);
    }

    // 3. Violating SRP - Saves to DB (Should be in a separate class)
    // This method handles data persistence, which violates Single Responsibility Principle
    saveToDatabase() {
        console.log("Saving shopping cart to database...");
        // In real scenario: Database operations would go here
    }
}

// Main execution
// Create a new shopping cart instance
const cart = new ShoppingCart();

// Add products to the cart
cart.addProduct(new Product("Laptop", 50000)); // Add laptop worth Rs 50000
cart.addProduct(new Product("Mouse", 2000));   // Add mouse worth Rs 2000

// Print the invoice showing all items and total
cart.printInvoice();

// Save the cart data to database
cart.saveToDatabase();