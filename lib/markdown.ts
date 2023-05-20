import { remark } from 'remark';
import html from 'remark-html';

export async function markdownToHTML(markdown: string): Promise<string> {
  const processedDescription = await remark().use(html).process(markdown);
  return processedDescription.toString();
}
