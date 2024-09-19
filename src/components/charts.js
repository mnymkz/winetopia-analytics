//charts.js contains charts to display data to user
//used in transaction list component
//takes in exhibitor filter and transaction list
import React from "react";
import { Bar } from "react-chartjs-2";
import {
    Chart as Chartjs,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";

Chartjs.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const Charts = ({ transactions, exhibitorName }) => {
    const exhibitorWineCount = {};
    const wineCategoryCount = {};

    transactions.forEach((transaction) => {
        const exhibitor = transaction.exhibitorName;
        const wine = transaction.wineName;

        //total wines per exhibitor
        if (!exhibitorWineCount[exhibitor]) {
            exhibitorWineCount[exhibitor] = 0;
        }
        exhibitorWineCount[exhibitor] += 1;

        if (exhibitorName && exhibitor === exhibitorName) {
            if (!wineCategoryCount[wine]) {
                wineCategoryCount[wine] = 0;
            }
            wineCategoryCount[wine] += 1;
        }
    });

    //chart data and labels
    const labels = Object.keys(exhibitorWineCount);
    const data = labels.map((exhibitor) => exhibitorWineCount[exhibitor]);

    const chartData = {
        labels: labels, //exhibitors for the x axis
        datasets: [
            {
                label: "Total Wines Purchased",
                data: data, //total wine counts
                backgroundColor: "rgba(75, 192, 192, 0.6)",
            },
        ],
    };

    const options = {
        plugins: {
            title: {
                display: true,
                text: "Total Wines Purchased per Vendor",
            },
        },
        responsive: true,
        scales: {
            x: {
                stacked: false,
            },
            y: {
                beginAtZero: true,
            },
        },
    };

    //chart data for wines per exhibitor
    const categoryLabels = Object.keys(wineCategoryCount);
    const categoryData = categoryLabels.map(
        (wineCategory) => wineCategoryCount[wineCategory]
    );

    const categoryChartData = {
        labels: categoryLabels, //wines as x axis
        datasets: [
            {
                label: `${exhibitorName} - Wines by Category`,
                data: categoryData, //wine counts per category
                backgroundColor: "rgba(153, 102, 255, 0.6)",
            },
        ],
    };

    const categoryOptions = {
        plugins: {
            title: {
                display: true,
                text: `Wines Purchased by Category for ${exhibitorName}`,
            },
        },
        responsive: true,
        scales: {
            x: {
                stacked: false,
            },
            y: {
                beginAtZero: true,
            },
        },
    };

    return (
        <div className="chart-container">
            <Bar data={chartData} options={options} />

            {/* display if filter is selected */}
            {exhibitorName && (
                <div className="chart-container">
                    <Bar data={categoryChartData} options={categoryOptions} />
                </div>
            )}
        </div>
    );
};

export default Charts;
