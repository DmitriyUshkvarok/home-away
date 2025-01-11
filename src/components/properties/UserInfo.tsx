import Image from 'next/image';
import { getTranslations } from 'next-intl/server';

type UserInfoProps = {
  profile: {
    profileImage: string;
    firstName: string;
  };
};

const UserInfo = async ({
  profile: { profileImage, firstName },
}: UserInfoProps) => {
  const t = await getTranslations('UserInfo');
  return (
    <article className="grid grid-cols-[auto,1fr] gap-4 mt-4">
      <Image
        src={profileImage}
        alt={firstName}
        width={50}
        height={50}
        className="rounded-md w-12 h-12 object-cover"
      />
      <div>
        <p>
          {t('hostedBy')}
          <span className="font-bold"> {firstName}</span>
        </p>
        <p className="text-muted-foreground font-light">
          {t('superhostDetails', { years: 2 })}
        </p>
      </div>
    </article>
  );
};

export default UserInfo;
