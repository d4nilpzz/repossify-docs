---
title: Getting started
icon: rocket
description: Install Repossify, start it, and understand the directory it creates.
---

# Getting started

There are two ways to run Repossify: the published Docker image, or the standalone jar. Both
end up in the same place, so pick whichever fits where you are deploying.

| | Docker | Standalone jar |
|---|---|---|
| Requires | Docker | JDK 21 or newer |
| Data | a volume mounted at `/data` | the working directory |
| Upgrades | pull a new image | replace the jar |

- [Installation](01-installation.md) — the standalone jar, and the directory it creates
- [Docker](02-docker.md) — the published image, volumes and tags
- [Configuration](03-configuration.md) — `configuration.json` and `page.json`

## The working directory

Whichever way you start it, Repossify keeps everything in one directory:

```
repositories/   the artifacts themselves, one folder per repository
content/        static files of your own, served at /content
logs/           rotated server logs
plugins/        reserved
page.json       dashboard settings and repository definitions
configuration.json  server settings
repossify.db    SQLite: tokens, permissions and statistics
```

Back that directory up and you have backed up the whole instance.

> [!IMPORTANT]
> `repositories/` holds the artifacts and `content/` holds your own static files, such as a
> logo for the dashboard. They are not interchangeable: nothing you drop in `content/` is
> resolvable by Maven.
