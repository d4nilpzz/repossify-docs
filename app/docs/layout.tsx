import Link from "next/link";
import { CodeXml } from "lucide-react";
import { getNavTree, type TreeNode } from "@/lib/content";
import { basePath, siteConfig } from "@/site.config";
import Sidebar, { type NavNode } from "@/components/Sidebar";
import Search from "@/components/Search";
import MobileNavToggle from "@/components/MobileNavToggle";
import Icon from "@/components/Icon";

// Icons are rendered here (server) so the client only receives the SVGs
const toNav = (n: TreeNode): NavNode => ({
  title: n.title,
  href: n.href,
  hasPage: !!n.file,
  icon: n.icon ? <Icon name={n.icon} /> : undefined,
  children: n.children?.map(toNav),
});

export default function DocsLayout({ children }: LayoutProps<"/docs">) {
  const tree = getNavTree().map(toNav);

  return (
    <>
      <header className="wiki-header">
        <MobileNavToggle />
        <Link href="/" className="header-brand">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={`${basePath}${siteConfig.logo}`} alt="" className="header-logo" />
          <span className="wordmark">{siteConfig.name}</span>
        </Link>
        <div className="flex items-center justify-end gap-2 ml-auto">
          <div className="header-actions">
            <Search />
          </div>
          <a className="header-btn" target="_blank" rel="noreferrer" href={siteConfig.repo}>
            <CodeXml size={21} strokeWidth={2.1} aria-hidden />
          </a>
        </div>
      </header>
      <div className="wiki-shell">
        <Sidebar tree={tree} />
        <main className="wiki-main">{children}</main>
      </div>
    </>
  );
}
