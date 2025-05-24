
"use client";

import { useState, type FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { createArticle } from '@/lib/api';
import type { Article, Block } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';

export default function CreateArticlePage() {
  const router = useRouter();
  const { toast } = useToast();
  const [title, setTitle] = useState('');
  const [thumbnailUrl, setThumbnailUrl] = useState('');
  const [preview, setPreview] = useState('');
  const [author, setAuthor] = useState('');
  const [blocks, setBlocks] = useState<Block[]>([
    { id: 'block1', type: 'heading', content: '' },
    { id: 'block2', type: 'paragraph', content: '' },
  ]);
  const [isLoading, setIsLoading] = useState(false);

  const handleBlockChange = (index: number, field: keyof Block, value: string) => {
    const newBlocks = [...blocks];
    // @ts-ignore TODO: Fix this type error if Block content can be different types
    newBlocks[index][field] = value;
    setBlocks(newBlocks);
  };
  
  const addBlock = (type: Block['type']) => {
    setBlocks([...blocks, { id: `block${Date.now()}`, type, content: '' }]);
  };

  const removeBlock = (index: number) => {
    setBlocks(blocks.filter((_, i) => i !== index));
  };


  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setIsLoading(true);

    const articleData: Omit<Article, 'id' | 'createdAt'> = {
      title,
      thumbnailUrl: thumbnailUrl || 'https://placehold.co/600x400.png', // Default placeholder
      preview,
      author,
      blocks: blocks.filter(block => block.content.trim() !== ''), // Only submit non-empty blocks
    };

    try {
      const newArticle = await createArticle(articleData);
      toast({
        title: "Article Published!",
        description: `"${newArticle.title}" is now live.`,
      });
      router.push(`/articles/${newArticle.id}`);
    } catch (error) {
      console.error("Failed to create article:", error);
      toast({
        title: "Error",
        description: "Could not publish the article. Please try again.",
        variant: "destructive",
      });
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <Card className="shadow-xl">
        <CardHeader>
          <CardTitle className="text-3xl font-bold">Create New Article</CardTitle>
          <CardDescription>Fill in the details below to publish your story.</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input id="title" value={title} onChange={e => setTitle(e.target.value)} placeholder="Your captivating title" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="author">Author (Optional)</Label>
              <Input id="author" value={author} onChange={e => setAuthor(e.target.value)} placeholder="Your name or pen name" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="thumbnailUrl">Thumbnail URL (Optional)</Label>
              <Input id="thumbnailUrl" type="url" value={thumbnailUrl} onChange={e => setThumbnailUrl(e.target.value)} placeholder="https://example.com/image.png" />
               <p className="text-xs text-muted-foreground">If empty, a default placeholder will be used.</p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="preview">Short Preview (for feed)</Label>
              <Textarea id="preview" value={preview} onChange={e => setPreview(e.target.value)} placeholder="A brief teaser of your article (1-2 sentences)" required />
            </div>
            
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-foreground">Article Content</h3>
              {blocks.map((block, index) => (
                <Card key={block.id} className="p-4 bg-secondary/50">
                  <div className="space-y-2">
                    <Label htmlFor={`block-type-${index}`}>Block Type: {block.type}</Label>
                     {block.type === 'heading' && (
                       <Input 
                         id={`block-content-${index}`} 
                         value={block.content} 
                         onChange={e => handleBlockChange(index, 'content', e.target.value)} 
                         placeholder="Heading text"
                       />
                     )}
                     {block.type === 'paragraph' && (
                       <Textarea 
                         id={`block-content-${index}`} 
                         value={block.content} 
                         onChange={e => handleBlockChange(index, 'content', e.target.value)} 
                         placeholder="Paragraph text"
                       />
                     )}
                     {block.type === 'image' && (
                       <Input 
                         id={`block-content-${index}`} 
                         type="url" 
                         value={block.content} 
                         onChange={e => handleBlockChange(index, 'content', e.target.value)} 
                         placeholder="Image URL (e.g., https://placehold.co/800x500.png)"
                       />
                     )}
                    <Button type="button" variant="destructive" size="sm" onClick={() => removeBlock(index)}>Remove Block</Button>
                  </div>
                </Card>
              ))}
              <div className="flex space-x-2">
                <Button type="button" variant="outline" onClick={() => addBlock('heading')}>Add Heading</Button>
                <Button type="button" variant="outline" onClick={() => addBlock('paragraph')}>Add Paragraph</Button>
                <Button type="button" variant="outline" onClick={() => addBlock('image')}>Add Image</Button>
              </div>
            </div>

          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
              {isLoading ? 'Publishing...' : 'Publish Article'}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
