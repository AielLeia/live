'use client';

import { useTransition } from 'react';
import { toast } from 'sonner';

import { updateStream } from '@/actions/stream';

import { Skeleton } from '@/components/ui/skeleton';
import { Switch } from '@/components/ui/switch';

type FieldType = 'isChatEnabled' | 'isChatDelayed' | 'isChatFollowerOnly';

type ToggleCardPros = {
  field: FieldType;
  label: string;
  value: boolean;
};

const ToggleCard = ({ field, label, value = false }: ToggleCardPros) => {
  const [isPending, startTransition] = useTransition();

  const onChange = () => {
    startTransition(async () => {
      try {
        await updateStream({ [field]: !value });
        toast.success('Chat settings updated');
      } catch (error) {
        if (error instanceof Error) {
          toast.error(error.message);
        }
      }
    });
  };

  return (
    <div className="rounded-xl bg-muted p-6">
      <div className="flex items-center justify-between">
        <p className="font-semibold shrink-0">{label}</p>
        <div className="space-y-2">
          <Switch
            checked={value}
            onCheckedChange={onChange}
            disabled={isPending}
          >
            {value ? 'ON' : 'OFF'}
          </Switch>
        </div>
      </div>
    </div>
  );
};

export const ToggleCardSkeleton = () => {
  return <Skeleton className="rounded-xl p-10 w-full" />;
};

export default ToggleCard;
