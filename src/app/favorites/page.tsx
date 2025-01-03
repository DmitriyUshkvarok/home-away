import EmptyList from '@/components/home/EmptyList';
import PropertiesList from '@/components/home/PropertiesList';
import { fetchFavorites } from '@/actions/actions';

const FavoritesPage = async () => {
  const favorites = await fetchFavorites();

  if (favorites.length === 0) {
    return <EmptyList />;
  }
  return <PropertiesList properties={favorites} />;
};

export default FavoritesPage;
