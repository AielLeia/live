'use client';

import { MinusCircle } from 'lucide-react';
import { useTransition } from 'react';
import { toast } from 'sonner';

import { block } from '@/actions/block';

import { cn, stringToColor } from '@/lib/utils';

import Hint from '@/components/hint';
import { Button } from '@/components/ui/button';

type CommunityItemProps = {
  hostname: string;
  viewerName: string;
  participantName?: string;
  participantIdentity: string;
};

const CommunityItem = ({
  hostname,
  viewerName,
  participantName,
  participantIdentity,
}: CommunityItemProps) => {
  const [isPending, startTransition] = useTransition();

  const color = stringToColor(participantName || '');
  const isSelf = participantName === viewerName;
  const isHost = viewerName === hostname;

  const handleBlock = () => {
    if (!participantName || isSelf || !isHost) return;

    startTransition(async () => {
      try {
        await block(participantIdentity);
        toast.success(`Blocked ${participantName}`);
      } catch (err) {
        if (err instanceof Error) toast.error(err.message);
      }
    });
  };

  return (
    <div
      className={cn(
        'group flex items-center justify-between w-full p-2 rounded-md text-sm hover:bg-white/5',
        isPending && 'opacity-50 pointer-events-none'
      )}
    >
      <p style={{ color }}>{participantName}</p>
      {isHost && !isSelf && (
        <Hint label={'Block'}>
          <Button
            disabled={isPending}
            className="h-auto w-auto p-1 opacity-0 group-hover:opacity-100 transition"
            onClick={handleBlock}
            variant="ghost"
          >
            <MinusCircle className="h-4 w-4 text-muted-foreground" />
          </Button>
        </Hint>
      )}
    </div>
  );
};

export default CommunityItem;
