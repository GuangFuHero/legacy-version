import PageLayout from '@/components/PageLayout';
import VictimAssistance from '@/features/VictimAssistance';
import { Metadata } from 'next';
import { env } from '@/config/env';

import { Stack } from '@mui/material';
import Link from 'next/link';
import Image from 'next/image';
import { getAssetPath } from '@/lib/utils';
import ShareAction from '@/components/ShareAction';

export const generateMetadata = (): Metadata => {
  return {
    title: '居民協助 - 心理資源',
    description: '彙整花蓮光復周邊心理資源與支援資訊，協助民眾就近尋求心理健康支援。',
    openGraph: {
      title: '居民協助 - 心理資源',
      description: '彙整花蓮光復周邊心理資源與支援資訊，協助民眾就近尋求心理健康支援。',
      url: `${env.NEXT_PUBLIC_BASE_URL}/victim/mental-health`,
      type: 'website',
    },
  };
};

const socialLinks = [
  { path: '/thread_logo.svg', alt: 'thread', href: 'https://www.threads.com/@gunangfu250927' },
  { path: '/line_logo.svg', alt: 'line', href: 'line://ti/p/@hreco' },
  {
    path: '/instagram_logo.svg',
    alt: 'instagram',
    href: 'https://www.instagram.com/gunangfu250927/',
  },
  { path: '/fb_logo.svg', alt: 'fb', href: 'https://www.facebook.com/gunangfu250927' },
  { path: '/share.svg', alt: 'share', href: 'https://www.facebook.com/gunangfu250927' },
];

export default function VictimMentalHealthPage() {
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
      <VictimAssistance initialCategory="心理資源" />
    </PageLayout>
  );
}
