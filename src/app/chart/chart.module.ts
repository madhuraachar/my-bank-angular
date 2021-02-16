import { NgModule } from '@angular/core';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import {ChartComponent} from './chart.component';
import { PiChartComponent } from './pi-chart/pi-chart.component';
import { LineChartComponent } from './line-chart/line-chart.component';

@NgModule({
    declarations: [ChartComponent, PiChartComponent, LineChartComponent],
    exports: [ChartComponent],
    imports: [NgxChartsModule]
})
export class ChartModule {
    
}