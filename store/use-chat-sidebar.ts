import { create } from 'zustand';

export enum ChatVariant {
  CHAT = 'CHAT',
  COMMUNITY = 'COMMUNITY',
}

type ChatSidebarStore = {
  collapsed: boolean;
  chatVariant: ChatVariant;
  onExpand: () => void;
  onCollapse: () => void;
  onChangeVariant: (variant: ChatVariant) => void;
};

export const useChatSidebar = create<ChatSidebarStore>((set) => ({
  collapsed: false,
  chatVariant: ChatVariant.CHAT,

  onExpand: () => set(() => ({ collapsed: false })),
  onCollapse: () => set(() => ({ collapsed: true })),
  onChangeVariant: (variant: ChatVariant) =>
    set(() => ({ chatVariant: variant })),
}));
