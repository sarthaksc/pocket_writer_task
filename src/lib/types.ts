
export interface Block {
  id: string;
  type: 'heading' | 'paragraph' | 'image';
  content: string; // For text blocks, this is the text. For image blocks, this is the image URL.
}

export interface Article {
  id: string;
  title: string;
  thumbnailUrl: string;
  preview: string; // Short preview text
  author?: string; // Optional author name
  createdAt?: string; // Optional creation date
  blocks: Block[]; // Full content as blocks
}

export interface Template {
  id:string;
  name: string;
  description?: string;
  blockStructure: Pick<Block, 'type' | 'id'>[]; // Defines the sequence and type of blocks
}
