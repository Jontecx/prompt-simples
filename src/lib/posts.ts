import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { getCategoryByName, slugify } from "./site-config";

const POSTS_DIRECTORY = path.join(process.cwd(), "content", "posts");

export interface PostAuthor {
  name: string;
  role: string;
  bio: string;
}

export interface PostHeading {
  id: string;
  text: string;
  level: 2 | 3;
}

export interface PostMeta {
  slug: string;
  title: string;
  description: string;
  date: string;
  updatedAt: string;
  category: string;
  categorySlug: string;
  author: PostAuthor;
  readingTime: number;
  wordCount: number;
  tags: string[];
  featured: boolean;
  firstPrompt: string;
  firstPromptTitle: string;
  promptCount: number;
}

export interface Post extends PostMeta {
  content: string;
  headings: PostHeading[];
}

const DEFAULT_AUTHOR: PostAuthor = {
  name: "Jonatas Alcântara",
  role: "Fundador e Editor do Prompt Simples",
  bio: "Especialista em automação, Inteligência Artificial aplicada e engenharia de prompts traduzindo a IA para o dia a dia de profissionais e empresas no Brasil.",
};

function countWords(markdown: string): number {
  const cleaned = markdown
    .replace(/```[\s\S]*?```/g, (match) =>
      match.replace(/```[a-zA-Z]*\n?/g, "").replace(/```/g, "")
    )
    .replace(/[#>*_`~\[\]()|-]/g, " ")
    .trim();
  if (!cleaned) return 0;
  return cleaned.split(/\s+/).filter(Boolean).length;
}

export function extractHeadings(markdown: string): PostHeading[] {
  const lines = markdown.split(/\r?\n/);
  const headings: PostHeading[] = [];
  const usedIds = new Map<string, number>();
  let inCodeBlock = false;

  for (const rawLine of lines) {
    const line = rawLine.trim();
    if (line.startsWith("```")) {
      inCodeBlock = !inCodeBlock;
      continue;
    }
    if (inCodeBlock) continue;

    const match = /^(#{2,3})\s+(.+)$/.exec(line);
    if (!match) continue;

    const level = match[1].length as 2 | 3;
    const text = match[2]
      .replace(/\*\*(.*?)\*\*/g, "$1")
      .replace(/`([^`]+)`/g, "$1")
      .trim();

    const baseId = slugify(text);
    const count = usedIds.get(baseId) || 0;
    usedIds.set(baseId, count + 1);
    const id = count === 0 ? baseId : `${baseId}-${count}`;

    headings.push({ id, text, level });
  }

  return headings;
}

interface ExtractedPrompt {
  title: string;
  content: string;
}

export function extractPromptsFromMarkdown(markdown: string): ExtractedPrompt[] {
  const lines = markdown.split(/\r?\n/);
  const prompts: ExtractedPrompt[] = [];

  let i = 0;
  while (i < lines.length) {
    const trimmed = lines[i].trim();
    if (trimmed.startsWith("```")) {
      const info = trimmed.slice(3).trim();
      const lang = info.split(/\s+/)[0].toLowerCase();
      const titleMatch = /title="([^"]+)"/.exec(info);
      const blockLines: string[] = [];
      i++;
      while (i < lines.length && !lines[i].trim().startsWith("```")) {
        blockLines.push(lines[i]);
        i++;
      }
      i++; // skip closing ```

      if (lang === "prompt") {
        const content = blockLines.join("\n").trim();
        if (content) {
          prompts.push({
            title: titleMatch ? titleMatch[1] : "Prompt Prático",
            content,
          });
        }
      }
      continue;
    }
    i++;
  }

  return prompts;
}

function getPostFileNames(): string[] {
  if (!fs.existsSync(POSTS_DIRECTORY)) {
    return [];
  }
  return fs
    .readdirSync(POSTS_DIRECTORY)
    .filter((file) => file.endsWith(".mdx") || file.endsWith(".md"));
}

function parsePostFile(fileName: string): Post {
  const slug = fileName.replace(/\.(mdx|md)$/, "");
  const fullPath = path.join(POSTS_DIRECTORY, fileName);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  const categoryName = String(data.category || "Produtividade");
  const matchedCategory = getCategoryByName(categoryName);

  const wordCount = countWords(content);
  const readingTime = Math.max(1, Math.ceil(wordCount / 200));
  const headings = extractHeadings(content);
  const extractedPrompts = extractPromptsFromMarkdown(content);
  const firstPromptObj = extractedPrompts[0];

  const authorData: PostAuthor = {
    name: DEFAULT_AUTHOR.name,
    role:
      data.author && typeof data.author === "object" && data.author.role
        ? String(data.author.role)
        : DEFAULT_AUTHOR.role,
    bio:
      data.author && typeof data.author === "object" && data.author.bio
        ? String(data.author.bio)
        : DEFAULT_AUTHOR.bio,
  };

  return {
    slug,
    title: String(data.title || slug),
    description: String(data.description || ""),
    date: String(data.date || "2026-11-01"),
    updatedAt: String(data.updatedAt || data.date || "2026-11-01"),
    category: matchedCategory ? matchedCategory.name : categoryName,
    categorySlug: matchedCategory
      ? matchedCategory.slug
      : slugify(categoryName),
    author: authorData,
    readingTime,
    wordCount,
    tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
    featured: Boolean(data.featured),
    firstPrompt: firstPromptObj ? firstPromptObj.content : "",
    firstPromptTitle: firstPromptObj ? firstPromptObj.title : "Prompt Prático",
    promptCount: extractedPrompts.length,
    content,
    headings,
  };
}

export function getAllPosts(): PostMeta[] {
  const files = getPostFileNames();
  const posts = files.map((file) => {
    const { content: _content, headings: _headings, ...meta } = parsePostFile(file);
    return meta;
  });

  return posts.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getAllPostSlugs(): string[] {
  return getPostFileNames().map((file) => file.replace(/\.(mdx|md)$/, ""));
}

export function getPostBySlug(slug: string): Post | null {
  const mdxPath = path.join(POSTS_DIRECTORY, `${slug}.mdx`);
  const mdPath = path.join(POSTS_DIRECTORY, `${slug}.md`);

  if (fs.existsSync(mdxPath)) {
    return parsePostFile(`${slug}.mdx`);
  }
  if (fs.existsSync(mdPath)) {
    return parsePostFile(`${slug}.md`);
  }
  return null;
}

export function getPostsByCategory(categorySlug: string): PostMeta[] {
  return getAllPosts().filter((post) => post.categorySlug === categorySlug);
}

export function getRelatedPosts(
  currentSlug: string,
  categorySlug: string,
  limit = 3
): PostMeta[] {
  const all = getAllPosts().filter((post) => post.slug !== currentSlug);
  const sameCategory = all.filter((post) => post.categorySlug === categorySlug);
  const others = all.filter((post) => post.categorySlug !== categorySlug);
  return [...sameCategory, ...others].slice(0, limit);
}
