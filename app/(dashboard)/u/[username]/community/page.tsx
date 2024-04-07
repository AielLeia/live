import { format } from 'date-fns';

import { getBlockedUser } from '@/lib/block-service';

import { columns } from '@/app/(dashboard)/u/[username]/community/_components/colums';
import { DataTable } from '@/app/(dashboard)/u/[username]/community/_components/data-table';

const CommunityPage = async () => {
  const blockedUser = await getBlockedUser();

  const formattedData = blockedUser.map((block) => ({
    ...block,
    userId: block.blocked.id,
    imageUrl: block.blocked.imageUrl,
    username: block.blocked.username,
    createdAt: format(new Date(block.blocked.createdAt), 'dd/MM/yyyy'),
  }));

  return (
    <div className="p-6">
      <div className="mb-4">
        <h1 className="text-2xl font-bold">Community settings</h1>
        <DataTable columns={columns} data={formattedData} />
      </div>
    </div>
  );
};

export default CommunityPage;
