'use client';

import Link from 'next/link';

import { Button } from '@/components/ui/button';

const UserErrorPage = () => {
  return (
    <div className="h-full flex flex-col space-y-4 items-center justify-center text-muted-foreground">
      <h1 className="text-4xl">Something went wrong</h1>
      <p>We couldn&apos;t find the user you were kooking for</p>
      <Button variant="secondary" asChild>
        <Link href="/">Go back home</Link>
      </Button>
    </div>
  );
};

export default UserErrorPage;