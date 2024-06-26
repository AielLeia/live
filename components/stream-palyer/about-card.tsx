'use client';

import BioModal from '@/components/stream-palyer/bio-modal';
import VerifiedMark from '@/components/verified-mark';

type AboutCardProps = {
  hostname: string;
  hostIdentity: string;
  viewerIdentity: string;
  bio: string | null;
  followedByCount: number;
};

const AboutCard = ({
  hostname,
  hostIdentity,
  viewerIdentity,
  bio,
  followedByCount,
}: AboutCardProps) => {
  const hostAsViewer = `host-${hostIdentity}`;
  const isHost = hostAsViewer === viewerIdentity;

  const followedByLabel = followedByCount === 1 ? 'Follower' : 'Followers';

  return (
    <div className="px-4 ">
      <div className="group rounded-xl bg-background p-6 lg:p-10 flex flex-col gap-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-x-2 font-semibold text-lg lg:text-2xl">
            About {hostname}
            <VerifiedMark />
          </div>
          {isHost && <BioModal initialValue={bio} />}
        </div>
        <div className="text-sm text-muted-foreground">
          <span className="font-semibold text-primary">{followedByCount}</span>{' '}
          {followedByLabel}
        </div>
        <p className="text-sm">
          {bio || 'This user prefers to keep an air of mystery about them.'}
        </p>
      </div>
    </div>
  );
};

export default AboutCard;
