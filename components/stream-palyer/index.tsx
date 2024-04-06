'use client';

import { config } from '@/config';
import { LiveKitRoom } from '@livekit/components-react';
import { Stream, User } from '@prisma/client';

import { cn } from '@/lib/utils';

import { useChatSidebar } from '@/store/use-chat-sidebar';

import { useViewerToken } from '@/hooks/use-viewer-token';

import Chat from '@/components/stream-palyer/chat';
import ChatToggle from '@/components/stream-palyer/chat-toggle';
import Video from '@/components/stream-palyer/video';

type StreamPlayerProps = {
  user: User & { stream: Stream | null };
  stream: Stream;
  isFollowing: boolean;
};

const StreamPlayer = ({ user, stream, isFollowing }: StreamPlayerProps) => {
  const { token, name, identity } = useViewerToken(user.id);
  const { collapsed } = useChatSidebar((state) => state);

  if (!token || !name || !identity) {
    return <div>Cannot watch the stream</div>;
  }

  return (
    <>
      {collapsed && (
        <div className="hidden lg:block fixed top-[100px] right-2 z-50">
          <ChatToggle />
        </div>
      )}
      <LiveKitRoom
        serverUrl={config.LIVEKIT_WEBSOCKET_URL}
        token={token}
        className={cn(
          'grid grid-cols-1 lg:gap-y-0 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-6 h-full',
          collapsed && 'lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-2'
        )}
      >
        <div className="space-y-4 col-span-1 lg:col-span-2 xl:col-span-2 2xl:col-span-5 lg:overflow-y-auto hidden-scrollbar pb-10">
          <Video hostname={user.username} hostIdentity={user.id} />
        </div>
        <div className={cn('col-span-1', collapsed && 'hidden')}>
          <Chat
            viewerName={name}
            hostname={user.username}
            hostIdentity={user.id}
            isFollowing={isFollowing}
            isChatDelayed={stream.isChatDelayed}
            isChatEnabled={stream.isChatEnabled}
            isChatFollowerOnly={stream.isChatFollowerOnly}
          />
        </div>
      </LiveKitRoom>
    </>
  );
};

export default StreamPlayer;