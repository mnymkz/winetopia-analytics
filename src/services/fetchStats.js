import { db } from "../firebaseConfig";
import { collection, getDocs } from "firebase/firestore";

//fetch the number of total transactions
export const fetchTotalTransactions = async () => {
    const transactionCollection = collection(db, "transaction");
    const transactionSnapshot = await getDocs(transactionCollection);
    return transactionSnapshot.size || 0;
};

//fetch the number of exhibitors
export const fetchTotalExhibitors = async () => {
    const exhibitorCollection = collection(db, "exhibitor");
    const exhibitorSnapshot = await getDocs(exhibitorCollection);
    return exhibitorSnapshot.size || 0;
};

//fetch the number of wines
export const fetchTotalWines = async () => {
    const wineCollection = collection(db, "wine");
    const wineSnapshot = await getDocs(wineCollection);
    return wineSnapshot.size || 0;
};

//fetch all the transactions from the collection
export const fetchTransactions = async () => {
    const transactionCollection = collection(db, "transaction");
    const transactionSnapshot = await getDocs(transactionCollection);
    // Map through each document and return its data
    const transactions = transactionSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
    }));
    return transactions;
};

//fetch all exhibitors from the collection
export const fetchExhibitors = async () => {
    const exhibitorCollection = collection(db, "exhibitor");
    const exhibitorSnapshot = await getDocs(exhibitorCollection);
    const exhibitors = exhibitorSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
    }));
    return exhibitors;
};

//return all wines from collection
export const fetchWines = async () => {
    const wineCollection = collection(db, "wine");
    const wineSnapshot = await getDocs(wineCollection);
    const wines = wineSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.date(),
    }));
    return wines;
};

//return total revenue
export const fetchTotalRevenue = (transactions) => {
    return transactions.reduce((total, transaction) => {
        const revenue = transaction.isGoldPurchase
            ? 5 * transaction.cost //5x if gold
            : transaction.cost; //else cost = 1
        return total + revenue;
    }, 0);
};

//return total silver token revenue
export const fetchSilverRevenue = (transactions) => {
    return transactions.reduce((total, transaction) => {
        const revenue = !transaction.isGoldPurchase ? transaction.cost : 0;
        return total + revenue;
    }, 0);
};

//return total gold token revenue
export const fetchGoldRevenue = (transactions) => {
    return transactions.reduce((total, transaction) => {
        const revenue = transaction.isGoldPurchase
            ? 5 * transaction.cost //5x if gold
            : 0; //else not updated
        return total + revenue;
    }, 0);
};

//return token count
export const fetchTotalTokens = (transactions) => {
    return transactions.reduce(
        (acc, transaction) => {
            if (transaction.isGoldPurchase) {
                acc.goldTokens += transaction.cost;
            } else {
                acc.silverTokens += transaction.cost;
            }
            return acc;
        },
        { goldTokens: 0, silverTokens: 0 } // Initial value for the accumulator
    );
};

//return silver token count
export const fetchSilverTokens = (transactions) => {
    return transactions.reduce((acc, transaction) => {
        if (!transaction.isGoldPurchase) {
            acc += transaction.cost;
        }
        return acc;
    }, 0);
};

//return gold token count
export const fetchGoldTokens = (transactions) => {
    return transactions.reduce((acc, transaction) => {
        if (transaction.isGoldPurchase) {
            acc += transaction.cost;
        }
        return acc;
    }, 0);
};
