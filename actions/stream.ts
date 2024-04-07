'use server';

import { Stream } from '@prisma/client';
import { revalidatePath } from 'next/cache';

import { getSelf } from '@/lib/auth-service';
import db from '@/lib/db';

export const updateStream = async (values: Partial<Stream>) => {
  try {
    const self = await getSelf();
    const selfStream = await db.stream.findUnique({
      where: { userId: self.id },
    });
    if (!selfStream) {
      throw new Error('Streams not found');
    }

    const validData = {
      thumbnailUrl: values.thumbnailUrl,
      name: values.name,
      isChatEnabled: values.isChatEnabled,
      isChatFollowerOnly: values.isChatFollowerOnly,
      isChatDelayed: values.isChatDelayed,
    };
    const stream = await db.stream.update({
      where: { id: selfStream.id },
      data: { ...validData },
    });

    revalidatePath(`/u/${self.username}/chat`);
    revalidatePath(`/u/${self.username}`);
    revalidatePath(`/${self.username}`);

    return stream;
  } catch (err) {
    if (err instanceof Error) throw new Error(err.message, err);
    throw new Error('Internal error');
  }
};
