import { ToggleSkeleton } from '@/app/(browse)/_components/sidebar/toggle';
import { Skeleton } from '@/components/ui/skeleton';

const ChatPageLoading = () => {
  return (
    <div className="p-6 space-y-4">
      <Skeleton className="h-10 w-[200px]" />
      <div className="space-y-4">
        <ToggleSkeleton />
        <ToggleSkeleton />
        <ToggleSkeleton />
      </div>
    </div>
  );
};

export default ChatPageLoading;