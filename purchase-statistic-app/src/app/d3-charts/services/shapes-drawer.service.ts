import * as d3 from "d3";
import { RadialLevel, RadialSector } from "../interfaces/chart-data";
import { GetNumberFunction, GetStringFunction } from "../types/function-types";

export class ShapesDrawerService {

  constructor(private svg: any) { }

 buildArc(startAngleFunc: GetNumberFunction, endAngleFunc: GetNumberFunction, innerRadius: any, outerRadius: any): d3.Arc<any, d3.DefaultArcObject>
  {
    return d3.arc()
      .startAngle(startAngleFunc)
      .endAngle(endAngleFunc)
      .innerRadius(innerRadius)
      .outerRadius(outerRadius);
  }

  drawArcs(
    data: RadialSector[],
    arcObject: d3.Arc<any, d3.DefaultArcObject>,
    centerX: number,
    centerY: number,
    arcClass: string,
    getColorFunc: GetStringFunction): void {
    this.svg.selectAll(`path.${arcClass}`)
      .data(data)
      .enter().append("path")
      .attr("class", arcClass)
      .attr("d", arcObject)
      .attr("transform", `translate(${centerX},${centerY})`)
      .attr("fill", getColorFunc);
  }

  drawCircles(data: any[], centerX: any, centerY: any, radius: number, fill: any, elClass: string): void {
    this.svg.selectAll(`circle.${elClass}`)
      .data(data)
      .enter().append("circle")
                  .attr("class", elClass)
                  .attr("fill", fill)
                  .attr("cx", centerX)
                  .attr("cy", centerY)
                  .attr("r", radius);
  }

  drawRects(data: any[], startX: any, startY: any, width: any, height: any, fill: any, elClass: string): void {
    this.svg.selectAll(`rect.${elClass}`)
      .data(data)
      .enter().append("rect")
                  .attr("class", `${elClass}`)
                  .attr("height", height)
                  .attr("width", width)
                  .attr("fill", fill)
                  .attr("x", startX)
                  .attr("y", startY);
  }

  drawText(data: any, startX: any, startY: any, fontSize: any, fontWeight: any, text: GetStringFunction, elClass: any): void {
    this.svg.append("text").selectAll(`tspan.${elClass}`)
      .data(data)
      .enter().append("tspan")
                  .attr("class",`${elClass}`)
                  .attr("x", startX)
                  .attr("y", startY)
                  .attr("font-size", fontSize)
                  .attr("font-weight", fontWeight)
                  .text(text);
  }
}
