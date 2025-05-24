
import { getArticleById } from '@/lib/api';
import { ArticleDisplay } from '@/components/article/ArticleDisplay';
import { notFound } from 'next/navigation';
import { User, CalendarDays } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

interface ArticlePageProps {
  params: { id: string };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const article = await getArticleById(params.id);

  if (!article) {
    notFound();
  }
  
  const formattedDate = article.createdAt 
    ? new Date(article.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
    : 'N/A';

  return (
    <div className="max-w-4xl mx-auto py-8">
      <Button variant="outline" asChild className="mb-8">
        <Link href="/">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Feed
        </Link>
      </Button>
      <header className="mb-12 text-center border-b pb-8">
        <h1 className="text-5xl font-extrabold tracking-tight text-foreground mb-4">{article.title}</h1>
        <div className="flex justify-center items-center space-x-4 text-sm text-muted-foreground">
          {article.author && (
            <div className="flex items-center">
              <User className="w-4 h-4 mr-1.5" />
              <span>{article.author}</span>
            </div>
          )}
          {article.createdAt && (
             <div className="flex items-center">
              <CalendarDays className="w-4 h-4 mr-1.5" />
              <span>Published on {formattedDate}</span>
            </div>
          )}
        </div>
      </header>
      
      <ArticleDisplay blocks={article.blocks} />
    </div>
  );
}
