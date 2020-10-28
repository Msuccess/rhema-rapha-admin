import { ChartType } from './dashboard.model';
export class ChartService {
    areaChartData(doctorsNumber: any, departmentNumber: any) {
        const revenueAreaChart: ChartType = {
            chart: {
                height: 282,
                type: 'area',
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
                    data: doctorsNumber,
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
                categories: departmentNumber,
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
    }
}
