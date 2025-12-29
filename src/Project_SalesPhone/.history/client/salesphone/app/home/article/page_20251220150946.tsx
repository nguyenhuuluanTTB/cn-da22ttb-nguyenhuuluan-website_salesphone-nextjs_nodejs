"use client"

import Link from 'next/link';
import Image from 'next/image';
import styles from '../home.module.scss';
import articles from '../articlesData';

export default function ArticlesPage() {
  return (
    <section className={styles.wrapper_baiviet} style={{padding: '2rem 0'}}>
      <div className={styles.container_baiviet} style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
        <div style={{display: 'flex', gap: '0.75rem', alignItems: 'center'}}>
          <span style={{fontSize: '24px'}}>📝</span>
          <div>
            <div style={{fontSize: '18px', fontWeight: 700}}>BÀI VIẾT</div>
            <div style={{color: '#666'}}>Tổng hợp tin tức, đánh giá và thủ thuật</div>
          </div>
        </div>
        <Link href="/home">
          <a style={{color: '#A70000'}}>Về trang chủ</a>
        </Link>
      </div>

      <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(280px,1fr))', gap: '1rem', marginTop: '1rem'}}>
        {articles.map((a) => (
          <article key={a.id} style={{background: '#fff', borderRadius: 8, padding: 12, boxShadow: '0 1px 4px rgba(0,0,0,0.06)'}}>
            <Link href={`/home/article/${a.id}`}>
              <a style={{textDecoration: 'none', color: 'inherit'}}>
                <Image src={a.image} alt={a.title} width={600} height={340} style={{borderRadius: 6}} />
                <h3 style={{marginTop: 8}}>{a.title}</h3>
                <p style={{color: '#666', fontSize: 14}}>{a.excerpt}</p>
                <div style={{display: 'flex', justifyContent: 'space-between', marginTop: 8, color: '#999'}}>
                  <span>{a.date}</span>
                  <span>❤️ {a.like} • 💬 {a.cmt}</span>
                </div>
              </a>
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}
