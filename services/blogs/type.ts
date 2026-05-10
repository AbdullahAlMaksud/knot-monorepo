export interface BlogContent {
  order: number;
  type: "text" | "image" | "video";
  content: string;
  contentKey?: string;
}

export interface Blog {
  _id: string;
  title: string;
  slug: string;
  category: string;
  tags: string[];
  status: string;
  isFeatured: boolean;
  contents: BlogContent[];
  createdAt: string;
  updatedAt: string;
}
