'use client';

import { Stream, User } from '@prisma/client';

import { useSidebar } from '@/store/use-sidebar';

import UserItem, {
  UserItemSkeleton,
} from '@/app/(browse)/_components/sidebar/user-item';

type RecommendedProps = {
  data: (User & { stream: Stream | null })[];
};

const Recommended = ({ data }: RecommendedProps) => {
  const { collapsed } = useSidebar((state) => state);

  const showLabel = !collapsed && data.length > 0;

  return (
    <div>
      {showLabel && (
        <div className="pl-6 mb-4">
          <p className="text-sm text-muted-foreground">Recommended</p>
        </div>
      )}
      <ul className="space-y-2 px-2">
        {data.map((user) => {
          return (
            <UserItem
              username={user.username}
              imageUrl={user.imageUrl}
              isLive={user.stream?.isLive}
              key={user.id}
            />
          );
        })}
      </ul>
    </div>
  );
};

export const RecommendedSkeleton = () => {
  return (
    <ul className="px-2">
      {[...Array(3)].map((_, index) => {
        return <UserItemSkeleton key={index} />;
      })}
    </ul>
  );
};

export default Recommended;
