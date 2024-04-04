import { notFound } from 'next/navigation';

import { isBlockedByUser } from '@/lib/block-service';
import { isFollowingUser } from '@/lib/follow-service';
import { getUserByUsername } from '@/lib/user-service';

import Actions from '@/app/(browse)/[username]/_components/actions';

type UserPageProps = {
  params: {
    username: string;
  };
};

const UserPage = async ({ params }: UserPageProps) => {
  const user = await getUserByUsername(params.username);
  if (!user) {
    notFound();
  }

  const isFollowing = await isFollowingUser(user.id);
  const isBlockedByThisUser = await isBlockedByUser(user.id);

  if (isBlockedByThisUser) {
    notFound();
  }

  return (
    <div className="flex flex-col gap-y-4">
      <p>Username: {user.username}</p>
      <p>User ID: {user.id}</p>
      <p>Is following: {JSON.stringify(isFollowing)}</p>
      <p>Is blocked: {JSON.stringify(isBlockedByThisUser)}</p>
      <Actions userId={user.id} isFollowing={isFollowing} />
    </div>
  );
};

export default UserPage;
