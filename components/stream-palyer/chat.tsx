'use client';

import {
  useChat,
  useConnectionState,
  useRemoteParticipant,
} from '@livekit/components-react';
import { ConnectionState } from 'livekit-client';
import { useEffect, useMemo, useState } from 'react';
import { useMediaQuery } from 'usehooks-ts';

import { ChatVariant, useChatSidebar } from '@/store/use-chat-sidebar';

import ChatForm from '@/components/stream-palyer/chat-form';
import ChatHeader from '@/components/stream-palyer/chat-header';
import ChatList from '@/components/stream-palyer/chat-list';

type ChatProps = {
  viewerName: string;
  hostname: string;
  hostIdentity: string;
  isFollowing: boolean;
  isChatDelayed: boolean;
  isChatEnabled: boolean;
  isChatFollowerOnly: boolean;
};

const Chat = ({
  viewerName,
  hostname,
  hostIdentity,
  isFollowing,
  isChatDelayed,
  isChatEnabled,
  isChatFollowerOnly,
}: ChatProps) => {
  const matches = useMediaQuery('(max-width: 1024px)');
  const { chatVariant, onExpand } = useChatSidebar((state) => state);
  const connectionState = useConnectionState();
  const participant = useRemoteParticipant(hostIdentity);

  const isOnline = participant && connectionState === ConnectionState.Connected;
  const isHidden = !isChatEnabled || !isOnline;

  const [value, setValue] = useState('');
  const { chatMessages: messages, send } = useChat();

  useEffect(() => {
    if (matches) onExpand();
  }, [matches, onExpand]);

  const reversedMessages = useMemo(() => {
    return messages.sort((a, b) => b.timestamp - a.timestamp);
  }, [messages]);

  const onSubmit = async () => {
    if (!send) return;
    await send(value);
    setValue('');
  };

  const onChange = (value: string) => setValue(value);

  return (
    <div className="flex flex-col bg-background border-l border-b pt-0 h-[calc(100vh-80px)]">
      <ChatHeader />
      {chatVariant === ChatVariant.CHAT && (
        <>
          <ChatList messages={reversedMessages} isHidden={isHidden} />
          <ChatForm
            onSubmit={onSubmit}
            value={value}
            onChange={onChange}
            isHidden={isHidden}
            isChatFollowerOnly={isChatFollowerOnly}
            isChatDelayed={isChatDelayed}
            isFollowing={isFollowing}
          />
        </>
      )}
      {chatVariant === ChatVariant.COMMUNITY && <>Community mode</>}
    </div>
  );
};

export default Chat;
