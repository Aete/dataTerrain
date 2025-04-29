import * as d3 from "d3";

export const seoulMercator = d3
  .geoMercator()
  .center([126.978, 37.5665])
  .scale(50000);

export function createColorScale(
  domain: [number, number]
): (v: number) => string {
  return d3.scaleSequential().domain(domain).interpolator(d3.interpolateYlOrRd);
}

export function createHeightScale(
  domain: [number, number],
  height: number
): (v: number) => number {
  return d3
    .scaleLinear()
    .domain(domain)
    .range([height, height + 400]);
}

export const tablet = 768;
