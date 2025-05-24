
import Link from 'next/link';
import Image from 'next/image';
import type { Article } from '@/lib/types';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, User, CalendarDays } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface ArticleCardProps {
  article: Article;
}

export function ArticleCard({ article }: ArticleCardProps) {
  const formattedDate = article.createdAt 
    ? new Date(article.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
    : 'N/A';

  return (
    <Card className="flex flex-col h-full overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
      <CardHeader className="p-0">
        <Link href={`/articles/${article.id}`} className="block">
          <Image
            src={article.thumbnailUrl}
            alt={article.title}
            width={600}
            height={300}
            className="w-full h-48 object-cover"
            data-ai-hint="article cover"
          />
        </Link>
      </CardHeader>
      <CardContent className="p-6 flex-grow">
        <Link href={`/articles/${article.id}`}>
           <CardTitle className="text-xl font-semibold mb-2 hover:text-primary transition-colors">{article.title}</CardTitle>
        </Link>
        <p className="text-muted-foreground text-sm line-clamp-3 mb-4">
          {article.preview}
        </p>
        <div className="text-xs text-muted-foreground space-y-1">
          {article.author && (
            <div className="flex items-center">
              <User className="w-3 h-3 mr-1.5" />
              <span>{article.author}</span>
            </div>
          )}
          {article.createdAt && (
             <div className="flex items-center">
              <CalendarDays className="w-3 h-3 mr-1.5" />
              <span>{formattedDate}</span>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="p-6 pt-0">
        <Button asChild variant="outline" className="w-full group">
          <Link href={`/articles/${article.id}`}>
            Read More
            <ArrowRight className="ml-2 h-4 w-4 transform transition-transform group-hover:translate-x-1" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
