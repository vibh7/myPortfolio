// src/components/TiptapEditor.jsx
import React, { useCallback } from "react";
import { EditorContent, useEditor } from "@tiptap/react";

import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import TextAlign from "@tiptap/extension-text-align";
import Strike from "@tiptap/extension-strike";

const TiptapEditor = ({ value = "", onChange }) => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: { levels: [1, 2, 3, 4] },
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
    <div className="border rounded-lg mt-3 dark:border-gray-700">
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
          >
            H{level}
          </button>
        ))}

        {/* Bold */}
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`toolbar-btn ${editor.isActive("bold") ? "active-btn" : ""}`}
        >
          <b>B</b>
        </button>

        {/* Italic */}
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`toolbar-btn ${editor.isActive("italic") ? "active-btn" : ""}`}
        >
          <i>I</i>
        </button>

        {/* Underline */}
        <button
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className={`toolbar-btn ${editor.isActive("underline") ? "active-btn" : ""}`}
        >
          U
        </button>

        {/* Strike */}
        <button
          onClick={() => editor.chain().focus().toggleStrike().run()}
          className={`toolbar-btn ${editor.isActive("strike") ? "active-btn" : ""}`}
        >
          S
        </button>

        {/* Link */}
        <button
          onClick={setLink}
          className={`toolbar-btn ${editor.isActive("link") ? "active-btn" : ""}`}
        >
          🔗
        </button>

        {/* Lists */}
        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`toolbar-btn ${editor.isActive("bulletList") ? "active-btn" : ""}`}
        >
          • List
        </button>

        <button
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={`toolbar-btn ${editor.isActive("orderedList") ? "active-btn" : ""}`}
        >
          1. List
        </button>

        {/* Quote */}
        <button
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={`toolbar-btn ${editor.isActive("blockquote") ? "active-btn" : ""}`}
        >
          ❝
        </button>

        {/* Code Block */}
        <button
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          className={`toolbar-btn ${editor.isActive("codeBlock") ? "active-btn" : ""}`}
        >
          {"</>"}
        </button>

        {/* Undo / Redo */}
        <button onClick={() => editor.chain().focus().undo().run()} className="toolbar-btn">
          ↶
        </button>

        <button onClick={() => editor.chain().focus().redo().run()} className="toolbar-btn">
          ↷
        </button>
      </div>

      <EditorContent editor={editor} className="p-4 min-h-[200px]" />
    </div>
  );
};

export default TiptapEditor;
