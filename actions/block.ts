'use server';

import { config } from '@/config';
import { RoomServiceClient } from 'livekit-server-sdk';
import { revalidatePath } from 'next/cache';

import { getSelf } from '@/lib/auth-service';
import { blockUser, unblockUser } from '@/lib/block-service';

const roomService = new RoomServiceClient(
  config.LIVEKIT_API_URL!,
  config.LIVEKIT_API_KEY,
  config.LIVEKIT_API_SECRET
);

export const block = async (id: string) => {
  try {
    const self = await getSelf();
    let blockedUser;

    try {
      blockedUser = await blockUser(id);
    } catch (err) {}

    try {
      await roomService.removeParticipant(self.id, id);
    } catch (err) {}

    revalidatePath(`/u/${self.username}/community`);

    return blockedUser;
  } catch (err) {
    if (err instanceof Error) throw new Error(err.message, err);
    throw new Error('Internal error');
  }
};

export const unblock = async (id: string) => {
  try {
    const self = await getSelf();

    const unblockedUser = await unblockUser(id);
    revalidatePath(`/u/${self.username}/community`);

    return unblockedUser;
  } catch (err) {
    if (err instanceof Error) throw new Error(err.message, err);
    throw new Error('Internal error');
  }
};
