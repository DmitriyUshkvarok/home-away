'use client';

import dynamic from 'next/dynamic';
import { Skeleton } from '../ui/skeleton';

const DynamicMap = dynamic(
  () => import('@/components/properties/PropertyMap'),
  {
    ssr: false,
    loading: () => <Skeleton className="h-[400px] w-full" />,
  }
);

const ClientMapWrapper = ({ countryCode }: { countryCode: string }) => {
  return <DynamicMap countryCode={countryCode} />;
};

export default ClientMapWrapper;
