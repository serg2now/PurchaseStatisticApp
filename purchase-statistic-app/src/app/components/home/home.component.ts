import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { BrandHealthChartComponent } from 'src/app/d3-charts/charts-components/brand-health-chart/brand-health-chart.component';
import { ChartData } from 'src/app/d3-charts/interfaces/chart-data';
import { Purchase } from 'src/app/interfaces/purchase';
import { PurchasesService } from 'src/app/services/purchases.service';
import { WebSocketService } from 'src/app/services/webSocket.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  purchases!: Purchase[];

  @ViewChild('purchstat') purchStatChart!: BrandHealthChartComponent;
  @ViewChild('brandHealth') brandHealthChart!: BrandHealthChartComponent;

  isLoading = true;

  constructor(private service: PurchasesService, private webSocketService: WebSocketService) { }


  ngOnInit(): void {
    this.service.getPurchases().subscribe({
      next: (response) => {
        this.purchases = response;
        this.isLoading = false;

        const chartData = this.processData();
        this.purchStatChart.drawChart(chartData);
      }, 
      error: () => {
        this.isLoading = false;
      }
    });

    this.webSocketService.messages$.subscribe((eventData: Purchase) => {
      const purchase = { ...eventData, isNew: true };

      this.purchases.push(purchase);
      const data = this.processData();
      this.purchStatChart.drawChart(data); 
    });
  }

  private processData(): ChartData {
    const colaAngel = (120/360) * 3.14 * 2;
    const pepsiAngel = (120/360) * 3.14 * 2;
    const nestleAngel = (120/360) * 3.14 * 2;
    const colaPurchNumber = this.purchases.filter(p => p.company === 'Cola').length;
    const pepsiPurchNumber = this.purchases.filter(p => p.company === 'Pepsi').length;
    const nestlePurchNumber = this.purchases.filter(p => p.company === 'Nestle').length;

      const chartData: ChartData = { 
      descriptionTextSize: 9,
      descriptionTextWeight: 600,
      sectorLabelsTextSize: 9,
      sectorLabelsTextWeight: 700,
      radialSectors: [
        {
          sectorStartAngel: 0,
          sectorEndAngel: colaAngel, 
          color: '#D15D5D',
          labelColor: '#FFFFFF',
          descriptionText: 'COLA',
          radialLevels: [
            { radius: 25, color: '#D15D5D' }, 
            { radius: 150 * (colaPurchNumber/this.purchases.length), color: '#B32424', value: colaPurchNumber }
          ]
        },
        {
          sectorStartAngel: colaAngel,
          sectorEndAngel: colaAngel + pepsiAngel, 
          color: '#4F58A9',
          labelColor: '#FFFFFF',
          descriptionText: 'PEPSI',
          radialLevels: [
            { radius: 25, color: '#4F58A9' },
            { radius: 150 * (pepsiPurchNumber/this.purchases.length), color: '#1D2AA6', value: pepsiPurchNumber}
          ],
        },
        {
          sectorStartAngel: colaAngel + pepsiAngel, 
          sectorEndAngel: 2 * Math.PI,
          color: '#FA8282',
          labelColor: '#FFFFFF',
          descriptionText: 'NESTLE',
          radialLevels: [
            { radius: 25, color: '#FA8282' },
            { radius: 150 * (nestlePurchNumber/this.purchases.length), color: '#FC4040', value: nestlePurchNumber}
          ]
        },  
      ], 
      innerCircle: { 
        descriptionText: 'ALL',
        labelColor: '#FFFFFF',
        radius: 25,
        value: this.purchases.length,
        color: 'orangered' 
      } 
    };

    return chartData;

  }

}
