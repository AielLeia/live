'use client';

import { LucideIcon } from 'lucide-react';
import Link from 'next/link';

import { cn } from '@/lib/utils';

import { useCreatorSidebar } from '@/store/use-creator-sidebar';

import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';

type NavItemProps = {
  label: string;
  icon: LucideIcon;
  href: string;
  isActive: boolean;
};

const NavItem = ({ label, icon: Icon, href, isActive }: NavItemProps) => {
  const { collapsed } = useCreatorSidebar((state) => state);

  return (
    <Button
      variant="ghost"
      asChild
      className={cn(
        'w-full h-12',
        collapsed ? 'justify-center' : 'justify-start',
        isActive && 'bg-accent'
      )}
    >
      <Link href={href}>
        <div className="flex items-center gap-x-4">
          <Icon className={cn('w-4 h-4', collapsed ? 'mr-0' : 'mr-2')} />
          {!collapsed && <span>{label}</span>}
        </div>
      </Link>
    </Button>
  );
};

export const NavItemSkeleton = () => {
  return (
    <li className="flex items-center gap-x-4 px-3 py-2">
      <Skeleton className="min-h-[48px] min-w-[48px] rounded-md" />
      <div className="flex-1 hidden lg:block">
        <Skeleton className="h-6" />
      </div>
    </li>
  );
};

export default NavItem;
