//transactionList.js component displays all transactions and allows user to filter through
//contains the chart component from chart.js to display vendor info
import React, { useEffect, useState } from "react";
import { fetchTransactions } from "../services/fetchStats";
import "./transactionList.css"; // Import the CSS file for styling
import Charts from "./charts";

//date formatting
const formatDateTime = (timestamp) => {
    const date = timestamp.toDate();
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-indexed
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");

    return `${day}/${month}/${year} ${hours}:${minutes}`;
};

//transaction list component
const TransactionList = () => {
    const [transactions, setTransactions] = useState([]);
    const [exhibitorName, setExhibitorName] = useState("");
    const [wineName, setWineName] = useState("");
    const [attendeeId, setAttendeeId] = useState("");

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

    //drop down values
    const uniqueExhibitors = [
        ...new Set(
            transactions.map((transaction) => transaction.exhibitorName)
        ),
    ];
    const uniqueWines = [
        ...new Set(transactions.map((transaction) => transaction.wineName)),
    ];

    //filter transactions based on exhibitorName, wineName, and attendeeId
    const filteredTransactions = transactions.filter((transaction) => {
        return (
            (!exhibitorName || transaction.exhibitorName === exhibitorName) &&
            (!wineName || transaction.wineName === wineName) &&
            (!attendeeId ||
                transaction.attendeeId
                    .toLowerCase()
                    .includes(attendeeId.toLowerCase()))
        );
    });

    return (
        <div className="centered-container">
            <h2>Winetopia 2024 Event Transactions</h2>

            {/* filter inputs */}
            <div className="filters-container">
                <label>
                    Filter by Exhibitor Name:
                    <select
                        value={exhibitorName}
                        onChange={(e) => setExhibitorName(e.target.value)}
                    >
                        <option value="">All Exhibitors</option>
                        {uniqueExhibitors.map((exhibitor, index) => (
                            <option key={index} value={exhibitor}>
                                {exhibitor}
                            </option>
                        ))}
                    </select>
                </label>
                <label>
                    Filter by Wine Name:
                    <select
                        value={wineName}
                        onChange={(e) => setWineName(e.target.value)}
                    >
                        <option value="">All Wines</option>
                        {uniqueWines.map((wine, index) => (
                            <option key={index} value={wine}>
                                {wine}
                            </option>
                        ))}
                    </select>
                </label>
                <label>
                    Filter by Attendee ID:
                    <input
                        type="text"
                        value={attendeeId}
                        onChange={(e) => setAttendeeId(e.target.value)}
                        placeholder="Enter attendee ID"
                    />
                </label>
            </div>

            {/* Table of transactions */}
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
                                    {formatDateTime(transaction.purchaseTime)}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Charts */}
            <Charts
                transactions={filteredTransactions}
                exhibitorName={exhibitorName}
            />
        </div>
    );
};

export default TransactionList;
