import { Component, OnInit } from '@angular/core';

import { revenueAreaChart } from './data';

import { ChartType, OrdersTable } from './dashboard.model';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
})

/**
 * Dashboard component - handling dashboard with sidear and content
 */
export class DashboardComponent implements OnInit {
    recentAppointments = [1, 2, 3, 4, 5, 6];

    constructor() {}

    revenueAreaChart: ChartType;

    ngOnInit() {
        /**
         * Fetches the data
         */
        this._fetchData();
    }

    /**
     * fetches the dashboard value
     */
    private _fetchData() {
        this.revenueAreaChart = revenueAreaChart;
    }
}
