'use server';

import { config } from '@/config';
import {
  IngressAudioEncodingPreset,
  IngressInput,
  IngressClient,
  IngressVideoEncodingPreset,
  RoomServiceClient,
  TrackSource,
} from 'livekit-server-sdk';
import { revalidatePath } from 'next/cache';

import { getSelf } from '@/lib/auth-service';
import db from '@/lib/db';

const roomService = new RoomServiceClient(
  config.LIVEKIT_API_URL!,
  config.LIVEKIT_API_KEY,
  config.LIVEKIT_API_SECRET
);
const ingressClient = new IngressClient(config.LIVEKIT_API_URL!);

export const resetIngresses = async (hostIdentity: string) => {
  const ingresses = await ingressClient.listIngress({ roomName: hostIdentity });
  const rooms = await roomService.listRooms([hostIdentity]);

  for (const room of rooms) {
    await roomService.deleteRoom(room.name);
  }

  for (const ingress of ingresses) {
    if (ingress.ingressId) {
      await ingressClient.deleteIngress(ingress.ingressId);
    }
  }
};

export const createIngress = async (ingressType: IngressInput) => {
  try {
    const self = await getSelf();

    await resetIngresses(self.id);

    const options: Record<string, any> = {
      name: self.username,
      roomName: self.id,
      participantName: self.username,
      participantIdentity: self.id,
    };
    if (ingressType === IngressInput.WHIP_INPUT) {
      options.bypassTranscoding = true;
    } else {
      options.video = {
        source: TrackSource.CAMERA,
        preset: IngressVideoEncodingPreset.H264_1080P_30FPS_3_LAYERS,
      };
      options.audio = {
        source: TrackSource.MICROPHONE,
        preset: IngressAudioEncodingPreset.OPUS_STEREO_96KBPS,
      };
    }

    const ingress = await ingressClient.createIngress(ingressType, options);
    if (!ingress || !ingress.url || !ingress.streamKey) {
      throw new Error('Failed to create ingress');
    }

    await db.stream.update({
      where: { userId: self.id },
      data: {
        ingressId: ingress.ingressId,
        serverUrl: ingress.url,
        streamKey: ingress.streamKey,
      },
    });

    revalidatePath(`/u/${self.username}/keys`);
  } catch (err) {
    if (err instanceof Error) throw new Error(err.message, err);
    throw new Error('Internal Server Error');
  }
};
