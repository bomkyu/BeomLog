'use client';
import Link from 'next/link';
import Typography from './Typography';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  const menuItems = [
    { name: '소개', href: '#introduce' },
    { name: '기술 스택', href: '#stack' },
    { name: '프로젝트', href: '#project' },
    { name: '블로그', href: '/blog' },
    { name: '연락처', href: '#phone' },
  ];

  return (
    <header className="fixed w-full h-[64px] px-6 md:px-16 border-b border-[#E2E8F0] bg-white z-50">
      <div className="flex items-center justify-between w-full h-full">
        {/* 로고 */}
        <Link href="/">
          <Typography variant="h3" className="font-bold">
            Beom&apos;s portfolio
          </Typography>
        </Link>

        {/* 데스크탑 네비게이션 */}
        <nav className="hidden md:block absolute left-1/2 -translate-x-1/2">
          <ul className="flex gap-8">
            {menuItems.map((item) => (
              <li key={item.name}>
                <a
                  href={item.href}
                  className="hover:text-blue-500 transition-colors"
                >
                  <Typography variant="body">{item.name}</Typography>
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* 모바일 햄버거 버튼 */}
        <button
          className="md:hidden z-[60]"
          onClick={toggleMenu}
          aria-label="메뉴 열기"
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        {/* 모바일 풀스크린 GNB (시안 반영) */}
        <div
          className={`fixed inset-0 bg-white z-50 flex flex-col items-center justify-center transition-transform duration-300 ease-in-out ${
            isOpen ? 'translate-y-0' : '-translate-y-full'
          } md:hidden`}
        >
          {/* 중앙 메뉴 리스트 */}
          <ul className="flex flex-col items-center gap-8 mb-12">
            {menuItems.map((item) => (
              <li key={item.name}>
                <a href={item.href} onClick={toggleMenu}>
                  <Typography variant="h2" className="text-2xl font-medium">
                    {item.name}
                  </Typography>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </header>
  );
};
export default Header;
