// MarkdownRenderer.tsx
import 'katex/dist/katex.min.css';

import React from 'react';
import Markdown from 'react-markdown';
import rehypeKatex from 'rehype-katex';
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';

type MarkdownRendererProps = {
  content: string;
};

export default function MarkdownViewer({ content }: MarkdownRendererProps) {
  return (
    <Markdown
      remarkPlugins={[remarkMath, remarkGfm]}
      rehypePlugins={[rehypeRaw, rehypeKatex]}
      components={{
        hr: () => <hr className="my-8 border-gray-300" />,
        h1: ({ children }) => (
          <h1 className="text-3xl font-bold mt-4 mb-2">{children}</h1>
        ),
        h2: ({ children }) => (
          <h2 className="text-2xl font-semibold mt-3 mb-2">{children}</h2>
        ),
        h3: ({ children }) => (
          <h3 className="text-xl font-semibold mt-2 mb-1">{children}</h3>
        ),
        code({ className, children, ...props }) {
          return (
            <code
              className={`bg-gray-100 px-1 py-0.5 rounded ${className ?? ''}`}
              {...props}
            >
              {children}
            </code>
          );
        },
      }}
    >
      {content}
    </Markdown>
  );
}
