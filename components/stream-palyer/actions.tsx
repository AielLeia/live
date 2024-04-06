'use client';

import { useAuth } from '@clerk/nextjs';
import { Heart } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useTransition } from 'react';
import { toast } from 'sonner';

import { follow, unfollow } from '@/actions/follow';

import { cn } from '@/lib/utils';

import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';

type ActionsProps = {
  isFollowing: boolean;
  hostIdentity: string;
  isHost: boolean;
};

const Actions = ({ isFollowing, hostIdentity, isHost }: ActionsProps) => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const { userId } = useAuth();

  const toggleFollow = () => {
    if (!userId) {
      return router.push('/sign-in');
    }

    if (isHost) return;

    startTransition(async () => {
      try {
        let message;
        let data;
        if (isFollowing) {
          data = await unfollow(userId);
          message = `You are now unfollowing ${data.following.username}`;
        } else {
          data = await follow(userId);
          message = `You are now following ${data.following.username}`;
        }
        toast.success(message);
      } catch (err) {
        if (err instanceof Error) toast.error(err.message);
      }
    });
  };

  return (
    <Button
      disabled={isPending || isHost}
      onClick={toggleFollow}
      variant="primary"
      size="sm"
      className="w-full lg:w-auto text-center"
    >
      <Heart
        className={cn('h-4 w-4 mr-2', isFollowing ? 'fill-white' : 'fill-none')}
      />
      {isFollowing ? 'Unfollow' : 'Follow'}
    </Button>
  );
};

export const ActionsSkeleton = () => {
  return <Skeleton className="h-10 w-full lg:w-24" />;
};

export default Actions;
