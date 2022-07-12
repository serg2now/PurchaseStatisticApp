import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrandHealthChartComponent } from './charts-components/brand-health-chart/brand-health-chart.component';

@NgModule({
  declarations: [
    BrandHealthChartComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    BrandHealthChartComponent
  ]
})
export class D3ChartsModule { }
