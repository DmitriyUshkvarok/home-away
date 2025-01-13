import { SubmitButton } from '@/components/form/Buttons';
import FormContainer from '@/components/form/FormContainer';
import FormInput from '@/components/form/FormInput';
import { createProfileAction } from '@/actions/actions';
import { currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title:
    'Create Profile Page  | Vacation Rentals - Cabins, Tents, and Caravans | HomeAway',
  description:
    'Find the perfect vacation rental: cabins, tents, caravans, and more. Book your next getaway through HomeAway for an unforgettable stay in unique locations both in Ukraine and worldwide.',
  alternates: {
    canonical: '/profile/create',
    languages: {
      'en-US': '/en-US',
      'uk-UA': '/uk-UA',
    },
  },
};

async function CreateProfilePage() {
  const user = await currentUser();
  const t = await getTranslations('CreateProfilePage');

  if (user?.privateMetadata?.hasProfile) redirect('/');
  return (
    <section>
      <h1 className="text-2xl font-semibold mb-8 capitalize">{t('heading')}</h1>
      <div className="border p-8 rounded-md ">
        <FormContainer action={createProfileAction}>
          <div className="grid md:grid-cols-2 gap-4 mt-4">
            <FormInput
              type="text"
              name="firstName"
              label={t('form.firstName')}
            />
            <FormInput type="text" name="lastName" label={t('form.lastName')} />
            <FormInput type="text" name="username" label={t('form.username')} />
          </div>
          <SubmitButton text={t('form.submitButton')} className="mt-8" />
        </FormContainer>
      </div>
    </section>
  );
}
export default CreateProfilePage;
