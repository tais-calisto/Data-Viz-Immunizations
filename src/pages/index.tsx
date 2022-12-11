import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { csv, DSVRowArray, max, scaleBand, scaleLinear } from 'd3';
import AxisLeft from '../components/AxisLeft';
import AxisBottom from '../components/AxisBottom';
import Marks from '../components/Marks';
import { ChartContainer } from '../styles/BarChart';

export default function Home({ data }: { data: DSVRowArray<string> }) {
  const width = 1200;
  const height = 560;

  const margin = { top: 40, right: 40, bottom: 80, left: 80 };

  const innerHeight = height - margin.top - margin.bottom;
  const innerWidth = width - margin.left - margin.right;

  if (!data.length) {
    return;
  } else {
    const xValue = (d: any) => d.Ano;
    const yValue = (d: any) => d['Coberturas Vacinais'];

    const yScale = scaleLinear()
      .domain([0, max(data, yValue)])
      .range([innerHeight, 0]);

    const xScale = scaleBand().domain(data.map(xValue)).range([0, innerWidth]);

    return (
      <ChartContainer>
        <Head>
          <title>Visão Geral</title>
        </Head>

        <h1>Cobertura vacinal no Brasil desde 1994</h1>

        <h2>Cobertura vacinal total por ano</h2>

        <svg width={width} height={height}>
          <g transform={`translate(${margin.left}, ${margin.top})`}>
            <AxisLeft yScale={yScale} innerWidth={innerWidth} />
            <AxisBottom xScale={xScale} innerHeight={innerHeight} />
            <text className={'title'} x={margin.right + 15}>
              Cobertura Vacinal
            </text>
            <Marks
              innerHeight={innerHeight}
              xScale={xScale}
              yScale={yScale}
              data={data}
              xValue={xValue}
              yValue={yValue}
            />
          </g>
        </svg>
      </ChartContainer>
    );
  }
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const csvUrl =
    'https://gist.githubusercontent.com/tais-calisto/d7d4e4c074cc7973b98f9941773dfc44/raw/coberturaVacinalBRporAno';

  const row = (d: any) => {
    d['Coberturas Vacinais'] = parseFloat(
      d['Coberturas Vacinais'].replace(',', '.')
    );

    return d;
  };

  const data = await csv(csvUrl, row);

  return {
    props: {
      data,
    },
  };
};
