
"use client";

import { useState, type FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { createTemplate } from '@/lib/api';
import type { Template, Block } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { PlusCircle, Trash2, ArrowUp, ArrowDown, GripVertical, Loader2 } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

type TemplateBlockStructure = Pick<Block, 'type' | 'id'>;

export default function CreateTemplatePage() {
  const router = useRouter();
  const { toast } = useToast();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [blockStructure, setBlockStructure] = useState<TemplateBlockStructure[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const addBlockToStructure = (type: Block['type']) => {
    setBlockStructure([...blockStructure, { id: `tpl_block_${Date.now()}`, type }]);
  };

  const removeBlockFromStructure = (index: number) => {
    setBlockStructure(blockStructure.filter((_, i) => i !== index));
  };
  
  const moveBlock = (index: number, direction: 'up' | 'down') => {
    const newStructure = [...blockStructure];
    const item = newStructure[index];
    newStructure.splice(index, 1);
    if (direction === 'up') {
      newStructure.splice(Math.max(0, index - 1), 0, item);
    } else {
      newStructure.splice(Math.min(newStructure.length, index + 1), 0, item);
    }
    setBlockStructure(newStructure);
  };


  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (blockStructure.length === 0) {
      toast({
        title: "Template Empty",
        description: "Please add at least one block to the template structure.",
        variant: "destructive",
      });
      return;
    }
    setIsLoading(true);

    const templateData: Omit<Template, 'id'> = {
      name,
      description,
      blockStructure,
    };

    try {
      const newTemplate = await createTemplate(templateData);
      toast({
        title: "Template Saved!",
        description: `Template "${newTemplate.name}" has been created.`,
      });
      // Optionally, redirect to a page showing all templates or back to create article page
      router.push('/'); // For now, redirect to feed
    } catch (error) {
      console.error("Failed to create template:", error);
      toast({
        title: "Error",
        description: "Could not save the template. Please try again.",
        variant: "destructive",
      });
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <Card className="shadow-xl">
        <CardHeader>
          <CardTitle className="text-3xl font-bold">Create New Template</CardTitle>
          <CardDescription>Define the structure for your future articles.</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="templateName">Template Name</Label>
              <Input id="templateName" value={name} onChange={e => setName(e.target.value)} placeholder="e.g., My Awesome Story Template" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="templateDescription">Description (Optional)</Label>
              <Textarea id="templateDescription" value={description} onChange={e => setDescription(e.target.value)} placeholder="A short description of this template" />
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-foreground">Template Structure</h3>
              {blockStructure.length === 0 && (
                <p className="text-sm text-muted-foreground p-4 border border-dashed rounded-md text-center">
                  No blocks added yet. Click below to add blocks to your template.
                </p>
              )}
              <ul className="space-y-3">
                {blockStructure.map((block, index) => (
                  <li key={block.id} className="flex items-center space-x-2 p-3 bg-secondary/50 rounded-md border">
                    <GripVertical className="h-5 w-5 text-muted-foreground cursor-grab" />
                    <span className="flex-grow font-medium capitalize">{block.type} Block</span>
                    <Button type="button" variant="ghost" size="icon" onClick={() => moveBlock(index, 'up')} disabled={index === 0}>
                      <ArrowUp className="h-4 w-4" />
                    </Button>
                    <Button type="button" variant="ghost" size="icon" onClick={() => moveBlock(index, 'down')} disabled={index === blockStructure.length - 1}>
                      <ArrowDown className="h-4 w-4" />
                    </Button>
                    <Button type="button" variant="ghost" size="icon" className="text-destructive hover:text-destructive" onClick={() => removeBlockFromStructure(index)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </li>
                ))}
              </ul>
              <div className="flex items-center space-x-2 pt-2">
                <Select onValueChange={(value: Block['type']) => addBlockToStructure(value)}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Add block type..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="heading">Heading</SelectItem>
                    <SelectItem value="paragraph">Paragraph</SelectItem>
                    <SelectItem value="image">Image</SelectItem>
                  </SelectContent>
                </Select>
                 <Button type="button" variant="outline" onClick={() => addBlockToStructure('heading')}>
                  <PlusCircle className="mr-2 h-4 w-4" /> Add Heading
                </Button>
                 <Button type="button" variant="outline" onClick={() => addBlockToStructure('paragraph')}>
                  <PlusCircle className="mr-2 h-4 w-4" /> Add Paragraph
                </Button>
                 <Button type="button" variant="outline" onClick={() => addBlockToStructure('image')}>
                  <PlusCircle className="mr-2 h-4 w-4" /> Add Image
                </Button>
              </div>
               <p className="text-xs text-muted-foreground">
                This defines the order and type of content blocks. Actual content will be added when creating an article using this template.
              </p>
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
              {isLoading ? 'Saving...' : 'Save Template'}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
