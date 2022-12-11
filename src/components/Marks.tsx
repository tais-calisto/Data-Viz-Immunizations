import { DSVRowArray, ScaleBand, ScaleLinear } from 'd3';
import React from 'react';

const Marks = ({
  data,
  xScale,
  yScale,
  innerHeight,
  yValue,
  xValue,
}: {
  data: DSVRowArray<string>;
  yScale: ScaleLinear<number, number, never>;
  xScale: ScaleBand<string>;
  innerHeight: number;
  yValue: (data: any) => number;
  xValue: (d: any) => string;
}) => {
  return (
    <>
      {data.map((d, index) =>
        d['Coberturas Vacinais'] && d.Ano ? (
          <rect
            key={index}
            x={xScale(xValue(d))}
            y={yScale(yValue(d))}
            width={xScale.bandwidth() / 1.3}
            height={innerHeight - yScale(+d['Coberturas Vacinais'])}
          >
            <title>
              Cobertura vacinal no ano {xValue(d)}: {yValue(d)}%
            </title>
          </rect>
        ) : (
          ''
        )
      )}
    </>
  );
};

export default Marks;
