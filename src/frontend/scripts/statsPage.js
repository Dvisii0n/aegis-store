import Plotly from "https://esm.sh/plotly.js-dist-min";
import { requestPgFunction } from "./utils.js";

async function renderSalesPlot() {
    const salesDates = await requestPgFunction("countOrders", true);
    const colorRGB = "rgba(26, 182, 34, 1)";
    const dates = salesDates.map((date) => date.dia);
    const values = salesDates.map((date) => date.total);
    const layout = {
        xaxis: {
            tickformat: "%d %b %y",
        },
    };
    const data = [
        {
            x: [...dates],

            y: [...values],

            type: "scatter",
            marker: {
                color: colorRGB,
            },
        },
    ];

    const config = { responsive: true };

    const plotContainer = document.querySelector(".sales-plot");
    Plotly.newPlot(plotContainer, data, layout, config);
}

async function renderUsersPlot() {
    const userDates = await requestPgFunction("countUsers", true);

    const dates = userDates.map((date) => date.dia);
    const values = userDates.map((date) => date.total);
    const layout = {
        xaxis: {
            tickformat: "%d %b %y",
        },
    };
    const data = [
        {
            x: [...dates],

            y: [...values],

            type: "scatter",
        },
    ];

    const config = { responsive: true };

    const plotContainer = document.querySelector(".users-plot");
    Plotly.newPlot(plotContainer, data, layout, config);
}

(async function renderStats() {
    try {
        const totalOrders = await requestPgFunction("getOrderCount", true);
        const totalSoldItems = await requestPgFunction(
            "getOrderItemsCount",
            true
        );
        const totalSales = await requestPgFunction("getTotalSales", true);
        const totalUsers = await requestPgFunction("getUserCount", true);

        const listData = [
            { className: ".total-orders", value: totalOrders.countorders },
            {
                className: ".total-sold-items",
                value: totalSoldItems.countorderitems,
            },
            {
                className: ".total-sales",
                value: `MXN$${totalSales.gettotalsales}`,
            },
            { className: ".total-users", value: totalUsers.countusers },
        ];

        listData.forEach((item) => {
            const container = document.querySelector(item.className);
            container.textContent = item.value;
        });

        await renderSalesPlot();
        await renderUsersPlot();
    } catch (error) {
        alert("Prende el server wey");
    }
})();
