import { Suspense } from 'react';
import { Metadata } from 'next';
import PageLayout from '@/components/PageLayout';
import SiteMap from '@/features/SiteMap';
import RedirectCountdown from './components/RedirectCountdown';

const SITE_URL = 'https://gf250923.org';
const LOGO_URL = 'https://gf250923.org/logo_new.svg';

export const generateMetadata = (): Metadata => {
  return {
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
};

export default function MapPage() {
  // JSON-LD
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': `${SITE_URL}/#organization`,
        name: '光復超人',
        alternateName: ['鏟子超人', '光復英雄', '鏟子英雄', '光復超人', '光復志工'],
        url: SITE_URL,
        logo: {
          '@type': 'ImageObject',
          url: LOGO_URL,
          width: 1028,
          height: 301,
        },
        image: {
          '@type': 'ImageObject',
          url: LOGO_URL,
          width: 1028,
          height: 301,
        },
        slogan: '每一個人都是彼此的超人',
        description:
          '花蓮馬太鞍溪災後重建資訊平台 - 光復超人（鏟子超人、光復英雄）提供居民重建的必要資訊，居家修繕、補助貸款、維修站、洗澡點、醫療站、志工住宿等完整災區重建資訊。',
        foundingDate: '2025-09-23',
        address: {
          '@type': 'PostalAddress',
          addressLocality: '光復鄉',
          addressRegion: '花蓮縣',
          addressCountry: 'TW',
        },
        location: {
          '@type': 'Place',
          name: '花蓮縣光復鄉',
          geo: {
            '@type': 'GeoCoordinates',
            latitude: 23.665853,
            longitude: 121.421125,
          },
          address: {
            '@type': 'PostalAddress',
            addressLocality: '光復鄉',
            addressRegion: '花蓮縣',
            addressCountry: 'TW',
          },
        },
        areaServed: [
          {
            '@type': 'Place',
            name: '花蓮縣光復鄉',
            geo: {
              '@type': 'GeoCoordinates',
              latitude: 23.665853,
              longitude: 121.421125,
            },
            address: {
              '@type': 'PostalAddress',
              addressLocality: '光復鄉',
              addressRegion: '花蓮縣',
              addressCountry: 'TW',
            },
          },
          {
            '@type': 'Place',
            name: '花蓮縣',
            address: {
              '@type': 'PostalAddress',
              addressRegion: '花蓮縣',
              addressCountry: 'TW',
            },
          },
        ],
        sameAs: [
          'https://www.threads.com/@gunangfu250927',
          'https://www.facebook.com/gunangfu250927',
          'https://www.youtube.com/channel/UC1jIUA-kbGq-Dh1s3QBC6ow',
        ],
        knowsAbout: [
          '災區救援',
          '志工媒合',
          '志工招募',
          '物資分配',
          '災民協助',
          '地震救災',
          '緊急救援',
          '災情地圖',
        ],
      },
    ],
  };

  return (
    <PageLayout>
      {/* JSON-LD Script */}
      {/* <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Suspense fallback={<div className="text-center py-8 text-[var(--gray)]">載入中...</div>}>
        <SiteMap />
      </Suspense> */}
      <RedirectCountdown />
    </PageLayout>
  );
}
