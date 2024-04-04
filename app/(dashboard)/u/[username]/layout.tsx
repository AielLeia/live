import { redirect } from 'next/navigation';
import React from 'react';

import { getSelfByUsername } from '@/lib/auth-service';

import Container from '@/app/(dashboard)/u/[username]/_components/container';
import Navbar from '@/app/(dashboard)/u/[username]/_components/navbar';
import Sidebar from '@/app/(dashboard)/u/[username]/_components/sidebar';

type CreateLayoutProps = {
  params: { username: string };
  children: React.ReactNode;
};

const CreatorLayout = async ({ params, children }: CreateLayoutProps) => {
  const self = await getSelfByUsername(params.username).catch(() =>
    redirect('/')
  );
  if (!self) {
    redirect('/');
  }

  return (
    <>
      <Navbar />
      <div className="flex h-full pt-20">
        <Sidebar />
        <Container>{children}</Container>
      </div>
    </>
  );
};

export default CreatorLayout;
