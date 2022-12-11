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
            y={innerHeight}
            style={{ textAnchor: 'middle' }}
            dy='1em'
            dx={'1em'}
          >
            {domain}
          </text>
        </g>
      ))}
    </>
  );
};

export default AxisBottom;
