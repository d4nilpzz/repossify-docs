---
title: Installation
icon: download
description: Run Repossify from the standalone jar.
---

# Installation

**Prerequisites:** JDK 21 or newer.

Download the latest jar from [the releases page](https://github.com/d4nilpzz/Repossify/releases)
and put it in the directory you want Repossify to use.

## Create the layout

```bash
java -jar repossify-1.1.0.jar --init
```

This creates the directories, the SQLite database and the two configuration files, then
exits. Running it twice is harmless: existing files are left alone.

## Start it

```bash
java -jar repossify-1.1.0.jar
```

By default it listens on `0.0.0.0:8080`. Open `http://localhost:8080/` for the dashboard and
`http://localhost:8080/repo/` for the repository index.

## The first token

On the first start with an empty database, Repossify creates a manager token called `admin`
and prints it once:

```
+--------------------------------------------------------+
|              REPOSSIFY FIRST-TIME SETUP                |
|                                                        |
|  A manager token was created:                          |
|    name   : admin                                      |
|    secret : …                                          |
|                                                        |
|  Save it now; it is not stored in recoverable form.    |
+--------------------------------------------------------+
```

Save it. The secret is stored as a bcrypt hash and cannot be read back. If you lose it,
delete every token from the console and restart to have a new one issued.

> [!CAUTION]
> That token can do anything, including issuing other tokens and running console commands.
> Use it to create narrower tokens, then keep it somewhere safe rather than pasting it into
> CI configuration.

## Command line options

| Option | Description |
|---|---|
| `--init` | Create the working directory layout and exit |
| `--port`, `-p` | Override the port from `configuration.json` |
| `--hostname`, `-h` | Override the hostname |
| `--max-request-size`, `-mrs` | Maximum accepted request size, in bytes |
| `--working-directory`, `-wd` | Where Repossify keeps its data |
| `--version` | Print the version |
| `--help`, `-?` | List the options |

Flags win over `configuration.json`, so you can keep a committed configuration file and
override one value at the command line.

## Running it as a service

Repossify runs in the foreground and reads commands on standard input. Under systemd, give
it a working directory and let it log to the journal:

```ini
[Unit]
Description=Repossify
After=network.target

[Service]
WorkingDirectory=/srv/repossify
ExecStart=/usr/bin/java -jar /srv/repossify/repossify.jar
Restart=on-failure
User=repossify

[Install]
WantedBy=multi-user.target
```

The interactive console is not available that way, since there is no terminal attached. The
dashboard exposes the same commands to a manager.
