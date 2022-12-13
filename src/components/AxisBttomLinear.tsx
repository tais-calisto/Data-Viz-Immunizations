import { ScaleLinear } from 'd3-scale';
import React from 'react';

const AxisBottomLinear = ({
  xScale,
  innerHeight,
}: {
  xScale: ScaleLinear<number, number, never>;
  innerHeight: number;
}) => {
  console.log(xScale.ticks());

  return (
    <>
      {xScale.ticks().map((tickValue, index) => {
        return (
          <g key={index} transform={`translate(${xScale(tickValue)},0)`}>
            <text
              className='vertical-text'
              y={innerHeight}
              dy='1.5em'
              dx={'1em'}
            >
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
