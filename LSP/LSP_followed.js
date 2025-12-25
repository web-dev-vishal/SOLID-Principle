// Base class for accounts that only support deposits
// This is the root of the account hierarchy
class DepositOnlyAccount {
    // Abstract method - must be implemented by subclasses
    deposit(amount) {
        throw new Error("deposit() method must be implemented by subclass");
    }
}

// Extends DepositOnlyAccount to add withdrawal capability
// This creates a proper hierarchy: accounts that can withdraw ALSO can deposit
// This follows LSP - WithdrawableAccount can be substituted for DepositOnlyAccount
class WithdrawableAccount extends DepositOnlyAccount {
    // Abstract method - must be implemented by subclasses
    withdraw(amount) {
        throw new Error("withdraw() method must be implemented by subclass");
    }
}

// SavingAccount supports both deposit and withdrawal
// Extends WithdrawableAccount which provides both capabilities
class SavingAccount extends WithdrawableAccount {
    constructor() {
        super(); // Call parent constructor
        this.balance = 0; // Initialize balance to 0
    }

    // Implement deposit method - adds money to the account
    deposit(amount) {
        this.balance += amount; // Add amount to balance
        console.log(`Deposited: ${amount} in Savings Account. New Balance: ${this.balance}`);
    }

    // Implement withdraw method - removes money from the account
    withdraw(amount) {
        if (this.balance >= amount) {
            // Sufficient funds - proceed with withdrawal
            this.balance -= amount;
            console.log(`Withdrawn: ${amount} from Savings Account. New Balance: ${this.balance}`);
        } else {
            // Insufficient funds - reject withdrawal
            console.log("Insufficient funds in Savings Account!");
        }
    }
}

// CurrentAccount supports both deposit and withdrawal
// Extends WithdrawableAccount which provides both capabilities
class CurrentAccount extends WithdrawableAccount {
    constructor() {
        super(); // Call parent constructor
        this.balance = 0; // Initialize balance to 0
    }

    // Implement deposit method - adds money to the account
    deposit(amount) {
        this.balance += amount; // Add amount to balance
        console.log(`Deposited: ${amount} in Current Account. New Balance: ${this.balance}`);
    }

    // Implement withdraw method - removes money from the account
    withdraw(amount) {
        if (this.balance >= amount) {
            // Sufficient funds - proceed with withdrawal
            this.balance -= amount;
            console.log(`Withdrawn: ${amount} from Current Account. New Balance: ${this.balance}`);
        } else {
            // Insufficient funds - reject withdrawal
            console.log("Insufficient funds in Current Account!");
        }
    }
}

// FixedTermAccount ONLY supports deposits, NO withdrawals
// KEY FIX: Extends DepositOnlyAccount instead of a general Account class
// This follows LSP - it doesn't promise withdraw capability it can't deliver
class FixedTermAccount extends DepositOnlyAccount {
    constructor() {
        super(); // Call parent constructor
        this.balance = 0; // Initialize balance to 0
    }

    // Implement deposit method - adds money to the account
    deposit(amount) {
        this.balance += amount; // Add amount to balance
        console.log(`Deposited: ${amount} in Fixed Term Account. New Balance: ${this.balance}`);
    }
    
    // NOTE: No withdraw method - this account type doesn't support withdrawals
    // This is LSP compliant because FixedTermAccount doesn't inherit from WithdrawableAccount
}

// BankClient handles different types of accounts appropriately
// KEY FIX: Separates accounts into two collections based on their capabilities
// This ensures we only call methods that each account type actually supports
class BankClient {
    // Constructor accepts two separate arrays of accounts
    constructor(withdrawableAccounts, depositOnlyAccounts) {
        this.withdrawableAccounts = withdrawableAccounts; // Accounts that support withdraw
        this.depositOnlyAccounts = depositOnlyAccounts;   // Accounts that only support deposit
    }

    // Process transactions for all accounts
    processTransactions() {
        // Process withdrawable accounts (Savings, Current)
        // These accounts support both deposit AND withdraw operations
        for (let acc of this.withdrawableAccounts) {
            acc.deposit(1000);  // Deposit money
            acc.withdraw(500);  // Withdraw money - SAFE because all accounts here support this
        }

        // Process deposit-only accounts (Fixed Term)
        // These accounts ONLY support deposit operations
        for (let acc of this.depositOnlyAccounts) {
            acc.deposit(5000);  // Deposit money only - no withdrawal attempted
        }
        
        // LSP is satisfied: We never try to call withdraw() on FixedTermAccount
        // No exceptions thrown, no type checking needed
    }
}

// Main execution

// Create array of withdrawable accounts (support both deposit and withdraw)
const withdrawableAccounts = [];
withdrawableAccounts.push(new SavingAccount());  // Add Savings Account
withdrawableAccounts.push(new CurrentAccount()); // Add Current Account

// Create array of deposit-only accounts (only support deposit)
const depositOnlyAccounts = [];
depositOnlyAccounts.push(new FixedTermAccount()); // Add Fixed Term Account

// Create bank client with both types of accounts separated
// This design respects the Liskov Substitution Principle (LSP)
const client = new BankClient(withdrawableAccounts, depositOnlyAccounts);

// Process all transactions - no exceptions will be thrown
// withdrawableAccounts: deposit 1000, then withdraw 500
// depositOnlyAccounts: deposit 5000 only
client.processTransactions();