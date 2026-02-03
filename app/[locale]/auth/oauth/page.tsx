'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

export default function Callback() {
  const params = useSearchParams();

  useEffect(() => {
    if (!params) return;

    const accessToken = params.get('accessToken');

    if (accessToken && window.opener) {
      window.opener.postMessage({ accessToken }, window.location.origin);
      window.close();
    }
  });

  return <div>Loading...</div>;
}
