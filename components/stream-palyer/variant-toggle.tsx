'use client';

import { MessageSquare, Users } from 'lucide-react';

import { ChatVariant, useChatSidebar } from '@/store/use-chat-sidebar';

import Hint from '@/components/hint';
import { Button } from '@/components/ui/button';

const VariantToggle = () => {
  const { chatVariant, onChangeVariant } = useChatSidebar((state) => state);

  const isChat = chatVariant === ChatVariant.CHAT;

  const Icon = isChat ? Users : MessageSquare;
  const label = isChat ? 'Community' : 'Go back to chat';

  const onToggle = () => {
    const newVariant = isChat ? ChatVariant.COMMUNITY : ChatVariant.CHAT;
    onChangeVariant(newVariant);
  };

  return (
    <Hint label={label} side="left" asChild>
      <Button
        onClick={onToggle}
        variant="ghost"
        className="h-auto p-2 hover:bg-white/10 hover:text-primary bg-transparent"
      >
        <Icon className="h-4 w-4" />
      </Button>
    </Hint>
  );
};

export default VariantToggle;
