// Base Account class - acts as an interface/abstract class
class Account {
    // Constructor for the base Account class
    constructor() {
        // Check if someone tries to instantiate the abstract class directly
        if (this.constructor === Account) {
            throw new Error("Account is an abstract class and cannot be instantiated directly");
        }
    }

    // Abstract method for deposit - must be implemented by child classes
    deposit(amount) {
        throw new Error("deposit() method must be implemented by subclass");
    }

    // Abstract method for withdraw - must be implemented by child classes
    withdraw(amount) {
        throw new Error("withdraw() method must be implemented by subclass");
    }
}

// SavingAccount class - inherits from Account
class SavingAccount extends Account {
    // Constructor initializes balance to 0
    constructor() {
        super(); // Call parent constructor
        this.balance = 0; // Private balance property
    }

    // Deposit method - adds amount to balance
    deposit(amount) {
        this.balance += amount;
        console.log(`Deposited: ${amount} in Savings Account. New Balance: ${this.balance}`);
    }

    // Withdraw method - removes amount from balance if sufficient funds exist
    withdraw(amount) {
        if (this.balance >= amount) {
            this.balance -= amount;
            console.log(`Withdrawn: ${amount} from Savings Account. New Balance: ${this.balance}`);
        } else {
            console.log("Insufficient funds in Savings Account!");
        }
    }
}

// CurrentAccount class - inherits from Account
class CurrentAccount extends Account {
    // Constructor initializes balance to 0
    constructor() {
        super(); // Call parent constructor
        this.balance = 0; // Private balance property
    }

    // Deposit method - adds amount to balance
    deposit(amount) {
        this.balance += amount;
        console.log(`Deposited: ${amount} in Current Account. New Balance: ${this.balance}`);
    }

    // Withdraw method - removes amount from balance if sufficient funds exist
    withdraw(amount) {
        if (this.balance >= amount) {
            this.balance -= amount;
            console.log(`Withdrawn: ${amount} from Current Account. New Balance: ${this.balance}`);
        } else {
            console.log("Insufficient funds in Current Account!");
        }
    }
}

// FixedTermAccount class - inherits from Account
class FixedTermAccount extends Account {
    // Constructor initializes balance to 0
    constructor() {
        super(); // Call parent constructor
        this.balance = 0; // Private balance property
    }

    // Deposit method - adds amount to balance
    deposit(amount) {
        this.balance += amount;
        console.log(`Deposited: ${amount} in Fixed Term Account. New Balance: ${this.balance}`);
    }

    // Withdraw method - throws error as withdrawals are not allowed in fixed term accounts
    withdraw(amount) {
        throw new Error("Withdrawal not allowed in Fixed Term Account!");
    }
}

// BankClient class - manages multiple accounts and processes transactions
class BankClient {
    // Constructor accepts an array of Account objects
    constructor(accounts) {
        this.accounts = accounts; // Store accounts array
    }

    // Process transactions for all accounts
    processTransactions() {
        // Iterate through each account in the accounts array
        for (let acc of this.accounts) {
            // Deposit 1000 into each account
            acc.deposit(1000);

            // Check if the account is a FixedTermAccount using instanceof
            // (JavaScript equivalent of C++ typeid)
            if (acc instanceof FixedTermAccount) {
                console.log("Skipping withdrawal for Fixed Term Account.");
            } else {
                // Try to withdraw 500 from non-fixed accounts
                try {
                    acc.withdraw(500);
                } catch (error) {
                    // Catch and display any errors (like withdrawal restrictions)
                    console.log(`Exception: ${error.message}`);
                }
            }
        }
    }
}

// Main execution - equivalent to main() function in C++
function main() {
    // Create an array to store different account types
    const accounts = [];
    
    // Add different types of accounts to the array
    accounts.push(new SavingAccount());
    accounts.push(new CurrentAccount());
    accounts.push(new FixedTermAccount());

    // Create a BankClient instance with the accounts array
    const client = new BankClient(accounts);
    
    // Process all transactions for all accounts
    client.processTransactions();
}

// Execute the main function
main();