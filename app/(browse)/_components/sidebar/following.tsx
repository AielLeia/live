'use client';

import { Follow, Stream, User } from '@prisma/client';

import { useSidebar } from '@/store/use-sidebar';

import UserItem, {
  UserItemSkeleton,
} from '@/app/(browse)/_components/sidebar/user-item';

type FollowingProps = {
  data: (Follow & { following: User & { stream: Stream | null } })[];
};

const Following = ({ data }: FollowingProps) => {
  const { collapsed } = useSidebar((state) => state);

  if (!data.length) return null;

  return (
    <div>
      {!collapsed && (
        <div className="pl-6 mb-4">
          <p className="text-sm text-muted-foreground">Following</p>
        </div>
      )}
      <ul className="space-y-2 px-2">
        {data.map((follow) => {
          return (
            <UserItem
              key={follow.following.id}
              username={follow.following.username}
              imageUrl={follow.following.imageUrl}
              isLive={follow.following.stream?.isLive}
            />
          );
        })}
      </ul>
    </div>
  );
};

export const FollowingSkeleton = () => {
  return (
    <ul className="px-2 pt-2 lg:pt-0">
      {[...Array(3)].map((_, index) => {
        return <UserItemSkeleton key={index} />;
      })}
    </ul>
  );
};

export default Following;
