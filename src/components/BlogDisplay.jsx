const BlogDisplay = ({ htmlContent }) => {
  return (
    <article className="prose prose-lg dark:prose-invert max-w-3xl mx-auto">
      <div
        className="blog-content"
        dangerouslySetInnerHTML={{ __html: htmlContent }}
      />
      <style>{`
        .blog-content pre {
          background: #1f2937;
          border-radius: 8px;
          padding: 0 !important;
          margin: 20px 0;
          overflow-x: auto;
          border: 1px solid #374151;

          /* IMPORTANT for indentation */
          white-space: pre;       /* or pre-wrap if you want wrapping */
          tab-size: 2;            /* match editor tabSize */
        }

        .blog-content pre code {
          background: transparent !important;
          color: #e5e7eb;
          font-family: "Fira Code", monospace;
          font-size: 14px;
          line-height: 1.6;
          padding: 16px !important;
          display: block;
        }

        .blog-content code:not(pre code) {
          background: #f3f4f6;
          color: #1f2937;
          padding: 2px 6px;
          border-radius: 3px;
          font-family: "Fira Code", monospace;
          font-size: 0.9em;
        }

        @media (prefers-color-scheme: dark) {
          .blog-content code:not(pre code) {
            background: #374151;
            color: #e5e7eb;
          }
        }
      `}</style>
    </article>
  );
};

export default BlogDisplay;