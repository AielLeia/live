'use client';

import { config } from '@/config';
import { LiveKitRoom } from '@livekit/components-react';
import { Stream, User } from '@prisma/client';

import { useViewerToken } from '@/hooks/use-viewer-token';

import Video from '@/components/stream-palyer/video';

type StreamPlayerProps = {
  user: User & { stream: Stream | null };
  stream: Stream;
  isFollowing: boolean;
};

const StreamPlayer = ({ user, stream, isFollowing }: StreamPlayerProps) => {
  const { token, name, identity } = useViewerToken(user.id);

  if (!token || !name || !identity) {
    return <div>Cannot watch the stream</div>;
  }

  return (
    <>
      <LiveKitRoom
        serverUrl={config.LIVEKIT_WEBSOCKET_URL}
        token={token}
        className="grid grid-cols-1 lg:gap-y-0 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-6 h-full"
      >
        <div className="space-y-4 col-span-1 lg:col-span-2 xl:col-span-2 2xl:col-span-5 lg:overflow-y-auto hidden-scrollbar pb-10">
          <Video hostname={user.username} hostIdentity={user.id} />
        </div>
      </LiveKitRoom>
    </>
  );
};

export default StreamPlayer;
