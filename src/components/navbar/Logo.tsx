import Link from 'next/link';
import { LuTent } from 'react-icons/lu';
import { Button } from '../ui/button';

const Logo = () => {
  return (
    <Button size="icon" asChild aria-label="Go to homepage">
      <Link href="/">
        <LuTent className="w-6 h-6" />
      </Link>
    </Button>
  );
};

export default Logo;
