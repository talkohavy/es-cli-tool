# es-cli-tool

<p align="center">
  <img src="https://i.ibb.co/8bKXxx3/super-query-logo.png" width="250" alt="lvlup logo" />
</p>

A CLI tool to help you query your elasticsearch server _super fast_ 🚀

<p align="center">
  <img src="https://i.ibb.co/tBM2TYD/es-cli-tool.png" width="1280" alt="es-cli-tool help" />
</p>

## 1. Prerequisites

You need to have:

1. A local elasticsearch server running on the default port - 9200.
2. The server needs to be http (insecure), that means no cert needed.
3. Your elasticsearch password stored in an environment variable called `ELASTIC_PASSWORD`.

Essentially you'll just need to get a local elasticsearch server running on port 9200, where the password is stored in an Env Variable called `ELASTIC_PASSWORD`. There are several ways to achieve that, so I'll just show you one way, which is with docker, but you can choose whatever.

If you already have an elasticsearch server running on localhost:9200, you can skip to [Getting Started](#2-getting-started)

\* **ElasticSearch With Docker** \*

### - Step 1: create docker network

First create a docker network:

```bash
docker network create elastic
```

### - Step 2: run elasticsearch server for the first time

Run elasticsearch server and expose it to the host:

```bash
docker run --name es01 --net elastic -p 9200:9200 -it -m 1GB docker.elastic.co/elasticsearch/elasticsearch:8.16.1
```

A little bit about the flags:

- We're giving our container the name "es01".
- We're using the network "elastic", which we just created.
- The -m flag is here to set a limit for the memory of the container.
- Notice that the version of the elasticsearch image is 8.16.1, which could be out-of-date at the time you're watching this (it is currently the latest).

### - Step 3: Store password in an environment variable called `ELASTIC_PASSWORD`

The command you ran above gave a password.

In MacOS, put the following line:

```bash
export ELASTIC_PASSWORD="your_password"
```

in either one of `.bashrc` or `.zshrc`.

---

## 2. Getting Started

Install the package:

\- With npm:

```bash
npm install -g es-cli-tool
```

\- With pnpm:

```bash
pnpm add -g es-cli-tool
```

\- With yarn:

```bash
yarn add -g es-cli-tool
```

To check and see that the tool was installed properly, run the command:

```bash
es-cli-tool
```

And you should see this:

<p align="center">
  <img src="https://i.ibb.co/tBM2TYD/es-cli-tool.png" width="1280" alt="es-cli-tool help" />
</p>

It is recommended to give the tool a shorted alias.

For example, if you're using `zsh` on a macOS, open the `.zshrc` file, and add this line:

```
alias sq="es-cli-tool"
```

Now, by running `sq` you should get the same result as running `es-cli-tool` (don't forget to source the zshrc file afterwards, or simply open a new terminal).

---

## 3. Contributing

If you found a bug, or have a feature request, please open an [issue](https://github.com/talkohavy/es-cli-tool/issues) about it.

## License

MIT © Tal Kohavy

<!-- --insecure --silent -u elastic:$ELASTIC_PASSWORD -H 'Content-Type: application/json' -->
