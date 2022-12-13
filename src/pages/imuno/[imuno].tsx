import {
  csv,
  DSVRowArray,
  DSVRowString,
  max,
  scaleBand,
  scaleLinear,
} from 'd3';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import AxisBottom from '../../components/AxisBottom';
import AxisLeft from '../../components/AxisLeft';
import Marks from '../../components/Marks';
import { ChartContainer } from '../../styles/BarChart';

const ImunoByYear = ({ data }: { data: DSVRowArray<string> }) => {
  const width = 1200;
  const height = 560;

  const margin = { top: 40, right: 40, bottom: 80, left: 80 };

  const innerHeight = height - margin.top - margin.bottom;
  const innerWidth = width - margin.left - margin.right;

  const xValue = (d: any) => d.Ano;
  const yValue = (d: any) => d.Imuno;

  const yScale = scaleLinear()
    .domain([0, max(data, yValue)])
    .range([innerHeight, 0]);

  const xScale = scaleBand().domain(data.map(xValue)).range([0, innerWidth]);

  const tooltipFormat = (d: DSVRowString) =>
    `Cobertura vacinal \n em ${xValue(d)}: ${yValue(d)}%`;

  return (
    <ChartContainer>
      <Head>
        <title>Visão Geral</title>
      </Head>

      <h1>Cobertura vacinal no Brasil desde 1994</h1>

      <h2>Cobertura vacinal total por ano</h2>

      <svg width={width} height={height}>
        <g transform={`translate(${margin.left}, ${margin.top})`}>
          <AxisBottom xScale={xScale} innerHeight={innerHeight} />
          <AxisLeft yScale={yScale} innerWidth={innerWidth} />
          <Marks
            data={data}
            innerHeight={innerHeight}
            tooltipFormat={tooltipFormat}
            xScale={xScale}
            xValue={xValue}
            yScale={yScale}
            yValue={yValue}
          />
        </g>
      </svg>
    </ChartContainer>
  );
};

export default ImunoByYear;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const csvUrl =
    'https://gist.githubusercontent.com/tais-calisto/dc747a4c7b5288313103f11a02dee527/raw/coberturaVacinalImunoAno';

  const { imuno } = context.query;

  let value: string;

  if (imuno) {
    value = imuno.toString();
  }

  const row = (d: any) => {
    d.Imuno = d[value];
    return d;
  };

  const data = await csv(csvUrl, row);

  return { props: { data } };
};
