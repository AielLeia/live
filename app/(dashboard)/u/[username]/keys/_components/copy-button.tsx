'use client';

import { CheckCheck, Copy } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';

type CopyButtonProps = {
  value?: string;
};

const CopyButton = ({ value }: CopyButtonProps) => {
  const [isCopied, setIsCopied] = useState(false);

  const onCopy = async () => {
    if (!value) return;

    setIsCopied(true);
    await navigator.clipboard.writeText(value);
    setTimeout(() => setIsCopied(false), 1000);
  };

  const Icon = isCopied ? CheckCheck : Copy;

  return (
    <Button
      onClick={onCopy}
      disabled={!value || isCopied}
      variant="ghost"
      size="sm"
    >
      <Icon className="h-4 w-4" />
    </Button>
  );
};

export default CopyButton;
