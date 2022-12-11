import { ScaleLinear } from 'd3-scale';
import React from 'react';

const AxisLeft = ({
  yScale,
  innerWidth,
}: {
  yScale: ScaleLinear<number, number, never>;
  innerWidth: number;
}) => {
  return (
    <>
      {yScale.ticks().map((tickValue, index) => {
        return (
          <g key={index} transform={`translate(0, ${yScale(tickValue)})`}>
            <line x2={innerWidth} stroke='black' />
            <text style={{ textAnchor: 'end' }} x={'-0.2em'}>
              {tickValue}%
            </text>
          </g>
        );
      })}
      ;
    </>
  );
};

export default AxisLeft;
