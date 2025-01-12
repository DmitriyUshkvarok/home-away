import FormInput from '@/components/form/FormInput';
import FormContainer from '@/components/form/FormContainer';
import { createPropertyAction } from '@/actions/actions';
import { SubmitButton } from '@/components/form/Buttons';
import PriceInput from '@/components/form/PriceInput';
import CategoriesInput from '@/components/form/CategoriesInput';
import TextAreaInput from '@/components/form/TextAreaInput';
import CountriesInput from '@/components/form/CountriesInput';
import ImageInput from '@/components/form/ImageInput';
import CounterInput from '@/components/form/CounterInput';
import AmenitiesInput from '@/components/form/AmenitiesInput';
import { headers } from 'next/headers';
import { getTranslations } from 'next-intl/server';

async function CreateProperty() {
  const t = await getTranslations('CraateAndUpdateRental');
  const headersList = await headers();
  const referer = headersList.get('referer');
  const pathname = referer ? new URL(referer).pathname : '/';

  return (
    <section>
      <h1 className="text-2xl font-semibold mb-8 capitalize">
        {t('createProperty')}
      </h1>
      <div className="border p-8 rounded-md">
        <h3 className="text-lg mb-4 font-medium">{t('generalInfo')}</h3>
        <FormContainer action={createPropertyAction}>
          <div className="grid md:grid-cols-2 gap-8 mb-4">
            <input name="pathname" type="hidden" value={pathname} />
            <FormInput
              name="name"
              type="text"
              label={t('nameLabel')}
              defaultValue={t('nameDefaultValue')}
            />
            <FormInput
              name="tagline"
              type="text "
              label={t('taglineLabel')}
              defaultValue={t('taglineDefaultValue')}
            />
            {/* price */}
            <PriceInput />
            {/* categories */}
            <CategoriesInput />
          </div>
          {/* text area / description */}
          <TextAreaInput name="description" labelText={t('descriptionLabel')} />
          <div className="grid sm:grid-cols-2 gap-8 mt-4">
            <CountriesInput />
            <ImageInput />
          </div>
          <h3 className="text-lg mt-8 mb-4 font-medium">
            {t('accommodationDetails')}
          </h3>
          <CounterInput detail="guests" />
          <CounterInput detail="bedrooms" />
          <CounterInput detail="beds" />
          <CounterInput detail="baths" />
          <h3 className="text-lg mt-10 mb-6 font-medium">{t('amenities')}</h3>
          <AmenitiesInput />
          <SubmitButton text={t('createRentalButton')} className="mt-12" />
        </FormContainer>
      </div>
    </section>
  );
}
export default CreateProperty;
