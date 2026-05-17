import fs from 'fs';
import path from 'path';

const rootDir = process.cwd();
const indexHtmlPath = path.join(rootDir, 'index.html');
const postsDir = path.join(rootDir, 'blog', 'posts');

let indexHtml = fs.readFileSync(indexHtmlPath, 'utf8');

// Read all blog posts
const files = fs.readdirSync(postsDir).filter(f => f.endsWith('.md'));
const posts = files.map(file => {
  const content = fs.readFileSync(path.join(postsDir, file), 'utf8');
  const slugMatch = content.match(/slug:\s*([^\n]+)/);
  const titleMatch = content.match(/title:\s*"([^"]+)"/);
  
  const slug = slugMatch ? slugMatch[1].trim() : file.replace(/^\d{4}-\d{2}-\d{2}-/, '').replace(/\.md$/, '');
  const title = titleMatch ? titleMatch[1].trim() : slug;
  return { slug, title };
});

// Generate HTML block for blogs
let blogHtml = `          <h2 style="font-size:1.4rem;margin-bottom:12px;">Recent Blog Posts</h2>\n`;
blogHtml += `          <div style="font-size:0.9rem;line-height:1.8;margin-bottom:24px;">\n`;
posts.forEach(post => {
  blogHtml += `            <a href="/blog/${post.slug}" style="color:#00C2FF;display:block;margin-bottom:4px;">${post.title}</a>\n`;
});
blogHtml += `          </div>\n`;

// Insert into index.html right before <h2 style="font-size:1.4rem;margin-bottom:12px;">Country Profiles</h2>
if (!indexHtml.includes('Recent Blog Posts')) {
  indexHtml = indexHtml.replace(
    '<h2 style="font-size:1.4rem;margin-bottom:12px;">Country Profiles</h2>',
    blogHtml + '          <h2 style="font-size:1.4rem;margin-bottom:12px;">Country Profiles</h2>'
  );
  fs.writeFileSync(indexHtmlPath, indexHtml);
  console.log('Successfully injected blog links into index.html <noscript> block.');
} else {
  console.log('Blog links already exist in index.html.');
}
