import { rollup, sum, scaleBand, scaleRadial, lineRadial } from 'd3';
const d3 = { rollup, sum, scaleBand, scaleRadial, lineRadial };
import { INNER_RADIUS, RadarGrid } from './RadarGrid';

// code credit: https://www.react-graph-gallery.com/radar-chart
const MARGIN = 40;
export const Radar = ({ width, height, data, axisConfig }) => {
  const amountByCat = d3.rollup(
    data,
    v => d3.sum(v, d => Math.abs(d.amount)),
    d => d.category
  );
  const newData = Object.fromEntries(amountByCat.entries());

  const outerRadius = Math.min(width, height) / 2 - MARGIN;

  const allVariableNames = axisConfig.map(axis => axis.name);
  const xScale = d3
    .scaleBand()
    .domain(allVariableNames)
    .range([0, 2 * Math.PI]);

  let yScales = {};
  axisConfig.forEach(axis => {
    yScales[axis.name] = d3.scaleRadial().domain([0, axis.max]).range([INNER_RADIUS, outerRadius]);
  });

  const lineGenerator = d3.lineRadial();

  const allCoordinates = axisConfig.map(axis => {
    const yScale = yScales[axis.name];
    const angle = xScale(axis.name) ?? 0;
    const radius = yScale(newData[axis.name]);
    const coordinate = [angle, radius];
    return coordinate;
  });

  allCoordinates.push(allCoordinates[0]);
  const linePath = lineGenerator(allCoordinates);

  return (
    <svg width={width} height={height}>
      <g transform={'translate(' + width / 2 + ',' + height / 2 + ')'}>
        <RadarGrid outerRadius={outerRadius} xScale={xScale} axisConfig={axisConfig} />
        <path d={linePath} stroke={'teal'} strokeWidth={3} fill={'teal'} fillOpacity={0.1} />
      </g>
    </svg>
  );
};
