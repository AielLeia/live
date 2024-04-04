'use server';

import { revalidatePath } from 'next/cache';

import { blockUser, unblockUser } from '@/lib/block-service';

export const block = async (id: string) => {
  // TODO: Adapt to disconnect from livestream
  // TODO: Allow ability to kick the guest

  try {
    const blockedUser = await blockUser(id);
    revalidatePath('/');
    if (blockedUser) {
      revalidatePath(`/${blockedUser.blocked.username}`);
    }

    return blockedUser;
  } catch (err) {
    if (err instanceof Error) throw new Error(err.message, err);
    throw new Error('Internal error');
  }
};

export const unblock = async (id: string) => {
  try {
    const unblockedUser = await unblockUser(id);
    revalidatePath('/');
    if (unblockedUser) {
      revalidatePath(`/${unblockedUser.blocked.username}`);
    }

    return unblockedUser;
  } catch (err) {
    if (err instanceof Error) throw new Error(err.message, err);
    throw new Error('Internal error');
  }
};
