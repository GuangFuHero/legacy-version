'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

/**
 * 倒數計時並自動跳轉至首頁的組件
 */
export default function RedirectCountdown() {
  const router = useRouter();
  const [countdown, setCountdown] = useState(3);

  useEffect(() => {
    // 倒數計時器
    const timer = setInterval(() => {
      setCountdown(prev => prev - 1);
    }, 1000);

    // 清理計時器
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    // 倒數結束時執行跳轉
    if (countdown <= 0) {
      router.push('/');
    }
  }, [countdown, router]);

  return (
    <div className="text-center font-normal py-8 text-[var(--gray)]">
      本頁地圖頁面已不再全面更新
      <br />
      相關最新內容請到首頁查看
      <br />
      <br />
      {countdown} 秒後將幫您跳轉至首頁...
    </div>
  );
}
