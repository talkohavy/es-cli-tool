# es-cli-tool

<p align="center">
  <img src="https://i.ibb.co/8bKXxx3/super-query-logo.png" width="250" alt="es-cli-tool logo" />
</p>

A CLI tool to help you query your **elasticsearch** server _super fast_ 🚀

<p align="center">
  <img src="https://i.ibb.co/vz5BrLm/es-cli-tool-man.png" width="1280" alt="es-cli-tool help" />
</p>

## 1. Prerequisites

You need to have:

- A running elasticsearch server, whether it's a local one, or a remote one.

Essentially you'll just need to have access to some elasticsearch server running. There are several ways to achieve that, so I'll just show you one way, which is running a local elasticsearch server on the default port (which 9200) using docker, with basic authentication, but you can choose whatever you like.

If you already have a running elasticsearch server you can skip to the [Getting Started](#2-getting-started) section.

\* **ElasticSearch With Docker** \*

### - Step 1: create a docker network

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

### - Step 3: store password in an environment variable called `ELASTIC_PASSWORD`

The command you ran above gave a password.

In **MacOS**, put the following line:

```bash
export ELASTIC_PASSWORD="your_password"
```

in either one of `.bashrc` or `.zshrc`.

In **Windows**, create an environment variable named `ELASTIC_PASSWORD` and give it the password as value.

### - Step 4: Test Connectivity

Before trying out the tool, let's test the connectivity with raw `curl`:

```bash
curl --insecure -u elastic:$ELASTIC_PASSWORD https://localhost:9200
```

The important parts to note here are:

- I'm using version `8.16.1` of elasticsearch. Different image versions would require different flags & protocols.
- using the `--insecure` flag is a must
- It is required to use the `https` protocol.
- It is required to use basic authentication. I had the password stored in an ENV variable called `ELASTIC_PASSWORD`, though you can put it directly in the command, it's just not recommended.

A good response would look like:

```json
{
  "name" : "d37acd14f568",
  "cluster_name" : "docker-cluster",
  "cluster_uuid" : "ORl7COC4TxadsLCODBuA3A",
  "version" : {
    "number" : "8.16.1",
    "build_flavor" : "default",
    "build_type" : "docker",
    "build_hash" : "ffe992aa682c1968b5df375b5095b3a21f122bf3",
    "build_date" : "2024-11-19T16:00:31.793213192Z",
    "build_snapshot" : false,
    "lucene_version" : "9.12.0",
    "minimum_wire_compatibility_version" : "7.17.0",
    "minimum_index_compatibility_version" : "7.0.0"
  },
  "tagline" : "You Know, for Search"
}
```

---

## 2. Getting Started

### - Step 1: Installation

Install the package globally:

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
  <img src="https://i.ibb.co/vz5BrLm/es-cli-tool-man.png" width="1280" alt="es-cli-tool help" />
</p>

It is recommended to give the tool a shorted alias.

For example, if you're using `zsh` on a macOS, open the `.zshrc` file, and add this line:

```
alias sq="es-cli-tool"
```

Now, by running `sq` you should get the same result as running `es-cli-tool` (don't forget to source the zshrc file afterwards, or simply open a new terminal).
(The next steps will assume you gave `es-cli-tool` an alias of `sq`)

### - Step 2: Create your first context

Create a new context with:

```bash
sq create-context
```

In the first step, give it a name.  
For example:

```
es8
```

In the second step, it'll ask you for a full url.  
Write:

```
https://localhost:9200
```

In the third step, it'll ask you for flags.  
Write:

```
--insecure --silent -u elastic:$ELASTIC_PASSWORD -H 'Content-Type: application/json'
```

### - Step 3: Use the context

Let's use our newly created context:

```bash
sq use-context
```

And select the context you just created, `es8`.

### - Step 4: Create an index

Let's now create our first index:

```bash
sq create-index
```

Give it a name, for example `users`.

### - Step 5: Add the first document

To add a document we have two options:

1. Without Flags
2. With Flags

If you type:

```bash
sq add
```

You'll have two steps to complete: choosing an index to insert the document to, and writing the document to add in an editor.

However, if you type:

```bash
sq add --index users --file path/to/file.json
```

The query would execute immediately. You'll only need to create a json file with the contents of the document to add.

The file's contents could, for example, be:

```json
{
  "firstName": "Tal",
  "lastName": "Kohavy"
}
```

And you should see the following output printed:

```json
{
  "_index" : "users",
  "_id" : "oC9dt5MBmkFk9pPeuZX2",
  "_version" : 1,
  "result" : "created",
  "_shards" : {
    "total" : 2,
    "successful" : 1,
    "failed" : 0
  },
  "_seq_no" : 0,
  "_primary_term" : 1
}
```

### - Step 6: Execute a GET query

Finally, this is where you'll appreciate the tool's simplicity 🙂  
Using the `get` sub-command, you'll be able to execute pure `elasticsearch` queries with ease.

Write a simple line as:

```bash
sq get --index users --file path/to/file.json
```

where the file's contents would be a pure elasticsearch query, such as:

```json
{
  "query": {
    "match_all": {}
  }
}
```

You can achieve exactly the same result, with a much simpler line:

```bash
sq get all --index users
```

And you should see the following output printed:

```json
{
  "took" : 3,
  "timed_out" : false,
  "_shards" : {
    "total" : 1,
    "successful" : 1,
    "skipped" : 0,
    "failed" : 0
  },
  "hits" : {
    "total" : {
      "value" : 1,
      "relation" : "eq"
    },
    "max_score" : 1.0,
    "hits" : [
      {
        "_index" : "users",
        "_id" : "oC9dt5MBmkFk9pPeuZX2",
        "_score" : 1.0,
        "_source" : {
          "firstName" : "Tal",
          "lastName" : "Kohavy"
        }
      }
    ]
  }
}
```

---

## 3. Contributing

If you found a bug, or have a feature request, please open an [issue](https://github.com/talkohavy/es-cli-tool/issues) about it.

## License

MIT © Tal Kohavy

<!-- --insecure --silent -u elastic:$ELASTIC_PASSWORD -H 'Content-Type: application/json' -->
