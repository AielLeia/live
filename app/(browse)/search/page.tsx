import { redirect } from 'next/navigation';
import { Suspense } from 'react';

import Results, {
  ResultsSkeleton,
} from '@/app/(browse)/search/_components/results';

type SearchPageProps = {
  searchParams: {
    term?: string;
  };
};

const SearchPage = ({ searchParams }: SearchPageProps) => {
  if (!searchParams.term) return redirect('/');

  return (
    <div className="h-full p-8 max-w-screen-2xl mx-auto">
      <Suspense fallback={<ResultsSkeleton />}>
        <Results term={searchParams.term} />
      </Suspense>
    </div>
  );
};

export default SearchPage;
