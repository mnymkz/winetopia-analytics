// summary metrics returns a div containing summary metrics
import React, { useEffect, useState } from "react";
import {
    fetchTotalTransactions,
    fetchTotalExhibitors,
    fetchTotalWines,
    fetchTotalRevenue,
    fetchTotalTokens,
    fetchSilverTokens,
    fetchGoldTokens,
    fetchSilverRevenue,
    fetchGoldRevenue,
} from "../services/fetchStats";

const SummaryMetrics = () => {
    const [totalTransactions, setTotalTransactions] = useState(0);
    const [totalExhibitors, setTotalExhibitors] = useState(0);
    const [totalWines, setTotalWines] = useState(0);
    const [totalTokens, setTotalTokens] = useState(0);
    const [totalSilverTokens, setTotalSilverTokens] = useState(0);
    const [totalGoldTokens, setTotalGoldTokens] = useState(0);
    const [totalRevenue, setTotalRevenue] = useState(0);
    const [totalSilverRevenue, setTotalSilverRevenue] = useState(0);
    const [totalGoldRevenue, setTotalGoldRevenue] = useState(0);

    useEffect(() => {
        // Fetch all summary metrics data when the component mounts
        const fetchData = async () => {
            try {
                const transactions = await fetchTotalTransactions();
                const exhibitors = await fetchTotalExhibitors();
                const wines = await fetchTotalWines();
                const totalTokens = await fetchTotalTokens();
                const totalSilverTokens = await fetchSilverTokens();
                const totalGoldTokens = await fetchGoldTokens();
                const totalRevenue = await fetchTotalRevenue();
                const totalSilverRevenue = await fetchSilverRevenue();
                const totalGoldRevenue = await fetchGoldRevenue();

                setTotalTransactions(transactions);
                setTotalExhibitors(exhibitors);
                setTotalWines(wines);
                setTotalTokens(totalTokens);
                setTotalSilverTokens(totalSilverTokens);
                setTotalGoldTokens(totalGoldTokens);
                setTotalRevenue(totalRevenue);
                setTotalSilverRevenue(totalSilverRevenue);
                setTotalGoldRevenue(totalGoldRevenue);
            } catch (error) {
                console.error("Error fetching summary metrics: ", error);
            }
        };

        fetchData();
    }, []);

    return <div></div>;
};

export default SummaryMetrics;
