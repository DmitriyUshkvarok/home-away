'use server';
import { profileSchema, validateWithZodSchema } from '@/utils/schemas';

const renderError = (error: unknown): { message: string } => {
  console.log(error);
  return {
    message: error instanceof Error ? error.message : 'An error occurred',
  };
};
export const createProfileAction = async (
  prevState: unknown,
  formData: FormData
) => {
  try {
    const rawData = Object.fromEntries(formData);
    const validateFields = profileSchema.parse(rawData);
    console.log(validateFields);
    return { message: 'Profile Created' };
  } catch (error) {
    return renderError(error);
  }
};
