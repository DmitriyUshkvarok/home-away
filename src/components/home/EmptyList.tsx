import { Button } from '../ui/button';
import Link from 'next/link';
import { getTranslations } from 'next-intl/server';
const EmptyList = async ({
  heading,
  message,
  btnText,
}: {
  heading?: string;
  message?: string;
  btnText?: string;
}) => {
  const t = await getTranslations('EmptyList');
  return (
    <div className="mt-4">
      <h2 className="text-xl font-bold ">{heading || t('heading')}</h2>
      <p className="text-lg">{message || t('message')}</p>
      <Button asChild className="mt-4 capitalize" size="lg">
        <Link href="/">{btnText || t('btnText')}</Link>
      </Button>
    </div>
  );
};

export default EmptyList;
