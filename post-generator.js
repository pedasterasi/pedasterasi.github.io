(() => {
  const form = document.querySelector("[data-post-form]");
  const output = document.querySelector("[data-output]");
  const copyButton = document.querySelector("[data-copy]");
  const copyNote = document.querySelector("[data-copy-note]");
  const dateInput = form.elements.date;
  dateInput.value = new Date().toISOString().slice(0, 10);

  const makeSlug = (text) => text.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "") || "my-new-note";
  const dateLabel = (value) => new Intl.DateTimeFormat("en-GB", { day: "2-digit", month: "short", year: "numeric" }).format(new Date(`${value}T00:00:00`));
  const quote = (value) => JSON.stringify(value);
  const renderBlock = (text) => {
    const value = text.trim();
    if (value.startsWith("# ")) return `{ type: "heading", text: ${quote(value.slice(2).trim())} }`;
    if (value.startsWith("> ")) return `{ type: "quote", text: ${quote(value.slice(2).trim())} }`;
    return `{ type: "p", text: ${quote(value)} }`;
  };

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const values = Object.fromEntries(new FormData(form));
    const tags = values.tags.split(",").map((tag) => tag.trim()).filter(Boolean);
    const blocks = values.body.split(/\n\s*\n/).filter((block) => block.trim()).map(renderBlock);
    if (values.linkLabel.trim() && values.linkUrl.trim()) blocks.push(`{ type: "link", label: ${quote(values.linkLabel.trim())}, url: ${quote(values.linkUrl.trim())} }`);
    if (values.unitySrc.trim()) blocks.push(`{\n      type: "unity",\n      src: ${quote(values.unitySrc.trim())},\n      title: ${quote(values.unityTitle.trim() || "Playable Unity game")},\n      caption: ${quote(values.unityCaption.trim())}\n    }`);
    const image = values.image.trim() ? `\n  image: ${quote(values.image.trim())},\n  imageAlt: ${quote(values.imageAlt.trim())},` : "";
    output.value = `{\n  slug: ${quote(makeSlug(values.title))},\n  date: ${quote(values.date)},\n  dateLabel: ${quote(dateLabel(values.date))},\n  tags: [${tags.map(quote).join(", ")}],\n  title: ${quote(values.title.trim())},\n  summary: ${quote(values.summary.trim())},\n  cover: ${quote(values.cover)},${image}\n  content: [\n    ${blocks.join(",\n    ")}\n  ]\n},`;
    copyButton.disabled = false;
    copyNote.textContent = "Your post is ready. Copy it, then paste it at the top of the posts list.";
  });

  copyButton.addEventListener("click", async () => {
    await navigator.clipboard.writeText(output.value);
    copyButton.textContent = "Copied!";
    copyNote.textContent = "Copied. Open posts-data.js, paste it directly under const posts = [, then save.";
    setTimeout(() => { copyButton.textContent = "Copy"; }, 1800);
  });
})();