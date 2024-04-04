import React from 'react';

import Container from '@/app/(browse)/_components/container';
import Navbar from '@/app/(browse)/_components/navbar';
import Sidebar from '@/app/(browse)/_components/sidebar';

type BrowseLayoutProps = {
  children: React.ReactNode;
};

const BrowseLayout = ({ children }: BrowseLayoutProps) => {
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

export default BrowseLayout;
