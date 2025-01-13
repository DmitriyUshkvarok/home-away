import EmptyList from '@/components/home/EmptyList';
import {
  deleteReviewAction,
  fetchPropertyReviewsByUser,
} from '@/actions/actions';
import ReviewCard from '@/components/reviews/ReviewCard';
import Title from '@/components/properties/Title';
import FormContainer from '@/components/form/FormContainer';
import { IconButton } from '@/components/form/Buttons';
import { getTranslations } from 'next-intl/server';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title:
    'Reviews Page  | Vacation Rentals - Cabins, Tents, and Caravans | HomeAway',
  description:
    'Find the perfect vacation rental: cabins, tents, caravans, and more. Book your next getaway through HomeAway for an unforgettable stay in unique locations both in Ukraine and worldwide.',
  alternates: {
    canonical: '/reviews',
    languages: {
      'en-US': '/en-US',
      'uk-UA': '/uk-UA',
    },
  },
};

const ReviewsPage = async () => {
  const reviews = await fetchPropertyReviewsByUser();
  const t = await getTranslations('ReviewsTitle');
  if (reviews.length === 0) return <EmptyList />;
  return (
    <>
      <Title text={t('yourReviews')} />
      <section className="grid md:grid-cols-2 gap-8 mt-4 ">
        {reviews.map((review) => {
          const { comment, rating } = review;
          const { name, image } = review.property;
          const reviewInfo = {
            comment,
            rating,
            name,
            image,
          };
          return (
            <ReviewCard key={review.id} reviewInfo={reviewInfo}>
              <DeleteReview reviewId={review.id} />
            </ReviewCard>
          );
        })}
      </section>
    </>
  );
};

const DeleteReview = ({ reviewId }: { reviewId: string }) => {
  const deleteReview = deleteReviewAction.bind(null, { reviewId });
  return (
    <FormContainer action={deleteReview}>
      <IconButton actionType="delete" />
    </FormContainer>
  );
};

export default ReviewsPage;
