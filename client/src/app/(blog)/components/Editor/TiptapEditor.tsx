'use client';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import Placeholder from '@tiptap/extension-placeholder';

interface TiptapEditorProps {
  content: string;
  onChange: (html: string) => void;
}

const TiptapEditor = ({ content, onChange }: TiptapEditorProps) => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        // StarterKit에 이미 포함된 기본 기능들 중 필요 없는 건 끌 수 있습니다.
        heading: {
          levels: [1, 2, 3],
        },
      }),
      Image.configure({
        allowBase64: true, // 로컬 이미지를 바로 보여주려면 true
        HTMLAttributes: {
          class: 'rounded-lg max-w-full h-auto border border-slate-200',
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
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBold().run()}
          active={editor.isActive('bold')}
          label='B'
        />
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleItalic().run()}
          active={editor.isActive('italic')}
          label='I'
        />
        <div className='w-[1px] h-4 bg-slate-200 mx-1' />
        <ToolbarButton
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
          active={editor.isActive('heading', { level: 2 })}
          label='H2'
        />
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          active={editor.isActive('bulletList')}
          label='• List'
        />
      </div>

      {/* 에디터 본문 */}
      <EditorContent editor={editor} />
    </div>
  );
};

// 툴바 버튼 컴포넌트 (내부용)
const ToolbarButton = ({
  onClick,
  active,
  label,
}: {
  onClick: () => void;
  active: boolean;
  label: string;
}) => (
  <button
    type='button'
    onClick={onClick}
    className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
      active ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-slate-200'
    }`}
  >
    {label}
  </button>
);

export default TiptapEditor;
