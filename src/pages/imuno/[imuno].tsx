import { csv, DSVRowArray, DSVRowString, max, min, scaleLinear } from 'd3';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import AxisBottomLinear from '../../components/AxisBttomLinear';
import AxisLeft from '../../components/AxisLeft';
import Lines from '../../components/Lines';
import { ChartContainer } from '../../styles/BarChart';

const ImunoByYear = ({
  data,
  lineData,
}: {
  data: DSVRowArray<string>;
  lineData: [number, number][];
}) => {
  console.log(lineData);

  const width = 1200;
  const height = 560;

  const margin = { top: 40, right: 40, bottom: 80, left: 80 };

  const innerHeight = height - margin.top - margin.bottom;
  const innerWidth = width - margin.left - margin.right;

  const xValue = (d: any) => d.Ano;
  const yValue = (d: any) => d.Imuno;

  const yScale = scaleLinear()
    .domain([min(data, yValue), max(data, yValue)])
    .range([innerHeight, 0])
    .nice();

  const xScale = scaleLinear()
    .domain([min(data, xValue), max(data, xValue)])
    .range([0, innerWidth]);

  const tooltipFormat = (d: DSVRowString) =>
    `Cobertura vacinal \n em ${xValue(d)}: ${yValue(d)}%`;

  const ticks = data.length;

  return (
    <ChartContainer>
      <Head>
        <title>Visão Geral</title>
      </Head>

      <h1>Cobertura vacinal no Brasil desde 1994</h1>

      <h2>Cobertura vacinal total por ano</h2>

      <svg width={width} height={height}>
        <g transform={`translate(${margin.left}, ${margin.top})`}>
          <AxisBottomLinear
            xScale={xScale}
            innerHeight={innerHeight}
            ticks={ticks - 1}
          />
          <AxisLeft yScale={yScale} innerWidth={innerWidth} />
          <Lines
            data={data}
            lineData={lineData}
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
    'https://gist.githubusercontent.com/tais-calisto/2781804b3ff9aa742f984bc7a773ed40/raw/coberturaVacinalImunoAno';

  const { imuno } = context.query;

  let value: string;

  if (imuno) {
    value = imuno.toString();
  }

  const row = (d: any) => {
    d.Imuno = +d[value];
    d.Ano = +d.Ano;
    return d;
  };

  const data = await csv(csvUrl, row);

  const lineData: { Ano: number; Imuno: number }[] = [];
  data.map((d) => {
    if (d.Ano && d.Imuno) lineData.push({ Ano: +d.Ano, Imuno: +d.Imuno });
  });

  return { props: { data, lineData } };
};
