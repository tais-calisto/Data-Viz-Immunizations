import { ScaleLinear } from 'd3-scale';
import React from 'react';

const AxisBottomLinear = ({
  xScale,
  innerHeight,
  ticks,
}: {
  xScale: ScaleLinear<number, number, never>;
  innerHeight: number;
  ticks: number;
}) => {
  return (
    <>
      {xScale.ticks(ticks).map((tickValue, index) => {
        return (
          <g key={index} transform={`translate(${xScale(tickValue)},0)`}>
            <text className='vertical-text' y={innerHeight} dy='2em'>
              {tickValue}
            </text>
          </g>
        );
      })}
      ;
    </>
  );
};

export default AxisBottomLinear;
