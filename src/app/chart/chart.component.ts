import {Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-chart',
    templateUrl: './chart.component.html',
    styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit{
    @Input() chartType;
    ngOnInit() {
        //console.log(this.chartType)
    }
    
}