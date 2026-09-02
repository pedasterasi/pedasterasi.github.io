# Posting a new note

You only need to edit **`posts-data.js`**.

1. Copy one complete post block inside the `posts` list.
2. Paste it at the very top, under `const posts = [`.
3. Change these easy fields:
   - `slug`: a short unique URL name, for example `first-game-jam`
   - `date`: use `YYYY-MM-DD`
   - `dateLabel`: the date people will read
   - `category`, `title`, and `summary`
   - `cover`: choose `one`, `two`, `three`, or `four`
4. Write the article in `content`. Use:
   - `{ type: "p", text: "Your paragraph." }`
   - `{ type: "heading", text: "A small heading" }`
   - `{ type: "quote", text: "A memorable line." }`
5. Save the file and publish it. The new note appears at the top of the homepage automatically.

Example:

```js
{
  slug: "first-game-jam",
  date: "2026-09-10",
  dateLabel: "10 Sep 2026",
  category: "Game dev",
  title: "What I learned from my first game jam",
  summary: "A short note about making something in a weekend.",
  cover: "one",
  content: [
    { type: "p", text: "Write your first paragraph here." },
    { type: "heading", text: "What surprised me" },
    { type: "p", text: "Write the next paragraph here." }
  ]
},
```
