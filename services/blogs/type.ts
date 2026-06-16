export interface BlogContent {
  order: number;
  type: "TEXT" | "IMAGE" | "VIDEO";
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

export interface BlogMeta {
  page: number;
  limit: number;
  total: number;
  totalPage: number;
}

export interface PaginatedBlogsResponse {
  data: Blog[];
  meta: BlogMeta;
  message: string;
}

export interface BlogDetailResponse {
  data: Blog;
  message: string;
  meta: null;
}
