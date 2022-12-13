import { DSVRowArray, line, ScaleLinear } from 'd3';
import React from 'react';

const Lines = ({
  data,
  xScale,
  yScale,
  innerHeight,
  yValue,
  xValue,
  tooltipFormat,
}: {
  data: DSVRowArray;
  yScale: ScaleLinear<number, number, never>;
  xScale: ScaleLinear<number, number, never>;
  innerHeight: number;
  yValue: (data: any) => number;
  xValue: (d: any) => number;
  tooltipFormat: (d: any) => string;
}) => {
  return (
    <>
      <path
        fill='none'
        stroke='black'
        d={line()
          .x((d) => xScale(xValue(d)))
          .y((d) => yScale(yValue(d)))(data)}
      />
      {data.map((d, index) => (
        <circle
          key={index}
          cx={xScale(xValue(d))}
          cy={yScale(yValue(d))}
          r={10}
        >
          <title>{tooltipFormat(d)}</title>
        </circle>
      ))}
    </>
  );
};

export default Lines;
