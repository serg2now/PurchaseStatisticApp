import { Component, Input, OnInit } from '@angular/core';
import { ChartData, ChartPart, InnerCircle, RadialSector } from '../../interfaces/chart-data';
import { ShapesDrawerService } from '../../services/shapes-drawer.service';
import { BaseChartComponent } from '../base-chart/base-chart.component';

@Component({
  selector: 'brand-health-chart',
  templateUrl: './brand-health-chart.component.html',
  styleUrls: ['./brand-health-chart.component.css']
})
export class BrandHealthChartComponent extends BaseChartComponent implements OnInit {
  shapesDrawer!: ShapesDrawerService;

  @Input() override width!: number;
  @Input() override height!: number;

  private readonly CHART_CENTER_X = 150;
  private readonly CHART_CENTER_Y = 150;
  
  constructor() { 
    super('brand-health-chart');
   }

  ngOnInit(): void {
    this.createSvg();
    this.shapesDrawer = new ShapesDrawerService(this.svg);
  }

  drawChart(chartData: ChartData): void {
    this.clearCanvas();

    this.drawChartDiagram(chartData);

    this.drawDescriptions(chartData);
  }

  private drawChartDiagram(chartData: ChartData): void {
    const innerRadius = chartData.innerCircle.radius;
    const textWeight = chartData.sectorLabelsTextWeight ?? 600;
    const textSize = chartData.sectorLabelsTextSize ?? 8;

    chartData.radialSectors.forEach((sector) => this.drawRadialSector(sector, innerRadius, textSize, textWeight));
    
    this.drawInnerCircle(chartData.innerCircle, textSize, textWeight);
  }

  private drawDescriptions(chartData: ChartData): void {
    const descriptions: ChartPart[] = [...chartData.radialSectors, chartData.innerCircle];
    const textSize = chartData.descriptionTextSize ?? 8;
    const textWeight = chartData.descriptionTextWeight ?? 400;

    const radius = 4;
    const yOffset = 10;
    const descriptionsHeight = descriptions.length * (textSize + yOffset);
    let xStart = 10;
    let yStart = this.height - descriptionsHeight;

    const circleClass = "desc";
    const cYFunc = (d: any, i: any) => yStart + (radius * 2 + yOffset) * i;
    const colorfunc = (d: any) => d.color;
    this.shapesDrawer.drawCircles(descriptions, xStart, cYFunc, radius, colorfunc, circleClass);

    xStart = xStart + radius + 5;
    yStart = yStart + radius/2;
    const getText = (d: any) => d.descriptionText;
    this.shapesDrawer.drawText(descriptions, xStart, cYFunc, textSize, getText, circleClass, textWeight);
  }

  private drawRadialSector(sector: RadialSector, innerRadius: number, textSize: number, textWeight: number): void {
    const innerRadiuses = [innerRadius, ...sector.radialLevels.slice(0, sector.radialLevels.length - 1).map(l => innerRadius + l.radius)];

    const getStartAngel = (d: any) => sector.sectorStartAngel;
    const getEndAngel = (d: any) => sector.sectorEndAngel;
    const getInnerRadius = (d: any, i: number) => innerRadiuses[i];
    const getOuterRadius = (d: any, i: number) => innerRadiuses[i] + d.radius;
    const getColor = (d: any) => d.color;
    const className = `${sector.descriptionText}`;

    const arc = this.shapesDrawer.buildArc(getStartAngel, getEndAngel, getInnerRadius, getOuterRadius);
    this.shapesDrawer.drawArcs(sector.radialLevels, arc, this.CHART_CENTER_X, this.CHART_CENTER_Y, className, getColor);

    const medianaAngels = this.calcMedianAngels(sector);
    const textAnchor = 'middle';
    const getValue = (d: any) => `${d.value ?? ''}`;
    const getStartX = (d: any, i: number) => this.CHART_CENTER_X + medianaAngels.angelX * (innerRadiuses[i] + (d.radius) * 0.75);
    const getStartY = (d: any, i: number) => this.CHART_CENTER_Y + medianaAngels.angelY * (innerRadiuses[i] + (d.radius) * 0.5);

    this.shapesDrawer.drawText(sector.radialLevels, getStartX, getStartY, textSize, getValue, sector.descriptionText, textWeight, sector.labelColor, textAnchor);
  }

  private drawInnerCircle(innerCircle: InnerCircle, textSize: number, textWeight: number): void {
    const circleClass = "inner";
    const getColor = (d: any) => d.color;
    this.shapesDrawer.drawCircles([innerCircle], this.CHART_CENTER_X, this.CHART_CENTER_Y, innerCircle.radius, getColor, circleClass);

    const startX = this.CHART_CENTER_X;
    const startY = this.CHART_CENTER_Y + textSize/2;
    const labelClass = "label";
    const textAnchor = "middle";
    const getValue = (d: any) => d.value;
    const getLabelColor = (d: any) => d.labelColor;
    this.shapesDrawer.drawText([innerCircle], startX, startY, textSize, getValue, labelClass, textWeight, getLabelColor, textAnchor);
  }

  private calcMedianAngels(sector: RadialSector): {angelX: number, angelY: number} {
    const medianaAngel = (sector.sectorStartAngel + sector.sectorEndAngel) / 2;

    let medianaAngelX = (medianaAngel <= Math.PI / 2) 
      ? medianaAngel 
      : (medianaAngel > Math.PI * 1.5)
        ? - (Math.PI * 2 - medianaAngel)
        : (medianaAngel <= Math.PI) 
          ? (Math.PI - medianaAngel)
          : - (medianaAngel - Math.PI);
    medianaAngelX = medianaAngelX/(Math.PI/2);

    let medianAngelY = (medianaAngel < Math.PI / 2)
      ? -(Math.PI / 2 - medianaAngel)
      : (medianaAngel > Math.PI * 1.5)
        ? -(medianaAngel - Math.PI * 1.5)
        : (medianaAngel <= Math.PI) 
          ? medianaAngel - Math.PI / 2 
          : Math.PI / 2 - (medianaAngel - Math.PI);
    medianAngelY = medianAngelY/(Math.PI/2);

    return { angelX: medianaAngelX, angelY: medianAngelY };
  } 
}
