import Link from "next/link";
import { siteConfig } from "@/site.config";

export default function NotFound() {
  return (
    <div className="doc-layout">
      <article className="doc not-found">
        <h1 className="doc-title">404</h1>
        <p className="md-p">{siteConfig.labels.notFound}</p>
        <Link href="/" className="md-link">
          {siteConfig.labels.backHome}
        </Link>
      </article>
    </div>
  );
}
