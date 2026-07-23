import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { marked } from 'marked';

// --- CORE UTILITIES FOR MULTIPLE COLLECTIONS ---

export type BaseMetadata = {
  id: string;
  slug: string;
  title: string; // The primary identifier/name
  date: string;
  [key: string]: any; // Allow arbitrary fields for flexibility
};

export type BaseContent = BaseMetadata & {
  contentHtml: string;
  rawContent: string;
};

function getDirectoryPath(collection: string) {
  return path.join(process.cwd(), `content/${collection}`);
}

function ensureDirectoryExists(collection: string) {
  const dirPath = getDirectoryPath(collection);
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

export function getAllData(collection: string): BaseMetadata[] {
  ensureDirectoryExists(collection);
  const dirPath = getDirectoryPath(collection);
  const fileNames = fs.readdirSync(dirPath);
  
  const allData = fileNames
    .filter(fileName => fileName.endsWith('.md'))
    .map(fileName => {
      const slug = fileName.replace(/\.md$/, '');
      const fullPath = path.join(dirPath, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      
      const matterResult = matter(fileContents);

      return {
        slug,
        ...(matterResult.data as Omit<BaseMetadata, 'slug'>),
      };
    });

  // Sort by date (descending)
  return allData.sort((a, b) => {
    if (new Date(a.date) < new Date(b.date)) {
      return 1;
    } else {
      return -1;
    }
  });
}

export async function getDataBySlug(collection: string, slug: string): Promise<BaseContent | null> {
  const dirPath = getDirectoryPath(collection);
  const fullPath = path.join(dirPath, `${slug}.md`);
  
  if (!fs.existsSync(fullPath)) {
    return null;
  }
  
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const matterResult = matter(fileContents);
  
  const contentHtml = await marked(matterResult.content);

  return {
    slug,
    contentHtml,
    rawContent: matterResult.content,
    ...(matterResult.data as Omit<BaseMetadata, 'slug'>),
  };
}

// --- LEGACY WRAPPERS (For Articles) ---

export type ArticleMetadata = BaseMetadata & {
  category: string;
  author: string;
  excerpt: string;
  image: string;
};

export type ArticleContent = BaseContent & ArticleMetadata;

export function getAllArticles(): ArticleMetadata[] {
  return getAllData('articles') as ArticleMetadata[];
}

export async function getArticleData(slug: string): Promise<ArticleContent | null> {
  const data = await getDataBySlug('articles', slug);
  return data ? (data as ArticleContent) : null;
}
