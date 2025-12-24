"use client";
import React, { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import styles from './search.module.scss';
import Image from 'next/image';

export default function SearchPage(){
  const searchParams = useSearchParams();
  const router = useRouter();
  const q = searchParams.get('q') || '';
  const minPriceParam = searchParams.get('minPrice') || '';
  const maxPriceParam = searchParams.get('maxPrice') || '';
  const colorParam = searchParams.get('color') || '';
  const ramParam = searchParams.get('ram') || '';
  const romParam = searchParams.get('rom') || '';
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [minPrice, setMinPrice] = useState(minPriceParam);
  const [maxPrice, setMaxPrice] = useState(maxPriceParam);
  const [color, setColor] = useState(colorParam);
  const [ram, setRam] = useState(ramParam);
  const [rom, setRom] = useState(romParam);

  useEffect(() => {
    // Build query string with provided filters
    const params = new URLSearchParams();
    if (q) params.append('q', q);
    if (minPriceParam) params.append('minPrice', minPriceParam);
    if (maxPriceParam) params.append('maxPrice', maxPriceParam);
    if (colorParam) params.append('color', colorParam);
    if (ramParam) params.append('ram', ramParam);
    if (romParam) params.append('rom', romParam);
    const queryString = params.toString();
    if (!queryString) return setResults([]);
    setLoading(true);
    fetch(`http://localhost:5000/api/product/search?${queryString}`)
      .then(res => res.json())
      .then(data => {
        setResults(data.data || []);
      })
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, [q, minPriceParam, maxPriceParam, colorParam, ramParam, romParam]);

  return (
    <section className={styles.searchPage}>
      <div className={styles.container}>
        <h2>Kết quả tìm kiếm cho "{q}"</h2>
        <form className={styles.filters} onSubmit={(e) => {
          e.preventDefault();
          const params = new URLSearchParams();
          if (q) params.append('q', q);
          if (minPrice) params.append('minPrice', minPrice);
          if (maxPrice) params.append('maxPrice', maxPrice);
          if (color) params.append('color', color);
          if (ram) params.append('ram', ram);
          if (rom) params.append('rom', rom);
          router.push(`/search?${params.toString()}`);
        }}>
          <div className={styles.filterRow}>
            <label>Giá từ</label>
            <input type="number" value={minPrice} onChange={e => setMinPrice(e.target.value)} placeholder="min" />
            <label>đến</label>
            <input type="number" value={maxPrice} onChange={e => setMaxPrice(e.target.value)} placeholder="max" />
          </div>
          <div className={styles.filterRow}>
            <label>Màu</label>
            <input value={color} onChange={e => setColor(e.target.value)} placeholder="Ví dụ: Đỏ,Đen" />
            <label>RAM</label>
            <input value={ram} onChange={e => setRam(e.target.value)} placeholder="Ví dụ: 8GB,4GB" />
            <label>ROM</label>
            <input value={rom} onChange={e => setRom(e.target.value)} placeholder="Ví dụ: 128GB" />
          </div>
          <div>
            <button type="submit">Áp dụng bộ lọc</button>
          </div>
        </form>

        {loading && <div>Đang tìm...</div>}
        {!loading && results.length === 0 && <div>Không tìm thấy sản phẩm phù hợp.</div>}

        <div className={styles.grid}>
          {results.map(item => (
            <a key={item.id_product} href={`/home/detail_product/${item.product_code}`} className={styles.card}>
              <div className={styles.imgWrap}>
                <Image src={item.image_url || '/logo.png'} alt={item.name_product} width={200} height={200} />
              </div>
              <div className={styles.info}>
                <h3>{item.name_product}</h3>
                <p className={styles.brand}>{item.brand}</p>
                <p className={styles.price}>{Number(item.price).toLocaleString('vi-VN')}₫</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
