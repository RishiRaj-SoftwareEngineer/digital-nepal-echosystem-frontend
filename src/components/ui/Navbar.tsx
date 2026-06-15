'use client';
import Link from 'next/link';

interface NavItem {
  label: string;
  href: string;
}

interface NavbarProps {
  title?: string;
  items?: NavItem[];
}

export default function Navbar({ title = 'Dashboard', items = [] }: NavbarProps) {
  return (
    <nav className="bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between">
      <h1 className="text-lg font-semibold text-gray-900">{title}</h1>
      {items.length > 0 && (
        <div className="flex items-center gap-4">
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
