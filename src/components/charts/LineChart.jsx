import { formatter } from '../../utils';
import { format as dateFormatter } from 'date-fns';
import { ResponsiveContainer, AreaChart, Area, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';

function LineChart({ data, dataKey, name, compareDate, size = 'large' }) {
  const isLarge = size == 'large';

  // calculations
  const currentValue = data[data.length - 1][dataKey];
  const priorValue = data[data.length - compareDate.value][dataKey];
  const differenceRaw = currentValue - priorValue;
  const differencePercent = differenceRaw / priorValue;

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const { name, value } = payload[0];
      return (
        <div className='bg-white dark:bg-gray-900 p-2 shadow-sm border-t-2 border-t-[var(--main-chart)]'>
          <p className='uppercase text-xs font-semibold tracking-tight text-slate-400'>{name}</p>
          <p className='dark:text-slate-300'>{`${dateFormatter(label, 'MMM yy')} : ${formatter(value)}`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div>
      <h4 className='text-slate-400 font-semibold uppercase text-sm'>{name}</h4>
      <div className={`flex gap-2 items-baseline ${isLarge ? 'mb-10' : 'mb-3'}`}>
        <p className={`font-semibold ${isLarge ? 'text-3xl' : 'text-lg'}`}>{formatter(currentValue, 'currency')}</p>
        <p
          className={`${isLarge ? 'text-base' : 'text-sm'} ${
            differenceRaw > 0 ? 'text-green-700' : 'text-red-700'
          } italic`}
        >
          {differenceRaw < 0 ? '↓' : '↑'} {formatter(differenceRaw, 'currency')} (
          {formatter(differencePercent, 'percent', 1)}) <span className='text-slate-400'>{compareDate.name}</span>
        </p>
      </div>
      <ResponsiveContainer width={'100%'} height={isLarge ? 450 : 185}>
        <AreaChart data={data} margin={{ top: 10, right: 20, bottom: 5, left: 5 }}>
          <defs>
            <linearGradient id='grad' x1='0' y1='0' x2='0' y2='1'>
              <stop offset='5%' stopColor='var(--main-chart)' stopOpacity={0.6} />
              <stop offset='95%' stopColor='var(--main-chart)' stopOpacity={0.1} />
            </linearGradient>
          </defs>
          <CartesianGrid stroke='#000' strokeOpacity={0.1} vertical={false} />
          <XAxis
            dataKey='date'
            tickMargin={12}
            tickFormatter={value => dateFormatter(value, 'MMM yy')}
            minTickGap={30}
          />
          <YAxis
            tickFormatter={value => `${formatter(value / 1000)}k`}
            domain={['dataMin', 'auto']}
            axisLine={false}
            tickLine={false}
            tickMargin={10}
          />
          <Area
            type={'monotone'}
            dataKey={dataKey}
            stroke='var(--main-chart)'
            strokeWidth={2}
            fill='url(#grad)'
            fillOpacity={0.8}
          />
          <Tooltip content={<CustomTooltip />} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

export default LineChart;
