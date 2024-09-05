# Hear's a Story Server

## Setup

```bash
npm install
```

## Run dev server

```bash
npm run dev
```

## Build & run

```bash
npm run build && npm run start
```

## Documentation

Documentation about the API can be generated using the following command:

```bash
npm run docs
```

The outputted file can be found at `./static/index.html`. This file is
also hosted on the server when it is running, at
http://localhost:3000/api/story.

The API documentation is generated from the schema specified in
`./static/openapi.json`, which follows the [OpenAPI 3.0
Specification](https://swagger.io/specification/v3/).
