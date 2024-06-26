'use client';

import { useUser } from '@clerk/nextjs';
import { Fullscreen, KeyRound, MessageSquare, Users } from 'lucide-react';
import { usePathname } from 'next/navigation';

import NavItem, {
  NavItemSkeleton,
} from '@/app/(dashboard)/u/[username]/_components/sidebar/nav-item';

const Navigation = () => {
  const pathname = usePathname();
  const { user } = useUser();

  if (!user) {
    return (
      <ul className="space-y-2">
        {[...Array(4)].map((_, index) => (
          <NavItemSkeleton key={index} />
        ))}
      </ul>
    );
  }

  const routes = [
    {
      label: 'Stream',
      href: `/u/${user?.username}`,
      icon: Fullscreen,
    },
    {
      label: 'Keys',
      href: `/u/${user?.username}/keys`,
      icon: KeyRound,
    },
    {
      label: 'Chat',
      href: `/u/${user?.username}/chat`,
      icon: MessageSquare,
    },
    {
      label: 'Community',
      href: `/u/${user?.username}/community`,
      icon: Users,
    },
  ];

  return (
    <ul className="space-y-2 px-2 pt-4 lg:pt-0">
      {routes.map((route, index) => (
        <NavItem
          key={index}
          label={route.label}
          icon={route.icon}
          href={route.href}
          isActive={pathname === route.href}
        />
      ))}
    </ul>
  );
};

export default Navigation;
