'use client';

import { useTransition } from 'react';
import { toast } from 'sonner';

import { unblock } from '@/actions/block';

import { Button } from '@/components/ui/button';

type UnblockButtonProps = {
  userId: string;
};

const UnblockButton = ({ userId }: UnblockButtonProps) => {
  const [isPending, startTransition] = useTransition();

  const onClick = () => {
    startTransition(async () => {
      try {
        const block = await unblock(userId);
        toast.success(`You unblocked ${block.blocked.username}.`);
      } catch (err) {
        if (err instanceof Error) {
          toast.error(err.message);
        }
      }
    });
  };

  return (
    <Button
      disabled={isPending}
      onClick={onClick}
      variant="link"
      size="sm"
      className="text-blue-500 w-full"
    >
      Unblock
    </Button>
  );
};

export default UnblockButton;
