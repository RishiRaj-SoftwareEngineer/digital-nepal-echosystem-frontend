'use client';
import Link from 'next/link';

interface NavItem {
  label: string;
  href: string;
}

interface NavbarProps {
  title?: string;
  items?: NavItem[];
  userName?: string;
  jurisdiction?: string;
  tier?: 'WARD' | 'MUNICIPALITY' | 'PROVINCE' | 'CENTRAL';
}

export default function Navbar({
  title = 'Digital Nepal',
  items = [],
  userName = 'Admin',
  jurisdiction = 'Kathmandu',
  tier = 'WARD',
}: NavbarProps) {
  return (
    <nav className="bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between">
      <div>
        <h1 className="text-lg font-semibold text-gray-900">
          {title}
        </h1>
      </div>

      <div className="flex items-center gap-4">
        <span className="px-2 py-1 rounded bg-green-100 text-green-700 text-xs">
          {tier}
        </span>

        <span className="text-sm text-gray-600">
          {jurisdiction}
        </span>

        <span className="text-sm font-medium">
          {userName}
        </span>

        <button className="text-sm text-red-600">
          Logout
        </button>

        {items.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="text-sm text-gray-600 hover:text-gray-900"
          >
            {item.label}
          </Link>
        ))}
      </div>
    </nav>
  );
}