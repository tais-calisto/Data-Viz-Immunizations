import { DSVRowArray, line, ScaleLinear } from 'd3';
import React from 'react';

const Lines = ({
  data,
  xScale,
  yScale,
  yValue,
  xValue,
  tooltipFormat,
  lineData,
}: {
  data: DSVRowArray;
  yScale: ScaleLinear<number, number, never>;
  xScale: ScaleLinear<number, number, never>;
  innerHeight: number;
  yValue: (data: any) => number;
  xValue: (d: any) => number;
  tooltipFormat: (d: any) => string;
  lineData: [number, number][];
}) => {
  const pathLine: any = lineData
    ? line()
        .x((d) => xScale(xValue(d)))
        .y((d) => yScale(yValue(d)))
    : '';

  return (
    <>
      <path d={pathLine(lineData)} />
      {data.map((d, index) => (
        <circle key={index} cx={xScale(xValue(d))} cy={yScale(yValue(d))} r={2}>
          <title>{tooltipFormat(d)}</title>
        </circle>
      ))}
    </>
  );
};

export default Lines;
