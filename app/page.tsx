import { config } from '@/config';
import { UserButton } from '@clerk/nextjs';

export default function Home() {
  return (
    <div className="flex flex-col gap-y-4">
      <h1>Dashboard</h1>
      <UserButton afterSignOutUrl={config.CLERK_AFTER_SIGN_OUT_URL} />
    </div>
  );
}
