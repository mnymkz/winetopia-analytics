import React, { useEffect, useState } from "react";
import { fetchTransactions } from "../services/fetchStats";
import "./transactionList.css"; // Import the CSS file for styling

//format date for display
const formatDateTime = (timestamp) => {
    const date = timestamp.toDate();
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-indexed
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");

    return `${day}/${month}/${year} ${hours}:${minutes}`;
};

const TransactionList = () => {
    const [transactions, setTransactions] = useState([]);
    const [exhibitorName, setExhibitorName] = useState("");
    const [wineName, setWineName] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const transactionData = await fetchTransactions();
                setTransactions(transactionData);
            } catch (error) {
                console.error("Error fetching transactions: ", error);
            }
        };

        fetchData();
    }, []);

    // Filter transactions based on exhibitorName and wineName
    const filteredTransactions = transactions.filter((transaction) => {
        return (
            (!exhibitorName ||
                transaction.exhibitorName
                    .toLowerCase()
                    .includes(exhibitorName.toLowerCase())) &&
            (!wineName ||
                transaction.wineName
                    .toLowerCase()
                    .includes(wineName.toLowerCase()))
        );
    });

    return (
        <div>
            <h2>Transaction List</h2>

            {/* Filter inputs */}
            <div>
                <label>
                    Filter by Exhibitor Name:
                    <input
                        type="text"
                        value={exhibitorName}
                        onChange={(e) => setExhibitorName(e.target.value)}
                        placeholder="Enter exhibitor name"
                    />
                </label>
                <label>
                    Filter by Wine Name:
                    <input
                        type="text"
                        value={wineName}
                        onChange={(e) => setWineName(e.target.value)}
                        placeholder="Enter wine name"
                    />
                </label>
            </div>

            {/* Table for filtered list of transactions */}
            <div className="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>Attendee ID</th>
                            <th>Exhibitor Name</th>
                            <th>Wine Name</th>
                            <th>Cost</th>
                            <th>Gold Purchase</th>
                            <th>Purchase Time</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredTransactions.map((transaction, index) => (
                            <tr key={index}>
                                <td>{transaction.attendeeId}</td>
                                <td>{transaction.exhibitorName}</td>
                                <td>{transaction.wineName}</td>
                                <td>{transaction.cost} tokens</td>
                                <td>
                                    {transaction.isGoldPurchase ? "Yes" : "No"}
                                </td>
                                <td>
                                    <td>
                                        {formatDateTime(
                                            transaction.purchaseTime
                                        )}
                                    </td>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default TransactionList;
