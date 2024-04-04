'use client';

import { useSidebar } from '@/store/use-sidebar';
import React from 'react';

import { cn } from '@/lib/utils';

import { useIsClient } from 'usehooks-ts';

import { FollowingSkeleton } from '@/app/(browse)/_components/sidebar/following';
import { RecommendedSkeleton } from '@/app/(browse)/_components/sidebar/recommended';
import { ToggleSkeleton } from '@/app/(browse)/_components/sidebar/toggle';

type WrapperProps = {
  children: React.ReactNode;
};

const Wrapper = ({ children }: WrapperProps) => {
  const isClient = useIsClient();
  const { collapsed } = useSidebar((state) => state);

  if (!isClient)
    return (
      <aside className="fixed left-0 flex flex-col w-[70px] lg:w-60 h-full bg-background border-r border-[#2D2E35] z-50">
        <ToggleSkeleton />
        <FollowingSkeleton />
        <RecommendedSkeleton />
      </aside>
    );

  return (
    <aside
      className={cn(
        'fixed left-0 flex flex-col w-60 h-full bg-background border-r border-[#2D2E35] z-50',
        collapsed && 'w-[70px]'
      )}
    >
      {children}
    </aside>
  );
};

export default Wrapper;
