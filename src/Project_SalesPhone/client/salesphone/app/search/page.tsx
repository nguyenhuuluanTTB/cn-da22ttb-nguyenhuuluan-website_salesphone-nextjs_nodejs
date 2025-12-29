"use client";
import React, { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import styles from './search.module.scss';
import Image from 'next/image';
import Link from 'next/link';

type SearchResult = {
  id_product: string;
  product_code: string;
  name_product: string;
  brand: string;
  price: number;
  image_url?: string;
  description_phone?: string;
  percent?: number;
  rate?: number;
  ram?: string;
  rom?: string;
  color?: string;
};

export default function SearchPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const q = searchParams.get('q') || '';
  const ram = searchParams.get('ram') || '';
  const rom = searchParams.get('rom') || '';
  const color = searchParams.get('color') || '';
  const brand = searchParams.get('brand') || '';
  const minPrice = searchParams.get('minPrice') || '';
  const maxPrice = searchParams.get('maxPrice') || '';

  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Check authentication
    const token = localStorage.getItem('token');
    if (!token) {
      window.dispatchEvent(new Event('showAuthPopup'));
      router.push('/home');
      return;
    }

    // Build query params
    const params = new URLSearchParams();
    if (q) params.append('q', q);
    if (ram) params.append('ram', ram);
    if (rom) params.append('rom', rom);
    if (color) params.append('color', color);
    if (brand) params.append('brand', brand);
    if (minPrice) params.append('minPrice', minPrice);
    if (maxPrice) params.append('maxPrice', maxPrice);

    // If no params at all, don't search
    if (params.toString() === '') {
      setResults([]);
      return;
    }

    setLoading(true);
    fetch(`http://localhost:5000/api/product/search?${params.toString()}`)
      .then(res => res.json())
      .then(data => {
        setResults(data.data || []);
      })
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, [q, ram, rom, color, brand, minPrice, maxPrice, router]);

  return (
    <section className={styles.searchPage}>
      <div className={styles.container}>
        <h2>
          {q ? `Kết quả tìm kiếm cho "${q}"` : 'Kết quả lọc sản phẩm'}
          {(ram || rom || color || brand || minPrice || maxPrice) && (
            <span style={{ fontSize: '0.8rem', display: 'block', marginTop: '8px', color: '#666' }}>
              {ram && ` RAM: ${ram}`}
              {rom && ` | ROM: ${rom}`}
              {color && ` | Màu: ${color}`}
              {brand && ` | Hãng: ${brand}`}
              {(minPrice || maxPrice) && ` | Giá: ${minPrice ? minPrice.toLocaleString() : '0'} - ${maxPrice ? maxPrice.toLocaleString() : '∞'}`}
            </span>
          )}
        </h2>
        {loading && <div>Đang tìm...</div>}
        {!loading && results.length === 0 && <div>Không tìm thấy sản phẩm phù hợp.</div>}

        <div className={styles.grid}>
          {results.map(item => {
            const discountedPrice = (item.percent && item.percent > 0)
              ? Math.round(item.price * (1 - item.percent / 100))
              : item.price;

            return (
              <Link key={item.id_product} href={`/home/detail_product/${item.product_code}`} style={{ textDecoration: 'none' }}>
                <div className={styles.card}>
                  <div className={styles.tragop_discount}>
                    <div className={styles.tragop}>Trả góp 0%</div>
                    {item.percent && item.percent > 0 && (
                      <div className={styles.discount_percent}>Giảm giá {item.percent}%</div>
                    )}
                  </div>

                  <img src={item.image_url || '/logo.png'} alt={item.name_product} className={styles.image} />

                  <div className={styles.name}>{item.name_product}</div>
                  <div className={styles.desc}>{item.description_phone}</div>

                  <div className={styles.price_star}>
                    <div className={styles.priceSection}>
                      {item.percent && item.percent > 0 ? (
                        <>
                          <span className={styles.newPrice}>{Number(discountedPrice).toLocaleString('vi-VN')} ₫</span>
                          <br />
                          <span className={styles.oldPrice}>{Number(item.price).toLocaleString('vi-VN')} ₫</span>
                        </>
                      ) : (
                        <span className={styles.newPrice}><br />{Number(item.price).toLocaleString('vi-VN')} ₫</span>
                      )}
                    </div>

                    <div className={styles.rate}>⭐ {item.rate ? Number(item.rate).toFixed(1) : '5.0'} / 5</div>
                  </div>

                  <div className={styles.thongso}>
                    <span>{item.ram || 'N/A'}</span>
                    <span>{item.rom || 'N/A'}</span>
                    <span>{item.color || 'N/A'}</span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

