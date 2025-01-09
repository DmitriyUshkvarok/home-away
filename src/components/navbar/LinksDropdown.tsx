import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { LuAlignLeft } from 'react-icons/lu';
import Link from 'next/link';
import { Button } from '../ui/button';
import UserIcon from './UserIcon';
import SignOutLink from './SignOutLink';
import { SignedIn, SignedOut, SignInButton, SignUpButton } from '@clerk/nextjs';
import { auth } from '@clerk/nextjs/server';
import { getTranslations } from 'next-intl/server';
import { NavLink } from '@/utils/links';

const LinksDropdown = async () => {
  const { userId } = await auth();
  const t = await getTranslations('NavLinks');
  const authTranslations = await getTranslations('Auth');

  const links: NavLink[] = [
    { href: '/', label: t('home') },
    { href: '/favorites', label: t('favorites') },
    { href: '/bookings', label: t('bookings') },
    { href: '/reviews', label: t('reviews') },
    { href: '/reservations', label: t('reservations') },
    { href: '/rentals/create', label: t('createRental') },
    { href: '/rentals', label: t('myRentals') },
    { href: '/admin', label: t('admin') },
    { href: '/profile', label: t('profile') },
  ];

  const isAdminUser = userId === process.env.ADMIN_USER_ID;
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="flex gap-4 h-auto max-w-[100px]">
          <LuAlignLeft className="w-6 h-6" />
          <UserIcon />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-52" align="start" sideOffset={10}>
        <SignedOut>
          <DropdownMenuItem>
            <SignInButton mode="modal">
              <button className="w-full text-left">
                {authTranslations('login')}
              </button>
            </SignInButton>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <SignUpButton mode="modal">
              <button className="w-full text-left">
                {authTranslations('register')}
              </button>
            </SignUpButton>
          </DropdownMenuItem>
        </SignedOut>
        <SignedIn>
          {links.map((link) => {
            const adminLabel = t('admin');
            if (link.label === adminLabel && !isAdminUser) return null;
            return (
              <DropdownMenuItem key={link.href}>
                <Link href={link.href} className="capitalize w-full">
                  {link.label}
                </Link>
              </DropdownMenuItem>
            );
          })}
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <SignOutLink />
          </DropdownMenuItem>
        </SignedIn>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LinksDropdown;
