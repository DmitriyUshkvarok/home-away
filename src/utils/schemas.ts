import { getTranslations } from 'next-intl/server';
import * as z from 'zod';
import { ZodSchema } from 'zod';

export const profileSchema = async () => {
  const t = await getTranslations('ProfileValidation');
  return z.object({
    firstName: z.string().min(2, {
      message: t('firstNameMin'),
    }),
    lastName: z.string().min(2, {
      message: t('lastNameMin'),
    }),
    username: z.string().min(2, {
      message: t('usernameMin'),
    }),
  });
};

export async function validateWithZodSchema<T>(
  schemaPromise: Promise<ZodSchema<T>>,
  data: unknown
): Promise<T> {
  const schema = await schemaPromise;
  const result = schema.safeParse(data);

  if (!result.success) {
    const errors = result.error.errors.map((error) => error.message);
    throw new Error(errors.join(','));
  }
  return result.data;
}

export const imageSchema = (t: (key: string) => string) => {
  const maxUploadSize = 1024 * 1024; // 1 MB
  const acceptedFileTypes = ['image/'];

  return z.object({
    image: z
      .instanceof(File)
      .refine(
        (file) => !file || file.size <= maxUploadSize,
        t('sizeLimitExceeded')
      )
      .refine(
        (file) =>
          !file || acceptedFileTypes.some((type) => file.type.startsWith(type)),
        t('invalidFileType')
      ),
  });
};

export const propertySchema = async () => {
  const t = await getTranslations('PropertyValidation');
  return z.object({
    name: z
      .string()
      .min(2, {
        message: t('nameMin'),
      })
      .max(100, {
        message: t('nameMax'),
      }),
    tagline: z
      .string()
      .min(2, {
        message: t('taglineMin'),
      })
      .max(100, {
        message: t('taglineMax'),
      }),
    price: z.coerce
      .number()
      .int()
      .min(0, {
        message: t('priceMin'),
      }),
    category: z.string(),
    description: z.string().refine(
      (description) => {
        const wordCount = description.split(' ').length;
        return wordCount >= 10 && wordCount <= 1000;
      },
      {
        message: t('descriptionWords'),
      }
    ),
    country: z.string(),
    guests: z.coerce
      .number()
      .int()
      .min(0, {
        message: t('guestsMin'),
      }),
    bedrooms: z.coerce
      .number()
      .int()
      .min(0, {
        message: t('bedroomsMin'),
      }),
    beds: z.coerce
      .number()
      .int()
      .min(0, {
        message: t('bedsMin'),
      }),
    baths: z.coerce
      .number()
      .int()
      .min(0, {
        message: t('bathsMin'),
      }),
    amenities: z.string(),
  });
};

export const createReviewSchema = async () => {
  const t = await getTranslations('ReviewValidation');
  return z.object({
    propertyId: z.string().nonempty({
      message: t('propertyIdRequired'),
    }),
    rating: z.coerce
      .number()
      .int()
      .min(1, {
        message: t('ratingRange'),
      })
      .max(5, {
        message: t('ratingRange'),
      }),
    comment: z
      .string()
      .min(10, {
        message: t('commentMin'),
      })
      .max(1000, {
        message: t('commentMax'),
      }),
  });
};
