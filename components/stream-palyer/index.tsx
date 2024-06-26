'use client';

import { config } from '@/config';
import { LiveKitRoom } from '@livekit/components-react';

import { cn } from '@/lib/utils';

import { useChatSidebar } from '@/store/use-chat-sidebar';

import { useViewerToken } from '@/hooks/use-viewer-token';

import AboutCard from '@/components/stream-palyer/about-card';
import Chat, { ChatSkeleton } from '@/components/stream-palyer/chat';
import ChatToggle from '@/components/stream-palyer/chat-toggle';
import Header, { HeaderSkeleton } from '@/components/stream-palyer/header';
import InfoCard from '@/components/stream-palyer/info-card';
import Video, { VideoSkeleton } from '@/components/stream-palyer/video';

type Stream = {
  id: string;
  isLive: boolean;
  isChatDelayed: boolean;
  isChatEnabled: boolean;
  isChatFollowerOnly: boolean;
  thumbnailUrl: string | null;
  name: string;
};

type User = {
  id: string;
  username: string;
  bio: string | null;
  imageUrl: string;
  externalUserId: string;
  stream: Stream | null;
  _count: {
    followedBy: number;
  };
};

type StreamPlayerProps = {
  user: User;
  stream: Stream;
  isFollowing: boolean;
};

const StreamPlayer = ({ user, stream, isFollowing }: StreamPlayerProps) => {
  const { token, name, identity } = useViewerToken(user.id);
  const { collapsed } = useChatSidebar((state) => state);

  if (!token || !name || !identity) {
    return <StreamPlayerSkeleton />;
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
          <Header
            hostname={user.username}
            hostIdentity={user.id}
            viewerIdentity={identity}
            imageUrl={user.imageUrl}
            isFollowing={isFollowing}
            name={stream.name}
          />
          <InfoCard
            hostIdentity={user.id}
            viewerIdentity={identity}
            name={stream.name}
            thumbnailUrl={stream.thumbnailUrl}
          />
          <AboutCard
            hostname={user.username}
            hostIdentity={user.id}
            viewerIdentity={identity}
            bio={user.bio}
            followedByCount={user._count.followedBy}
          />
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

export const StreamPlayerSkeleton = () => {
  return (
    <div className="grid grid-cols-1 lg:gap-y-0 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-6 h-full">
      <div className="space-y-4 col-span-1 lg:col-span-2 xl:col-span-2 2xl:col-span-5 lg:overflow-y-auto hidden-scrollbar pb-10">
        <VideoSkeleton />
        <HeaderSkeleton />
      </div>
      <div className="col-span-1 bg-background">
        <ChatSkeleton />
      </div>
    </div>
  );
};

export default StreamPlayer;
