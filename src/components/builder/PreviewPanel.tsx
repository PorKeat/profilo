'use client';

import { useAppSelector } from '@/store/hooks';
import { generateMarkdown } from '@/lib/markdown/generator';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Copy, Download, Eye, Code2 } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';

export function PreviewPanel() {
  const { blocks, themeId } = useAppSelector((state) => state.builder);
  
  // Real markdown for export
  const markdown = generateMarkdown(blocks, themeId, false);
  
  // Markdown with placeholder images for live preview
  const previewMarkdown = generateMarkdown(blocks, themeId, true);
  
  const handleCopy = () => {
    navigator.clipboard.writeText(markdown);
  };

  const handleDownload = () => {
    const blob = new Blob([markdown], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'README.md';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="w-[500px] xl:w-[600px] border-l bg-background flex flex-col h-full hidden lg:flex">
      <Tabs defaultValue="preview" className="flex flex-col h-full">
        <div className="p-4 border-b flex items-center justify-between bg-muted/10">
          <TabsList>
            <TabsTrigger value="preview" className="gap-2">
              <Eye className="w-4 h-4" /> Preview
            </TabsTrigger>
            <TabsTrigger value="code" className="gap-2">
              <Code2 className="w-4 h-4" /> Markdown
            </TabsTrigger>
          </TabsList>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={handleCopy}>
              <Copy className="w-4 h-4 mr-2" />
              Copy
            </Button>
            <Button size="sm" onClick={handleDownload}>
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
          </div>
        </div>
        
        <TabsContent value="preview" className="flex-1 overflow-y-auto m-0 data-[state=active]:flex flex-col">
          <div className="p-8 prose prose-slate dark:prose-invert max-w-none">
            {markdown ? (
              <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
                {previewMarkdown}
              </ReactMarkdown>
            ) : (
              <div className="text-center text-muted-foreground mt-20">
                Add sections to preview your README.
              </div>
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="code" className="flex-1 overflow-y-auto m-0 data-[state=active]:flex flex-col bg-muted/30">
          <div className="p-6">
            <pre className="text-xs font-mono whitespace-pre-wrap text-muted-foreground">
              {markdown || '<!-- Your markdown will appear here -->'}
            </pre>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
