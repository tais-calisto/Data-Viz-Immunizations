import styled from 'styled-components';
import '@fontsource/poppins';

export const ChartContainer = styled.div`
  font-family: 'Poppins', sans-serif;
  svg {
    rect {
      fill: #8e6c8a;
    }
    line {
      stroke-width: 1px;
      stroke: #c0c0bb;
    }
    text {
      fill: #635f5d;
      text-anchor: middle;
    }
    .title {
      font-weight: 700;
      font-size: 1.2rem;
    }
    .vertical-text {
      writing-mode: vertical-lr;
    }
  }
`;