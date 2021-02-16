import { Component, OnInit } from '@angular/core';
import { single } from '../data/data';

@Component({
    selector: 'app-pi-chart',
    templateUrl: './pi-chart.component.html',
    styleUrls: ['./pi-chart.component.scss']
})
export class PiChartComponent implements OnInit{
    single: any[];
    view: any[] = [];

      // options
      gradient: boolean = true;
      showLegend: boolean = true;
      showLabels: boolean = true;
      isDoughnut: boolean = true;

  colorScheme = {
    domain: ['#222f97', '#1fa7e6']
  };

  constructor() {
      Object.assign(this, { single });
  }

  ngOnInit()  {
    if (window.innerWidth <= 600) {
      this.view = [300, 300]
    } else {
      this.view = [500, 200]
    }
    console.log("Pi chart")
  }

  onSelect(data): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  onActivate(data): void {
    console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data): void {
    console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }
}