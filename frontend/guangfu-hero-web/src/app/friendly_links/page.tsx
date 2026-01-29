'use client';

import Wrapper from '@/features/Wrapper';
import Link from 'next/link';
import Image from 'next/image';
import { Facebook, Instagram, Launch } from '@mui/icons-material';
import { useEffect, useState } from 'react';
import { env } from '@/config/env';

interface FriendlyUnit {
  id: string; // generated from index
  title: string;
  description: string;
  image: string;
  social: {
    ig: string;
    fb: string;
    web: string;
  };
}

export default function FriendlyLinksPage() {
  const [units, setUnits] = useState<FriendlyUnit[]>([]);
  const [loading, setLoading] = useState(true);

  // Parse CSV function adapted from HomeFaqSection
  const parseCsv = (text: string): string[][] => {
    const rows: string[][] = [];
    let cur = '';
    let row: string[] = [];
    let inQuotes = false;
    for (let i = 0; i < text.length; i++) {
      const ch = text[i];
      if (inQuotes) {
        if (ch === '"') {
          if (text[i + 1] === '"') {
            cur += '"';
            i++;
          } else {
            inQuotes = false;
          }
        } else {
          cur += ch;
        }
      } else {
        if (ch === '"') {
          inQuotes = true;
        } else if (ch === ',') {
          row.push(cur);
          cur = '';
        } else if (ch === '\r') {
          // skip
        } else if (ch === '\n') {
          row.push(cur);
          rows.push(row);
          row = [];
          cur = '';
        } else {
          cur += ch;
        }
      }
    }
    row.push(cur);
    rows.push(row);
    return rows.filter(r => r.some(cell => cell.trim() !== ''));
  };

  useEffect(() => {
    const sheetId = env.NEXT_PUBLIC_GOOGLE_SHEET_ID;
    const gid = env.NEXT_PUBLIC_FRIENDLY_LINKS_SHEET_GID;

    if (!sheetId || !gid) {
      console.warn('Missing Google Sheet ID or GID');
      setLoading(false);
      return;
    }

    const fetchFriendlyLinks = async () => {
      try {
        const csvUrl = `https://docs.google.com/spreadsheets/d/${sheetId}/export?format=csv&gid=${gid}`;
        const res = await fetch(csvUrl);
        const text = await res.text();
        if (text.includes('<!DOCTYPE') || text.includes('<html')) {
          console.error('Failed to fetch CSV: content is HTML');
          setLoading(false);
          return;
        }

        const rows = parseCsv(text);
        // Expecting header row, so start from index 1
        // Mapping based on: Title, Description, Image, IG, FB, Web
        const parsedUnits: FriendlyUnit[] = rows
          .slice(1)
          .map((row, index) => {
            const title = (row[0] || '').trim();
            if (!title) return null; // Skip empty rows
            return {
              id: `unit-${index}`,
              title,
              description: (row[2] || '').trim(),
              image: (row[1] || '').trim(),
              social: {
                ig: (row[3] || '').trim(),
                fb: (row[4] || '').trim(),
                web: (row[5] || '').trim(),
              },
            };
          })
          .filter((u): u is FriendlyUnit => u !== null);

        setUnits(parsedUnits);
      } catch (error) {
        console.error('Error fetching friendly links:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFriendlyLinks();
  }, []);

  return (
    <Wrapper>
      <div className="max-w-4xl mx-auto lg:px-8 py-8 w-full">
        {/* Header Section */}
        <div className="flex items-center justify-between px-6 pb-4 border-b border-gray-200 mb-4">
          <h1 className="text-2xl font-bold text-gray-900">他們也一直在陪伴</h1>
          <Link href="/" className="flex items-center gap-1">
            回首頁
          </Link>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex flex-col gap-4 w-full">
            {[1, 2, 3].map(i => (
              <div key={i} className="bg-gray-100 rounded-2xl p-6 h-40 animate-pulse" />
            ))}
          </div>
        )}

        {/* Cards Grid */}
        {!loading && (
          <div className="grid gap-4 w-full px-6">
            {units.length > 0 ? (
              units.map(unit => (
                <div
                  key={unit.id}
                  className="bg-[#F9F8F5] rounded-xl p-6 flex flex-row gap-4 items-start"
                >
                  {/* Image / Placeholder */}
                  <div className="w-[80px] h-[80px] shrink-0 bg-gray-300 rounded-lg overflow-hidden relative">
                    {unit.image ? (
                      <Image
                        src={unit.image}
                        alt={unit.title}
                        fill
                        className="object-cover"
                        unoptimized // Allow external images
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400">
                        <span className="text-xs">No Image</span>
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-[20px] font-medium text-gray-900">{unit.title}</h3>
                    <p className="text-gray-600 text-[16px] leading-relaxed my-2 whitespace-pre-wrap">
                      {unit.description}
                    </p>

                    {/* Social Links */}
                    <div className="flex items-center gap-3">
                      {unit.social.ig && (
                        <a
                          href={unit.social.ig}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-700 hover:text-[#F37C0E] transition-colors"
                        >
                          <Instagram fontSize="medium" />
                        </a>
                      )}
                      {unit.social.fb && (
                        <a
                          href={unit.social.fb}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-700 hover:text-[#F37C0E] transition-colors"
                        >
                          <Facebook fontSize="medium" />
                        </a>
                      )}
                      {unit.social.web && (
                        <a
                          href={unit.social.web}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-700 hover:text-[#F37C0E] transition-colors"
                        >
                          <Launch fontSize="medium" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center text-gray-500 py-10">目前沒有資料</div>
            )}
          </div>
        )}
      </div>
    </Wrapper>
  );
}
