import { Component, Input, OnInit } from '@angular/core';
import { HealthState, HealthStateColors } from '../../enums/health-states';
import { BrandHealth } from '../../interfaces/brand-health';
import { ShapesDrawerService } from '../../services/shapes-drawer.service';
import { BaseChartComponent } from '../base-chart/base-chart.component';

@Component({
  selector: 'chart-title',
  templateUrl: './chart-title.component.html',
  styleUrls: ['./chart-title.component.css']
})
export class ChartTitleComponent extends BaseChartComponent implements OnInit {
  @Input() chartTitle: string = '';
  @Input() chartSubTitle!: string;
  @Input() override width!: number;
  @Input() override height!: number;

  private brandHealth!: BrandHealth;

  private healthState!: HealthState;

  private shapeService!: ShapesDrawerService;

  private readonly ON_TRACK_STATE = 'On Track';

  private readonly STATE_COLORS = HealthStateColors;

  constructor() {
    super('title');
   }

  ngOnInit(): void {
    this.createSvg();
    this.shapeService = new ShapesDrawerService(this.svg);
  }

  setData(health: BrandHealth): void {
    this.brandHealth = health;

    this.processData();

    this.drawTitle();
  }

  processData(): void {
    this.healthState = (this.brandHealth.diffFromAverage  > -2)
      ? HealthState.OnTrack
      : (this.brandHealth.diffFromAverage > -5)
        ? HealthState.Attention
        : HealthState.Critical; 

    this.chartSubTitle = (this.healthState == HealthState.OnTrack)
      ? this.ON_TRACK_STATE
      : `${this.brandHealth.diffFromAverage}% ${this.chartSubTitle}`;
  }

  protected drawTitle(): void {
    const rectHeight = 50;
    const rectWidth = 6;
    const rectXStart = 10;
    const rectYStart = 10;
    const rectClass = "health"
    this.shapeService.drawRects([1], rectXStart, rectYStart, rectWidth, rectHeight, this.STATE_COLORS[this.healthState], rectClass);

    const titlesMetadata = [
      { text: this.chartTitle, fontSize: 20, fontWeight: 600 },
      { text: this.chartSubTitle, fontSize: 14, fontWeight: 300 }
    ];

    const xStart = 30;
    const yStart = 27;
    const yOffset = 25;
    const titleClass = "title";
    const getY = (d: any, i: any) => yStart + i * yOffset;
    this.shapeService.drawText(titlesMetadata, xStart, getY, (d: any) => d.fontSize, (d: any) => d.fontWeight, (d: any) => d.text, titleClass);
  }

}
