'use server';

import { revalidatePath } from 'next/cache';

import { followUser, unfollowUser } from '@/lib/follow-service';

export const follow = async (id: string) => {
  try {
    const followedUser = await followUser(id);
    revalidatePath('/');

    if (followedUser) {
      revalidatePath(`/${followedUser.following.username}`);
    }

    return followedUser;
  } catch (err) {
    if (err instanceof Error) throw new Error(err.message);
    throw new Error('Internal error');
  }
};

export const unfollow = async (id: string) => {
  try {
    const unfollowedUser = await unfollowUser(id);
    revalidatePath('/');

    if (unfollowedUser) {
      revalidatePath(`/${unfollowedUser.following.username}`);
    }

    return unfollowedUser;
  } catch (err) {
    if (err instanceof Error) throw new Error(err.message);
    throw new Error('Internal error');
  }
};
