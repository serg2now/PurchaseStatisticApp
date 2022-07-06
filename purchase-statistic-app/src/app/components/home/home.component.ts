import { Component, OnInit, ViewChild } from '@angular/core';
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

  @ViewChild(BrandHealthChartComponent) brandHealthChart!: BrandHealthChartComponent;

  isLoading = true;

  constructor(private service: PurchasesService, private webSocketService: WebSocketService) { }

  ngOnInit(): void {
    const brandHealt = { meaningful: 152, different: 95, salient: 168, power: 16.4 };

    this.service.getPurchases().subscribe({
      next: (response) => {
        this.purchases = response;
        this.isLoading = false;

        const chartData = this.processData();
        this.brandHealthChart.drawChart(chartData);
      }, 
      error: () => {
        this.isLoading = false;
      }
    });

    this.webSocketService.messages$.subscribe((eventData: Purchase) => {
      const purchase = { ...eventData, isNew: true };

      this.purchases.push(purchase);
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

  // private processData(brandHealt: any): ChartData {
  //   const meaningFulAngel = (135/360) * 3.14 * 2;
  //   const differentAngel = (90/360) * 3.14 * 2;
  //   const salientAngel = (135/360) * 3.14 * 2;

  //   const chartData: ChartData = { 
  //     descriptionTextSize: 8,
  //     descriptionTextWeight: 400,
  //     sectorLabelsTextSize: 8,
  //     sectorLabelsTextWeight: 600,
  //     radialSectors: [
  //       {
  //         sectorStartAngel: 0,
  //         sectorEndAngel: salientAngel, 
  //         color: '#78C0CF',
  //         labelColor: '#000000',
  //         descriptionText: 'SALIENT',
  //         radialLevels: [
  //           { radius: 20, color: '#78C0CF' }, 
  //           { radius: 45, color: '#55B0C3', value: brandHealt.salient }
  //         ]
  //       },
  //       {
  //         sectorStartAngel: salientAngel,
  //         sectorEndAngel: salientAngel + differentAngel, 
  //         color: '#65878A',
  //         labelColor: '#FFFFFF',
  //         descriptionText: 'DIFFERENT',
  //         radialLevels: [
  //           { radius: 20, color: '#65878A', value: brandHealt.different}
  //         ],
  //       },
  //       {
  //         sectorStartAngel: salientAngel + differentAngel, 
  //         sectorEndAngel: salientAngel + differentAngel + meaningFulAngel,
  //         color: '#A493C9',
  //         labelColor: '#FFFFFF',
  //         descriptionText: 'MEANINGFUL',
  //         radialLevels: [
  //           { radius: 20, color: '#A493C9' },
  //           { radius: 30, color: '#8C7BAE', value: brandHealt.meaningful}
  //         ]
  //       },  
  //     ], 
  //     innerCircle: { 
  //       descriptionText: 'POWER',
  //       labelColor: '#FFFFFF',
  //       radius: 15,
  //       value: brandHealt.power,
  //       color: '#46393C' 
  //     } 
  //   };

  //   return chartData;
  // }

}
