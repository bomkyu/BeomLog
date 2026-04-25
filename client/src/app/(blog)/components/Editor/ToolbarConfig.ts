import { uploadImageApi } from '@/app/lib/api';
import { Editor } from '@tiptap/react';
import {
  Bold,
  Italic,
  Strikethrough,
  Quote,
  List,
  ListOrdered,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Heading1,
  Heading2,
  Heading3,
  LucideIcon,
  ImageIcon,
} from 'lucide-react';

export interface ToolbarConfig {
  icon: LucideIcon;
  text: string;
  action: (editor: Editor) => boolean;
  isActive: (editor: Editor) => boolean;
}

const headingIcons = [Heading1, Heading2, Heading3];

export const headingOptions: ToolbarConfig[] = ([1, 2, 3] as const).map(
  (level) => ({
    icon: headingIcons[level - 1],
    text: `제목 ${level}`,
    action: (editor) => editor.chain().focus().toggleHeading({ level }).run(),
    isActive: (editor) => editor.isActive('heading', { level }),
  })
);

export const markOptions: ToolbarConfig[] = [
  {
    icon: Bold,
    text: '굵게',
    action: (editor) => editor.chain().focus().toggleBold().run(),
    isActive: (editor) => editor.isActive('bold'),
  },
  {
    icon: Italic,
    text: '기울임',
    action: (editor) => editor.chain().focus().toggleItalic().run(),
    isActive: (editor) => editor.isActive('italic'),
  },
  {
    icon: Strikethrough,
    text: '취소선',
    action: (editor) => editor.chain().focus().toggleStrike().run(),
    isActive: (editor) => editor.isActive('strike'),
  },
];

export const structureOptions: ToolbarConfig[] = [
  {
    icon: Quote,
    text: '인용',
    action: (editor) => editor.chain().focus().toggleBlockquote().run(),
    isActive: (editor) => editor.isActive('blockquote'),
  },
  {
    icon: List,
    text: '불렛 목록',
    action: (editor) => editor.chain().focus().toggleBulletList().run(),
    isActive: (editor) => editor.isActive('bulletList'),
  },
  {
    icon: ListOrdered,
    text: '번호 목록',
    action: (editor) => editor.chain().focus().toggleOrderedList().run(),
    isActive: (editor) => editor.isActive('orderedList'),
  },
];

const alignIconMap = {
  AlignLeft: AlignLeft,
  AlignCenter: AlignCenter,
  AlignRight: AlignRight,
};

export const alignOptions: ToolbarConfig[] = (
  [
    { icon: 'AlignLeft', text: '왼쪽', alignment: 'left' },
    { icon: 'AlignCenter', text: '가운데', alignment: 'center' },
    { icon: 'AlignRight', text: '오른쪽', alignment: 'right' },
  ] as const
).map((item) => ({
  icon: alignIconMap[item.icon as keyof typeof alignIconMap],
  text: `${item.text} 정렬`,
  action: (editor) => editor.chain().focus().setTextAlign(item.alignment).run(),
  isActive: (editor) => editor.isActive({ textAlign: item.alignment }),
}));

export const mediaOptions = [
  {
    text: '이미지',
    icon: ImageIcon,
    isActive: (editor: Editor) => editor.isActive('image'),
    action: async (editor: Editor) => {
      const input = document.createElement('input');
      input.type = 'file';
      input.accept = 'image/*';

      input.onchange = async () => {
        const file = input.files?.[0];
        if (file) {
          try {
            const { url } = await uploadImageApi(file);

            editor.chain().focus().setImage({ src: url }).run();
          } catch (error) {
            console.error('이미지 업로드 실패:', error);
            alert('이미지 업로드에 실패했습니다.');
          }
        }
      };

      input.click();
    },
  },
];
