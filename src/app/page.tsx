
import { getArticles } from '@/lib/api';
import { ArticleCard } from '@/components/feed/ArticleCard';
import type { Article } from '@/lib/types';

export default async function FeedPage() {
  const articles: Article[] = await getArticles();

  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold tracking-tight text-foreground">Latest Stories</h1>
      {articles.length === 0 ? (
        <p className="text-muted-foreground">No articles yet. Be the first to create one!</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map(article => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      )}
    </div>
  );
}
