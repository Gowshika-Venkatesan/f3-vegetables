import { writeFile } from "node:fs/promises";

await writeFile(
  "dist/index.html",
  `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>F3 Vegetables Karur | Online Vegetable Delivery</title>
    <meta name="description" content="Order fresh vegetables, greens, fruits, and daily essentials from F3 Vegetables, Anna Nagar, Karur." />
    <link rel="preconnect" href="https://images.unsplash.com" />
    <link rel="stylesheet" href="/assets/app.css" />
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/assets/app.js"></script>
  </body>
</html>
`
);
