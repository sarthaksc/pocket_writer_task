
import type { Article, Template, Block } from './types';

let articles: Article[] = [
  {
    id: '1',
    title: 'The Journey of a Thousand Bytes',
    thumbnailUrl: 'https://placehold.co/600x400.png',
    preview: 'Discover the amazing world of digital storytelling and how bits and bytes come together to create compelling narratives.',
    author: 'AI Storyteller',
    createdAt: new Date(Date.now() - 86400000 * 2).toISOString(), // 2 days ago
    blocks: [
      { id: 'b1', type: 'heading', content: 'Chapter 1: The Spark' },
      { id: 'b2', type: 'paragraph', content: 'It all began with a single idea, a flicker in the vast expanse of the digital cosmos. This is the story of that spark.' },
      { id: 'b3', type: 'image', content: 'https://placehold.co/800x500.png' },
      { id: 'b4', type: 'paragraph', content: 'The journey was long and arduous, filled with challenges and triumphs. But the vision remained clear.' },
    ],
  },
  {
    id: '2',
    title: 'Whispers of the Ancient Code',
    thumbnailUrl: 'https://placehold.co/600x400.png',
    preview: 'Unravel the mysteries of an age-old digital language, its secrets hidden deep within the silicon.',
    author: 'Code Weaver',
    createdAt: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
    blocks: [
      { id: 'b1', type: 'heading', content: 'Prologue: Echoes from the Past' },
      { id: 'b2', type: 'paragraph', content: 'Legends spoke of a powerful code, one that could shape realities. Few believed, until now.' },
      { id: 'b3', type: 'image', content: 'https://placehold.co/800x500.png' },
      { id: 'b4', type: 'paragraph', content: 'Follow our protagonists as they decipher the ancient scripts and unlock its potential.' },
    ],
  },
  {
    id: '3',
    title: 'Chronicles of the Cloud Kingdom',
    thumbnailUrl: 'https://placehold.co/600x400.png',
    preview: 'A tale of floating islands, ethereal data streams, and the guardians who protect the digital realms above.',
    author: 'Sky Scribe',
    createdAt: new Date().toISOString(),
    blocks: [
      { id: 'b1', type: 'heading', content: 'The Floating Citadel' },
      { id: 'b2', type: 'paragraph', content: 'High above the terrestrial networks lies the Cloud Kingdom, a marvel of modern engineering and ancient magic.' },
      { id: 'b3', type: 'paragraph', content: 'This is the saga of its protectors and the challenges they face.' },
    ],
  },
];

let templates: Template[] = [
  {
    id: 't1',
    name: 'Basic Story Layout',
    description: 'A simple template with a heading, paragraph, and an image.',
    blockStructure: [
      { id: 'template_b1', type: 'heading' },
      { id: 'template_b2', type: 'paragraph' },
      { id: 'template_b3', type: 'image' },
      { id: 'template_b4', type: 'paragraph' },
    ],
  },
  {
    id: 't2',
    name: 'Image Focused Template',
    description: 'A template that emphasizes visual storytelling with multiple image blocks.',
    blockStructure: [
      { id: 'template_b1', type: 'heading' },
      { id: 'template_b2', type: 'image' },
      { id: 'template_b3', type: 'paragraph' },
      { id: 'template_b4', type: 'image' },
    ],
  }
];

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export async function getArticles(): Promise<Article[]> {
  await delay(500);
  return [...articles].sort((a, b) => new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime());
}

export async function getArticleById(id: string): Promise<Article | undefined> {
  await delay(300);
  return articles.find(article => article.id === id);
}

export async function createArticle(articleData: Omit<Article, 'id' | 'createdAt'>): Promise<Article> {
  await delay(700);
  const newArticle: Article = {
    ...articleData,
    id: String(Date.now()), // Simple unique ID
    createdAt: new Date().toISOString(),
  };
  articles.unshift(newArticle); // Add to the beginning
  return newArticle;
}

export async function getTemplates(): Promise<Template[]> {
  await delay(400);
  return [...templates];
}

export async function getTemplateById(id: string): Promise<Template | undefined> {
  await delay(200);
  return templates.find(template => template.id === id);
}

export async function createTemplate(templateData: Omit<Template, 'id'>): Promise<Template> {
  await delay(600);
  const newTemplate: Template = {
    ...templateData,
    id: String(Date.now() + '_template'), // Simple unique ID
  };
  templates.push(newTemplate);
  return newTemplate;
}
