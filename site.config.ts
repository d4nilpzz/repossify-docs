// Site settings. Colors and styles live in theme/theme.css and theme/landing.css.
export const siteConfig = {
  name: "Repossify",
  shortName: "Repossify",
  tagline: "Your private Maven repository",
  description:
    "Self-hosted Maven repository manager. Host your Java artifacts privately, with per-path access tokens, upstream mirroring and a web dashboard.",

  // Path inside /public
  logo: "/icon.png",

  repo: "https://github.com/d4nilpzz/Repossify",
  releases: "https://github.com/d4nilpzz/Repossify/releases",
  discord: "https://discord.gg/x2PuPKznA6",
  image: "https://ghcr.io/d4nilpzz/repossify",

  // Where the docs live. Everything under /content is served below this path.
  docsBase: "/docs",

  // When set, every page shows an "Edit this page" link.
  editUrl: "https://github.com/d4nilpzz/repossify-docs/edit/main/content",

  locale: "en-GB",
  labels: {
    lastModified: "Last modified",
    onThisPage: "On this page",
    previous: "Previous",
    next: "Next",
    search: "Search",
    searchPlaceholder: "Search the documentation…",
    searchNoResults: "No results",
    searchUnavailable: "Search only works after a build. Run `pnpm preview` to try it locally.",
    editPage: "Edit this page",
    notFound: "Page not found",
    backHome: "Back to home",
  },
};

export const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
