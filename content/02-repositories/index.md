---
title: Repositories
icon: boxes
description: How artifacts are stored, served, published and consumed.
---

# Repositories

Every repository is served under `/repo/<name>/`, in the standard Maven layout. Three exist
after `--init`:

| Name | Visibility | Redeployment |
|---|---|---|
| `releases` | public | refused |
| `snapshots` | public | allowed |
| `private` | private | allowed |

You can rename them, add more, or delete the ones you do not want from `page.json` or the
dashboard.

## The URL shape

```
https://maven.example.dev/repo/releases/com/example/my-lib/1.0.0/my-lib-1.0.0.jar
                          └──┬─┘ └──┬───┘ └──────────┬──────────────────────────┘
                           prefix  repository      the usual Maven path
```

That is all there is to it. Nothing about the layout is Repossify-specific, which is why
Maven and Gradle need no plugin to talk to it.

## Releases and snapshots

The difference is not in how they are stored but in what is allowed:

- A **release** repository refuses to overwrite a version that already exists, answering
  `409`. A published version stays what it was.
- A **snapshot** repository accepts republishing, and keeps the timestamped builds that
  Maven generates. `preserveSnapshots` decides how many to keep before the oldest are pruned.

Checksums and `maven-metadata.xml` are written for you. If you ever copy artifacts in by
hand, `repair_metadata` rebuilds the metadata from what is on disk.

- [Publishing](01-publishing.md) — pushing artifacts from Maven and Gradle
- [Consuming](02-consuming.md) — depending on what you host
- [Mirrors](03-mirrors.md) — standing in for Maven Central
