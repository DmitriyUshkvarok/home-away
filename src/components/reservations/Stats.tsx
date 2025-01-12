import StatsCards from '@/components/admin/StatsCard';
import { fetchReservationStats } from '@/actions/actions';
import { formatCurrency } from '@/utils/format';
import { getTranslations } from 'next-intl/server';

const Stats = async () => {
  const stats = await fetchReservationStats();
  const t = await getTranslations('Stats');
  return (
    <div className="mt-8 grid md:grid-cols-2 gap-4 lg:grid-cols-3">
      <StatsCards title={t('properties')} value={stats.properties} />
      <StatsCards title={t('nights')} value={stats.nights} />
      <StatsCards title={t('total')} value={formatCurrency(stats.amount)} />
    </div>
  );
};

export default Stats;
