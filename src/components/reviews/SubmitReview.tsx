'use client';
import { useState } from 'react';
import { SubmitButton } from '@/components/form/Buttons';
import FormContainer from '@/components/form/FormContainer';
import { Card } from '@/components/ui/card';
import RatingInput from '@/components/form/RatingInput';
import TextAreaInput from '@/components/form/TextAreaInput';
import { Button } from '@/components/ui/button';
import { createReviewAction } from '@/actions/actions';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';

const SubmitReview = ({ propertyId }: { propertyId: string }) => {
  const [isReviewFormVisible, setIsReviewFormVisible] = useState(false);
  const t = useTranslations('SubmitReview');
  const pathname = usePathname();
  return (
    <div className="mt-8">
      <Button onClick={() => setIsReviewFormVisible((prev) => !prev)}>
        {t('leaveReview')}
      </Button>
      {isReviewFormVisible && (
        <Card className="p-8 mt-8">
          <FormContainer action={createReviewAction}>
            <input type="hidden" name="propertyId" value={propertyId} />
            <input type="hidden" name="pathname" value={pathname} />
            <RatingInput name="rating" />
            <TextAreaInput
              name="comment"
              labelText={t('commentLabel')}
              defaultValue={t('defaultComment')}
            />
            <SubmitButton text={t('submitButton')} className="mt-4" />
          </FormContainer>
        </Card>
      )}
    </div>
  );
};

export default SubmitReview;
