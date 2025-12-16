import { Suspense } from 'react';
import { Metadata } from 'next';
import PageLayout from '@/components/PageLayout';
import { Stack } from '@mui/material';
import Link from 'next/link';
import './home.css';
import HomeFaqSection from './components/HomeFaqSection';
import HomeAnnouncementsSection from './components/HomeAnnouncementsSection';
import Image from 'next/image';
import { getAssetPath } from '@/lib/utils';
import ShareAction from '@/components/ShareAction';
import SearchCardLink from './components/SearchCardLink';
import { searchCards } from '@/constants/searchCards';

// 注意：此檔案僅作為首頁的組版與 SEO 設定來源，實際路由仍為 `src/app/page.tsx`
// 你可以在 `app/page.tsx` 中導入並重導出此檔案的 `generateMetadata` 與預設元件。

const SITE_URL = 'https://gf250923.org';
const LOGO_URL = 'https://gf250923.org/logo_new.svg';

// 與 `app/map/page.tsx` 對齊的 SEO metadata 產生器（供首頁使用）
/**
 * 產生首頁 SEO 中繼資料（與 /app/map/page.tsx 對齊）。
 * @returns {Metadata} Next.js Metadata 物件。
 */
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

// 首頁內容（非路由頁），可在 app/page.tsx 中引用此元件
/**
 * 首頁內容組件（非路由頁）。
 * 建議由 app/page.tsx 匯入並作為首頁的實際內容。
 * @returns {JSX.Element} 版面元素。
 */
export default function HomePage() {
  // 結構化資料（JSON-LD）：首頁版本
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
          '光復超人平台轉型為馬太鞍溪流域災後重建資訊整合站，提供居民最新補助申請流程、修繕與貸款資源、心理支持與生活協助。串聯民間與官方力量，陪伴花蓮災區居民一同復原。',
        address: {
          '@type': 'PostalAddress',
          addressLocality: '光復鄉',
          addressRegion: '花蓮縣',
          addressCountry: 'TW',
        },
      },
      {
        '@type': 'WebSite',
        '@id': `${SITE_URL}/#website`,
        url: SITE_URL,
        name: '光復超人',
        alternateName: '鏟子超人',
        description:
          '花蓮馬太鞍溪災後重建資訊平台 - 光復超人（鏟子超人、光復英雄）提供居民重建的必要資訊，居家修繕、補助貸款、維修站、洗澡點、醫療站、志工住宿等完整災區重建資訊。',
        inLanguage: 'zh-TW',
        publisher: {
          '@id': `${SITE_URL}/#organization`,
        },
      },
      {
        '@type': 'WebPage',
        '@id': `${SITE_URL}/#webpage`,
        url: SITE_URL,
        name: '首頁',
        description:
          '光復超人首頁：居家修繕、補助貸款、維修站、洗澡點、醫療站、志工住宿等完整災區重建資訊的入口',
        inLanguage: 'zh-TW',
        isPartOf: {
          '@id': `${SITE_URL}/#website`,
        },
        primaryImageOfPage: {
          '@type': 'ImageObject',
          url: LOGO_URL,
        },
        dateModified: new Date().toISOString().split('T')[0],
        author: {
          '@id': `${SITE_URL}/#organization`,
        },
      },
    ],
  };

  const socialLinks = [
    { path: '/thread_logo.svg', alt: 'thread', href: 'https://www.threads.com/@gunangfu250927' },
    // {
    //   path: '/youtube_logo.svg',
    //   alt: 'youtube',
    //   href: 'https://www.youtube.com/@%E5%85%89%E5%BE%A9%E8%B6%85%E4%BA%BAGuangFuHero',
    // },
    { path: '/line_logo.svg', alt: 'line', href: 'line://ti/p/@hreco' },
    {
      path: '/instagram_logo.svg',
      alt: 'instagram',
      href: 'https://www.instagram.com/gunangfu250927/',
    },
    { path: '/fb_logo.svg', alt: 'fb', href: 'https://www.facebook.com/gunangfu250927' },
    { path: '/share.svg', alt: 'share', href: 'https://www.facebook.com/gunangfu250927' },
  ];

  return (
    <PageLayout
      footerSlot={
        <footer className="footerBox mt-12">
          <div>
            <Image
              src={getAssetPath('/logo_new.svg')}
              alt="Logo"
              width={120}
              height={40}
              className="h-10 w-auto cursor-pointer"
            />
          </div>

          <Stack direction="row" justifyContent="center" className="socialBtns">
            {socialLinks.map(({ path, alt, href }) =>
              alt === 'share' ? (
                <ShareAction key={alt}>
                  <button className="cursor-pointer" aria-label="分享">
                    <Image
                      src={getAssetPath(path)}
                      alt={alt}
                      width={28}
                      height={28}
                      className="transition-all duration-200 hover:[filter:invert(60%)_sepia(80%)_saturate(6000%)_hue-rotate(10deg)_brightness(100%)_contrast(95%)]"
                    />
                  </button>
                </ShareAction>
              ) : (
                <Link key={alt} href={href} target="_blank" rel="noopener noreferrer">
                  <Image
                    src={getAssetPath(path)}
                    alt={alt}
                    width={33}
                    height={32}
                    className="transition-all duration-200 hover:[filter:invert(60%)_sepia(80%)_saturate(6000%)_hue-rotate(10deg)_brightness(100%)_contrast(95%)]"
                  />
                </Link>
              )
            )}
          </Stack>

          <div className="footerLinks">
            <Link href="/privacy">隱私權政策</Link>
            <Link href="/terms">服務條款</Link>
          </div>
        </footer>
      }
    >
      {/* JSON-LD：提供搜尋引擎更豐富的結構化資訊 */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* 主要內容區：可逐步拆分為 sections/components */}
      <Suspense fallback={<div className="text-center py-8 text-[var(--gray)]">載入中...</div>}>
        <h3 className="text-center text-[16px] font-normal text-[var(--gray)]">
          提供居民需要的協助與資訊
        </h3>
        <h3 className="homeTitle py-3">
          <div className="flex items-center gap-2">
            <svg
              width="32"
              height="32"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M13.4544 7.25004C11.5829 8.49405 9.46587 11.568 7.59443 14.0638C5.72298 16.5597 3.03646 18.1504 2.02565 20.8554C-0.0624183 26.4431 2.51759 29.6993 10.3954 29.6993C13.2169 29.8136 17.8231 30.2928 20.6169 29.7264C28.7703 28.0735 31.6343 23.0481 30.3847 16.1071C30.2026 15.0958 29.9333 12.5904 29.396 11.2575C27.7758 7.2376 25.555 5.07252 21.7785 4.70332C18.5851 4.39111 15.3259 6.00603 13.4544 7.25004Z"
                fill="#F37C0E"
              />
              <path
                d="M24.3433 14.9364C24.5273 14.7561 24.7875 14.6379 25.0413 14.669C25.1048 14.6752 25.1746 14.6939 25.2253 14.7374C25.3332 14.8245 25.3205 14.98 25.3268 15.1168C25.3776 16.0683 25.0476 17.7226 24.686 17.9154C24.3243 18.1082 24.0324 17.9403 23.8674 17.7226C23.5438 17.2935 23.6326 16.3669 23.9499 15.5832C24.0451 15.3469 24.1656 15.1168 24.3496 14.9364H24.3433Z"
                fill="#3A3937"
              />
              <path
                d="M19.3394 14.9364C19.5234 14.7561 19.7836 14.6379 20.0374 14.669C20.1009 14.6752 20.1706 14.6939 20.2214 14.7374C20.3293 14.8245 20.3166 14.98 20.3229 15.1168C20.3737 16.0683 20.0437 17.7226 19.6821 17.9154C19.3204 18.1082 19.0285 17.9403 18.8635 17.7226C18.5399 17.2935 18.6287 16.3669 18.946 15.5832C19.0412 15.3469 19.1617 15.1168 19.3457 14.9364H19.3394Z"
                fill="#3A3937"
              />
            </svg>
            <p>我要找...</p>
          </div>
        </h3>
        <div className="searchBoxs grid grid-cols-2 gap-3">
          {searchCards.map(({ href, title, subtitle, Icon }) => (
            <SearchCardLink className="boxLink" key={title} href={href} gaLabel={title}>
              <h3>{title}</h3>
              <small>{subtitle}</small>
              <Icon />
            </SearchCardLink>
          ))}
        </div>

        {/* 常見問題 */}
        <HomeFaqSection />

        {/* 網站公告 */}
        <HomeAnnouncementsSection />

        <h3 className="homeTitle pb-3 pt-8">
          <div className="flex items-center gap-2">
            <p>其他</p>
          </div>
        </h3>

        <div className="grid grid-cols-2 gap-3">
          <SearchCardLink
            href="/volunteer/about-us"
            gaLabel="關於我們"
            className="boxLink col-span-1 text-center text-[16px]"
            style={{
              backgroundColor: 'rgba(23, 155, 198, 1)',
              color: 'white',
              lineHeight: '44px',
              borderRadius: '12px',
            }}
          >
            關於我們
          </SearchCardLink>
          <SearchCardLink
            href="https://docs.google.com/forms/d/e/1FAIpQLSeZ1v6jp7TtVXc2YVExpHKhVpqu4KubOLNj8147C8nUXm1PRQ/viewform?usp=dialog"
            gaLabel="聯絡我們"
            className="boxLink col-span-1 text-center text-[16px]"
            target="_blank"
            style={{
              backgroundColor: 'rgba(23, 155, 198, 1)',
              color: 'white',
              lineHeight: '44px',
              borderRadius: '12px',
            }}
          >
            聯絡我們
          </SearchCardLink>
          <SearchCardLink
            href="https://docs.google.com/forms/d/e/1FAIpQLSd5HQsSMoStkgiaC-q3bHRaLVVGNKdETWIgZVoYEsyzE486ew/viewform?usp=dialog"
            gaLabel="網站問題回報"
            className="boxLink col-span-2 text-center text-[16px]"
            target="_blank"
            style={{
              border: '1px solid rgba(58, 57, 55, 1)',
              lineHeight: '44px',
              borderRadius: '12px',
            }}
          >
            網站問題回報
          </SearchCardLink>
        </div>
      </Suspense>
    </PageLayout>
  );
}
