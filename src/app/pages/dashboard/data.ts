import { ChartType } from './dashboard.model';

function getDaysInMonth(month, year) {
    const date = new Date(year, month, 1);
    const days = [];
    let idx = 0;
    while (date.getMonth() === month && idx < 15) {
        const d = new Date(date);
        days.push(
            d.getDate() + ' ' + d.toLocaleString('en-us', { month: 'short' })
        );
        date.setDate(date.getDate() + 1);
        idx += 1;
    }
    return days;
}

const now = new Date();
const labels = getDaysInMonth(now.getMonth(), now.getFullYear());
const revenueAreaChart: ChartType = {
    chart: {
        height: 282,
        type: 'bar',
        toolbar: {
            show: false,
        },
    },
    tooltip: {
        theme: 'dark',
        x: { show: false },
    },
    stroke: {
        curve: 'smooth',
        width: 4,
    },
    series: [
        {
            name: 'Revenue',
            data: [10, 20, 5, 15, 10, 20, 15, 25, 20, 30, 25, 40, 30, 50, 35],
        },
    ],
    dataLabels: {
        enabled: false,
    },
    zoom: {
        enabled: false,
    },
    legend: {
        show: false,
    },
    colors: ['#43d39e'],
    xaxis: {
        type: 'string',
        categories: labels,
        tooltip: {
            enabled: false,
        },
        axisBorder: {
            show: false,
        },
    },
    yaxis: {
        labels: {
            formatter(val) {
                return val + 'k';
            },
        },
    },
    fill: {
        type: 'gradient',
        gradient: {
            type: 'vertical',
            shadeIntensity: 1,
            inverseColors: false,
            opacityFrom: 0.45,
            opacityTo: 0.05,
            stops: [45, 100],
        },
    },
};

export { revenueAreaChart };
