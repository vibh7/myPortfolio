// src/components/TiptapEditor.jsx
import React, { useCallback } from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import TextAlign from "@tiptap/extension-text-align";
import Strike from "@tiptap/extension-strike";

// Lowlight for syntax highlighting
import { createLowlight, common } from "lowlight";

const lowlight = createLowlight(common);

const TiptapEditor = ({ value = "", onChange }) => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: { levels: [1, 2, 3, 4] },
        codeBlock: false, // Disable default code block
      }),
      CodeBlockLowlight.configure({
        lowlight,
        enableTabIndentation: true,   // <– important
        tabSize: 2,                   // or 4 if you prefer
        defaultLanguage: "java",
      }),
      Underline,
      Strike,
      Link.configure({
        autolink: true,
        openOnClick: true,
        linkOnPaste: true,
      }),
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      
    ],
    parseOptions: {
      preserveWhitespace: "full",
    },
    content: value || "",
    onUpdate({ editor }) {
      onChange(editor.getHTML());
    },
  });

  if (!editor) return <div>Loading editor...</div>;

  const setLink = useCallback(() => {
    const oldUrl = editor.getAttributes("link").href;
    const url = window.prompt("Enter URL", oldUrl);

    if (url === null) return;

    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }

    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  }, [editor]);

  return (
    <div className="border rounded-lg mt-3 dark:border-gray-700 overflow-hidden">
      {/* Toolbar */}
      <div className="flex flex-wrap gap-2 p-2 border-b dark:border-gray-700 bg-gray-100 dark:bg-gray-900">
        {/* Headings */}
        {[1, 2, 3, 4].map((level) => (
          <button
            key={level}
            onClick={() => editor.chain().focus().toggleHeading({ level }).run()}
            className={`toolbar-btn ${
              editor.isActive("heading", { level }) ? "active-btn" : ""
            }`}
            title={`Heading ${level}`}
          >
            H{level}
          </button>
        ))}

        {/* Text Formatting */}
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`toolbar-btn ${editor.isActive("bold") ? "active-btn" : ""}`}
          title="Bold"
        >
          <b>B</b>
        </button>

        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`toolbar-btn ${editor.isActive("italic") ? "active-btn" : ""}`}
          title="Italic"
        >
          <i>I</i>
        </button>

        <button
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className={`toolbar-btn ${
            editor.isActive("underline") ? "active-btn" : ""
          }`}
          title="Underline"
        >
          U
        </button>

        <button
          onClick={() => editor.chain().focus().toggleStrike().run()}
          className={`toolbar-btn ${editor.isActive("strike") ? "active-btn" : ""}`}
          title="Strikethrough"
        >
          S
        </button>

        {/* Link */}
        <button
          onClick={setLink}
          className={`toolbar-btn ${editor.isActive("link") ? "active-btn" : ""}`}
          title="Add Link"
        >
          🔗
        </button>

        {/* Lists */}
        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`toolbar-btn ${
            editor.isActive("bulletList") ? "active-btn" : ""
          }`}
          title="Bullet List"
        >
          • List
        </button>

        <button
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={`toolbar-btn ${
            editor.isActive("orderedList") ? "active-btn" : ""
          }`}
          title="Ordered List"
        >
          1. List
        </button>

        {/* Quote */}
        <button
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={`toolbar-btn ${
            editor.isActive("blockquote") ? "active-btn" : ""
          }`}
          title="Blockquote"
        >
          ❝
        </button>

        {/* Code Block - NEW */}
        <button
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          className={`toolbar-btn ${
            editor.isActive("codeBlock") ? "active-btn" : ""
          }`}
          title="Code Block"
        >
          {"</>"}
        </button>

        {/* Undo / Redo */}
        <button
          onClick={() => editor.chain().focus().undo().run()}
          className="toolbar-btn"
          title="Undo"
        >
          ↶
        </button>

        <button
          onClick={() => editor.chain().focus().redo().run()}
          className="toolbar-btn"
          title="Redo"
        >
          ↷
        </button>
      </div>

      {/* Editor Content with Prose Styling */}
      <EditorContent
        editor={editor}
        className="p-4 min-h-[400px] prose prose-sm dark:prose-invert max-w-none focus:outline-none"
      />

      {/* CSS for toolbar buttons */}
      <style>{`
        .toolbar-btn {
          padding: 6px 12px;
          border: 1px solid #ccc;
          border-radius: 4px;
          background: white;
          dark: #1f2937;
          cursor: pointer;
          transition: all 0.2s;
          font-size: 14px;
        }

        .toolbar-btn:hover {
          background: #f3f4f6;
          border-color: #999;
        }

        .dark .toolbar-btn {
          background: #374151;
          border-color: #555;
        }

        .active-btn {
          background: #3b82f6;
          color: white;
          border-color: #2563eb;
        }

        .ProseMirror {
          outline: none;
        }

        .ProseMirror pre {
          background: #1f2937;
          color: #e5e7eb;
          padding: 16px;
          border-radius: 8px;
          overflow-x: auto;
          font-family: "Fira Code", monospace;
          font-size: 14px;
          line-height: 1.5;
        }

        .ProseMirror code {
          background: #e5e7eb;
          padding: 2px 6px;
          border-radius: 3px;
          font-family: "Fira Code", monospace;
          font-size: 0.9em;
        }

        .ProseMirror pre code {
          background: none;
          padding: 0;
          color: inherit;
        }
      `}</style>
    </div>
  );
};

export default TiptapEditor;
