'use client';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import Title from './Title';
import { useTranslations } from 'next-intl';
const Description = ({ description }: { description: string }) => {
  const [isFullDescriptionShown, setIsFullDescriptionShown] = useState(false);
  const t = useTranslations('DescriptionDynamicProperty');
  const words = description.split(' ');
  const isLongDescription = words.length > 100;

  const toggleDescription = () => {
    setIsFullDescriptionShown(!isFullDescriptionShown);
  };

  const displayedDescription =
    isLongDescription && !isFullDescriptionShown
      ? words.slice(0, 100).join(' ') + '...'
      : description;
  return (
    <article className="mt-4">
      <Title text={t('title')} />
      <p className="text-muted-foreground font-light leading-loose">
        {displayedDescription}
      </p>
      {isLongDescription && (
        <Button variant="link" className="pl-0" onClick={toggleDescription}>
          {isFullDescriptionShown ? t('showLess') : t('showMore')}
        </Button>
      )}
    </article>
  );
};

export default Description;
