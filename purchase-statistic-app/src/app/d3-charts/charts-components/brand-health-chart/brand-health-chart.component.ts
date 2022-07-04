import { Component, Input, OnInit } from '@angular/core';
import { BrandHealth } from '../../interfaces/brand-health';
import { ChartData, ChartPart, RadialSector } from '../../interfaces/chart-data';
import { ShapesDrawerService } from '../../services/shapes-drawer.service';
import { BaseChartComponent } from '../base-chart/base-chart.component';

@Component({
  selector: 'brand-health-chart',
  templateUrl: './brand-health-chart.component.html',
  styleUrls: ['./brand-health-chart.component.css']
})
export class BrandHealthChartComponent extends BaseChartComponent implements OnInit {
  brandHealth!: BrandHealth;
  shapesDrawer!: ShapesDrawerService;

  @Input() override width!: number;
  @Input() override height!: number;

  private readonly CHART_CENTER_X = 150;
  private readonly CHART_CENTER_Y = 80;
  private readonly TEXT_SIZE = 8;
  
  constructor() { 
    super('brand-health-chart');
   }

  ngOnInit(): void {
    this.createSvg();
    this.shapesDrawer = new ShapesDrawerService(this.svg);
  }

  drawChart(chartData: ChartData): void {
    this.drawChartDiagram(chartData);

    this.drawDescription(chartData);
  }

  private drawChartDiagram(chartData: ChartData): void {
    const innerRadius = chartData.innerCircle.radius;
    const outerRadius = 35;

    let pathClass = "inner";

    const maxLevelsNumber = chartData.radialSectors.map(s => s.radialLevels.length).reduce((a, b) => a > b ? a : b);

    // for (let i = 0; i < maxLevelsNumber; i++){
    //   const elClass = `level${i + 1}`;
    //   const arc = 
    // }

    let getOuterRadius = (d: RadialSector) => innerRadius + d.radialLevels[0].radius;
    const innerArc = this.shapesDrawer.buildArc((d: any) => d.sectorStartAngel, (d: any) => d.sectorEndAngel, innerRadius, getOuterRadius);
    this.shapesDrawer.drawArcs(chartData.radialSectors, innerArc, this.CHART_CENTER_X, this.CHART_CENTER_Y, pathClass, (d: any) => d.color);

    const outerSectors = chartData.radialSectors.filter((sector: any) => sector.radialLevels[1]);

    if (outerSectors.length > 0) {
      pathClass = "outer";
      const getInnerRadius = getOuterRadius;
      getOuterRadius = (d: RadialSector) => innerRadius + d.radialLevels[0].radius + d.radialLevels[1].radius;
      const outerArc = this.shapesDrawer.buildArc((d: any) => d.sectorStartAngel, (d: any) => d.sectorEndAngel, getInnerRadius, getOuterRadius)

      this.shapesDrawer.drawArcs(outerSectors, outerArc, this.CHART_CENTER_X, this.CHART_CENTER_Y, pathClass,(d: any) => d.radialLevels[1].color);
    }
    
    const circleClass = "inner";
    this.shapesDrawer.drawCircles([chartData.innerCircle], this.CHART_CENTER_X, this.CHART_CENTER_Y, innerRadius, (d: any) => d.color, circleClass);
    
    // this.svg.append("text").selectAll("tspan.radial")
    //   .data(chartData.radialSectors)
    //   .enter().append("tspan")
    //               .attr("class","radial")
    //               .attr("x", (d: any) => this.CHART_CENTER_X + ((d.sectorEndAngel > 0) ? 50 : -50))
    //               .attr("y", (d: any) => this.CHART_CENTER_Y +((d.sectorStartAngel > 1.5) ? 20 : -20))
    //               .attr("font-size", this.TEXT_SIZE)
    //               .attr('fill', (d: any) => d.labelColor)
    //               .attr("dominant-baseline","bottom")
    //               .text((d: any) => `${d.value}`);
  }

  private drawDescription(chartData: ChartData): void {
    const descriptions: ChartPart[] = [...chartData.radialSectors, chartData.innerCircle];

    let xStart = 10;
    let yStart = this.CHART_CENTER_Y;
    const radius = 4;
    const yOffset = 10;

    const circleClass = "desc";
    const cYFunc = (d: any, i: any) => yStart + (radius * 2 + yOffset) * i;
    const colorfunc = (d: any) => d.color;
    this.shapesDrawer.drawCircles(descriptions, xStart, cYFunc, radius, colorfunc, circleClass);

    xStart = xStart + radius + 5;
    yStart = yStart + radius/2;
    const fontWeight = 400;
    const getText = (d: any) => d.descriptionText;
    this.shapesDrawer.drawText(descriptions, xStart, cYFunc, this.TEXT_SIZE, fontWeight, getText, circleClass);
  }

}
