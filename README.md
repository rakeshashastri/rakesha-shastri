# Rakesha Shastri — Personal Website

A minimal personal website with a writing section and resume-style about page. Built with plain HTML, CSS, and JavaScript — no frameworks, no build tools.

## Run Locally

Serve the files with any static HTTP server:

```
python3 -m http.server 8080
```

Then open [http://localhost:8080](http://localhost:8080).

> Note: A local server is required — SVG icon sprites and fetch calls won't work when opening files directly via `file://`.

## Adding a Post

1. Create a new HTML file in `writing/posts/` (use `example-post.html` as a template)
2. Add an entry to `writing/posts.json` with `title`, `slug`, `date`, `summary`, and `tags`
