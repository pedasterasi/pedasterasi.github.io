(() => {
  const storageKey = "pedas-terasi-post-manager";
  const form = document.querySelector("[data-post-form]");
  const output = document.querySelector("[data-output]");
  const copyButton = document.querySelector("[data-copy]");
  const downloadButton = document.querySelector("[data-download]");
  const copyNote = document.querySelector("[data-copy-note]");
  const list = document.querySelector("[data-manage-list]");
  const saveButton = document.querySelector("[data-save-post]");
  const cancelButton = document.querySelector("[data-cancel-edit]");
  const resetButton = document.querySelector("[data-reset]");
  const picker = document.querySelector("[data-post-picker]");
  const deleteCurrentButton = document.querySelector("[data-delete-current]");
  const publishedPosts = JSON.parse(JSON.stringify(posts));
  let workingPosts = loadPosts();
  let editingIndex = null;

  form.elements.date.value = new Date().toISOString().slice(0, 10);

  function loadPosts() {
    try {
      const saved = JSON.parse(localStorage.getItem(storageKey));
      return Array.isArray(saved) ? saved : JSON.parse(JSON.stringify(posts));
    } catch { return JSON.parse(JSON.stringify(posts)); }
  }
  function savePosts() { localStorage.setItem(storageKey, JSON.stringify(workingPosts)); }
  function makeSlug(text) { return text.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "") || "my-new-note"; }
  function dateLabel(value) { return new Intl.DateTimeFormat("en-GB", { day: "2-digit", month: "short", year: "numeric" }).format(new Date(`${value}T00:00:00`)); }
  function toBlocks(body) {
    return body.split(/\n\s*\n/).filter((block) => block.trim()).map((block) => {
      const value = block.trim();
      const special = value.match(/^\[(image|link|unity):\s*(.*?)\]$/i);
      if (special) {
        const parts = special[2].split("|").map((part) => part.trim());
        if (special[1].toLowerCase() === "image" && parts[0]) return { type: "image", src: parts[0], alt: parts[1] || "", caption: parts[2] || "" };
        if (special[1].toLowerCase() === "link" && parts[0] && parts[1]) return { type: "link", label: parts[0], url: parts[1] };
        if (special[1].toLowerCase() === "unity" && parts[0]) return { type: "unity", src: parts[0], title: parts[1] || "Playable Unity game", caption: parts[2] || "" };
      }
      if (value.startsWith("# ")) return { type: "heading", text: value.slice(2).trim() };
      if (value.startsWith("> ")) return { type: "quote", text: value.slice(2).trim() };
      return { type: "p", text: value };
    });
  }
  function blocksToText(content) {
    return content.map((block) => block.type === "heading" ? `# ${block.text}` : block.type === "quote" ? `> ${block.text}` : block.type === "link" ? `[link: ${block.label} | ${block.url}]` : block.type === "image" ? `[image: ${block.src} | ${block.alt || ""} | ${block.caption || ""}]` : block.type === "unity" ? `[unity: ${block.src} | ${block.title || "Playable Unity game"} | ${block.caption || ""}]` : block.text).join("\n\n");
  }
  function formPost() {
    const values = Object.fromEntries(new FormData(form));
    const content = toBlocks(values.body);
    const post = { slug: makeSlug(values.title), date: values.date, dateLabel: dateLabel(values.date), tags: values.tags.split(",").map((tag) => tag.trim()).filter(Boolean), title: values.title.trim(), summary: values.summary.trim(), cover: values.cover, content };
    if (values.image.trim()) { post.image = values.image.trim(); post.imageAlt = values.imageAlt.trim(); }
    return post;
  }
  function exportText() { return `const posts = ${JSON.stringify(workingPosts, null, 2)};\n`; }
  function render() {
    output.value = exportText();
    picker.innerHTML = `<option value="">New post</option>${workingPosts.map((post, index) => `<option value="${index}">${post.title}</option>`).join("")}`;
    if (editingIndex !== null) picker.value = editingIndex;
    list.innerHTML = workingPosts.map((post, index) => `<article class="manage-item"><div><p class="post-meta">${post.dateLabel}</p><h3>${post.title}</h3><div class="post-tags">${post.tags.map((tag) => `<span>${tag}</span>`).join("")}</div></div><div class="manage-item-actions"><button type="button" data-edit="${index}">Edit</button><button type="button" data-delete="${index}">Delete</button></div></article>`).join("");
  }
  function resetForm() {
    form.reset(); form.elements.date.value = new Date().toISOString().slice(0, 10);
    editingIndex = null; picker.value = ""; saveButton.innerHTML = "Add post to top <span>↑</span>"; cancelButton.hidden = true; deleteCurrentButton.hidden = true;
  }
  function editPost(index) {
    const post = workingPosts[index]; editingIndex = index;
    form.elements.title.value = post.title; form.elements.date.value = post.date; form.elements.summary.value = post.summary; form.elements.tags.value = post.tags.join(", "); form.elements.cover.value = post.cover;
    form.elements.image.value = post.image || ""; form.elements.imageAlt.value = post.imageAlt || ""; form.elements.body.value = blocksToText(post.content);
    const link = post.content.find((block) => block.type === "link"); const unity = post.content.find((block) => block.type === "unity");
    saveButton.innerHTML = "Save changes <span>✓</span>"; cancelButton.hidden = false; deleteCurrentButton.hidden = false; picker.value = index; form.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const post = formPost();
    if (!post.title || !post.summary || !form.elements.body.value.trim()) return;
    if (editingIndex === null) { workingPosts.unshift(post); copyNote.textContent = "New post added at the top of your list."; }
    else { workingPosts[editingIndex] = post; copyNote.textContent = "Post changes saved."; }
    savePosts(); render(); resetForm();
  });
  list.addEventListener("click", (event) => {
    const edit = event.target.closest("[data-edit]"); const remove = event.target.closest("[data-delete]");
    if (edit) editPost(Number(edit.dataset.edit));
    if (remove) { const index = Number(remove.dataset.delete); if (confirm(`Delete “${workingPosts[index].title}”?`)) { workingPosts.splice(index, 1); savePosts(); render(); copyNote.textContent = "Post deleted."; } }
  });
  picker.addEventListener("change", () => { if (picker.value === "") resetForm(); else editPost(Number(picker.value)); });
  deleteCurrentButton.addEventListener("click", () => { if (editingIndex !== null && confirm(`Delete “${workingPosts[editingIndex].title}”?`)) { workingPosts.splice(editingIndex, 1); savePosts(); render(); resetForm(); copyNote.textContent = "Post deleted."; } });
  cancelButton.addEventListener("click", resetForm);
  resetButton.addEventListener("click", () => { if (confirm("Reset this manager to the published posts? Any unexported changes will be removed.")) { workingPosts = JSON.parse(JSON.stringify(publishedPosts)); localStorage.removeItem(storageKey); render(); resetForm(); copyNote.textContent = "Reset to published posts."; } });
  copyButton.addEventListener("click", async () => { await navigator.clipboard.writeText(output.value); copyButton.textContent = "Copied!"; copyNote.textContent = "Copied. Replace the contents of posts-data.js with this text, then publish."; setTimeout(() => { copyButton.textContent = "Copy"; }, 1800); });
  downloadButton.addEventListener("click", () => { const blob = new Blob([output.value], { type: "text/javascript" }); const url = URL.createObjectURL(blob); const link = document.createElement("a"); link.href = url; link.download = "posts-data.js"; link.click(); URL.revokeObjectURL(url); copyNote.textContent = "Downloaded posts-data.js. Replace the file in your project, then publish."; });
  render();
})();