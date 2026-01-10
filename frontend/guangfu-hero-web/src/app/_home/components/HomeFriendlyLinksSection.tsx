'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Facebook, Instagram, Launch } from '@mui/icons-material';
import { useEffect, useState, useRef } from 'react';
import { env } from '@/config/env';

interface FriendlyUnit {
    id: string;
    title: string;
    description: string;
    image: string;
    social: {
        ig: string;
        fb: string;
        web: string;
    };
}

type LoadingPhase = 'before' | 'during' | 'fadeOut' | 'done';

/**
 * 首頁「友好單位」區塊。
 * - 從 Google Sheet 以 CSV 方式抓取資料
 * - 支援 X 軸水平滑動 (含桌機滑鼠拖曳)
 */
export default function HomeFriendlyLinksSection() {
    const [units, setUnits] = useState<FriendlyUnit[]>([]);
    const [loadingPhase, setLoadingPhase] = useState<LoadingPhase>('before');
    const scrollRef = useRef<HTMLDivElement>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);

    const sheetId = env.NEXT_PUBLIC_GOOGLE_SHEET_ID;
    const gid = env.NEXT_PUBLIC_FRIENDLY_LINKS_SHEET_GID || '';
    const isConfigMissing = !sheetId || !gid;

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
        if (isConfigMissing) return;

        let isMounted = true;
        let fadeTimeout: ReturnType<typeof setTimeout> | undefined;

        const fetchFriendlyLinks = async () => {
            try {
                if (isMounted) setLoadingPhase('during');

                const csvUrl = `https://docs.google.com/spreadsheets/d/${sheetId}/export?format=csv&gid=${gid}`;
                const res = await fetch(csvUrl);
                const text = await res.text();

                if (text.includes('<!DOCTYPE') || text.includes('<html')) {
                    if (isMounted) setLoadingPhase('done');
                    return;
                }

                const rows = parseCsv(text);
                const parsedUnits: FriendlyUnit[] = rows
                    .slice(1)
                    .map((row, index) => {
                        const title = (row[0] || '').trim();
                        if (!title) return null;
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

                if (isMounted) {
                    setUnits(parsedUnits);
                    if (parsedUnits.length > 0) {
                        setLoadingPhase('fadeOut');
                        fadeTimeout = setTimeout(() => {
                            if (isMounted) setLoadingPhase('done');
                        }, 300);
                    } else {
                        setLoadingPhase('done');
                    }
                }
            } catch (error) {
                if (isMounted) setLoadingPhase('done');
            }
        };

        fetchFriendlyLinks();

        return () => {
            isMounted = false;
            if (fadeTimeout) clearTimeout(fadeTimeout);
        };
    }, [sheetId, gid, isConfigMissing]);

    // 桌機拖曳滑動邏輯
    const handleMouseDown = (e: React.MouseEvent) => {
        if (!scrollRef.current) return;
        setIsDragging(true);
        setStartX(e.pageX - scrollRef.current.offsetLeft);
        setScrollLeft(scrollRef.current.scrollLeft);
    };

    const handleMouseLeave = () => {
        setIsDragging(false);
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!isDragging || !scrollRef.current) return;
        e.preventDefault();
        const x = e.pageX - scrollRef.current.offsetLeft;
        const walk = (x - startX) * 2; // 滑動倍率
        scrollRef.current.scrollLeft = scrollLeft - walk;
    };

    if (isConfigMissing) return null;
    if (units.length === 0 && loadingPhase === 'done') return null;

    return (
        <>
            <h3 className="homeTitle pb-3 pt-8">
                <div className="flex items-center gap-2">
                    <p>友好單位</p>
                </div>
                <Link href="/friendly_links" className="flex items-center gap-1">
                    <p>看更多</p>
                    <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M16.6024 11.5557L8.92021 4L7 5.88859L13.7221 12.5L7 19.1114L8.92021 21L16.6024 13.4443C16.857 13.1938 17 12.8542 17 12.5C17 12.1458 16.857 11.8062 16.6024 11.5557Z"
                            fill="#838383"
                        />
                    </svg>
                </Link>
            </h3>

            <div className="home-loading-shell" style={{ minHeight: '136px' }}>
                {loadingPhase !== 'done' && (
                    <div className={`home-loading-skeleton home-loading-${loadingPhase}`} />
                )}

                <div
                    className={`home-loading-content${(loadingPhase === 'fadeOut' || loadingPhase === 'done') ? ' home-loading-content-show' : ''}`}
                >
                    <div className="friendly-links-shell">
                        <div
                            ref={scrollRef}
                            className="friendly-links-container"
                            onMouseDown={handleMouseDown}
                            onMouseLeave={handleMouseLeave}
                            onMouseUp={handleMouseUp}
                            onMouseMove={handleMouseMove}
                        >
                            {units.map(unit => (
                                <div key={unit.id} className="friendly-link-card">
                                    <div className="friendly-link-img">
                                        {unit.image ? (
                                            <Image
                                                src={unit.image}
                                                alt={unit.title}
                                                fill
                                                className="object-cover"
                                                unoptimized
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-gray-400 text-[10px]">
                                                No Image
                                            </div>
                                        )}
                                    </div>
                                    <div className="friendly-link-content">
                                        <h4 className="friendly-link-title truncate">{unit.title}</h4>
                                        <p className="friendly-link-description">
                                            {unit.description}
                                        </p>
                                        <div className="friendly-link-socials">
                                            {unit.social.ig && (
                                                <a href={unit.social.ig} target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                                                    <Instagram sx={{ fontSize: 20 }} />
                                                </a>
                                            )}
                                            {unit.social.fb && (
                                                <a href={unit.social.fb} target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                                                    <Facebook sx={{ fontSize: 20 }} />
                                                </a>
                                            )}
                                            {unit.social.web && (
                                                <a href={unit.social.web} target="_blank" rel="noopener noreferrer" aria-label="External Link">
                                                    <Launch sx={{ fontSize: 20 }} />
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
