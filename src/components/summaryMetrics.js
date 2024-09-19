import React, { useEffect, useState } from "react";
import {
    fetchTotalTransactions,
    fetchTotalExhibitors,
    fetchTotalWines,
    fetchTotalSilverTokens,
    fetchTotalGoldTokens,
} from "../services/fetchStats";
import "./summaryMetrics.css"; // Import the CSS file for styling

const SummaryMetrics = () => {
    const [totalTransactions, setTotalTransactions] = useState(0);
    const [totalExhibitors, setTotalExhibitors] = useState(0);
    const [totalWines, setTotalWines] = useState(0);
    const [totalSilverTokens, setTotalSilverTokens] = useState(0);
    const [totalGoldTokens, setTotalGoldTokens] = useState(0);

    // Calculate metrics
    const totalTokens = totalSilverTokens + totalGoldTokens;
    const totalSilverRevenue = totalSilverTokens;
    const totalGoldRevenue = totalGoldTokens * 5;
    const totalRevenue = totalSilverRevenue + totalGoldRevenue;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const transactions = await fetchTotalTransactions();
                const exhibitors = await fetchTotalExhibitors();
                const wines = await fetchTotalWines();
                const silverTokens = await fetchTotalSilverTokens();
                const goldTokens = await fetchTotalGoldTokens();

                setTotalTransactions(transactions);
                setTotalExhibitors(exhibitors);
                setTotalWines(wines);
                setTotalSilverTokens(silverTokens);
                setTotalGoldTokens(goldTokens);
            } catch (error) {
                console.error("Error fetching summary metrics:", error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="summary-container">
            <h2>Overall Summary</h2>
            <div className="metric-group">
                <div className="metric">
                    <div className="metric-title">Total Transactions</div>
                    <div className="metric-value">{totalTransactions}</div>
                </div>
                <div className="metric">
                    <div className="metric-title">Total Exhibitors</div>
                    <div className="metric-value">{totalExhibitors}</div>
                </div>
                <div className="metric">
                    <div className="metric-title">Total Wines</div>
                    <div className="metric-value">{totalWines}</div>
                </div>
                <div className="metric">
                    <div className="metric-title">
                        Total Silver Tokens Spent
                    </div>
                    <div className="metric-value">{totalSilverTokens}</div>
                </div>
                <div className="metric">
                    <div className="metric-title">Total Gold Tokens Spent</div>
                    <div className="metric-value">{totalGoldTokens}</div>
                </div>
                <div className="metric">
                    <div className="metric-title">Total Tokens Spent</div>
                    <div className="metric-value">{totalTokens}</div>
                </div>
                <div className="metric">
                    <div className="metric-title">Total Silver Revenue</div>
                    <div className="metric-value">${totalSilverRevenue}</div>
                </div>
                <div className="metric">
                    <div className="metric-title">Total Gold Revenue</div>
                    <div className="metric-value">${totalGoldRevenue}</div>
                </div>
                <div className="metric">
                    <div className="metric-title">Total Revenue</div>
                    <div className="metric-value">${totalRevenue}</div>
                </div>
            </div>
        </div>
    );
};

export default SummaryMetrics;
