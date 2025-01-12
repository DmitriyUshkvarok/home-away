'use client';
import { SignInButton, useAuth } from '@clerk/nextjs';
import { Button } from '@/components/ui/button';
import { useProperty } from '@/utils/store';
import FormContainer from '@/components/form/FormContainer';
import { SubmitButton } from '@/components/form/Buttons';
import { createBookingAction } from '@/actions/actions';
import { useTranslations } from 'next-intl';
import { usePathname } from 'next/navigation';

const ConfirmBooking = () => {
  const { userId } = useAuth();
  const { propertyId, range } = useProperty((state) => state);
  const checkIn = range?.from as Date;
  const checkOut = range?.to as Date;
  const t = useTranslations('ConfirmBooking');
  const pathname = usePathname();
  const createBooking = createBookingAction.bind(null, {
    propertyId,
    checkIn,
    checkOut,
    pathname,
  });
  return (
    <>
      {!userId ? (
        <SignInButton mode="modal">
          <Button type="button" className="w-full">
            {t('signInToBook')}
          </Button>
        </SignInButton>
      ) : (
        <section>
          <FormContainer action={createBooking}>
            <SubmitButton text={t('reserve')} className="w-full" />
          </FormContainer>
        </section>
      )}
    </>
  );
};

export default ConfirmBooking;
