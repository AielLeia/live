import { getRecommended } from '@/lib/recommended-service';

import Recommended, {
  RecommendedSkeleton,
} from '@/app/(browse)/_components/sidebar/recommended';
import Toggle from '@/app/(browse)/_components/sidebar/toggle';
import Wrapper from '@/app/(browse)/_components/sidebar/wrapper';

const Sidebar = async () => {
  const recommended = await getRecommended();

  return (
    <Wrapper>
      <Toggle />
      <div className="space-y-4 pt-4 lg:pt-0">
        <Recommended data={recommended} />
      </div>
    </Wrapper>
  );
};

export const SidebarSkeleton = () => {
  return (
    <aside className="fixed left-0 flex flex-col w-[70px] lg:w-60 h-full bg-background border-r border-[#2D2E35] z-50">
      <RecommendedSkeleton />
    </aside>
  );
};

export default Sidebar;
