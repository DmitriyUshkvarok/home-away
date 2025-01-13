import {
  fetchRentalDetails,
  updatePropertyImageAction,
  updatePropertyAction,
} from '@/actions/actions';
import FormContainer from '@/components/form/FormContainer';
import FormInput from '@/components/form/FormInput';
import CategoriesInput from '@/components/form/CategoriesInput';
import PriceInput from '@/components/form/PriceInput';
import TextAreaInput from '@/components/form/TextAreaInput';
import CountriesInput from '@/components/form/CountriesInput';
import CounterInput from '@/components/form/CounterInput';
import AmenitiesInput from '@/components/form/AmenitiesInput';
import { SubmitButton } from '@/components/form/Buttons';
import { redirect } from 'next/navigation';
import { type Amenity } from '@/utils/amenities';
import ImageInputContainer from '@/components/form/ImageInputContainer';
import { getTranslations } from 'next-intl/server';
import type { Metadata, ResolvingMetadata } from 'next';

export async function generateMetadata(
  {
    params,
  }: {
    params: Promise<{ id: string }>;
  },
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { id } = await params;

  const property = await fetchRentalDetails(id);

  if (!property) {
    return {
      title: 'Rental not found',
      description: 'This Rental is not available.',
    };
  }

  const previousImages = (await parent).openGraph?.images || [];

  return {
    title: property.name,
    openGraph: {
      title: `${property.name} Home Away | Your Ultimate Vacation Rental App`,
      images: [property.image, ...previousImages],
    },
    alternates: {
      canonical: `/rentals${id}/edit`,
      languages: {
        'en-US': `/en/rentals${id}/edit`,
        'uk-UA': `/ua/rentals${id}/edit`,
      },
    },
  };
}

const EditRentalPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const t = await getTranslations('CraateAndUpdateRental');
  const { id } = await params;
  const property = await fetchRentalDetails(id);
  if (!property) redirect('/');
  const defaultAmenities: Amenity[] = JSON.parse(property.amenities);
  return (
    <section>
      <h1 className="text-2xl font-semibold mb-8 capitalize">
        {t('editPropery')}
      </h1>
      <div className="border p-8 rounded-md ">
        <ImageInputContainer
          name={property.name}
          text={t('updateImage')}
          action={updatePropertyImageAction}
          image={property.image}
        >
          <input type="hidden" name="id" value={property.id} />
        </ImageInputContainer>

        <FormContainer action={updatePropertyAction}>
          <input type="hidden" name="id" value={property.id} />
          <div className="grid md:grid-cols-2 gap-8 mb-4 mt-8">
            <FormInput
              name="name"
              type="text"
              label={t('nameLabel')}
              defaultValue={property.name}
            />
            <FormInput
              name="tagline"
              type="text "
              label={t('taglineLabel')}
              defaultValue={property.tagline}
            />
            <PriceInput defaultValue={property.price} />
            <CategoriesInput defaultValue={property.category} />
            <CountriesInput defaultValue={property.country} />
          </div>

          <TextAreaInput
            name="description"
            labelText={t('descriptionLabel')}
            defaultValue={property.description}
          />

          <h3 className="text-lg mt-8 mb-4 font-medium">
            {t('accommodationDetails')}
          </h3>
          <CounterInput
            detail="guests"
            defaultValue={property.guests}
            nameTitle={t('guestsLabel')}
          />
          <CounterInput
            detail="bedrooms"
            defaultValue={property.bedrooms}
            nameTitle={t('bedroomsLabel')}
          />
          <CounterInput
            detail="beds"
            defaultValue={property.beds}
            nameTitle={t('bedsLabel')}
          />
          <CounterInput
            detail="baths"
            defaultValue={property.baths}
            nameTitle={t('bathsLabel')}
          />
          <h3 className="text-lg mt-10 mb-6 font-medium">Amenities</h3>
          <AmenitiesInput defaultValue={defaultAmenities} />
          <SubmitButton text={t('editPropertyButton')} className="mt-12" />
        </FormContainer>
      </div>
    </section>
  );
};

export default EditRentalPage;
