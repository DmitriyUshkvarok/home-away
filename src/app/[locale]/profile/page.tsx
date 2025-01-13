import FormContainer from '@/components/form/FormContainer';
import FormInput from '@/components/form/FormInput';
import { SubmitButton } from '@/components/form/Buttons';
import {
  updateProfileAction,
  fetchProfile,
  updateProfileImageAction,
} from '@/actions/actions';
import ImageInputContainer from '@/components/form/ImageInputContainer';
import { getTranslations } from 'next-intl/server';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title:
    'Profile Page  | Vacation Rentals - Cabins, Tents, and Caravans | HomeAway',
  description:
    'Find the perfect vacation rental: cabins, tents, caravans, and more. Book your next getaway through HomeAway for an unforgettable stay in unique locations both in Ukraine and worldwide.',
  alternates: {
    canonical: '/profile',
    languages: {
      'en-US': '/en-US',
      'uk-UA': '/uk-UA',
    },
  },
};

const ProfilePage = async () => {
  const profile = await fetchProfile();
  const t = await getTranslations('ProfilePage');

  return (
    <section>
      <h1 className="text-2xl font-semibold mb-8 capitalize">{t('title')}</h1>
      <div className="border p-8 rounded-md">
        <ImageInputContainer
          image={profile.profileImage}
          name={profile.username}
          action={updateProfileImageAction}
          text={t('updateProfileImage')}
        />
        <FormContainer action={updateProfileAction}>
          <div className="grid gap-4 md:grid-cols-2 mt-4 ">
            <FormInput
              type="text"
              name="firstName"
              label={t('firstName')}
              defaultValue={profile?.firstName}
            />
            <FormInput
              type="text"
              name="lastName"
              label={t('lastName')}
              defaultValue={profile?.lastName}
            />
            <FormInput
              type="text"
              name="username"
              label={t('username')}
              defaultValue={profile?.username}
            />
          </div>
          <SubmitButton text={t('updateProfile')} className="mt-8" />
        </FormContainer>
      </div>
    </section>
  );
};

export default ProfilePage;
