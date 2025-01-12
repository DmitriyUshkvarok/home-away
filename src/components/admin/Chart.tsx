'use client';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { useTranslations } from 'next-intl';

type ChartPropsType = {
  data: {
    date: string;
    count: number;
  }[];
};

const Chart = ({ data }: ChartPropsType) => {
  const t = useTranslations('Chart');
  return (
    <section className="mt-24">
      <h1 className="text-4xl font-semibold text-center">{t('title')}</h1>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} margin={{ top: 50, bottom: 50 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="date"
            label={{ value: t('xAxis'), position: 'insideBottom', offset: -3 }}
          />
          <YAxis
            allowDecimals={false}
            label={{ value: t('yAxis'), angle: -90, position: 'insideLeft' }}
          />
          <Tooltip />
          <Bar dataKey="count" fill="#F97215" barSize={75} />
        </BarChart>
      </ResponsiveContainer>
    </section>
  );
};

export default Chart;
