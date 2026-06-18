"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface SidebarItem {
  label: string;
  href: string;
  icon?: React.ReactNode;
}

interface SidebarProps {
  items: SidebarItem[];
  collapsed?: boolean;
  variant?: "ward" | "municipality" | "province" | "central";
}

export default function Sidebar({
  items,
  collapsed = false,
  variant = "ward",
}: SidebarProps) {
  const pathname = usePathname();

  const accentColors = {
    ward: "border-green-500",
    municipality: "border-orange-500",
    province: "border-blue-500",
    central: "border-red-500",
  };

  return (
    <aside
      className={`
        ${collapsed ? "w-20" : "w-60"}
        bg-white
        border-r-4
        ${accentColors[variant]}
        min-h-screen
        p-4
        transition-all
      `}
    >
      <nav className="space-y-1">
        {items.map((item) => {
          const active = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                active
                  ? "bg-blue-50 text-blue-700"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              }`}
            >
              {item.icon && (
                <span className="text-lg">
                  {item.icon}
                </span>
              )}

              {!collapsed && item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}