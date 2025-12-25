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

// Abstract class (Base class for all persistence implementations)
// Defines the contract that all persistence classes must follow
class Persistence {
    constructor() {
        this.cart = null; // Reference to shopping cart
    }

    // Abstract method - must be overridden by subclasses
    // Throws error if called directly (simulates pure virtual function)
    save(cart) {
        throw new Error("save() method must be implemented by subclass");
    }
}

// SQLPersistence: Concrete implementation for SQL database storage
// Extends Persistence and provides SQL-specific implementation
class SQLPersistence extends Persistence {
    // Override the save method to provide SQL-specific logic
    save(cart) {
        console.log("Saving shopping cart to SQL DB...");
        // In real scenario: SQL INSERT statements would go here
        // Example: await sqlDb.query('INSERT INTO carts VALUES (?)', [cart]);
    }
}

// MongoPersistence: Concrete implementation for MongoDB storage
// Extends Persistence and provides MongoDB-specific implementation
class MongoPersistence extends Persistence {
    // Override the save method to provide MongoDB-specific logic
    save(cart) {
        console.log("Saving shopping cart to MongoDB...");
        // In real scenario: MongoDB operations would go here
        // Example: await mongoDb.collection('carts').insertOne(cart);
    }
}

// FilePersistence: Concrete implementation for file storage
// Extends Persistence and provides file system-specific implementation
class FilePersistence extends Persistence {
    // Override the save method to provide file-specific logic
    save(cart) {
        console.log("Saving shopping cart to a file...");
        // In real scenario: File write operations would go here
        // Example: await fs.writeFile('cart.json', JSON.stringify(cart));
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

// Create different persistence implementations
// Polymorphism: All implement the same interface but behave differently
const db = new SQLPersistence();      // SQL database persistence
const mongo = new MongoPersistence(); // MongoDB persistence
const file = new FilePersistence();   // File system persistence

// Save cart using different persistence methods
// Each method executes its own implementation of save()
db.save(cart);    // Save to SQL database
mongo.save(cart); // Save to MongoDB
file.save(cart);  // Save to File