import { fetchProperties } from '@/actions/actions';
import PropertiesList from './PropertiesList';
import EmptyList from './EmptyList';
import type { PropertyCardProps } from '@/utils/types';
import { getTranslations } from 'next-intl/server';

const PropertiesContainer = async ({
  category,
  search,
}: {
  category?: string;
  search?: string;
}) => {
  const properties: PropertyCardProps[] = await fetchProperties({
    category,
    search,
  });
  const t = await getTranslations('Properties');

  if (properties.length === 0) {
    return (
      <EmptyList
        heading={t('noResultsHeading')}
        message={t('noResultsMessage')}
        btnText={t('clearFiltersButton')}
      />
    );
  }
  return <PropertiesList properties={properties} />;
};

export default PropertiesContainer;
