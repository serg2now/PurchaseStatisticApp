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

        const chartData = this.processData(brandHealt);
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

  private processData(brandHealt: any): ChartData {
    const meaningFulAngel = (135/360) * 3.14 * 2;
    const differentAngel = (90/360) * 3.14 * 2;
    const salientAngel = (135/360) * 3.14 * 2;

    const chartData: ChartData = { 
      radialSectors: [
        {
          sectorStartAngel: 0,
          sectorEndAngel: salientAngel, 
          color: '#78C0CF',
          labelColor: '#000000',
          descriptionText: 'SALIENT',
          radialLevels: [
            { radius: 20, color: '#78C0CF' }, 
            { radius: 45, color: '#55B0C3', value: brandHealt.salient }
          ]
        },
        {
          sectorStartAngel: salientAngel,
          sectorEndAngel: salientAngel + differentAngel, 
          color: '#65878A',
          labelColor: '#FFFFFF',
          descriptionText: 'DIFFERENT',
          radialLevels: [
            { radius: 20, color: '#65878A', value: brandHealt.different}
          ],
        },
        {
          sectorStartAngel: salientAngel + differentAngel, 
          sectorEndAngel: salientAngel + differentAngel + meaningFulAngel,
          color: '#A493C9',
          labelColor: '#FFFFFF',
          descriptionText: 'MEANINGFUL',
          radialLevels: [
            { radius: 20, color: '#A493C9' },
            { radius: 30, color: '#8C7BAE', value: brandHealt.meaningful}
          ]
        },  
      ], 
      innerCircle: { 
        descriptionText: 'POWER',
        labelColor: '#FFFFFF',
        radius: 15,
        value: brandHealt.power,
        color: '#46393C' 
      } 
    };

    return chartData;
  }

}
