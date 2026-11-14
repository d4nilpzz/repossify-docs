---
title: Console
icon: square-terminal
description: Every console command.
---

# Console

Repossify reads commands on standard input, and the dashboard exposes the same console to
managers under the configuration modal.

Running under systemd or Docker there is no terminal attached, so the dashboard is the way
in.

## Tokens

```
generate_token <name> [<permissions>] [--secret=<secret>] [--expires=<days>] [--silent]
list_tokens
delete_token <name>
delete_all_tokens
token_modify <name> <permissions>
token_rename <oldName> <newName>
token_regenerate <name>
token_add_route <tokenName> <path> <r|w>
token_remove_route <tokenName> <path>
```

`permissions` is a comma-separated list; `M` makes a manager. `--secret` supplies your own
instead of a generated one, and `--silent` suppresses printing it.

`list_tokens` shows each token's permissions, its route grants and its expiry, marking the
expired ones.

## Repositories

```
repositories
repair_metadata <repository|*>
prune_snapshots [<repository>]
```

`repair_metadata` rebuilds `maven-metadata.xml` from what is actually on disk. You need it
after copying artifacts in by hand, or restoring a directory from a backup — anything that
puts files in place without going through a deploy.

`prune_snapshots` applies the `preserveSnapshots` limit now rather than waiting for the
scheduled run.

## Operations

```
statistics, stats
performance
```

`statistics` reports download counts per repository and artifact. `performance` prints CPU,
memory and disk of the host.

## Other

```
help, ?
docs
version
stop
```

`stop` shuts the server down. Under Docker or systemd the supervisor will usually start it
again, which makes it a restart rather than a stop.

> [!WARNING]
> `delete_all_tokens` removes every token, including the one you are using. The next start
> with an empty token table bootstraps a new `admin` and prints it once — so this is a
> recovery path if you lose the admin secret, not an operation to run casually.
