import LoadingCards from '@/components/card/LoadingCards';
import CategoriesList from '@/components/home/CategoriesList';
import PropertiesContainer from '@/components/home/PropertiesContainer';
import { Suspense } from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title:
    'Home Page | Vacation Rentals - Cabins, Tents, and Caravans | HomeAway',
  description:
    'Find the perfect vacation rental: cabins, tents, caravans, and more. Book your next getaway through HomeAway for an unforgettable stay in unique locations both in Ukraine and worldwide.',
  alternates: {
    canonical: '/',
    languages: {
      'en-US': '/en-US',
      'uk-UA': '/uk-UA',
    },
  },
};

async function HomePage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; search?: string }>;
}) {
  const { category, search } = await searchParams;

  return (
    <section>
      <CategoriesList category={category} search={search} />
      <Suspense fallback={<LoadingCards />}>
        <PropertiesContainer category={category} search={search} />
      </Suspense>
    </section>
  );
}
export default HomePage;
