import { notFound } from 'next/navigation';
import articles from '../../articlesData';
import Image from 'next/image';

export default function ArticleDetail({ params }: { params: { id: string } }) {
  const id = parseInt(params.id, 10);
  const article = articles.find(a => a.id === id);
  if (!article) return notFound();
  return (
    <section style={{maxWidth: 900, margin: '0 auto', padding: '2rem 1rem'}}>
      <h1 style={{fontSize: '2rem', fontWeight: 800, color: '#A70000', marginBottom: 8}}>{article.title}</h1>
      <div style={{color: '#888', marginBottom: 16}}>{article.date} • ❤️ {article.like} • 💬 {article.cmt}</div>
      {article.image && (
        <div style={{marginBottom: 18}}>
          {typeof article.image === 'string' ? (
            <img src={article.image} alt={article.title} style={{width:'100%',borderRadius:8,maxHeight:350,objectFit:'cover'}} />
          ) : (
            <Image src={article.image} alt={article.title} width={900} height={350} style={{borderRadius:8,objectFit:'cover'}} />
          )}
        </div>
      )}
      <div style={{fontSize:'1.1rem',lineHeight:1.8, color:'#222'}}>{article.content}</div>
      <div style={{marginTop:32}}>
        <a href="/home" style={{color:'#A70000',fontWeight:600}}>← Quay lại trang chủ</a>
      </div>
    </section>
  );
}
