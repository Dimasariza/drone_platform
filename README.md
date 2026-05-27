# Frontend development (Docker)

Start the Next.js frontend inside Docker with live-reload enabled (mounts local files):

```bash
docker compose up --build frontend
```

To run detached:

```bash
docker compose up -d --build frontend
```

The frontend will be available at http://localhost:3000 and changes should hot-reload in the browser.

