import { notFound } from 'next/navigation';

import { getSelf } from '@/lib/auth-service';
import { getStreamByUserId } from '@/lib/stream-service';

import ConnectModal from '@/app/(dashboard)/u/[username]/keys/_components/connect-modal';
import KeyCard from '@/app/(dashboard)/u/[username]/keys/_components/key-card';
import UrlCard from '@/app/(dashboard)/u/[username]/keys/_components/url-card';

const KeysPage = async () => {
  const self = await getSelf();
  const selfStream = await getStreamByUserId(self.id);
  if (!selfStream) {
    notFound();
  }

  return (
    <div className="p-6 ">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">Keys & URLs</h1>
        <ConnectModal />
      </div>
      <div className="space-y-4">
        <UrlCard value={selfStream.serverUrl} />
        <KeyCard value={selfStream.streamKey} />
      </div>
    </div>
  );
};

export default KeysPage;
