"use client";
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import styles from './search.module.scss';
import Image from 'next/image';

export default function SearchPage(){
  const searchParams = useSearchParams();
  const q = searchParams.get('q') || '';
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if(!q) return setResults([]);
    setLoading(true);
    fetch(`http://localhost:5000/api/product/search?q=${encodeURIComponent(q)}`)
      .then(res => res.json())
      .then(data => {
        setResults(data.data || []);
      })
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, [q]);

  return (
    <section className={styles.searchPage}>
      <div className={styles.container}>
        <h2>Kết quả tìm kiếm cho "{q}"</h2>
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
