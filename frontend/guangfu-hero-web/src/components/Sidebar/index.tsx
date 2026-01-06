'use client';

import { useState } from 'react';
import CloseButton from './CloseButton';
import MenuItem from './MenuItem';
import SubMenuItem from './SubMenuItem';
import Image from 'next/image';
import { getAssetPath } from '@/lib/utils';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

type LinkItem = { name: string; href: string };
type GroupItem = { name: string; subItems: { name: string; href: string }[] };
const SIDEBAR_ITEM: (LinkItem | GroupItem)[] = [
  /*
  { name: '地圖列表', href: '/map' },
  {
    name: '志工資訊',
    subItems: [
      { name: '行前必讀', href: '/volunteer/preparation' },
      { name: '交通資訊', href: '/volunteer/transportation' },
      { name: '住宿資訊', href: '/volunteer/accommodations' },
    ],
  },
  {
    name: '居民協助',
    subItems: [
      { name: '庇護所', href: '/victim/shelter' },
      { name: '醫療站', href: '/victim/medical' },
      { name: '心理資源', href: '/victim/mental-health' },
      { name: '居家修繕', href: '/victim/house-repair' },
      { name: '補助貸款', href: '/victim/support-information' },
    ],
  },
  
  ** Turn these pages offline as the requirements are getting less **
  { name: '配送媒合', href: '/resources' },
  { name: '志工媒合', href: '/volunteer-register' },
   */
  { name: '補助貸款', href: '/victim/support-information' },
  { name: '居家修繕', href: '/victim/house-repair' },
  { name: '心理資源', href: '/victim/mental-health' },
  { name: '光復站點', href: '/victim/site' },
  // { name: '常見問題', href: '/faq' },
  { name: '關於我們', href: '/volunteer/about-us' },
  { name: '友好單位', href: '/friendly_links' },
  // { name: '隱私權政策', href: '/privacy' },
  // { name: '服務條款', href: '/terms' },
  {
    name: '聯絡我們',
    href: 'https://docs.google.com/forms/d/e/1FAIpQLSeZ1v6jp7TtVXc2YVExpHKhVpqu4KubOLNj8147C8nUXm1PRQ/viewform?usp=dialog',
  },
  {
    name: '網站問題回報',
    href: 'https://docs.google.com/forms/d/e/1FAIpQLSd5HQsSMoStkgiaC-q3bHRaLVVGNKdETWIgZVoYEsyzE486ew/viewform?usp=dialog',
  },
];

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  return (
    <>
      {/* Overlay */}
      {isOpen && <div className="fixed inset-0 backdrop-blur-sm z-1050" onClick={onClose} />}

      {/* Sidebar */}
      <div
        className={`z-1100 fixed top-0 left-0 h-full w-64 bg-[#3A3937] text-white transform transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <CloseButton onClose={onClose} />
        <nav className="flex flex-col">
          {SIDEBAR_ITEM.map((item, index) => {
            if ('subItems' in item && item.subItems) {
              return (
                <SubMenuItem
                  key={index}
                  item={item}
                  toggleSection={toggleSection}
                  expandedSection={expandedSection}
                  onClose={onClose}
                />
              );
            } else if ('href' in item && item.href) {
              return <MenuItem key={index} item={item} onClose={onClose} />;
            }
            return null;
          })}
        </nav>
        <a
          href="https://ocf.neticrm.tw/civicrm/contribute/transact?reset=1&id=88&utm_source=https%3A%2F%2Focf.neticrm.tw%2Fcivicrm%2Fcontribute%2Ftransact%3Freset%3D1%26id%3D76" // ← 換成你要去的路徑
          target="_blank"
          className="absolute w-full flex justify-center"
          style={{bottom:'24px',right:'3px'}}
        >
          <Image
            src={getAssetPath('/menu_donate_button.png')}
            alt="sidebar link"
            width={240}
            height={36}
            className="hover:opacity-80"
          />

        </a>
      </div>
    </>
  );
}
