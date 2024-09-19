import { db } from "../firebaseConfig";
import {
    collection,
    getDocs,
    getFirestore,
    query,
    where,
} from "firebase/firestore";

//fetch the total number of attendees
export const fetchTotalAttendees = async () => {
    const attendeeCollection = collection(db, "attendee");
    const attendeeSnapshot = await getDocs(attendeeCollection);
    return attendeeSnapshot.size || 0;
};

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

//fetch all attendees from the collection
export const fetchAttendees = async () => {
    const attendeeCollection = collection(db, "attendee");
    const attendeeSnapshot = await getDocs(attendeeCollection);
    const attendees = attendeeSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
    }));
    return attendees;
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

export const fetchTotalSilverTokens = async () => {
    const db = getFirestore();
    const transactionsRef = collection(db, "transaction");
    const q = query(transactionsRef, where("isGoldPurchase", "==", false)); //if silver

    try {
        const querySnapshot = await getDocs(q); // Fetch documents
        let totalSilverTokens = 0;

        querySnapshot.forEach((doc) => {
            const data = doc.data();
            totalSilverTokens += data.cost; // Add cost to total
        });

        return totalSilverTokens;
    } catch (error) {
        console.error("Error fetching total silver tokens: ", error);
        return 0;
    }
};

export const fetchTotalGoldTokens = async () => {
    const db = getFirestore();
    const transactionsRef = collection(db, "transaction");
    const q = query(transactionsRef, where("isGoldPurchase", "==", true)); //if gold

    try {
        const querySnapshot = await getDocs(q); // Fetch documents
        let totalGoldTokens = 0;

        querySnapshot.forEach((doc) => {
            const data = doc.data();
            totalGoldTokens += data.cost; // Add cost to total
        });

        return totalGoldTokens;
    } catch (error) {
        console.error("Error fetching total silver tokens: ", error);
        return 0;
    }
};
