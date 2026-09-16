"use client";

import { useEffect } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Underline from "@tiptap/extension-underline";
import Highlight from "@tiptap/extension-highlight";

import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  Heading1,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Quote,
  Highlighter,
  Minus,
  Link as LinkIcon,
  Undo2,
  Redo2,
} from "lucide-react";

export default function BlogRichTextEditor({ value, onChange }) {
  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3],
        },
      }),
      Underline,
      Highlight,
      Link.configure({
        openOnClick: false,
        autolink: true,
        linkOnPaste: true,
      }),
    ],
    content: value || "",
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class:
          "min-h-[420px] px-5 py-4 outline-none text-sm leading-7 text-[#101A2E]",
      },
    },
  });

  useEffect(() => {
    if (!editor) return;

    const currentHTML = editor.getHTML();

    if (value !== currentHTML) {
      editor.commands.setContent(value || "", {
        emitUpdate: false,
      });
    }
  }, [value, editor]);

  const setLink = () => {
    if (!editor) return;

    const previousUrl = editor.getAttributes("link").href;

    const url = window.prompt(
      "Enter the URL",
      previousUrl || "https://"
    );

    if (url === null) return;

    if (!url.trim()) {
      editor.chain().focus().unsetLink().run();
      return;
    }

    editor
      .chain()
      .focus()
      .extendMarkRange("link")
      .setLink({
        href: url.trim(),
      })
      .run();
  };

  if (!editor) {
    return (
      <div className="rounded-xl border border-[#101A2E]/10 bg-[#F8F9F9]">
        <div className="h-12 border-b border-[#101A2E]/10 bg-white" />
        <div className="h-[420px]" />
      </div>
    );
  }

  const buttonClass = (active = false) =>
    [
      "flex h-9 w-9 items-center justify-center rounded-lg transition-all",
      active
        ? "bg-[#101A2E] text-white"
        : "text-[#68717D] hover:bg-[#101A2E]/6 hover:text-[#101A2E]",
    ].join(" ");

  return (
    <div className="rounded-xl border border-[#101A2E]/10 bg-[#F8F9F9] focus-within:border-[#C9A24B]">
      <div className="sticky top-[76px] z-30 flex flex-wrap items-center gap-1 rounded-t-xl border-b border-[#101A2E]/10 bg-white/95 px-3 py-2 shadow-sm backdrop-blur-md">
        <button
          type="button"
          onClick={() =>
            editor.chain().focus().toggleBold().run()
          }
          className={buttonClass(editor.isActive("bold"))}
          title="Bold"
        >
          <Bold size={15} />
        </button>

        <button
          type="button"
          onClick={() =>
            editor.chain().focus().toggleItalic().run()
          }
          className={buttonClass(editor.isActive("italic"))}
          title="Italic"
        >
          <Italic size={15} />
        </button>

        <button
          type="button"
          onClick={() =>
            editor.chain().focus().toggleUnderline().run()
          }
          className={buttonClass(
            editor.isActive("underline")
          )}
          title="Underline"
        >
          <UnderlineIcon size={15} />
        </button>

        <div className="mx-1 h-6 w-px bg-[#101A2E]/10" />

        <button
          type="button"
          onClick={() =>
            editor
              .chain()
              .focus()
              .toggleHeading({ level: 1 })
              .run()
          }
          className={buttonClass(
            editor.isActive("heading", { level: 1 })
          )}
          title="Heading 1"
        >
          <Heading1 size={16} />
        </button>

        <button
          type="button"
          onClick={() =>
            editor
              .chain()
              .focus()
              .toggleHeading({ level: 2 })
              .run()
          }
          className={buttonClass(
            editor.isActive("heading", { level: 2 })
          )}
          title="Heading 2"
        >
          <Heading2 size={16} />
        </button>

        <button
          type="button"
          onClick={() =>
            editor
              .chain()
              .focus()
              .toggleHeading({ level: 3 })
              .run()
          }
          className={buttonClass(
            editor.isActive("heading", { level: 3 })
          )}
          title="Heading 3"
        >
          <Heading3 size={16} />
        </button>

        <div className="mx-1 h-6 w-px bg-[#101A2E]/10" />

        <button
          type="button"
          onClick={() =>
            editor.chain().focus().toggleBulletList().run()
          }
          className={buttonClass(
            editor.isActive("bulletList")
          )}
          title="Bullet List"
        >
          <List size={16} />
        </button>

        <button
          type="button"
          onClick={() =>
            editor.chain().focus().toggleOrderedList().run()
          }
          className={buttonClass(
            editor.isActive("orderedList")
          )}
          title="Numbered List"
        >
          <ListOrdered size={16} />
        </button>

        <button
          type="button"
          onClick={() =>
            editor.chain().focus().toggleBlockquote().run()
          }
          className={buttonClass(
            editor.isActive("blockquote")
          )}
          title="Blockquote"
        >
          <Quote size={16} />
        </button>

        <button
          type="button"
          onClick={() =>
            editor.chain().focus().toggleHighlight().run()
          }
          className={buttonClass(
            editor.isActive("highlight")
          )}
          title="Highlight"
        >
          <Highlighter size={16} />
        </button>

        <button
          type="button"
          onClick={() =>
            editor.chain().focus().setHorizontalRule().run()
          }
          className={buttonClass()}
          title="Horizontal Rule"
        >
          <Minus size={16} />
        </button>

        <button
          type="button"
          onClick={setLink}
          className={buttonClass(editor.isActive("link"))}
          title="Link"
        >
          <LinkIcon size={15} />
        </button>

        <div className="mx-1 h-6 w-px bg-[#101A2E]/10" />

        <button
          type="button"
          onClick={() =>
            editor.chain().focus().undo().run()
          }
          disabled={!editor.can().undo()}
          className={`${buttonClass()} disabled:cursor-not-allowed disabled:opacity-30`}
          title="Undo"
        >
          <Undo2 size={15} />
        </button>

        <button
          type="button"
          onClick={() =>
            editor.chain().focus().redo().run()
          }
          disabled={!editor.can().redo()}
          className={`${buttonClass()} disabled:cursor-not-allowed disabled:opacity-30`}
          title="Redo"
        >
          <Redo2 size={15} />
        </button>
      </div>

      <EditorContent editor={editor} />

      <style>{`
        .ProseMirror {
          min-height: 420px;
        }

        .ProseMirror p {
          margin: 0 0 1rem;
        }

        .ProseMirror h1 {
          font-size: 2rem;
          line-height: 1.2;
          font-weight: 600;
          margin: 1.5rem 0 1rem;
          color: #101a2e;
        }

        .ProseMirror h2 {
          font-size: 1.5rem;
          line-height: 1.3;
          font-weight: 600;
          margin: 1.5rem 0 0.75rem;
          color: #101a2e;
        }

        .ProseMirror h3 {
          font-size: 1.25rem;
          line-height: 1.4;
          font-weight: 600;
          margin: 1.25rem 0 0.75rem;
          color: #101a2e;
        }

        .ProseMirror ul {
          list-style: disc;
          padding-left: 1.5rem;
          margin: 1rem 0;
        }

        .ProseMirror ol {
          list-style: decimal;
          padding-left: 1.5rem;
          margin: 1rem 0;
        }

        .ProseMirror li {
          margin: 0.35rem 0;
        }

        .ProseMirror blockquote {
          border-left: 3px solid #c9a24b;
          padding-left: 1rem;
          margin: 1.25rem 0;
          color: #68717d;
          font-style: italic;
        }

        .ProseMirror hr {
          border: 0;
          border-top: 1px solid rgba(16, 26, 46, 0.12);
          margin: 1.5rem 0;
        }

        .ProseMirror a {
          color: #c9a24b;
          text-decoration: underline;
        }

        .ProseMirror mark {
          background: #fef08a;
          padding: 0.05em 0.15em;
          border-radius: 0.2em;
        }

        .ProseMirror strong {
          font-weight: 700;
        }

        .ProseMirror em {
          font-style: italic;
        }

        .ProseMirror u {
          text-decoration: underline;
        }

        .ProseMirror p.is-editor-empty:first-child::before {
          content: "Write your complete travel article here...";
          color: #9aa1aa;
          float: left;
          height: 0;
          pointer-events: none;
        }

        .ProseMirror:focus {
          outline: none;
        }
      `}</style>
    </div>
  );
}