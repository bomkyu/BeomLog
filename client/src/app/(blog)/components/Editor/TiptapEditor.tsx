'use client';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import Placeholder from '@tiptap/extension-placeholder';
import ToolbarButton from './ToolbarButton';
import TextAlign from '@tiptap/extension-text-align';
import {
  alignOptions,
  headingOptions,
  markOptions,
  mediaOptions,
  structureOptions,
} from './ToolbarConfig';

interface TiptapEditorProps {
  content: string;
  onChange: (html: string) => void;
}

const TiptapEditor = ({ content, onChange }: TiptapEditorProps) => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3],
        },
      }),
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      Image.configure({
        allowBase64: true,
        HTMLAttributes: {
          class: 'mx-auto rounded-lg max-w-full h-auto border border-slate-200',
        },
      }),
      Placeholder.configure({
        placeholder: '당신의 이야기를 적어보세요...',
        emptyEditorClass: 'is-editor-empty',
      }),
    ],
    content: content,
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    // 에디터 영역 스타일링 (Tailwind Typography 적용 필수)
    editorProps: {
      attributes: {
        class:
          'prose prose-slate max-w-none focus:outline-none min-h-[400px] p-4',
      },
    },
  });

  if (!editor) return null;

  return (
    <div className='w-full border border-slate-200 rounded-xl bg-white shadow-sm overflow-hidden focus-within:ring-2 focus-within:ring-blue-100 transition-all'>
      {/* 툴바 영역 */}
      <div className='flex flex-wrap items-center gap-1 p-2 border-b border-slate-100 bg-slate-50/50'>
        {/* 1. Heading 옵션 (H1, H2, H3) */}
        {headingOptions.map((opt) => (
          <ToolbarButton
            key={opt.text}
            onClick={() => opt.action(editor)}
            active={opt.isActive(editor)}
            label={opt.text}
            icon={opt.icon}
          />
        ))}

        <div className='w-[1px] h-4 bg-slate-200 mx-1' />

        {/* 2. Mark 옵션 (Bold, Italic, Strike) */}
        {markOptions.map((opt) => (
          <ToolbarButton
            key={opt.text}
            onClick={() => opt.action(editor)}
            active={opt.isActive(editor)}
            label={opt.text}
            icon={opt.icon}
          />
        ))}

        <div className='w-[1px] h-4 bg-slate-200 mx-1' />

        {/* 3. Structure 옵션 (Quote, Bullet, Ordered) */}
        {structureOptions.map((opt) => (
          <ToolbarButton
            key={opt.text}
            onClick={() => opt.action(editor)}
            active={opt.isActive(editor)}
            label={opt.text}
            icon={opt.icon}
          />
        ))}

        <div className='w-[1px] h-4 bg-slate-200 mx-1' />

        {/* 4. Align 옵션 (Left, Center, Right) */}
        {alignOptions.map((opt) => (
          <ToolbarButton
            key={opt.text}
            onClick={() => opt.action(editor)}
            active={opt.isActive(editor)}
            label={opt.text}
            icon={opt.icon}
          />
        ))}

        <div className='w-[1px] h-4 bg-slate-200 mx-1' />

        {mediaOptions.map((opt) => (
          <ToolbarButton
            key={opt.text}
            onClick={() => opt.action(editor)}
            active={opt.isActive(editor)}
            label={opt.text}
            icon={opt.icon}
          />
        ))}
      </div>

      {/* 에디터 본문 */}
      <EditorContent editor={editor} />
    </div>
  );
};

export default TiptapEditor;
