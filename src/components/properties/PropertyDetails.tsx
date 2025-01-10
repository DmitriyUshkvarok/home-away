import { formatQuantity } from '@/utils/format';
import { useTranslations } from 'next-intl';

type PropertyDetailsProps = {
  details: {
    bedrooms: number;
    baths: number;
    guests: number;
    beds: number;
  };
};

const PropertyDetails = ({
  details: { bedrooms, baths, guests, beds },
}: PropertyDetailsProps) => {
  const t = useTranslations('PropertyDetails');
  return (
    <p className="text-md font-light ">
      <span>
        {formatQuantity(bedrooms, {
          one: t('bedroom.one'),
          other: t('bedroom.other'),
        })}
        &middot;
      </span>
      <span>
        {formatQuantity(baths, { one: t('bath.one'), other: t('bath.other') })}
        &middot;
      </span>
      <span>
        {formatQuantity(guests, {
          one: t('guest.one'),
          other: t('guest.other'),
        })}
        &middot;
      </span>
      <span>
        {formatQuantity(beds, { one: t('bed.one'), other: t('bed.other') })}
      </span>
    </p>
  );
};

export default PropertyDetails;
