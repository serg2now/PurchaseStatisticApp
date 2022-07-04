import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrandHealthChartComponent } from './charts-components/brand-health-chart/brand-health-chart.component';
import { ChartTitleComponent } from './charts-components/chart-title/chart-title.component';

@NgModule({
  declarations: [
    BrandHealthChartComponent,
    ChartTitleComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    BrandHealthChartComponent,
    ChartTitleComponent
  ]
})
export class D3ChartsModule { }
