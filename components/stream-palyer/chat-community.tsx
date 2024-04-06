'use client';

import { useParticipants } from '@livekit/components-react';
import { LocalParticipant, RemoteParticipant } from 'livekit-client';
import { useMemo, useState } from 'react';
import { useDebounceValue } from 'usehooks-ts';

import CommunityItem from '@/components/stream-palyer/community-item';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';

type ChatCommunityProps = {
  viewerName: string;
  hostname: string;
  isHidden: boolean;
};

const ChatCommunity = ({
  viewerName,
  hostname,
  isHidden,
}: ChatCommunityProps) => {
  const [value, setValue] = useState('');
  const [debouncedValue] = useDebounceValue(value, 500);

  const participants = useParticipants();
  const filteredParticipants = useMemo(() => {
    const deduped = participants.reduce(
      (acc, current) => {
        const hostAsViewer = `host-${current.identity}`;
        if (!acc.some((p) => p.identity === hostAsViewer)) {
          acc.push(current);
        }

        return acc;
      },
      [] as (RemoteParticipant | LocalParticipant)[]
    );

    return deduped.filter((participant) =>
      participant.name
        ?.toLocaleLowerCase()
        .includes(debouncedValue.toLowerCase())
    );
  }, [participants, debouncedValue]);

  const onChange = (newValue: string) => {
    setValue(newValue);
  };

  if (isHidden) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <p className="text-sm text-muted-foreground">Community is disabled</p>
      </div>
    );
  }

  return (
    <div className="p-4">
      <Input
        onChange={(e) => onChange(e.target.value)}
        value={value}
        placeholder="Search community"
        className="border-white/10"
      />
      <ScrollArea className="gap-y-2 mt-4">
        <p className="text-center text-sm text-muted-foreground hidden last:block p-2">
          No results.
        </p>
        {filteredParticipants.map((participant) => {
          return (
            <CommunityItem
              key={participant.identity}
              hostname={hostname}
              viewerName={viewerName}
              participantName={participant.name}
              participantIdentity={participant.identity}
            />
          );
        })}
      </ScrollArea>
    </div>
  );
};

export default ChatCommunity;
