import { ScaleBand } from 'd3-scale';
import React from 'react';

const AxisBottom = ({
  xScale,
  innerHeight,
}: {
  xScale: ScaleBand<string>;
  innerHeight: number;
}) => {
  return (
    <>
      {xScale.domain().map((domain, index) => (
        <g key={index} transform={`translate(${xScale(domain)},0)`}>
          <text
            className='vertical-text'
            y={innerHeight}
            dy='1.5em'
            dx={'0.7em'}
          >
            {domain}
          </text>
        </g>
      ))}
    </>
  );
};

export default AxisBottom;
