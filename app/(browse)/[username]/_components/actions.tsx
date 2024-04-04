'use client';

import { useTransition } from 'react';
import { toast } from 'sonner';

import { block, unblock } from '@/actions/block';
import { follow, unfollow } from '@/actions/follow';

import { Button } from '@/components/ui/button';

type ActionsProps = {
  isFollowing: boolean;
  userId: string;
};

const Actions = ({ userId, isFollowing }: ActionsProps) => {
  const [isPending, startTransition] = useTransition();

  const handleFollow = () => {
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

  const handleUnfollow = () => {
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

  const handleBlock = () => {
    startTransition(async () => {
      try {
        const blockedUser = await block(userId);
        toast.success(`Your have blocked ${blockedUser.blocked.username}`);
      } catch (err) {
        if (err instanceof Error) toast.error(err.message);
      }
    });
  };

  const handleUnblock = () => {
    startTransition(async () => {
      try {
        const blockedUser = await unblock(userId);
        toast.success(`Your have unblocked ${blockedUser.blocked.username}`);
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
      <Button disabled={isPending} variant="primary" onClick={handleBlock}>
        Block
      </Button>
      <Button disabled={isPending} variant="primary" onClick={handleUnblock}>
        unblock
      </Button>
    </>
  );
};

export default Actions;
