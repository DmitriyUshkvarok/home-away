'use client';
import { GrLanguage } from 'react-icons/gr';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '../ui/button';
import { findCountryByCode } from '@/utils/countries';
import { Locale, usePathname, useRouter } from '@/i18n/routing';
import { useParams } from 'next/navigation';

const LocaleSwitcher = () => {
  const router = useRouter();

  const pathname = usePathname();
  const params = useParams();

  const enFlag = findCountryByCode('GB')?.flag;
  const uaFlag = findCountryByCode('UA')?.flag;

  const onLocaleChange = (nextLocale: string) => {
    router.replace(
      // @ts-expect-error -- TypeScript will validate that only known `params`
      // are used in combination with a given `pathname`. Since the two will
      // always match for the current route, we can skip runtime checks.
      { pathname, params },
      { locale: nextLocale as Locale }
    );
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <GrLanguage className="h-[1.2rem] w-[1.2rem]" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-12 w-20">
        <DropdownMenuItem onClick={() => onLocaleChange('en')}>
          {enFlag && (
            <span className="mr-2" role="img" aria-label="English Flag">
              {enFlag}
            </span>
          )}
          En
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onLocaleChange('ua')}>
          {uaFlag && (
            <span className="mr-2" role="img" aria-label="Ukrainian Flag">
              {uaFlag}
            </span>
          )}
          Укр
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LocaleSwitcher;
