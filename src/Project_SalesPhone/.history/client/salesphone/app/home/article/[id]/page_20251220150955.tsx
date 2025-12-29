import React from 'react';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import styles from '../../home.module.scss';
import articles from '../../articlesData';

type Props = { params: { id: string } };

export default function ArticleDetail({ params }: Props) {
  const id = parseInt(params.id, 10);
  const article = articles.find((a) => a.id === id);
  if (!article) {
    // use next/navigation notFound in server components, here we do a simple fallback
    return (
      <div style={{padding: '2rem'}}>
        <h2>Không tìm thấy bài viết</h2>
        <Link href="/home/article">Quay về danh sách bài viết</Link>
      </div>
    );
  }

  return (
    <article style={{padding: '2rem', maxWidth: 900, margin: '0 auto'}}>
      <h1 style={{fontSize: '28px', marginBottom: 6}}>{article.title}</h1>
      <div style={{color: '#888', marginBottom: 12}}>{article.date} • ❤️ {article.like} • 💬 {article.cmt}</div>
      <Image src={article.image} alt={article.title} width={900} height={450} style={{borderRadius: 8}} />
      <div style={{marginTop: 16, lineHeight: 1.8, color: '#333'}}>
        {article.content.split('\n').map((p, i) => (
          <p key={i} style={{marginBottom: 12}}>{p}</p>
        ))}
      </div>

      <div style={{marginTop: 20}}>
        <Link href="/home/article"><a style={{color: '#A70000'}}>← Quay lại danh sách bài viết</a></Link>
      </div>
    </article>
  );
}
