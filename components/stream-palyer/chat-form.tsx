'use client';

import React, { useState } from 'react';

import { cn } from '@/lib/utils';

import ChatInfo from '@/components/stream-palyer/chat-info';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';

type ChatFormProps = {
  onSubmit: () => void;
  value: string;
  onChange: (value: string) => void;
  isHidden: boolean;
  isChatFollowerOnly: boolean;
  isChatDelayed: boolean;
  isFollowing: boolean;
};

const ChatForm = ({
  onSubmit,
  value,
  onChange,
  isHidden,
  isChatFollowerOnly,
  isChatDelayed,
  isFollowing,
}: ChatFormProps) => {
  const [isDelayBlocked, setIsDelayBlocked] = useState(false);

  const isFollowerOnlyAndNotFollowing = isFollowing && !isFollowing;
  const isDisabled =
    isHidden || isDelayBlocked || isFollowerOnlyAndNotFollowing;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();

    if (!value || isDisabled) return;

    if (isChatDelayed && !isDelayBlocked) {
      setIsDelayBlocked(true);
      setTimeout(() => {
        setIsDelayBlocked(false);
        onSubmit();
      }, 3000);
    } else {
      onSubmit();
    }
  };

  if (isHidden) return null;

  return (
    <form
      className="flex flex-col items-center gap-y-4 p-3"
      onSubmit={handleSubmit}
    >
      <div className="w-full">
        <ChatInfo
          isDelayed={isChatDelayed}
          isFollowersOnly={isChatFollowerOnly}
        />
        <Input
          onChange={(e) => onChange(e.target.value)}
          value={value}
          disabled={isDisabled}
          placeholder="Send a message"
          className={cn(
            'border-white/10 my-2',
            isChatFollowerOnly && 'rounded-t-none border-t-0'
          )}
        />
      </div>
      <div className="ml-auto">
        <Button type="submit" variant="primary" size="sm" disabled={isDisabled}>
          Chat
        </Button>
      </div>
    </form>
  );
};

export const ChatFormSkeleton = () => {
  return (
    <div className="flex flex-col items-center gap-y-4 p-3">
      <Skeleton className="w-full h-10" />
      <div className="flex items-center gap-x-2 ml-auto">
        <Skeleton className="h-7 w-7" />
        <Skeleton className="h-7 w-12" />
      </div>
    </div>
  );
};

export default ChatForm;
