// src/pages/summaryPage.js
import React from "react";
import SummaryMetrics from "../components/summaryMetrics";
import TransactionList from "../components/transactionList";

const SummaryPage = () => {
    return (
        <div>
            <h1>Summary Page</h1>
            <SummaryMetrics></SummaryMetrics>
            <TransactionList></TransactionList>
        </div>
    );
};

export default SummaryPage;
