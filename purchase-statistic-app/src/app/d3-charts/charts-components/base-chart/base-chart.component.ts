import * as d3 from 'd3';

export abstract class BaseChartComponent {
  protected svg: any = null;

  width!: number;
  height!: number;
  
  constructor(private selector: string) {

   }

  protected createSvg(): void {
    this.svg = d3.select(`figure#${this.selector}`)
    .append("svg")
    .attr("width", this.width)
    .attr("height", this.height);
  }

  protected clearCanvas(): void {
    this.svg.selectAll('*').remove();
  }
}
