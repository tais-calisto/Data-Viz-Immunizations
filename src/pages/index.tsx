import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { csv, max, min, scaleBand, ScaleLinear, scaleLinear } from 'd3';

export default function Home({ data }: { data: d3.DSVRowArray<string> }) {
  const width = 900;
  const height = 560;

  const margin = { top: 20, right: 20, bottom: 20, left: 20 };

  const innerHeight = height - margin.top - margin.bottom;
  const innerWidth = height - margin.left - margin.right;

  if (!data.length) {
    return;
  } else {
    const yScale = scaleLinear()
      .domain([
        min(data, (d) =>
          d['Coberturas Vacinais'] ? +d['Coberturas Vacinais'] - 1 : 0
        ) as number,
        max(data, (d) =>
          d['Coberturas Vacinais'] ? +d['Coberturas Vacinais'] + 1 : 0
        ) as number,
      ])
      .range([innerHeight, 0]);

    const xScale = scaleBand()
      .domain(data.map((d) => d.Ano as string))
      .range([0, innerWidth]);

    return (
      <>
        <Head>
          <title>Visão Geral</title>
        </Head>

        <h1>Cobertura vacinal no Brasil desde 1994</h1>

        <h2>Cobertura vacinal total por ano</h2>
        <svg width={width} height={height}>
          <g transform={`translate(${margin.left}, ${margin.top})`}>
            {data.map((d, index) =>
              d['Coberturas Vacinais'] && d.Ano ? (
                <rect
                  key={index}
                  x={xScale(d.Ano)}
                  y={yScale(+d['Coberturas Vacinais'])}
                  width={xScale.bandwidth()}
                  height={height - yScale(+d['Coberturas Vacinais'])}
                ></rect>
              ) : (
                ''
              )
            )}
          </g>
        </svg>
      </>
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
