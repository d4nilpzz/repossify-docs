---
title: Mirrors
icon: git-branch
description: Let one URL stand in for Maven Central and everything else.
---

# Mirrors

A repository can be given upstream mirrors. When an artifact is not held locally, Repossify
fetches it from the first mirror that has it and, if the mirror is configured to store,
caches it so the upstream is consulted once per artifact.

This is what lets a build point at Repossify alone instead of listing Maven Central, a
Sonatype snapshot repository and whatever else separately.

## Configuring a mirror

Add `proxied` to a repository in `page.json`:

```json title="page.json"
{
  "name": "central",
  "path": "/central",
  "visibility": "PUBLIC",
  "proxied": [
    {
      "url": "https://repo1.maven.org/maven2/",
      "store": true,
      "readTimeout": 15000
    }
  ]
}
```

| Field | Meaning |
|---|---|
| `url` | The upstream repository |
| `store` | Cache what is fetched into local storage |
| `readTimeout` | Milliseconds before giving up on this mirror |
| `allowedGroups` | Restrict the mirror to these groupIds |

Mirrors are tried in order. A mirror that fails is logged and the next one is tried.

## Pointing Maven at it

```xml title="~/.m2/settings.xml"
<mirror>
  <id>repossify</id>
  <url>https://maven.example.dev/repo/central</url>
  <mirrorOf>*</mirrorOf>
</mirror>
```

`<mirrorOf>*</mirrorOf>` sends every resolution through Repossify. Use `external:*` instead
if you want local and file-based repositories to keep working directly.

## Restricting what a mirror may serve

`allowedGroups` limits a mirror to specific groupIds, matched against the leading directories
of the path:

```json
{
  "url": "https://repo.papermc.io/repository/maven-public/",
  "store": true,
  "allowedGroups": ["io.papermc", "net.kyori"]
}
```

Anything outside those groups is not requested from that mirror at all. Useful when you add
a narrow upstream and do not want it consulted for every miss.

## What is never cached

`maven-metadata.xml` is always fetched fresh, never stored. Caching it would freeze the
upstream's version list, and a build asking for the newest version would quietly keep
getting an old answer.

Misses are remembered for a few minutes, so a failing build asking for the same absent
artifact over and over does not pay a full round trip to every mirror each time.

> [!TIP]
> Keep mirrored artifacts in their own repository rather than mixing them with the ones you
> publish. It keeps your own `releases` backup small, and makes it obvious which artifacts
> are yours.
