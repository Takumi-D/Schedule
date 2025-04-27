import React from 'react';
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  AreaChart,
  Area,
  ResponsiveContainer,
  Customized,
} from 'recharts';

import data from '../../api';
import { LinePoint } from '../../type';

const segments = data.length - 1;
const ElArrRects: Array<React.JSX.Element> = [];

function createUniqueID() {
  return 'id_' + Math.random().toString(36).substr(2, 9);
}

const CustomizedRectangle = (props: any): React.JSX.Element => {
  const { formattedGraphicalItems: fullLine } = props;
  const firstLine = fullLine[0];
  const secondLine = fullLine[1];

  return firstLine?.props?.points.map(
    (firstLinePoint: LinePoint, index: number) => {
      const secondLinePoint: LinePoint = secondLine?.props?.points[index + 1];

      const ZScorePointFirst = (
        firstLinePoint.payload.pv / firstLinePoint.payload.uv
      ).toFixed(2);

      const ZScorePointSecond = (
        secondLinePoint?.payload.pv / firstLinePoint?.payload.uv
      ).toFixed(2);

      const xFrac = index / segments;
      const wFrac = (index - index + 1) / segments;

      const ElRect: React.JSX.Element = (
        <rect key={createUniqueID()} x={xFrac} y={0} width={wFrac} height={1} />
      );
      if (+ZScorePointFirst > 1 && +ZScorePointSecond > 1) {
        ElArrRects.push(ElRect);
      }

      return (
        <clipPath
          key={createUniqueID()}
          id='clip-area-c-d'
          clipPathUnits='objectBoundingBox'
        >
          {ElArrRects}
        </clipPath>
      );
    },
  );
};

const CustomTooltip = ({ active, payload }: any): React.JSX.Element => {
  if (active && payload && payload.length) {
    return (
      <div className='custom-tooltip'>
        <p className='label'>{`${payload[0].name} : ${payload[0].value}`}</p>
        <p className='label'>{`${payload[1].name} : ${payload[1].value}`}</p>
      </div>
    );
  }

  return null;
};

const Schedule = () => {
  return (
    <ResponsiveContainer width='100%' height={250}>
      <AreaChart
        data={data}
        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
      >
        <defs>
          <linearGradient id='colorUv' x1='0' y1='0' x2='0' y2='1'>
            <stop offset='5%' stopColor='#8884d8' stopOpacity={0.8} />
            <stop offset='95%' stopColor='#8884d8' stopOpacity={0} />
          </linearGradient>
          <linearGradient id='colorPv' x1='0' y1='0' x2='0' y2='1'>
            <stop offset='5%' stopColor='#82ca9d' stopOpacity={0.8} />
            <stop offset='95%' stopColor='#82ca9d' stopOpacity={0} />
          </linearGradient>
        </defs>

        <XAxis dataKey='name' />
        <YAxis />
        <CartesianGrid strokeDasharray='3 3' />
        <Tooltip content={CustomTooltip} />

        <Area
          type='monotone'
          dataKey='uv'
          stroke='#8884d8'
          fill='url(#colorUv)'
        />
        <Area
          type='monotone'
          dataKey='pv'
          stroke='#82ca9d'
          fill='url(#colorPv)'
        />

        <Area
          type='monotone'
          dataKey='uv'
          stroke='#8884d8'
          fill='none'
          clipPath='url(#clip-area-c-d)'
        />
        <Area
          type='monotone'
          dataKey='pv'
          stroke='rgba(255,0,0,0.3)'
          fill='rgba(255,0,0,0.3)'
          clipPath='url(#clip-area-c-d)'
        />
        <Customized component={CustomizedRectangle} />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default Schedule;
