
import type { Block } from '@/lib/types';
import Image from 'next/image';

interface ArticleDisplayProps {
  blocks: Block[];
}

export function ArticleDisplay({ blocks }: ArticleDisplayProps) {
  return (
    <article className="prose prose-lg dark:prose-invert max-w-none mx-auto">
      {blocks.map(block => {
        switch (block.type) {
          case 'heading':
            return <h2 key={block.id} className="font-semibold text-3xl mt-8 mb-4 text-foreground">{block.content}</h2>;
          case 'paragraph':
            return <p key={block.id} className="text-foreground/90 leading-relaxed mb-4">{block.content}</p>;
          case 'image':
            return (
              <div key={block.id} className="my-8 relative aspect-video">
                <Image 
                  src={block.content} 
                  alt="Article image" 
                  layout="fill"
                  objectFit="contain"
                  className="rounded-lg shadow-md"
                  data-ai-hint="article illustration"
                />
              </div>
            );
          default:
            return null;
        }
      })}
    </article>
  );
}
