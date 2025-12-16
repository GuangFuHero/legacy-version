import { Metadata } from 'next';
import { redirect } from 'next/navigation';
import HomePage from '@/app/_home/page';

const SITE_URL = 'https://gf250923.org';
const LOGO_URL = 'https://gf250923.org/logo_new.svg';

export const metadata: Metadata = {
  title: '每一個人都是彼此的超人',
  description:
    '花蓮馬太鞍溪災後重建資訊平台 - 光復超人（鏟子超人、光復英雄）提供居民重建的必要資訊，居家修繕、補助貸款、維修站、洗澡點、醫療站、志工住宿等完整災區重建資訊。',
  keywords:
    '光復超人,鏟子超人,災區重建,心理資源,居家修繕,補助資訊,馬太鞍溪補助,光復英雄,鏟子英雄,光復救災,光復志工,志工路線,花蓮光復,災區救援,物資分配,花蓮地震,災民需求,熱食供應,光復小蜜蜂,花蓮小蜜蜂',
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: '光復超人 | 花蓮馬太鞍溪災後重建資訊平台',
    description:
      '光復超人平台轉型為馬太鞍溪流域災後重建資訊整合站，提供居民最新補助申請流程、修繕與貸款資源、心理支持與生活協助。串聯民間與官方力量，陪伴花蓮災區居民一同復原。',
    url: SITE_URL,
    type: 'website',
    images: [
      {
        url: LOGO_URL,
        width: 1028,
        height: 301,
        alt: '光復超人 Logo - 花蓮馬太鞍溪災後重建資訊平台',
      },
    ],
    siteName: '光復超人',
    locale: 'zh_TW',
  },
  twitter: {
    card: 'summary_large_image',
    title: '光復超人 | 花蓮馬太鞍溪災後重建資訊平台',
    description:
      '光復超人平台轉型為馬太鞍溪流域災後重建資訊整合站，提供居民最新補助申請流程、修繕與貸款資源、心理支持與生活協助。串聯民間與官方力量，陪伴花蓮災區居民一同復原。',
    images: [LOGO_URL],
  },
  alternates: {
    canonical: SITE_URL,
  },
};

export default function Home() {
  // redirect('/map');
  return <HomePage />;
}
