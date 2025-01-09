'use client';
import { SignOutButton } from '@clerk/nextjs';
import { useToast } from '@/hooks/use-toast';
import { useTranslations } from 'next-intl';

const SignOutLink = () => {
  const { toast } = useToast();
  const t = useTranslations('Auth');
  const handleLogout = () => {
    toast({ description: t('logoutSuccess') });
  };
  return (
    <SignOutButton redirectUrl="/">
      <button className="w-full text-left" onClick={handleLogout}>
        {t('logout')}
      </button>
    </SignOutButton>
  );
};

export default SignOutLink;
