import { config } from '@/config';
import { WebhookReceiver } from 'livekit-server-sdk';
import { headers } from 'next/headers';

import db from '@/lib/db';

const receiver = new WebhookReceiver(
  config.LIVEKIT_API_KEY!,
  config.LIVEKIT_API_SECRET!
);

export async function POST(request: Request) {
  const body = await request.text();
  const headerPayload = headers();

  const authorization = headerPayload.get('Authorization');
  if (!authorization) {
    return new Response('No authorization header found.', { status: 400 });
  }

  const event = await receiver.receive(body, authorization);
  if (event.event === 'ingress_ended') {
    await db.stream.update({
      where: {
        ingressId: event.ingressInfo?.ingressId,
      },
      data: {
        isLive: false,
      },
    });
  }

  if (event.event === 'ingress_started') {
    await db.stream.update({
      where: {
        ingressId: event.ingressInfo?.ingressId,
      },
      data: {
        isLive: true,
      },
    });
  }

  return new Response('', { status: 200 });
}
