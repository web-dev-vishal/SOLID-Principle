class Account {
    deposit(amount) {
        throw new Error("deposit() method must be implemented by subclass");
    }

    withdraw(amount) {
        throw new Error("withdraw() method must be implemented by subclass");
    }
}

class SavingAccount extends Account {
    constructor() {
        super();
        this.balance = 0;
    }

    deposit(amount) {
        this.balance += amount;
        console.log(`Deposited: ${amount} in Savings Account. New Balance: ${this.balance}`);
    }

    withdraw(amount) {
        if (this.balance >= amount) {
            this.balance -= amount;
            console.log(`Withdrawn: ${amount} from Savings Account. New Balance: ${this.balance}`);
        } else {
            console.log("Insufficient funds in Savings Account!");
        }
    }
}

class CurrentAccount extends Account {
    constructor() {
        super();
        this.balance = 0;
    }

    deposit(amount) {
        this.balance += amount;
        console.log(`Deposited: ${amount} in Current Account. New Balance: ${this.balance}`);
    }

    withdraw(amount) {
        if (this.balance >= amount) {
            this.balance -= amount;
            console.log(`Withdrawn: ${amount} from Current Account. New Balance: ${this.balance}`);
        } else {
            console.log("Insufficient funds in Current Account!");
        }
    }
}

class FixedTermAccount extends Account {
    constructor() {
        super();
        this.balance = 0;
    }

    deposit(amount) {
        this.balance += amount;
        console.log(`Deposited: ${amount} in Fixed Term Account. New Balance: ${this.balance}`);
    }

    withdraw(amount) {
        throw new Error("Withdrawal not allowed in Fixed Term Account!");
    }
}

class BankClient {
    constructor(accounts) {
        this.accounts = accounts;
    }

    processTransactions() {
        for (let acc of this.accounts) {
            acc.deposit(1000);
            try {
                acc.withdraw(500);
            } catch (e) {
                console.log(`Exception: ${e.message}`);
            }
        }
    }
}

const accounts = [];
accounts.push(new SavingAccount());
accounts.push(new CurrentAccount());
accounts.push(new FixedTermAccount());

const client = new BankClient(accounts);
client.processTransactions();