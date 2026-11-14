---
title: Permissions
icon: shield-check
description: What a route grant matches, and what it deliberately does not.
---

# Permissions

A grant is a **path prefix** plus a permission:

```
/repo/releases/com/example    w
```

## Read and write

`w` implies `r`. A token allowed to deploy to a path can always resolve from it, which is
what every CI setup expects. The reverse is not true.

## Prefixes match on segment boundaries

This is the part worth understanding. A grant matches a request path when the path is the
prefix itself, or continues after it with a `/`:

| Grant | Request | Allowed |
|---|---|---|
| `/repo/releases/com/foo` | `/repo/releases/com/foo/lib/1.0/lib-1.0.jar` | yes |
| `/repo/releases/com/foo` | `/repo/releases/com/foo` | yes |
| `/repo/releases/com/foo` | `/repo/releases/com/foobar/lib-1.0.jar` | **no** |
| `/repo/releases` | `/repo/snapshots/com/foo/…` | **no** |

A grant on one repository gives nothing on another, and a grant on `com/foo` does not leak
into `com/foobar`. A grant on `/` grants everything below it, which is as good as a manager
for artifact access, so use it deliberately.

## Managers

A manager passes every route check and may additionally:

- issue, rename, regenerate and delete tokens
- change the configuration and the repository definitions
- run console commands
- read host metrics and download statistics

There is no partial manager. A token either administers the instance or it does not.

## Visibility interacts with grants

A repository's visibility decides what happens **before** any token is considered:

| Visibility | Anonymous resolve | Anonymous listing |
|---|---|---|
| `PUBLIC` | yes | yes |
| `HIDDEN` | yes | no |
| `PRIVATE` | no | no |

So a read grant only matters for repositories that are not public. On a public repository,
a read grant changes nothing — everyone could already read it.

## Choosing a scope

| The token is for | Give it |
|---|---|
| One library's CI | `w` on `/repo/releases/<groupId of that library>` |
| A team's whole namespace | `w` on `/repo/releases/<shared groupId>` |
| Reading a private repository | `r` on `/repo/<that repository>` |
| Administering the instance | manager, and nothing else uses it |

> [!CAUTION]
> Do not use the bootstrapped `admin` token as a deploy credential. It can mint other
> tokens, so leaking it from a build log is the end of the instance's access control, not
> just of one artifact path.
