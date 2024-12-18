import { fetchProfileImage } from '@/actions/actions';
import { LuUser } from 'react-icons/lu';
import Image from 'next/image';

const UserIcon = async () => {
  const profileImage = await fetchProfileImage();
  if (profileImage)
    return (
      <Image
        src={profileImage}
        alt="profile photo"
        width={40}
        height={40}
        className="w-6 h-6 rounded-full object-cover"
      />
    );
  return <LuUser className="w-6 h-6 bg-primary rounded-full text-white" />;
};

export default UserIcon;
