// StackSectionData
interface StackItem {
  name: string;
  icon: string;
}

export const STACK_DATA: { [key: string]: StackItem[] } = {
  FrontEnd: [
    { name: 'React', icon: 'react-icon' },
    { name: 'TypeScript', icon: 'ts-icon' },
    { name: 'Next.js', icon: 'next-icon' },
    { name: 'Tailwind CSS', icon: 'tailwind-icon' },
    { name: 'Redux', icon: 'redux-icon' },
  ],
  BackEnd: [
    { name: 'NestJS', icon: 'nest-icon' },
    { name: 'MySQL', icon: 'mysql-icon' },
    { name: 'PHP', icon: 'php-icon' },
  ],
  DevOps: [{ name: 'Docker', icon: 'docker-icon' }],
  Tools: [
    { name: 'Figma', icon: 'figma-icon' },
    { name: 'Notion', icon: 'notion-icon' },
  ],
};
