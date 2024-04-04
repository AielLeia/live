'use client';

import { useTransition } from 'react';
import { toast } from 'sonner';

import { follow, unfollow } from '@/actions/follow';

import { Button } from '@/components/ui/button';

type ActionsProps = {
  isFollowing: boolean;
  userId: string;
};

const Actions = ({ userId, isFollowing }: ActionsProps) => {
  const [isPending, startTransition] = useTransition();

  const handleFollow = async () => {
    startTransition(async () => {
      try {
        const followedUser = await follow(userId);
        toast.success(
          `Your are now following ${followedUser.following.username}`
        );
      } catch (err) {
        if (err instanceof Error) toast.error(err.message);
      }
    });
  };

  const handleUnfollow = async () => {
    startTransition(async () => {
      try {
        const followedUser = await unfollow(userId);
        toast.success(
          `Your have unfollowed ${followedUser.following.username}`
        );
      } catch (err) {
        if (err instanceof Error) toast.error(err.message);
      }
    });
  };

  return (
    <>
      <Button
        disabled={isPending}
        onClick={isFollowing ? handleUnfollow : handleFollow}
        variant="primary"
      >
        {isFollowing ? 'Unfollow' : 'Follow'}
      </Button>
    </>
  );
};

export default Actions;
