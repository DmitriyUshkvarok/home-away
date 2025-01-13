import EmptyList from '@/components/home/EmptyList';
import PropertiesList from '@/components/home/PropertiesList';
import { fetchFavorites } from '@/actions/actions';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title:
    'Favorites Page  | Vacation Rentals - Cabins, Tents, and Caravans | HomeAway',
  description:
    'Find the perfect vacation rental: cabins, tents, caravans, and more. Book your next getaway through HomeAway for an unforgettable stay in unique locations both in Ukraine and worldwide.',
  alternates: {
    canonical: '/favorites',
    languages: {
      'en-US': '/en-US',
      'uk-UA': '/uk-UA',
    },
  },
};

const FavoritesPage = async () => {
  const favorites = await fetchFavorites();

  if (favorites.length === 0) {
    return <EmptyList />;
  }
  return <PropertiesList properties={favorites} />;
};

export default FavoritesPage;
