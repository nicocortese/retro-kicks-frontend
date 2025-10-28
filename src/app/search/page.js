import { Suspense } from 'react';
import SearchClient from './SearchClientPage'; 
import Loading from '@/components/Loading'; 

export const dynamic = 'force-dynamic';

export default function SearchPage() {
  return (
    <Suspense fallback={<Loading />}>
      <SearchClient />
    </Suspense>
  );
}