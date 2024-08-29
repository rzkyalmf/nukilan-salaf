"use client";

import * as LucideIcons from "lucide-react";
import { usePathname } from "next/navigation";

import { Menu } from "@/components/isomorphic/menu";

interface MenuItemProps {
  label: string;
  href: string;
  iconName: string;
}

interface ClientSideMenuProps {
  items: MenuItemProps[];
  title: string;
}

export function SideMenu({ items, title }: ClientSideMenuProps) {
  const pathname = usePathname();

  const getIcon = (iconName: string): LucideIcons.LucideIcon => {
    return LucideIcons[iconName as keyof typeof LucideIcons] as LucideIcons.LucideIcon;
  };

  const menuActive = (href: string): boolean => {
    if (href === "/dashboard") {
      return pathname === "/dashboard" || pathname === "/dashboard/";
    }

    return pathname.startsWith(href);
  };

  return (
    <section>
      <h5 className="ml-3 py-3 text-sm font-light tracking-wide text-slate-500">{title}</h5>
      {items.map((item) => {
        return (
          <Menu key={item.href} label={item.label} href={item.href} icon={getIcon(item.iconName)} isActive={menuActive(item.href)} />
        );
      })}
    </section>
  );
}
