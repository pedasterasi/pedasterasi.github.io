(function () {
  const postUrl = (post) => `posts/post.html?post=${encodeURIComponent(post.slug)}`;
  const cover = (post) => `<a class="post-cover cover-${post.cover}" href="${postUrl(post)}" aria-label="Read ${post.title}"></a>`;
  const card = (post, index) => `
    <article class="post-card${index === 0 ? " featured" : ""}">
      ${cover(post)}
      <div class="post-copy">
        <p class="post-meta"><time datetime="${post.date}">${post.dateLabel}</time><span>•</span>${post.category}</p>
        <h3><a href="${postUrl(post)}">${post.title}</a></h3>
        <p>${post.summary}</p>
        <a class="read-link" href="${postUrl(post)}">Read note <span>→</span></a>
      </div>
    </article>`;

  const list = document.querySelector("[data-post-list]");
  if (list) list.innerHTML = posts.map(card).join("");
})();
