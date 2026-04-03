/**
 * Blog data module — imports all markdown posts at build time via Vite's
 * import.meta.glob and parses frontmatter. This gives the SPA access to
 * blog metadata (for the index grid) and raw markdown (for individual posts)
 * without needing a server or API.
 */

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  author: string;
  tags: string[];
  image: string;
  thumbnail: string; // path to thumbnail image (empty = use CSS gradient fallback)
  readTime: number;
  content: string; // raw markdown body (no frontmatter)
}

// Vite glob import — pulls every .md file as a raw string at build time
const markdownFiles = import.meta.glob('./posts/*.md', { eager: true, query: '?raw', import: 'default' }) as Record<string, string>;

function parseFrontmatter(raw: string): { data: Record<string, any>; content: string } {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  if (!match) return { data: {}, content: raw };

  const yamlBlock = match[1];
  const content = match[2];

  // Simple YAML parser for our flat frontmatter (handles strings, numbers, arrays)
  const data: Record<string, any> = {};
  for (const line of yamlBlock.split('\n')) {
    const kv = line.match(/^(\w+):\s*(.+)$/);
    if (!kv) continue;
    const [, key, rawVal] = kv;
    let val: any = rawVal.trim();

    // Remove surrounding quotes
    if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
      val = val.slice(1, -1);
    }
    // Array: [a, b, c]
    else if (val.startsWith('[') && val.endsWith(']')) {
      val = val.slice(1, -1).split(',').map((s: string) => s.trim());
    }
    // Number
    else if (!isNaN(Number(val)) && val !== '') {
      val = Number(val);
    }

    data[key] = val;
  }

  return { data, content };
}

function loadPosts(): BlogPost[] {
  const posts: BlogPost[] = [];

  for (const [path, raw] of Object.entries(markdownFiles)) {
    const { data, content } = parseFrontmatter(raw as string);

    // Derive slug from filename if not in frontmatter
    const filename = path.split('/').pop()?.replace('.md', '') || '';
    const slug = data.slug || filename.replace(/^\d{4}-\d{2}-\d{2}-/, '');

    posts.push({
      slug,
      title: data.title || 'Untitled',
      description: data.description || '',
      date: data.date ? String(data.date) : '',
      author: data.author || 'ExploreCapitals',
      tags: Array.isArray(data.tags) ? data.tags : [],
      image: data.image || '/og-image.png',
      thumbnail: data.thumbnail || '',
      readTime: typeof data.readTime === 'number' ? data.readTime : 6,
      content,
    });
  }

  // Sort by date descending
  posts.sort((a, b) => (b.date > a.date ? 1 : -1));
  return posts;
}

export const blogPosts: BlogPost[] = loadPosts();

export function getPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find(p => p.slug === slug);
}
